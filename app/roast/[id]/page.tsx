import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ScoreRing } from "@/components/score-ring"

export default async function RoastPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/signin")

  const roast = await prisma.roast.findUnique({
    where: { id: params.id },
    include: { resume: true },
  })

  if (!roast || roast.resume.userId !== (session.user as any).id) notFound()

  const suggestions = roast.suggestions as {
    category: string
    issue: string
    fix: string
    priority: "high" | "medium" | "low"
  }[]

  const priorityColor = {
    high: "bg-red-50 border-red-200 text-red-700",
    medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
    low: "bg-green-50 border-green-200 text-green-700",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            Back
          </Link>
          <span className="text-gray-200">|</span>
          <span className="font-medium text-sm truncate text-gray-600">
            {roast.resume.filename}
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <ScoreRing score={roast.overallScore} label="Overall Score" color="#f97316" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <ScoreRing score={roast.resume.atsScore || 0} label="ATS Score" color="#8b5cf6" />
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔥</span>
            <h2 className="font-bold text-lg">The Roast</h2>
          </div>
          <div>
            {roast.roastText.split("\n").filter(Boolean).map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">
            What To Fix ({suggestions.length} issues)
          </h2>
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {s.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColor[s.priority]}`}>
                    {s.priority} priority
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {s.issue}
                </p>
                <p className="text-sm text-gray-500">
                  {s.fix}
                </p>
              </div>
            ))}
          </div>
        </div>

        {roast.improvedResume && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-3">Your Improved Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{roast.improvedResume}</p>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/dashboard"
            className="flex-1 text-center bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-medium"
          >
            Upload Another Resume
          </Link>
        </div>
      </div>
    </div>
  )
}