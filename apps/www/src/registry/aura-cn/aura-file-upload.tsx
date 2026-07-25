"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── File Upload ─── */

interface AuraFileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFiles?: (files: File[]) => void;
  className?: string;
}

export function AuraFileUpload({
  accept,
  multiple = false,
  maxSize = 10,
  onFiles,
  className,
}: AuraFileUploadProps) {
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const valid = Array.from(fileList).filter((f) => f.size <= maxSize * 1024 * 1024);
    setFiles(valid);
    onFiles?.(valid);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFiles?.(next);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
          dragging
            ? "border-[var(--aura)] bg-[var(--aura)]/5"
            : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--bg-surface-hover)]"
        )}
      >
        <svg className="mb-3 h-8 w-8 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-[var(--text-secondary)]">
          Drop files here or click to browse
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)] opacity-60">
          Max {maxSize}MB{accept ? ` • ${accept}` : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-[var(--bg-surface)] px-3 py-2 text-sm"
            >
              <span className="flex-1 truncate text-[var(--text-primary)]">{file.name}</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {(file.size / 1024 / 1024).toFixed(1)}MB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
