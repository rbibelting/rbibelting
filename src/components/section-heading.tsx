export function SectionHeading({
  eyebrow,
  title,
  text,
  wide = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  wide?: boolean;
}) {
  return (
    <div className={`mb-10 ${wide ? "max-w-none" : "max-w-3xl"}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-3">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-muted-foreground">{text}</p>}
    </div>
  );
}
