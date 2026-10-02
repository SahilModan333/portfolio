import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface SectionProps {
  id?: string
  label: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
  sunk?: boolean
}

export default function Section({
  id,
  label,
  title,
  intro,
  children,
  className,
  sunk,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative border-t border-white/[0.06] py-20 sm:py-28",
        sunk ? "bg-[#090d16]/70" : "bg-transparent",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="section-badge mb-4">{label}</div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
