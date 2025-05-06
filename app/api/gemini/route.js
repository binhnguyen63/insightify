// app/api/gemini/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { history } = await request.json();
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid history" },
      { status: 400 }
    );
  }

  // Flatten into a single prompt
  const conversationText =
    history
      .map((m) => (m.from === "user" ? `User: ${m.text}` : `AI: ${m.text}`))
      .join("\n") + "\nAI:"; // end on AI: so Gemini continues

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: conversationText }] }],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
