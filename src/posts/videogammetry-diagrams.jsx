// Diagrams for the dense-cloud section of the Videogammetry post. Inline SVG
// in the page's own colors (currentColor and Tailwind neutrals), so they
// follow light and dark mode.

const ink = "stroke-neutral-400 dark:stroke-neutral-500";
const faint = "stroke-neutral-200 dark:stroke-neutral-800";
const label = "fill-neutral-500 dark:fill-neutral-400";
const accent = "#f97316"; // orange, as the camera path in the viewer
const good = "#22c55e";
const bad = "#ef4444";

function Frame({ viewBox, title, children }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className="w-full h-auto" style={{ fontSize: 12 }}>
      <title>{title}</title>
      {children}
    </svg>
  );
}

function Camera({ x, y, angle = 0, name }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d="M0 0 L-14 -22 L14 -22 Z" className={`${ink} fill-neutral-100 dark:fill-neutral-900`} strokeWidth="1.5" />
      <text y="18" textAnchor="middle" className={label} transform={`rotate(${-angle})`}>
        {name}
      </text>
    </g>
  );
}

// The dense stage from keyframes to points.
export function DensePipeline() {
  const steps = [
    ["~780 keyframes", "from tracking"],
    ["~180 kept", "one per viewpoint"],
    ["8 partners each", "good angle, shared points"],
    ["depth + normal", "per pixel, PatchMatch"],
    ["fused points", "where views agree"],
  ];
  const w = 126;
  return (
    <Frame viewBox="0 0 680 70" title="Dense stage: keyframes, selection, partner views, depth maps, fusion">
      <defs>
        <marker id="dp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" className="fill-neutral-400 dark:fill-neutral-500" />
        </marker>
      </defs>
      {steps.map(([a, b], i) => {
        const x = 2 + i * (w + 10);
        return (
          <g key={a}>
            <rect x={x} y="8" width={w} height="52" rx="4" className={`${ink} fill-none`} />
            <text x={x + w / 2} y="30" textAnchor="middle" className="fill-current font-medium">
              {a}
            </text>
            <text x={x + w / 2} y="47" textAnchor="middle" className={label} style={{ fontSize: 10.5 }}>
              {b}
            </text>
            {i < steps.length - 1 && (
              <line x1={x + w + 1} y1="34" x2={x + w + 9} y2="34" className={ink} markerEnd="url(#dp-arrow)" />
            )}
          </g>
        );
      })}
    </Frame>
  );
}

// A depth and a normal make a small plane; the plane maps the reference patch
// into each source view.
export function PlaneHomography() {
  return (
    <Frame viewBox="0 0 680 320" title="A plane hypothesis maps the square reference patch to a skewed patch in the source view">
      {/* The scene: a slanted surface with the plane at one pixel */}
      <path d="M250 92 L410 60 L445 98 L285 132 Z" className="fill-neutral-200 dark:fill-neutral-800" />
      <path d="M322 86 L366 77 L376 89 L332 98 Z" fill={accent} fillOpacity="0.35" stroke={accent} strokeWidth="1.5" />
      <line x1="349" y1="87" x2="336" y2="40" stroke={accent} strokeWidth="1.5" />
      <text x="326" y="34" fill={accent} style={{ fontSize: 11 }}>
        n
      </text>
      <text x="455" y="94" className={label}>
        plane: depth d, normal n
      </text>

      {/* Two cameras looking at it */}
      <line x1="270" y1="270" x2="349" y2="87" className={ink} strokeDasharray="4 3" />
      <line x1="410" y1="270" x2="349" y2="87" className={ink} strokeDasharray="4 3" />
      <Camera x={270} y={292} angle={20} name="reference" />
      <Camera x={410} y={292} angle={-20} name="source" />
      <text x="298" y="168" textAnchor="end" className={label} style={{ fontSize: 11 }}>
        depth d
      </text>

      {/* What each camera sees */}
      <rect x="20" y="150" width="170" height="104" rx="2" className={`${faint} fill-none`} strokeWidth="1.5" />
      <rect x="92" y="189" width="26" height="26" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5" />
      <text x="105" y="142" textAnchor="middle" className={label}>
        reference image
      </text>
      <text x="105" y="272" textAnchor="middle" className={label} style={{ fontSize: 11 }}>
        11×11 patch
      </text>
      <rect x="490" y="150" width="170" height="104" rx="2" className={`${faint} fill-none`} strokeWidth="1.5" />
      <path d="M556 186 L590 194 L585 222 L552 216 Z" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5" />
      <text x="575" y="142" textAnchor="middle" className={label}>
        source image
      </text>
      <text x="575" y="272" textAnchor="middle" className={label} style={{ fontSize: 11 }}>
        the same patch, warped by the plane
      </text>
      <line x1="190" y1="230" x2="252" y2="262" className={faint} strokeDasharray="2 3" />
      <line x1="490" y1="230" x2="428" y2="262" className={faint} strokeDasharray="2 3" />

      <text x="340" y="232" textAnchor="middle" className="fill-current" style={{ fontSize: 12.5 }}>
        compare the two patches: NCC
      </text>
    </Frame>
  );
}

// Red-black propagation: a pixel tries the planes of neighbours of the other
// color, 1 and 5 pixels away.
export function Propagation() {
  const n = 11;
  const s = 18;
  const ox = 40;
  const oy = 20;
  const c = 5;
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-5, 0],
    [5, 0],
    [0, -5],
    [0, 5],
  ];
  const cells = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const black = (x + y) % 2 === 1;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={ox + x * s}
          y={oy + y * s}
          width={s}
          height={s}
          className={black ? "fill-neutral-300 dark:fill-neutral-700" : "fill-neutral-100 dark:fill-neutral-900"}
        />,
      );
    }
  const center = (v) => v * s + s / 2;
  return (
    <Frame viewBox="0 0 680 240" title="Red-black propagation: a pixel tries the planes of eight neighbours, one and five pixels away">
      {cells}
      <rect x={ox + c * s} y={oy + c * s} width={s} height={s} fill={accent} />
      {offsets.map(([dx, dy]) => (
        <g key={`${dx},${dy}`}>
          <rect
            x={ox + (c + dx) * s + 3}
            y={oy + (c + dy) * s + 3}
            width={s - 6}
            height={s - 6}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
          />
          <line
            x1={ox + center(c + dx)}
            y1={oy + center(c + dy)}
            x2={ox + center(c) - Math.sign(dx) * 8}
            y2={oy + center(c) - Math.sign(dy) * 8}
            stroke={accent}
            strokeOpacity="0.6"
          />
        </g>
      ))}
      <g transform="translate(270 40)">
        <text className="fill-current font-medium">Each round, twice:</text>
        <text y="24" className={label}>
          1. every light pixel updates, all at once, in parallel
        </text>
        <text y="44" className={label}>
          2. then every dark pixel
        </text>
        <text y="76" className="fill-current font-medium">
          A pixel tries:
        </text>
        <text y="100" className={label}>
          · the planes of 8 neighbours (always the other color),
        </text>
        <text y="118" className={label}>
          {"  "}1 and 5 pixels away, extended to its own position
        </text>
        <text y="140" className={label}>
          · one completely random plane
        </text>
        <text y="162" className={label}>
          · two small changes of its current one, smaller every round
        </text>
        <text y="190" className="fill-current">
          and keeps whichever matches best.
        </text>
      </g>
    </Frame>
  );
}

// Fusion: a pixel becomes a point only when other keyframes measured the same
// surface there.
export function FusionCheck() {
  return (
    <Frame viewBox="0 0 680 250" title="Fusion: a depth is kept when another keyframe measured the same surface there">
      {/* Surface */}
      <path d="M60 70 C 200 40, 470 40, 620 80" className={ink} fill="none" strokeWidth="2" />
      <text x="625" y="96" className={label}>
        surface
      </text>

      <Camera x={190} y={225} name="keyframe" />
      <Camera x={470} y={225} angle={-8} name="other keyframe" />

      {/* Rays to X and Y */}
      <line x1="190" y1="203" x2="330" y2="52" className={ink} />
      <line x1="468" y1="203" x2="330" y2="52" className={ink} strokeDasharray="4 3" />
      <circle cx="330" cy="52" r="5" fill={good} />
      <text x="342" y="38" className="fill-current">
        X = Y
      </text>

      {/* A wrong depth */}
      <line x1="190" y1="203" x2="268" y2="118" stroke={bad} strokeDasharray="3 3" />
      <circle cx="268" cy="118" r="4" fill={bad} />
      <text x="140" y="112" fill={bad} style={{ fontSize: 11 }}>
        wrong depth
      </text>
      <text x="140" y="126" fill={bad} style={{ fontSize: 11 }}>
        no view agrees
      </text>

      <g transform="translate(470 120)">
        <text className="fill-current font-medium">Same surface when:</text>
        <text y="22" className={label}>
          · depths agree within 1%
        </text>
        <text y="40" className={label}>
          · it maps back within 2 px
        </text>
        <text y="58" className={label}>
          · normals within 15°
        </text>
      </g>
      <g transform="translate(20 175)">
        <text className={label} style={{ fontSize: 11 }}>
          X: the keyframe&apos;s depth, in 3D
        </text>
        <text y="16" className={label} style={{ fontSize: 11 }}>
          Y: the other&apos;s depth at X&apos;s pixel
        </text>
      </g>
    </Frame>
  );
}
