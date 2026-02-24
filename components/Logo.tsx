'use client'

// ============================================================
// Logo Tokyo Motors — SVG inline
// "TOKYO" en serif italic, "MOTORS" en bold uppercase
// Fine ligne horizontale entre les deux
// Couleur or #c9a96e
// ============================================================

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Tailles selon la prop size
  const dimensions = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 52 },
    lg: { width: 220, height: 72 },
  }

  const { width, height } = dimensions[size]

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tokyo Motors"
    >
      {/* "TOKYO" en Playfair Display italic */}
      <text
        x="80"
        y="19"
        textAnchor="middle"
        fill="#c9a96e"
        fontFamily="'Playfair Display', serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="18"
        letterSpacing="6"
      >
        TOKYO
      </text>

      {/* Ligne horizontale séparatrice */}
      <line
        x1="10"
        y1="26"
        x2="150"
        y2="26"
        stroke="#c9a96e"
        strokeWidth="0.75"
        opacity="0.8"
      />

      {/* "MOTORS" en Inter uppercase bold */}
      <text
        x="80"
        y="43"
        textAnchor="middle"
        fill="#c9a96e"
        fontFamily="'Inter', sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="8"
      >
        MOTORS
      </text>
    </svg>
  )
}
