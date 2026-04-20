// app/dashboard/page.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { UploadArea } from "@/components/upload-area"
import { ResumeCard } from "@/components/resume-card"
import { SignOutButton } from "@/components/sign-out-button"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    include: { roasts: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold">Resume Roaster</span>
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={session.user.image || ""}
              alt={session.user.name || ""}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600 hidden sm:block">
              {session.user.name}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            Hey {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500">
            Upload a resume to get roasted. Your data stays private.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-10">
          <UploadArea />
        </div>

        {/* Previous Resumes */}
        {resumes.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-4">
              Your Resumes ({resumes.length})
            </h2>
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        )}

        {resumes.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📄</div>
            <p className="font-medium text-gray-600">No resumes yet</p>
            <p className="text-sm mt-1">Upload your first resume above to get started</p>
          </div>
        )}
      </main>
    </div>
  )
}
