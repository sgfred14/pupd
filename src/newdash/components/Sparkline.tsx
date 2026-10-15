interface Props {
  values: (number | null)[];
  width?: number;
  height?: number;
  color?: string;
}

/** Tiny trend line. Gaps (null) break the line. Decorative: the number next to it carries the information. */
export function Sparkline({ values, width = 92, height = 26, color = "currentColor" }: Props) {
  const xs = values.filter((v): v is number => v !== null && Number.isFinite(v));
  if (xs.length < 2) return <svg width={width} height={height} aria-hidden="true" />;
  const lo = Math.min(...xs), hi = Math.max(...xs);
  const span = hi - lo || 1;
  const step = width / Math.max(values.length - 1, 1);
  let d = "";
  let pen = false;
  values.forEach((v, i) => {
    if (v === null || !Number.isFinite(v)) { pen = false; return; }
    const x = (i * step).toFixed(1);
    const y = (height - 2 - ((v - lo) / span) * (height - 4)).toFixed(1);
    d += `${pen ? "L" : "M"}${x} ${y} `;
    pen = true;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="spark">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
