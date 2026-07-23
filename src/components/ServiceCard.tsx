type ServiceCardProps = {
  number: number;
  title: string;
  description: string;
};

export default function ServiceCard({
  number,
  title,
  description,
}: ServiceCardProps) {
  return (
    <article className="group border border-[#D4C9A8] p-8 hover:border-[#B8942A] transition-colors">
      <div
        className="text-[#B8942A] text-2xl font-serif mb-4 opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {String(number).padStart(2, "0")}
      </div>
      <h3
        className="font-serif text-xl text-[#1C1C1C] mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h3>
      <div className="w-6 h-px bg-[#B8942A] mb-4 group-hover:w-10 transition-all" />
      <p
        className="text-[#6B6560] text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
      >
        {description}
      </p>
    </article>
  );
}
