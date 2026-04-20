// app/api/upload/route.ts
import { auth } from "@/auth"
import { put } from "@vercel/blob"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import pdfParse from "pdf-parse"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
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

  // Upload to Vercel Blob
  const buffer = Buffer.from(await file.arrayBuffer())
  const blob = await put(`resumes/${session.user.id}/${Date.now()}-${file.name}`, buffer, {
    access: "public",
    contentType: "application/pdf",
  })

  // Extract text from PDF
  let rawText = ""
  try {
    const parsed = await pdfParse(buffer)
    rawText = parsed.text
  } catch {
    return NextResponse.json({ error: "Could not parse PDF" }, { status: 422 })
  }

  if (rawText.trim().length < 100) {
    return NextResponse.json(
      { error: "PDF seems empty or not readable" },
      { status: 422 }
    )
  }

  // Save to database
  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      filename: file.name,
      blobUrl: blob.url,
      rawText,
    },
  })

  return NextResponse.json({ resumeId: resume.id })
}
