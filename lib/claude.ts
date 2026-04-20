// lib/claude.ts
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface RoastResult {
  roastText: string
  overallScore: number
  atsScore: number
  suggestions: {
    category: string
    issue: string
    fix: string
    priority: "high" | "medium" | "low"
  }[]
  improvedSummary: string
}

export async function roastResume(resumeText: string): Promise<RoastResult> {
  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are a brutally honest but hilarious career coach who roasts resumes. 
Analyze this resume and respond with a JSON object ONLY (no markdown, no extra text).

Resume:
${resumeText}

Return this exact JSON structure:
{
  "roastText": "A funny, brutally honest 3-4 paragraph roast of this resume. Be sarcastic but helpful. Mention specific problems you see. End with something encouraging.",
  "overallScore": <number 1-100 overall resume quality>,
  "atsScore": <number 1-100 how well it passes ATS systems>,
  "suggestions": [
    {
      "category": "Contact Info | Summary | Experience | Skills | Education | Formatting | Keywords",
      "issue": "specific problem found",
      "fix": "concrete actionable fix",
      "priority": "high | medium | low"
    }
  ],
  "improvedSummary": "A rewritten professional summary for this person based on their experience"
}

Give at least 5-8 suggestions. Be specific, not generic.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== "text") throw new Error("Unexpected response type")

  const cleaned = content.text.replace(/```json\n?|\n?```/g, "").trim()
  const result = JSON.parse(cleaned) as RoastResult
  return result
}

export async function streamRoast(resumeText: string) {
  return client.messages.stream({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a brutally honest but hilarious career coach. Roast this resume in 3-4 paragraphs. Be funny, specific, and end with genuine encouragement. Don't use JSON - just write naturally.

Resume:
${resumeText}`,
      },
    ],
  })
}
