// app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-4">🔥</div>
      <h1 className="text-3xl font-bold mb-2">404 — Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        Looks like this page got roasted out of existence.
      </p>
      <Link
        href="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-medium"
      >
        Go Home
      </Link>
    </div>
  )
}
