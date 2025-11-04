import { useMemo } from 'react';

// Simple radial layout graph in SVG without external deps
export default function ConceptGraph({ data, selected, onSelect }) {
  const { nodes, edges } = data || { nodes: [], edges: [] };

  const view = useMemo(() => {
    const width = 920;
    const height = 420;
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) * 0.36;

    const positioned = nodes.map((n, i) => {
      const angle = (i / Math.max(1, nodes.length)) * Math.PI * 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return { ...n, x, y };
    });

    const nodeMap = Object.fromEntries(positioned.map((n) => [n.id, n]));
    const lines = edges.map((e, idx) => {
      const a = nodeMap[e.from];
      const b = nodeMap[e.to];
      if (!a || !b) return null;
      return { id: idx, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    }).filter(Boolean);

    return { width, height, nodes: positioned, lines };
  }, [nodes, edges]);

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800">Concept Graph</h3>
          <span className="text-xs md:text-sm text-slate-500">{nodes.length} topics • {edges.length} links</span>
        </div>
        <div className="w-full overflow-x-auto">
          <svg width={view.width} height={view.height} viewBox={`0 0 ${view.width} ${view.height}`} className="mx-auto">
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
              </marker>
            </defs>
            {view.lines.map((l) => (
              <line key={l.id} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
            ))}
            {view.nodes.map((n) => (
              <g key={n.id} onClick={() => onSelect?.(n.id)} className="cursor-pointer">
                <circle cx={n.x} cy={n.y} r={selected === n.id ? 34 : 28} fill={selected === n.id ? '#2563eb' : '#0ea5e9'} opacity={selected === n.id ? 0.95 : 0.9} />
                <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" className="fill-white text-[10px] md:text-xs font-medium">
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <p className="text-xs text-slate-500 mt-2">Tip: Click a topic node to see summaries, examples, and interview questions.</p>
      </div>
    </section>
  );
}
