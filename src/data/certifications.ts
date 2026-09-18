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
    credentialUrl: "https://learn.microsoft.com/en-gb/users/sahilmodan-8698/credentials/af1a90324c78e6dd",
  },
  {
    title: "Azure Administrator Associate",
    code: "AZ-104",
    issuer: "Microsoft Certified",
    level: "Associate",
    description: "Validates skills implementing, managing, and monitoring an organization's Microsoft Azure environment, including major services related to compute, network, storage, and security.",
    color: "#0078d4",
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
  },
  {
    title: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft Certified",
    level: "Fundamentals",
    description: "Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    color: "#0078d4",
    // AZ-900 link was duplicated with AZ-104 in the brief — using same link as provided; please confirm distinct AZ-900 verify URL if available
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
  },
]
