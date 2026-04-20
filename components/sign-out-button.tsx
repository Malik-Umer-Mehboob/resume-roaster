"use client"
// components/sign-out-button.tsx
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
    >
      Sign out
    </button>
  )
}
