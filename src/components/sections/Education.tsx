import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { GraduationCap } from "lucide-react"

const education = [
  {
    degree: "M.Sc. IT (IMS & Cloud Technology)",
    institution: "Gujarat University",
    period: "2020 – 2022",
    coursework: ["Cloud Computing", "Networking", "Server Administration", "Private-Public Cloud Platform"],
  },
  {
    degree: "B.Sc.",
    institution: "Gujarat University",
    period: "2016 – 2019",
    coursework: [],
  },
]

export default function Education() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-slate-300" />
              <span
                className="text-xs font-medium text-slate-400 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Education
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex-1 flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={16} className="text-slate-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight">{edu.degree}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{edu.institution}</p>
                    <p
                      className="text-xs text-slate-400 mt-0.5"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {edu.period}
                    </p>
                    {edu.coursework.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {edu.coursework.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
