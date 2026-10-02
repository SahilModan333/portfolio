export interface Certification {
  code: string
  title: string
  level: "Expert" | "Associate" | "Fundamentals"
  issuer: string
  credentialUrl: string
  verifyLabel?: string
  description: string
  skillsCovered: string[]
}

export const certifications: Certification[] = [
  {
    code: "AZ-400",
    title: "DevOps Engineer Expert",
    level: "Expert",
    issuer: "Microsoft Certified",
    credentialUrl: "https://learn.microsoft.com/en-gb/users/sahilmodan-8698/credentials/af1a90324c78e6dd",
    description:
      "Validates expertise in combining people, processes, and technologies to continuously deliver valuable products and services that meet end user needs and business objectives.",
    skillsCovered: [
      "Azure DevOps YAML & Release Pipelines",
      "Git & Source Control Governance",
      "Continuous Integration & Continuous Delivery (CI/CD)",
      "Dependency Management & Artifact Security",
      "Infrastructure as Code & Compliance Policies",
      "Site Reliability Engineering (SRE) & Feedback Loops",
    ],
  },
  {
    code: "AZ-104",
    title: "Azure Administrator Associate",
    level: "Associate",
    issuer: "Microsoft Certified",
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    description:
      "Validates skills implementing, managing, and monitoring an organization's Microsoft Azure environment, including major services related to compute, network, storage, and security.",
    skillsCovered: [
      "Manage Azure Identities & Entra ID Governance",
      "Implement & Manage Azure Storage & Blob Encryption",
      "Deploy & Manage Azure Compute Resources (VMs, VMSS, Containers)",
      "Configure & Manage Virtual Networking & Load Balancers",
      "Monitor & Maintain Azure Resources & Alerting",
    ],
  },
  {
    code: "AZ-900",
    title: "Azure Fundamentals",
    level: "Fundamentals",
    issuer: "Microsoft Certified",
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SahilModan-8698/416198B7629A33D6",
    description:
      "Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    skillsCovered: [
      "Cloud Concepts, High Availability & Disaster Recovery",
      "Azure Architecture, Services & Core Regions",
      "Azure Management Tools & Security Governance",
      "Cost Management & SLA Best Practices",
    ],
  },
]

export interface Study {
  qualification: string
  specialization?: string
  institution: string
  location: string
  from: string
  to: string
  details?: string[]
}

export const education: Study[] = [
  {
    qualification: "M.Sc. IT (IMS & Cloud Technology)",
    specialization: "Infrastructure Management Services & Cloud Technology",
    institution: "Gujarat University",
    location: "Ahmedabad, India",
    from: "2020",
    to: "2022",
    details: [
      "Cloud Computing",
      "Enterprise Networking",
      "Server Administration",
      "Private-Public Cloud Platforms",
    ],
  },
  {
    qualification: "B.Sc.",
    institution: "Gujarat University",
    location: "Ahmedabad, India",
    from: "2016",
    to: "2019",
    details: ["Computer Science, Operating Systems, Linux & Algorithms"],
  },
]
