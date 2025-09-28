import { supabase } from "../supabase-client";
import { generateUUID } from "@/utils/generate-uuid";
import { Chunk } from "@/app/json-builder/page";

export async function importSource({
  title,
  author,
  url,
  chunkInsert,
  userId,
}: {
  title: string;
  author?: string;
  url?: string;
  chunkInsert: { chunks: Chunk[] };
  userId: string;
}) {
  const sourceContentId = generateUUID();
  const sourceId = generateUUID();
  const now = Date.now();

  // Insert into source_contents first
  const { error: contentError } = await supabase
    .from("source_contents")
    .insert([
      {
        source_content_id: sourceContentId,
        content: chunkInsert,
        plain_text: null, // deprecated

        created_at: now,
        version: 1,
      },
    ]);

  if (contentError) {
    console.error("Failed inserting into source_contents:", contentError);
    throw contentError;
  }

  // Insert into sources
  const { error: sourceError } = await supabase.from("sources").insert([
    {
      source_id: sourceId,
      source_content_id: sourceContentId,
      user_id: userId,
      title,
      author,
      url,

      total_pages: chunkInsert.chunks.length,
      current_page: 0,
      current_scroll_y: 0,

      import_type: "manual",
      created_at: now,
    },
  ]);

  if (sourceError) {
    console.error("Failed inserting into sources:", sourceError);
    throw sourceError;
  }

  return { sourceId, sourceContentId };
}
