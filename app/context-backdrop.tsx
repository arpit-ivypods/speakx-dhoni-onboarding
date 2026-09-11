"use client";

const contextualImages = [
  { file: "classroom.png", alt: "Dhoni having a conversation with parents in a classroom" },
  { file: "home.png", alt: "Dhoni learning on his phone in a furnished living room" },
  { file: "interview.png", alt: "Dhoni and an interviewer at a desk in a modern office" },
  { file: "meeting.png", alt: "Dhoni presenting beside a whiteboard to colleagues in a meeting room" },
  { file: "library.png", alt: "Dhoni with books among library shelves and study tables" },
  { file: "airport.png", alt: "Dhoni with luggage in an airport terminal with an airplane outside" },
];

export function ContextBackdrop({ active }: { active: number }) {
  return (
    <div className="full-background context-background">
      {contextualImages.map((image, index) => (
        <div
          key={image.file}
          className={`background-scene ${active === index ? "active" : ""}`}
          aria-hidden={active !== index}
        >
          <img
            className="context-photo"
            src={`/images/context/${image.file}`}
            alt={image.alt}
            width="853"
            height="1844"
            draggable={false}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>
      ))}
      <div className="context-background-shade" />
    </div>
  );
}
