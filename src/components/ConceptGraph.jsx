import React, { useMemo, useState } from 'react';

// Radial two-ring layout with curved links and hover accents
export default function ConceptGraph({ nodes = [], links = [], onSelect }) {
  const [hoverId, setHoverId] = useState(null);

  const { computedNodes, computedLinks, size } = useMemo(() => {
    const width = 900;
    const height = 640;
    const centerX = width / 2;
    const centerY = height / 2;

    const core = nodes.slice(0, 1);
    const ringA = nodes.slice(1, Math.min(nodes.length, 8));
    const ringB = nodes.slice(Math.min(nodes.length, 8));

    const placed = [];

    // core in center
    core.forEach((n) => {
      placed.push({ ...n, x: centerX, y: centerY });
    });

    // ring A
    const r1 = 180;
    ringA.forEach((n, i) => {
      const a = (i / Math.max(1, ringA.length)) * Math.PI * 2;
      placed.push({ ...n, x: centerX + r1 * Math.cos(a), y: centerY + r1 * Math.sin(a) });
    });

    // ring B (staggered)
    const r2 = 300;
    ringB.forEach((n, i) => {
      const a = ((i + 0.5) / Math.max(1, ringB.length)) * Math.PI * 2;
      placed.push({ ...n, x: centerX + r2 * Math.cos(a), y: centerY + r2 * Math.sin(a) });
    });

    const idToNode = Object.fromEntries(placed.map((n) => [n.id, n]));

    const curved = links.map((l) => {
      const s = idToNode[l.source];
      const t = idToNode[l.target];
      if (!s || !t) return null;
      const mx = (s.x + t.x) / 2;
      const my = (s.y + t.y) / 2;
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const norm = Math.hypot(dx, dy) || 1;
      const nx = -dy / norm;
      const ny = dx / norm;
      const curvature = 28;
      const cx = mx + nx * curvature;
      const cy = my + ny * curvature;
      return { ...l, path: `M ${s.x} ${s.y} Q ${cx} ${cy} ${t.x} ${t.y}` };
    }).filter(Boolean);

    return { computedNodes: placed, computedLinks: curved, size: { width, height } };
  }, [nodes, links]);

  return (
    <div className="w-full h-full">
      <svg width={size.width} height={size.height} className="mx-auto block">
        <defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L12,6 L0,12 L3,6 Z" fill="#334155" />
          </marker>
        </defs>

        {/* links */}
        <g>
          {computedLinks.map((l, idx) => (
            <path
              key={idx}
              d={l.path}
              stroke="#334155"
              strokeWidth={1.6}
              fill="none"
              markerEnd="url(#arrow)"
              filter="url(#dropshadow)"
              opacity={hoverId && (hoverId !== l.source && hoverId !== l.target) ? 0.35 : 0.9}
            />
          ))}
        </g>

        {/* nodes */}
        <g>
          {computedNodes.map((n) => {
            const isHover = hoverId === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => onSelect && onSelect(n)}
                className="cursor-pointer"
              >
                {/* glow ring */}
                <circle r={isHover ? 28 : 22} fill="none" stroke={isHover ? '#67e8f9' : 'transparent'} strokeOpacity="0.6" strokeWidth="2" />
                {/* main node */}
                <circle r={18} fill={n.type === 'core' ? '#6366f1' : '#06b6d4'} stroke="#0ea5e9" strokeOpacity="0.25" />
                {/* label with outline for contrast */}
                <text
                  x={0}
                  y={36}
                  textAnchor="middle"
                  style={{ fontSize: 12, fontWeight: 600, pointerEvents: 'none' }}
                >
                  <tspan fill="#0f172a" stroke="#0f172a" strokeWidth={3} paintOrder="stroke">{n.label}</tspan>
                  <tspan fill="#e2e8f0">{n.label}</tspan>
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
