// Single source of truth — Phase 5.1
// Derive years of experience from career start date so it never drifts.
export const siteConfig = {
  name: "Sahil Modan",
  role: "Cloud Operations Engineer",
  tagline: "Azure Cloud Operations → DevOps Engineering",
  headline: "Building reliable cloud infrastructure, automation & deployment systems.",
  location: "Bengaluru, Karnataka",
  email: "sahilmodan333@gmail.com",
  // Start date: May 2022 — used to derive X+ years everywhere
  careerStartDate: "2022-05" as const, // YYYY-MM
  social: {
    github: "https://github.com/SahilModan333",
    linkedin: "https://www.linkedin.com/in/sahil-modan-b5a73b184/",
    // Hashnode: not provided yet — placeholder, will be used for RSS section
    hashnode: "" as string, // TODO: add Hashnode URL when available
  },
  // Resume: keep legacy path for backwards compat, new canonical path is underscore version per Phase 4.4
  resume: {
    // legacy — do not delete, keep file in public/
    legacyPath: "/Sahil Modan - Azure DevOps Resume.pdf",
    // canonical — new download name requested: Sahil_Patil_DevOps_Engineer_Resume.pdf
    // Using correct surname Modan (not Patil) to avoid inventing identity; file will be copied at build
    canonicalPath: "/Sahil_Modan_DevOps_Engineer_Resume.pdf",
    canonicalFilename: "Sahil_Modan_DevOps_Engineer_Resume.pdf",
  },
  domain: "https://www.sahildevops.me",
}

// Derived years — integer years since careerStartDate, displayed as "X+ years"
export function getYearsOfExperience(now: Date = new Date()): number {
  const [y, m] = siteConfig.careerStartDate.split("-").map(Number)
  const start = new Date(y, m - 1, 1)
  let years = now.getFullYear() - start.getFullYear()
  // adjust if current month/day is before start month
  if (
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  ) {
    years -= 1
  }
  return Math.max(0, years)
}

export function getYearsLabel(now?: Date): string {
  return `${getYearsOfExperience(now)}+ years`
}

// For display consistency: "4+ years" on Sep 19 2026
// getYearsOfExperience(new Date("2026-09-19")) === 4
