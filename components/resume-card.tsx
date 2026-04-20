"use client"
// components/resume-card.tsx
import Link from "next/link"
import { formatDistanceToNow } from "@/lib/utils"

interface ResumeCardProps {
  resume: {
    id: string
    filename: string
    atsScore: number | null
    createdAt: Date
    roasts: {
      id: string
      overallScore: number
      createdAt: Date
    }[]
  }
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const latestRoast = resume.roasts[0]

  const scoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-50"
    if (score >= 50) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:border-gray-200 transition">
      <div className="text-3xl">📄</div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{resume.filename}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          Uploaded {formatDistanceToNow(new Date(resume.createdAt), { addSuffix: true })}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {resume.atsScore !== null && (
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scoreColor(resume.atsScore)}`}>
            ATS: {resume.atsScore}
          </div>
        )}
        {latestRoast ? (
          <div className="flex items-center gap-2">
            <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scoreColor(latestRoast.overallScore)}`}>
              Score: {latestRoast.overallScore}
            </div>
            <Link
              href={`/roast/${latestRoast.id}`}
              className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition font-medium"
            >
              View Roast
            </Link>
          </div>
        ) : (
          <Link
            href={`/dashboard?roast=${resume.id}`}
            className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition font-medium"
          >
            🔥 Roast It
          </Link>
        )}
      </div>
    </div>
  )
}
