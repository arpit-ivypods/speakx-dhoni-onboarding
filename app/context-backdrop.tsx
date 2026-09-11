"use client";

import { BundledPortrait, SceneImage, type ImageMode } from "./scene-image";

const contextualImages = [
  { file: "classroom.png", alt: "Dhoni having a conversation with parents in a classroom" },
  { file: "friends-family.png", alt: "Dhoni talking with friends and family around a tea table in a warm living room" },
  { file: "interview.png", alt: "Dhoni and an interviewer at a desk in a modern office" },
  { file: "meeting.png", alt: "Dhoni presenting beside a whiteboard to colleagues in a meeting room" },
  { file: "library.png", alt: "Dhoni with books among library shelves and study tables" },
  { file: "airport.png", alt: "Dhoni with luggage in an airport terminal with an airplane outside" },
];

export function ContextBackdrop({ active, imageMode }: { active: number; imageMode: ImageMode }) {
  return (
    <div className="full-background context-background">
      <BundledPortrait />
      {contextualImages.map((image, index) => (
        <div
          key={image.file}
          className={`background-scene ${active === index ? "active" : ""}`}
          aria-hidden={active !== index}
        >
          <SceneImage src={`/images/context/${image.file}`} alt={image.alt} mode={imageMode} priority={index === 0} />
        </div>
      ))}
      <div className="context-background-shade" />
    </div>
  );
}
