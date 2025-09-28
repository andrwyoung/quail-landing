"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Chunk } from "./page";

export default function ImportJson({
  onImport,
}: {
  onImport: (title: string, chunks: Chunk[]) => void;
}) {
  const [rawJson, setRawJson] = useState("");

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const title = parsed.title || "";
      const chunks = Array.isArray(parsed.chunks)
        ? parsed.chunks.map((c: Chunk) => ({
            heading: c.heading || "",
            content: c.content || "",
          }))
        : [];

      if (!title && chunks.length === 0) {
        toast.error("Invalid JSON: missing title and chunks");
        return;
      }

      onImport(title, chunks);
      toast.success("JSON imported successfully");
    } catch (err) {
      toast.error("Invalid JSON format");
      console.error("Invalid JSON format:", err);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-header font-semibold mb-3">Import JSON</h2>
      <textarea
        rows={8}
        className="w-full p-3 border border-border rounded bg-background mb-4"
        placeholder="Paste your JSON here..."
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded bg-accent text-text font-semibold hover:bg-accent-hover"
        onClick={handleJsonImport}
      >
        Import JSON
      </button>
    </div>
  );
}
