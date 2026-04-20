"use client"
// components/upload-area.tsx
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

type Stage = "idle" | "uploading" | "roasting" | "done" | "error"

export function UploadArea() {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>("idle")
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState("")

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File must be under 5MB")
        return
      }

      setError("")
      setStage("uploading")
      setProgress("Uploading your resume...")

      // Step 1: Upload PDF
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        setError(err.error || "Upload failed")
        setStage("error")
        return
      }

      const { resumeId } = await uploadRes.json()

      // Step 2: Generate Roast
      setStage("roasting")
      setProgress("AI is reading your resume... 👀")

      setTimeout(() => {
        if (stage === "roasting")
          setProgress("Preparing the roast... 🔥")
      }, 3000)

      const roastRes = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      })

      if (!roastRes.ok) {
        const err = await roastRes.json()
        setError(err.error || "Roast failed")
        setStage("error")
        return
      }

      const { roastId } = await roastRes.json()
      setStage("done")
      router.push(`/roast/${roastId}`)
    },
    [router, stage]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  if (stage === "uploading" || stage === "roasting") {
    return (
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-12 text-center">
        <div className="text-4xl mb-4 animate-bounce">
          {stage === "uploading" ? "📤" : "🔥"}
        </div>
        <p className="font-semibold text-gray-700 mb-2">{progress}</p>
        <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-orange-400 rounded-full animate-pulse"
            style={{ width: stage === "uploading" ? "40%" : "80%" }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-4">
          {stage === "roasting"
            ? "This takes 15-30 seconds. Claude is being thorough 🧠"
            : "Uploading file..."}
        </p>
      </div>
    )
  }

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          dragging
            ? "border-orange-400 bg-orange-50"
            : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onFileChange}
        />
        <span className="text-4xl mb-3">📄</span>
        <p className="font-semibold text-gray-700 mb-1">
          Drop your resume PDF here
        </p>
        <p className="text-sm text-gray-400">or click to browse · PDF only · max 5MB</p>
        <div className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition">
          Choose File
        </div>
      </label>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
