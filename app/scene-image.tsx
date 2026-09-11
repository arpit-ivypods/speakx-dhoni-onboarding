"use client";

import { useEffect, useState } from "react";
import { MSD_FALLBACK } from "./fallback-image";

export type ImageMode = "normal" | "slow" | "unavailable";

export function BundledPortrait({ card = false }: { card?: boolean }) {
  return <img className={`bundled-portrait ${card ? "bundled-portrait-card" : ""}`} src={MSD_FALLBACK} alt="" aria-hidden="true" draggable={false} />;
}

// Load and decode off-screen: incomplete or broken images never replace the portrait.
export function SceneImage({ src, alt, mode, kind = "context", priority = false }: {
  src: string;
  alt: string;
  mode: ImageMode;
  kind?: "card" | "context" | "poster";
  priority?: boolean;
}) {
  const [result, setResult] = useState<{ key: string; status: "ready" | "error" } | null>(null);
  const key = `${mode}:${src}`;
  const status = result?.key === key ? result.status : "loading";

  useEffect(() => {
    let cancelled = false;
    const photo = new Image();
    photo.fetchPriority = priority ? "high" : "low";
    const fail = () => { if (!cancelled) setResult({ key, status: "error" }); };
    photo.onerror = fail;
    photo.onload = async () => {
      try {
        await photo.decode();
        if (!cancelled) setResult({ key, status: "ready" });
      } catch { fail(); }
    };
    // Invalid image bytes exercise the real image error path without a network request.
    const start = () => { photo.src = mode === "unavailable" ? "data:image/webp;base64,AA==" : src; };
    const timer = mode === "slow" ? window.setTimeout(start, 5000) : null;
    if (timer === null) start();
    return () => {
      cancelled = true;
      if (timer !== null) window.clearTimeout(timer);
      photo.onload = null;
      photo.onerror = null;
    };
  }, [src, mode, key, priority]);

  return <div className={`scene-image ${status === "ready" ? "image-ready" : ""}`} data-image-status={status} data-image-src={src}>
    {status === "ready" && (kind === "poster"
      ? <svg viewBox="0 470 1080 1140" preserveAspectRatio="xMidYMid slice" className="clean-photo" role="img" aria-label={alt}><image href={src} width="1080" height="2052" onError={() => setResult({ key, status: "error" })} /></svg>
      : <img className={kind === "card" ? "card-scene-photo" : "context-photo"} src={src} alt={alt} draggable={false} onError={() => setResult({ key, status: "error" })} />)}
  </div>;
}
