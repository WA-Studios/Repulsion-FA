// Carte avec lueur qui suit la souris
export default function Card({ icon, title, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article className="card reveal" onPointerMove={onMove}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
