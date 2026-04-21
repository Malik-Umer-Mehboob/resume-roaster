"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-xl">Resume Roaster</span>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <Link href="/dashboard" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-medium text-sm">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/auth/signin" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-medium text-sm">
              Get Started Free
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span>⚡</span> AI-Powered Resume Analysis
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Get Your Resume{" "}
          <span className="gradient-text">Brutally Roasted</span>
          <span className="text-5xl md:text-6xl"> 🔥</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your resume. Get hilariously honest AI feedback that actually
          helps you land jobs. No sugarcoating. Just facts (with laughs).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={session ? "/dashboard" : "/auth/signin"}
            className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition font-semibold text-lg shadow-lg shadow-orange-200"
          >
            Roast My Resume →
          </Link>
          <a href="#how-it-works" className="border border-gray-200 text-gray-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition font-medium text-lg">
            See How It Works
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: "10K+", label: "Resumes Roasted" },
            { num: "94%", label: "ATS Pass Rate After" },
            { num: "3x", label: "More Interviews" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-orange-500">{stat.num}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: "📄", title: "Upload Your Resume", desc: "Drop your PDF resume. We extract and analyze every word." },
            { step: "02", icon: "🤖", title: "AI Roasts It", desc: "Claude AI gives you brutally honest, funny, specific feedback in seconds." },
            { step: "03", icon: "✨", title: "Get Better & Apply", desc: "See your ATS score, fix suggestions, and download the improved version." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold text-orange-400 mb-2 tracking-widest">STEP {item.step}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "🔥", title: "Brutal Honest Roast", desc: "No generic feedback. Specific issues with your actual resume." },
              { icon: "📊", title: "ATS Score", desc: "See if your resume even makes it past automated filters." },
              { icon: "✅", title: "Fix Suggestions", desc: "Prioritized list of exactly what to change and how." },
              { icon: "📝", title: "Improved Summary", desc: "AI rewrites your professional summary to sound amazing." },
              { icon: "📁", title: "Resume History", desc: "Track all versions and see your improvement over time." },
              { icon: "🔗", title: "Share Your Roast", desc: "Share your roast publicly. Some are too funny not to." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-5 flex gap-4 border border-gray-100">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <div className="font-semibold mb-1">{f.title}</div>
                  <div className="text-sm text-gray-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Roasted? 🔥</h2>
        <p className="text-gray-500 mb-8">Free to use. No credit card. Just your resume and a thick skin.</p>
        <Link
          href={session ? "/dashboard" : "/auth/signin"}
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-xl hover:bg-orange-600 transition font-semibold text-lg"
        >
          Upload My Resume Now
        </Link>
      </section>

      {/* Footer */}
     <footer className="border-t border-gray-100 py-10 text-center text-sm text-gray-400">
  <div className="flex items-center justify-center gap-2 mb-3">
    <span className="text-2xl">🔥</span>
    <span className="font-bold text-lg text-gray-700">Resume Roaster</span>
  </div>
  <p className="text-gray-400 mb-4 max-w-sm mx-auto">
    Stop sending weak resumes. Get roasted, get better, get hired.
  </p>
  <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-4">
  <span>⚡ AI Powered</span>
  <span>•</span>
  <span>🔒 Private & Secure</span>
  <span>•</span>
  <span>💸 Free to Start</span>
</div>
<p className="text-xs text-gray-500">
  © 2025 Resume Roaster · Built with Next.js & PostgreSQL
</p>
</footer>
    </div>
  )
}