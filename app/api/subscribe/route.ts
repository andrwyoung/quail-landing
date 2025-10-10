import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!process.env.NOTION_KEY || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const cleanedEmail = typeof email === "string" ? email.trim() : "";
    const cleanedName = typeof name === "string" ? name.trim() : "";
    const cleanedPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanedMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanedEmail || !/\S+@\S+\.\S+/.test(cleanedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const titleProp = process.env.NOTION_TITLE_PROP || "Name";

    const properties: Record<string, unknown> = {
      // Notion requires a single title property; use Name (or configured title)
      [titleProp]: {
        title: [
          {
            text: { content: cleanedName || cleanedEmail },
          },
        ],
      },
      // Email property must use the email shape
      Email: { email: cleanedEmail },
    };

    // Optional: map Phone if provided
    if (cleanedPhone) {
      properties["Phone"] = { phone_number: cleanedPhone };
    }

    // Optional: map Message if provided
    if (cleanedMessage) {
      properties["Message"] = {
        rich_text: [
          {
            text: { content: cleanedMessage },
          },
        ],
      };
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!res.ok) {
      let body: unknown;
      try {
        body = await res.json();
      } catch {
        body = await res.text();
      }

      let message = "Notion error";
      if (typeof body === "string") {
        message = body;
      } else if (body && typeof body === "object") {
        const anyBody = body as Record<string, unknown>;
        if (typeof anyBody.message === "string") {
          message = anyBody.message;
        } else {
          try {
            message = JSON.stringify(body);
          } catch {
            message = "Notion error";
          }
        }
      }

      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
