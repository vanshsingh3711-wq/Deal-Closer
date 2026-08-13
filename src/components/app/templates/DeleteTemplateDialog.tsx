"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DeleteTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error: string | null;
}

export function DeleteTemplateDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  error
}: DeleteTemplateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  if (!isOpen && typeof window !== "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-background/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95 rounded-xl border border-border/60 bg-surface p-0 shadow-lg sm:max-w-md w-full max-w-[calc(100vw-2rem)]"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Delete template?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This template will be permanently removed.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium border border-destructive/20">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="mt-2 sm:mt-0 inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-sm transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive disabled:pointer-events-none disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete template"}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
