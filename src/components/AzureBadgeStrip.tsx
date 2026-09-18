import { Award, ExternalLink, ShieldCheck } from "lucide-react"

// Official Microsoft Azure mark — inline SVG (approximated, brand color #0078D4)
function AzureMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden role="img">
      <title>Microsoft Azure</title>
      <path
        fill="#0078D4"
        d="M12.3 2.2L3.7 7.1l1.6 9.4L12 21l6.7-4.5 1.6-9.4-8-4.9zm-1.2 2.6l5.2 3-1 6-4.2 2.8-4.2-2.8-1-6 5.2-3z"
      />
      <path fill="#5EA0EF" d="M12 7.5l-3.8 2.2v3L12 15l3.8-2.3v-3L12 7.5z" />
    </svg>
  )
}

const certs = [
  {
    code: "AZ-400",
    title: "DevOps Engineer Expert",
    url: "https://learn.microsoft.com/en-gb/users/sahilmodan-8698/credentials/af1a90324c78e6dd",
    tier: "Expert",
  },
  {
    code: "AZ-104",
    title: "Azure Administrator Associate",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    tier: "Associate",
  },
  {
    code: "AZ-900",
    title: "Azure Fundamentals",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    tier: "Fundamentals",
  },
]

export default function AzureBadgeStrip() {
  return (
    <div
      className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3"
      aria-label="Microsoft Azure certifications"
    >
      {/* Azure brand */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-300"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        <AzureMark size={16} />
        <span className="text-xs font-semibold tracking-wide">Microsoft Azure</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-sky-400/80">
          <ShieldCheck size={12} /> Certified
        </span>
      </div>

      {/* Cert badges — hover shows verification */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {certs.map((c) => (
          <a
            key={c.code}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border bg-white border-slate-200 hover:border-sky-200 hover:bg-sky-50/60 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            aria-label={`${c.code} ${c.title} — verify credential`}
          >
            <span className="w-7 h-7 rounded-full bg-[#0078D4] grid place-items-center text-white">
              <Award size={12} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xs font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {c.code}
              </span>
              <span className="text-xs text-slate-500 hidden sm:block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                {c.tier}
              </span>
            </span>
            <ExternalLink size={10} className="text-slate-400 group-hover:text-sky-600 ml-1" />
          </a>
        ))}
      </div>

      <span className="w-full sm:w-auto text-xs text-slate-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        // official badges • click to verify on Microsoft Learn
      </span>
    </div>
  )
}
