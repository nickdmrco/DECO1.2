import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/site";

/* Renders a photograph when one is configured, and a labelled placeholder
   frame when it isn't — so a missing file degrades to the design intent
   instead of a broken image icon.

   Uses `fill`, so the parent must be positioned and carry the aspect ratio.
   Note: this Next version deprecates `priority` in favour of `preload`. */
export function Photo({
  photo,
  hint,
  sizes,
  preload = false,
  className,
}: {
  photo: PhotoData | null;
  /** Shown in the placeholder — what the slot is waiting for. */
  hint: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  if (!photo) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-raised p-10 text-center">
        <p className="max-w-[22ch] text-[0.8125rem] leading-relaxed text-muted/70">{hint}</p>
      </div>
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
