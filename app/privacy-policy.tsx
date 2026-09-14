import sections from "./privacy-policy-data.json";

export function PrivacyPolicy() {
  return <div className="privacy-body" tabIndex={0} role="region" aria-label="Privacy policy text">
    {sections.map((section, index) => <section key={section.title}>
      {index > 0 && <h3>{section.title}</h3>}
      {section.blocks.map((block, i) => block.type === "list"
        ? <ul key={i}>{block.lines.map((line, j) => <li key={j}>{line}</li>)}</ul>
        : <p key={i}>{block.lines.join("\n")}</p>)}
    </section>)}
  </div>;
}
