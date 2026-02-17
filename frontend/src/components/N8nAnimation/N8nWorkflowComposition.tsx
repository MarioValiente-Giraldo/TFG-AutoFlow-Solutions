import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from 'remotion';

export interface N8nCompositionProps {
  isDark?: boolean;
}

const DARK = {
  bg: '#0f172a',
  nodeBg: '#1e293b',
  nodeBorder: '#334155',
  text: '#f1f5f9',
  subText: '#94a3b8',
  gridDot: '#1e293b',
  connector: '#475569',
  label: '#334155',
};

const LIGHT = {
  bg: '#f8fafc',
  nodeBg: '#ffffff',
  nodeBorder: '#e2e8f0',
  text: '#1e293b',
  subText: '#64748b',
  gridDot: '#e2e8f0',
  connector: '#cbd5e1',
  label: '#cbd5e1',
};

// Node dimensions
const W = 120;
const H = 52;
const R = 8;

interface NodeDef {
  id: string;
  cx: number;
  cy: number;
  label: string;
  type: string;
  color: string;
  startFrame: number;
  dualOutput?: boolean;
}

interface EdgeDef {
  id: string;
  d: string;
  length: number;
  color: string;
  startFrame: number;
  duration: number;
}

// Nodes layout — matches N8N workflow structure
// ViewBox: 640×360 (16:9)
//   [Webhook]──[HTTP Request]──[IF Condition]──[Send Email]
//                                          └──[Save to DB]
const NODES: NodeDef[] = [
  { id: 'webhook',  cx: 75,  cy: 175, label: 'Webhook',      type: 'TRIGGER', color: '#22d3ee', startFrame: 5  },
  { id: 'http',     cx: 240, cy: 175, label: 'HTTP Request', type: 'ACTION',  color: '#3b82f6', startFrame: 22 },
  { id: 'filter',   cx: 405, cy: 175, label: 'IF Condition', type: 'LOGIC',   color: '#a78bfa', startFrame: 39, dualOutput: true },
  { id: 'email',    cx: 548, cy: 100, label: 'Send Email',   type: 'ACTION',  color: '#22d3ee', startFrame: 56 },
  { id: 'database', cx: 548, cy: 250, label: 'Save to DB',   type: 'ACTION',  color: '#60a5fa', startFrame: 65 },
];

// Edge connectors (SVG cubic bezier paths)
// Straight: webhook→http, http→IF
// Curved:   IF→email (up), IF→db (down)
const EDGES: EdgeDef[] = [
  { id: 'e1', d: 'M135,175 L180,175',                   length: 45, color: '#22d3ee', startFrame: 85,  duration: 15 },
  { id: 'e2', d: 'M300,175 L345,175',                   length: 45, color: '#3b82f6', startFrame: 100, duration: 15 },
  { id: 'e3', d: 'M465,163 C490,163 488,110 488,100',   length: 90, color: '#a78bfa', startFrame: 115, duration: 20 },
  { id: 'e4', d: 'M465,187 C490,187 488,240 488,250',   length: 90, color: '#60a5fa', startFrame: 120, duration: 20 },
];

export const N8nWorkflowComposition: React.FC<N8nCompositionProps> = ({ isDark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = isDark ? DARK : LIGHT;

  // Completion glow — activates after all edges are drawn
  const completionProgress = interpolate(frame, [145, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sinusoidal pulse for glow animation
  const pulse = completionProgress > 0
    ? 0.3 + 0.5 * Math.abs(Math.sin((frame - 145) * 0.11))
    : 0;

  return (
    <AbsoluteFill style={{ background: c.bg, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 640 360"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Background dot grid ── */}
        <g opacity={0.5}>
          {Array.from({ length: 19 }, (_, xi) =>
            Array.from({ length: 11 }, (_, yi) => (
              <circle
                key={`${xi}-${yi}`}
                cx={(xi + 1) * 32}
                cy={(yi + 1) * 32}
                r={1.5}
                fill={c.gridDot}
              />
            ))
          )}
        </g>

        {/* ── Edges ── */}
        {EDGES.map(edge => {
          const progress = interpolate(
            frame,
            [edge.startFrame, edge.startFrame + edge.duration],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          const dashOffset = edge.length * (1 - progress);
          const glowSize = 4 + pulse * 4;

          return (
            <g key={edge.id}>
              {/* Track — faint background line */}
              {progress > 0.05 && (
                <path
                  d={edge.d}
                  fill="none"
                  stroke={c.nodeBorder}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              )}
              {/* Animated glow line */}
              <path
                d={edge.d}
                fill="none"
                stroke={edge.color}
                strokeWidth={2}
                strokeDasharray={edge.length}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 ${glowSize}px ${edge.color})` }}
              />
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map(node => {
          const scaleVal = spring({
            frame: frame - node.startFrame,
            fps,
            config: { stiffness: 200, damping: 18 },
          });

          const opacity = frame < node.startFrame ? 0 : 1;
          const { cx, cy, label, type, color } = node;

          const glowFilter = pulse > 0
            ? `drop-shadow(0 0 ${pulse * 10}px ${color}80)`
            : undefined;
          const borderColor = completionProgress > 0.5 ? color : c.nodeBorder;

          return (
            <g
              key={node.id}
              transform={`translate(${cx}, ${cy})`}
              style={{ opacity }}
            >
              <g transform={`scale(${Math.min(scaleVal, 1.08)})`} style={{ filter: glowFilter }}>
                {/* Drop shadow */}
                <rect
                  x={-W / 2 + 2} y={-H / 2 + 4}
                  width={W} height={H} rx={R}
                  fill="rgba(0,0,0,0.30)"
                />
                {/* Node body */}
                <rect
                  x={-W / 2} y={-H / 2}
                  width={W} height={H} rx={R}
                  fill={c.nodeBg}
                  stroke={borderColor}
                  strokeWidth={1.5}
                />
                {/* Left accent bar — color-coded per node */}
                <rect
                  x={-W / 2} y={-H / 2}
                  width={5} height={H} rx={3}
                  fill={color}
                />
                {/* Square off right edge of accent */}
                <rect
                  x={-W / 2 + 3} y={-H / 2}
                  width={3} height={H}
                  fill={color}
                />
                {/* Node type label */}
                <text
                  x={-W / 2 + 14} y={-7}
                  fontSize={7} fontWeight={700}
                  fill={color} letterSpacing={0.8}
                  fontFamily="'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
                >
                  {type}
                </text>
                {/* Node name */}
                <text
                  x={-W / 2 + 14} y={9}
                  fontSize={10} fontWeight={600}
                  fill={c.text}
                  fontFamily="'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
                >
                  {label}
                </text>

                {/* Single output connector */}
                {!node.dualOutput && (
                  <circle
                    cx={W / 2} cy={0} r={4}
                    fill={c.nodeBg} stroke={color} strokeWidth={1.5}
                  />
                )}
                {/* Dual output connectors for IF */}
                {node.dualOutput && (
                  <>
                    <circle cx={W / 2} cy={-12} r={3.5} fill={c.nodeBg} stroke="#22d3ee" strokeWidth={1.5} />
                    <circle cx={W / 2} cy={12}  r={3.5} fill={c.nodeBg} stroke="#60a5fa" strokeWidth={1.5} />
                  </>
                )}
                {/* Input connector (all nodes except the trigger) */}
                {node.id !== 'webhook' && (
                  <circle
                    cx={-W / 2} cy={0} r={4}
                    fill={c.nodeBg} stroke={c.connector} strokeWidth={1.5}
                  />
                )}
              </g>
            </g>
          );
        })}

        {/* ── Footer label ── */}
        <text
          x={320} y={345}
          fill={c.label}
          fontSize={9} textAnchor="middle"
          letterSpacing={2} fontWeight={600}
          fontFamily="'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
        >
          POWERED BY n8n
        </text>
      </svg>
    </AbsoluteFill>
  );
};
