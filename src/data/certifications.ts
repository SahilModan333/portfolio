export interface Certification {
  title: string
  code: string
  issuer: string
  level: string
  description: string
  credentialUrl?: string
  color: string
}

export const certifications: Certification[] = [
  {
    title: "DevOps Engineer Expert",
    code: "AZ-400",
    issuer: "Microsoft Certified",
    level: "Expert",
    description: "Validates expertise in combining people, processes, and technologies to continuously deliver valuable products and services that meet end user needs and business objectives.",
    color: "#0078d4",
  },
  {
    title: "Azure Administrator Associate",
    code: "AZ-104",
    issuer: "Microsoft Certified",
    level: "Associate",
    description: "Validates skills implementing, managing, and monitoring an organization's Microsoft Azure environment, including major services related to compute, network, storage, and security.",
    color: "#0078d4",
  },
  {
    title: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft Certified",
    level: "Fundamentals",
    description: "Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    color: "#0078d4",
  },
]
