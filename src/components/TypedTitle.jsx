// Titre écrit lettre par lettre ; la 2e ligne se remplit d'or ensuite.
// Les lettres existent déjà (invisibles) : aucune saute de mise en page.
const STEP = 55;   // ms entre deux lettres (garder égal à la CSS)
const START = 200; // ms avant la première lettre

function Letters({ text, offset }) {
  return [...text].map((c, i) => (
    <span key={i} className="ch" style={{ "--i": offset + i }}>{c}</span>
  ));
}

export default function TypedTitle({ line1, line2 }) {
  const fillDelay = START + (line1.length + line2.length) * STEP + 150;
  return (
    <h1 className="typed" aria-label={`${line1} ${line2}`}>
      <span aria-hidden="true"><Letters text={line1} offset={0} /></span>
      <br />
      <span className="line2" aria-hidden="true" style={{ "--fill-delay": `${fillDelay}ms` }}>
        <Letters text={line2} offset={line1.length} />
      </span>
    </h1>
  );
}
