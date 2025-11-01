import { NextResponse } from "next/server";
import { generateUUID } from "@/utils/generate-uuid";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, userId, category } =
      await req.json();

    if (!process.env.NOTION_KEY || !process.env.SUPPORT_NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const cleanedEmail = typeof email === "string" ? email.trim() : "";
    const cleanedName = typeof name === "string" ? name.trim() : "";
    const cleanedSubject = typeof subject === "string" ? subject.trim() : "";
    const cleanedMessage = typeof message === "string" ? message.trim() : "";
    const cleanedUserId = typeof userId === "string" ? userId.trim() : null;
    const cleanedCategory =
      typeof category === "string" ? category.trim() : "general";

    if (!cleanedEmail || !/\S+@\S+\.\S+/.test(cleanedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!cleanedMessage) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Generate TicketID
    const ticketId = generateUUID();

    // Create Name field like "[Support] reader" or "[Support] general"
    const supportName = `[Landing Page] ${cleanedCategory}`;

    // Create Metadata JSON object
    const metadata: Record<string, unknown> = {
      email: cleanedEmail,
    };
    if (cleanedName) metadata.name = cleanedName;
    if (cleanedSubject) metadata.subject = cleanedSubject;
    if (cleanedUserId) metadata.userId = cleanedUserId;

    const properties: Record<string, unknown> = {
      // Name field (title property)
      Name: {
        title: [
          {
            text: { content: supportName },
          },
        ],
      },
      // TicketID - UUID format
      TicketID: {
        rich_text: [
          {
            text: { content: ticketId },
          },
        ],
      },
      // UserID - UUID format (optional)
      UserID: cleanedUserId
        ? {
            rich_text: [
              {
                text: { content: cleanedUserId },
              },
            ],
          }
        : {
            rich_text: [],
          },
      // Description - the message
      Description: {
        rich_text: [
          {
            text: { content: cleanedMessage },
          },
        ],
      },
      // Metadata - JSON object as text
      Metadata: {
        rich_text: [
          {
            text: { content: JSON.stringify(metadata) },
          },
        ],
      },
    };

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.SUPPORT_NOTION_DATABASE_ID },
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

      // Log detailed error information for debugging
      console.error("Notion API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: body,
        requestPayload: {
          parent: { database_id: process.env.SUPPORT_NOTION_DATABASE_ID },
          properties,
        },
      });

      let errorMessage = "Notion error";
      if (typeof body === "string") {
        errorMessage = body;
      } else if (body && typeof body === "object") {
        const anyBody = body as Record<string, unknown>;
        if (typeof anyBody.message === "string") {
          errorMessage = anyBody.message;
        } else {
          try {
            errorMessage = JSON.stringify(body);
          } catch {
            errorMessage = "Notion error";
          }
        }
      }

      return NextResponse.json({ error: errorMessage }, { status: 502 });
    }

    return NextResponse.json({ ok: true, ticketId });
  } catch (error) {
    console.error("Unexpected error in submit-support route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
