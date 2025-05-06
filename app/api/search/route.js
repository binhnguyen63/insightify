import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "Missing q parameter" }, { status: 400 });
  }

  const API_KEY = process.env.GOOGLE_CSE_KEY;
  const CX = process.env.GOOGLE_CSE_CX;
  const url =
    `https://www.googleapis.com/customsearch/v1` +
    `?key=${API_KEY}` +
    `&cx=${CX}` +
    `&q=${encodeURIComponent(q)}` +
    `&searchType=image` + // ← only images
    `&imgSize=medium` + // ← optional: tiny|small|medium|large|xlarge|xxlarge
    `&num=10`; // ← optional: how many results per call

  const apiRes = await fetch(url);
  if (!apiRes.ok) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: apiRes.status }
    );
  }

  const data = await apiRes.json();
  // items will be an array of image results
  console.log(data);
  return NextResponse.json(data);
}
