// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/session-provider"
import { auth } from "@/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resume Roaster — Get Brutally Honest AI Feedback",
  description:
    "Upload your resume and get roasted by AI. Funny, honest, and actually helpful feedback to land your dream job.",
  openGraph: {
    title: "Resume Roaster",
    description: "Get your resume brutally roasted by AI",
    images: ["/og-image.png"],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
