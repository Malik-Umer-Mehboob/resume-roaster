"use client"
// components/score-ring.tsx

interface ScoreRingProps {
  score: number
  label: string
  color: string
}

export function ScoreRing({ score, label, color }: ScoreRingProps) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getGrade = (s: number) => {
    if (s >= 80) return { letter: "A", note: "Excellent!" }
    if (s >= 65) return { letter: "B", note: "Good" }
    if (s >= 50) return { letter: "C", note: "Needs work" }
    if (s >= 35) return { letter: "D", note: "Poor" }
    return { letter: "F", note: "Yikes 😬" }
  }

  const grade = getGrade(score)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-gray-400 font-medium">{grade.letter}</span>
        </div>
      </div>
      <p className="text-sm font-semibold mt-2 text-gray-700">{label}</p>
      <p className="text-xs text-gray-400">{grade.note}</p>
    </div>
  )
}
