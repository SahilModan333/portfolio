import { FC } from "react"

// 1. Chrome Asterisk (Representing Distributed Multi-Node Consensus)
export const ChromeAsterisk: FC<{ className?: string; size?: number }> = ({ className = "", size = 120 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={`select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="chromeRadial" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#e2e8f0" />
        <stop offset="45%" stopColor="#94a3b8" />
        <stop offset="70%" stopColor="#1e293b" />
        <stop offset="85%" stopColor="#475569" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
      <linearGradient id="chromeGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#94a3b8" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#0f172a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
      </linearGradient>
      <filter id="specularGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="20" result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>
    </defs>
    {/* Central 6-arm metallic asterisk */}
    <g filter="url(#specularGlow)">
      {/* 3 crossing pill capsules */}
      <rect x="42" y="5" width="16" height="90" rx="8" fill="url(#chromeRadial)" />
      <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(60 50 50)" fill="url(#chromeRadial)" />
      <rect x="42" y="5" width="16" height="90" rx="8" transform="rotate(120 50 50)" fill="url(#chromeRadial)" />
      
      {/* Center hub */}
      <circle cx="50" cy="50" r="14" fill="url(#chromeGloss)" />
      <circle cx="47" cy="46" r="4" fill="#ffffff" opacity="0.8" />
    </g>
  </svg>
)

// 2. Liquid Chrome Torus (Representing Continuous Automated CI/CD Loops)
export const LiquidChromeTorus: FC<{ className?: string; size?: number }> = ({ className = "", size = 120 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={`select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="torusGrad" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#cbd5e1" />
        <stop offset="45%" stopColor="#334155" />
        <stop offset="60%" stopColor="#f8fafc" />
        <stop offset="80%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10ZM50 28C37.8497 28 28 37.8497 28 50C28 62.1503 37.8497 72 50 72C62.1503 72 72 62.1503 72 50C72 37.8497 62.1503 28 50 28Z"
      fill="url(#torusGrad)"
    />
    {/* High-gloss highlights */}
    <ellipse cx="36" cy="24" rx="10" ry="4" transform="rotate(-30 36 24)" fill="#ffffff" opacity="0.75" />
    <ellipse cx="64" cy="76" rx="8" ry="3" transform="rotate(-30 64 76)" fill="#ffffff" opacity="0.6" />
  </svg>
)

// 3. Prismatic Hologram Cube (Representing Isolated Container Pods / Kubernetes)
export const PrismaticCube: FC<{ className?: string; size?: number }> = ({ className = "", size = 110 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={`select-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="70%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    {/* Isometric Cube Faces */}
    {/* Top Face */}
    <polygon points="50,15 85,32 50,50 15,32" fill="url(#cubeTop)" stroke="#ffffff" strokeWidth="0.8" />
    {/* Left Face */}
    <polygon points="15,32 50,50 50,85 15,67" fill="url(#cubeLeft)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.4" />
    {/* Right Face */}
    <polygon points="50,50 85,32 85,67 50,85" fill="url(#cubeRight)" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" />
    {/* Glowing edge accents */}
    <line x1="50" y1="15" x2="50" y2="85" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
  </svg>
)

// 4. Crinkled Metallic Foil Star (Representing Raw Telemetry & Observability Fabric)
export const MetallicFoilStar: FC<{ className?: string; size?: number }> = ({ className = "", size = 115 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={`select-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="15%" stopColor="#60a5fa" />
        <stop offset="30%" stopColor="#0284c7" />
        <stop offset="55%" stopColor="#ffffff" />
        <stop offset="75%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    {/* 8-point geometric star with faceted crumple planes */}
    <path
      d="M50 8 L58 35 L85 30 L66 50 L85 70 L58 65 L50 92 L42 65 L15 70 L34 50 L15 30 L42 35 Z"
      fill="url(#foilGrad)"
      stroke="#ffffff"
      strokeWidth="1"
      strokeLinejoin="bevel"
    />
    {/* Crinkle internal facet creases */}
    <line x1="50" y1="8" x2="50" y2="92" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
    <line x1="15" y1="50" x2="85" y2="50" stroke="#000000" strokeWidth="0.8" opacity="0.5" />
    <line x1="34" y1="50" x2="66" y2="50" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
    <line x1="42" y1="35" x2="58" y2="65" stroke="#ffffff" strokeWidth="0.6" opacity="0.6" />
    <line x1="58" y1="35" x2="42" y2="65" stroke="#000000" strokeWidth="0.6" opacity="0.4" />
  </svg>
)

// 5. Minimalist Directional Line Arrow (Signature noth.in mechanical arrow)
export const MechanicalArrow: FC<{ className?: string; size?: number; color?: string }> = ({
  className = "",
  size = 20,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 24 14"
    fill="none"
    className={`inline-block transition-transform duration-300 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="0.5,1 0.5,8.5 17.5,8.5" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <polyline points="13.5,4.5 17.5,8.5 13.5,12.5" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
