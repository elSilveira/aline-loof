type Fact = { label: string; value: string };

export default function EntityFacts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid gap-6 border-y border-[#D4C9A8] py-7 sm:grid-cols-2">
      {facts.map(({ label, value }) => (
        <div key={label}>
          <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8A6B20]">
            {label}
          </dt>
          <dd className="text-base text-[#1C1C1C]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
