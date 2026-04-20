// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
        <div className="h-52 w-full bg-white rounded-2xl border border-gray-100 animate-pulse mb-10" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
