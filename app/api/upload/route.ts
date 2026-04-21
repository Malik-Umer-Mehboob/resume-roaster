import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { put } from "@vercel/blob"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import pdfParse from "pdf-parse"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Save file locally since Vercel Blob not configured yet
  let blobUrl = `local://${file.name}`
  try {
    const blob = await put(`resumes/${(session.user as any).id}/${Date.now()}-${file.name}`, buffer, {
      access: "public",
      contentType: "application/pdf",
    })
    blobUrl = blob.url
  } catch {
    // Vercel Blob not configured - continue without it
    blobUrl = `local://${Date.now()}-${file.name}`
  }

  // Extract text from PDF
  let rawText = ""
  try {
    const parsed = await pdfParse(buffer)
    rawText = parsed.text
  } catch {
    return NextResponse.json({ error: "Could not parse PDF" }, { status: 422 })
  }

  if (rawText.trim().length < 50) {
    return NextResponse.json({ error: "PDF seems empty or not readable" }, { status: 422 })
  }

  const resume = await prisma.resume.create({
    data: {
      userId: (session.user as any).id,
      filename: file.name,
      blobUrl,
      rawText,
    },
  })

  return NextResponse.json({ resumeId: resume.id })
}