import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!process.env.NOTION_KEY || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`, // NOTE: check out .env.example
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Email: { title: [{ text: { content: email } }] }, // IMPORTANT: our notion column best be named "Email" (case sensitve)

          //    NOTE: put whatever other fields we should keep track of
          //   Source: { rich_text: [{ text: { content: "Next.js Landing" } }] },
          //   Created: { date: { start: new Date().toISOString() } },
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: body || "Notion error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
