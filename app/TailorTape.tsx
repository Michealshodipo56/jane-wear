const marks = [
  { number: '00', label: 'CONTEMPORARY DESIGN' },
  { number: '30', label: 'NIGERIAN SOUL' },
  { number: '60', label: 'PERSONAL EXPRESSION' },
  { number: '90', label: 'BESPOKE CRAFTSMANSHIP' },
];

export function TailorTape() {
  return (
    <section className="tailor-tape" aria-label="Jane Wears design values">
      <div className="tailor-tape__edge" aria-hidden="true" />
      <div className="tailor-tape__values">
        {marks.map(({ number, label }) => (
          <div className="tailor-tape__value" key={number}>
            <span className="tailor-tape__number" aria-hidden="true">{number}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="tailor-tape__edge tailor-tape__edge--bottom" aria-hidden="true" />
    </section>
  );
}
