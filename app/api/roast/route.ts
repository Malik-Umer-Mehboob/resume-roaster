// app/api/roast/route.ts
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { roastResume } from "@/lib/claude"
import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "@/lib/nanoid"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { resumeId } = await req.json()
  if (!resumeId) {
    return NextResponse.json({ error: "Resume ID required" }, { status: 400 })
  }

  // Verify ownership
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
  })

  if (!resume || resume.userId !== session.user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  // Call Claude AI
  const result = await roastResume(resume.rawText)

  // Save roast + update ATS score
  const [roast] = await Promise.all([
    prisma.roast.create({
      data: {
        resumeId,
        roastText: result.roastText,
        suggestions: result.suggestions,
        improvedResume: result.improvedSummary,
        overallScore: result.overallScore,
        isPublic: false,
        shareSlug: nanoid(10),
      },
    }),
    prisma.resume.update({
      where: { id: resumeId },
      data: { atsScore: result.atsScore },
    }),
  ])

  return NextResponse.json({ roastId: roast.id })
}
