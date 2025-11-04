import { useMemo } from 'react';

// Improved radial graph with dual-ring layout, curved links, and clearer styling
export default function ConceptGraph({ data, selected, onSelect }) {
  const { nodes = [], edges = [] } = data || {};

  const view = useMemo(() => {
    const width = 980;
    const height = 520;
    const cx = width / 2;
    const cy = height / 2;

    // Layout parameters
    const outerR = Math.min(width, height) * 0.42;
    const innerR = outerR * 0.62;

    const N = nodes.length;
    const outerCount = Math.ceil(N * 0.6);
    const innerCount = Math.max(0, N - outerCount);

    const placed = [];

    // Distribute on outer ring
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / Math.max(1, outerCount)) * Math.PI * 2 - Math.PI / 2; // start at top
      const x = cx + outerR * Math.cos(angle);
      const y = cy + outerR * Math.sin(angle);
      placed.push({ ...nodes[i], x, y, ring: 'outer', angle });
    }

    // Distribute remaining on inner ring with a rotation offset to reduce overlaps
    const offset = Math.PI / (innerCount > 0 ? innerCount : 1);
    for (let j = 0; j < innerCount; j++) {
      const idx = outerCount + j;
      const angle = (j / Math.max(1, innerCount)) * Math.PI * 2 - Math.PI / 2 + offset;
      const x = cx + innerR * Math.cos(angle);
      const y = cy + innerR * Math.sin(angle);
      placed.push({ ...nodes[idx], x, y, ring: 'inner', angle });
    }

    const nodeMap = Object.fromEntries(placed.map((n) => [n.id, n]));

    // Build curved links to reduce straight-line overlap
    const curved = [];
    edges.forEach((e, idx) => {
      const a = nodeMap[e.from];
      const b = nodeMap[e.to];
      if (!a || !b) return;
      const x1 = a.x, y1 = a.y, x2 = b.x, y2 = b.y;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.max(1, Math.hypot(dx, dy));
      const nx = -dy / len; // perpendicular unit
      const ny = dx / len;
      const curve = Math.min(80, 0.22 * len); // offset magnitude
      const cx1 = mx + nx * curve;
      const cy1 = my + ny * curve;
      const d = `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cx1.toFixed(2)} ${cy1.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
      curved.push({ id: idx, d });
    });

    return { width, height, nodes: placed, lines: curved };
  }, [nodes, edges]);

  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-neutral-100">Concept Graph</h3>
          <span className="text-xs md:text-sm text-neutral-400">{nodes.length} topics • {edges.length} links</span>
        </div>
        <div className="w-full overflow-x-auto">
          <svg
            width={view.width}
            height={view.height}
            viewBox={`0 0 ${view.width} ${view.height}`}
            className="mx-auto"
          >
            <defs>
              <marker id="arrow-slate" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,8 L8,4 z" fill="#94a3b8" />
              </marker>
              <filter id="edgeShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#0b1220" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Links below nodes */}
            <g fill="none" stroke="#94a3b8" strokeOpacity="0.95" strokeWidth="2" markerEnd="url(#arrow-slate)" filter="url(#edgeShadow)">
              {view.lines.map((l) => (
                <path key={l.id} d={l.d} />
              ))}
            </g>

            {/* Nodes */}
            {view.nodes.map((n) => {
              const isSel = selected === n.id;
              const R = isSel ? 16 : 12;
              const fill = isSel ? '#6366f1' : '#06b6d4';
              return (
                <g key={n.id} onClick={() => onSelect?.(n.id)} className="cursor-pointer group">
                  {/* Hover ring */}
                  <circle cx={n.x} cy={n.y} r={R + 6} fill="none" stroke={fill} strokeOpacity={0.25} className="transition-opacity opacity-0 group-hover:opacity-100" />
                  <circle cx={n.x} cy={n.y} r={R} fill={fill} />
                  <text
                    x={n.x}
                    y={n.y - (R + 12)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fill: 'white', fontSize: 12, fontWeight: 600, paintOrder: 'stroke', stroke: '#0b1220', strokeWidth: 3 }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="text-xs text-neutral-400 mt-3">Tip: Click a topic node to see summaries, examples, and interview questions.</p>
      </div>
    </section>
  );
}
