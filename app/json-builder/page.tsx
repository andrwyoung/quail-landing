"use client";

import { importSource } from "@/lib/supabase/db-actions/import-source";
import { useMetadataStore } from "@/store/metadata-store";
import { useState } from "react";
import { toast } from "sonner";
import ImportJson from "./import-json";

export type Chunk = {
  heading: string;
  content: string;
};

export default function JsonBuilder() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [chunks, setChunks] = useState<Chunk[]>([{ heading: "", content: "" }]);

  const [importing, setImporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const userId = useMetadataStore((s) => s.profile?.user_id);
  const chunkInsert = {
    chunks,
  };

  const addChunk = () => {
    setChunks([...chunks, { heading: "", content: "" }]);
    setCurrentPage(chunks.length);
  };

  const deleteChunk = (index: number) => {
    if (chunks.length === 1) {
      toast.error("You must have at least one chunk");
      return;
    }

    const updated = chunks.filter((_, i) => i !== index);
    setChunks(updated);

    // fix currentPage so it doesn’t point past the end
    if (currentPage >= updated.length) {
      setCurrentPage(updated.length - 1);
    }
  };

  const updateChunk = (
    index: number,
    field: "heading" | "content",
    value: string
  ) => {
    const updated = [...chunks];
    updated[index][field] = value;
    setChunks(updated);
  };

  const handleImport = async () => {
    if (!userId) {
      toast.error("Log in to Import");
      return;
    }

    if (title.trim() === "") {
      toast.error("Please enter a Title");
      return;
    }

    // find the first invalid chunk
    const firstInvalidIndex = chunks.findIndex((c) => c.content.trim() === "");

    if (firstInvalidIndex !== -1) {
      setCurrentPage(firstInvalidIndex); // flip to the problematic chunk
      toast.error(`Chunk ${firstInvalidIndex + 1} is missing content`);
      return;
    }

    try {
      setImporting(true);
      await importSource({ title, chunkInsert, userId });
      toast.success("Successfully imported source!");
    } catch (error) {
      console.error("[import source] failed to import source", error);
    } finally {
      setImporting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-text font-body">
      {/* Reverse Converter */}
      <ImportJson
        onImport={(importedTitle, importedChunks) => {
          if (importedTitle) setTitle(importedTitle);
          if (importedChunks.length > 0) {
            setChunks(importedChunks);
            setCurrentPage(0); // ✅ Fix for #5: reset after import
          }
        }}
      />

      <h1 className="text-3xl font-header font-bold mb-6">JSON Builder</h1>

      {/* Title input */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-border rounded bg-surface mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
        />

        <label className="block mb-2 font-semibold">URL (Optional)</label>
        <input
          type="text"
          className="w-full p-2 border border-border rounded bg-surface mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
        />

        <label className="block mb-2 font-semibold">
          Author Name (Optional)
        </label>
        <input
          type="text"
          className="w-full p-2 border border-border rounded bg-surface"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
        />
      </div>

      {/* Chunks */}
      {chunks.length > 0 && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-surface">
          <label className="block mb-2 font-semibold">Heading (Optional)</label>
          <input
            type="text"
            className="w-full p-2 border border-border rounded mb-4 bg-background"
            value={chunks[currentPage].heading}
            onChange={(e) =>
              updateChunk(currentPage, "heading", e.target.value)
            }
            placeholder="Enter heading"
          />

          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            rows={5}
            className="w-full p-2 border border-border rounded min-h-[400px] bg-background"
            value={chunks[currentPage].content}
            onChange={(e) =>
              updateChunk(currentPage, "content", e.target.value)
            }
            placeholder="Enter content"
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <button
          className="px-3 py-1 rounded bg-surface border border-border disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ← Prev
        </button>

        <span className="text-sm">
          Page {currentPage + 1} of {chunks.length}
        </span>

        <button
          className="px-3 py-1 rounded bg-surface border border-border disabled:opacity-50"
          disabled={currentPage === chunks.length - 1}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <button
            className="px-4 py-2 rounded bg-primary text-text-inverse font-semibold hover:bg-primary-hover mb-8"
            onClick={addChunk}
          >
            + Add Chunk
          </button>

          <button
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 mb-8"
            onClick={() => deleteChunk(currentPage)}
          >
            Delete Chunk
          </button>
        </div>

        <button
          className="px-4 py-2 rounded bg-primary disabled:bg-primary/60 text-text-inverse font-semibold hover:bg-primary-hover mb-8"
          disabled={!userId || importing}
          onClick={handleImport}
        >
          {userId ? "Import Chunk" : "Sign in to upload"}
        </button>
      </div>

      {/* JSON Output */}
      <h2 className="text-2xl font-header font-semibold mb-3">
        Generated JSON
      </h2>
      <pre className="bg-surface p-4 rounded border border-border text-sm overflow-x-auto">
        {JSON.stringify(chunkInsert, null, 2)}
      </pre>
    </main>
  );
}
