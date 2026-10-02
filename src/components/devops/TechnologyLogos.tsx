interface LogoProps {
  size?: number
  className?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  focusable: "false" as const,
})

// 1. Microsoft Azure Official Logo
export function AzureLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M13.2 2.5 4.8 17.2h6.5L16.8 5.7l-3.6-3.2Z"
        fill="#0078D4"
      />
      <path
        d="m16.8 5.7-5.5 11.5H20l1.8-3.4L16.8 5.7Z"
        fill="#5EA0EF"
      />
      <path
        d="m4.8 17.2 2.7 4.3h11.2l-2.4-4.3H4.8Z"
        fill="#005BA1"
      />
    </svg>
  )
}

// 2. Azure DevOps Official Logo
export function AzureDevOpsLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 6.5 14.8 2 5.5 6.2 2 11.8l3.2 4.4L15 22l7-4.5V6.5Z"
        fill="#0078D4"
      />
      <path
        d="M5.5 6.2 14.8 2v9.3L5.5 15.6V6.2Z"
        fill="#50E6FF"
      />
      <path
        d="m14.8 11.3 7.2-4.8v11L15 22l-.2-10.7Z"
        fill="#005BA1"
      />
      <path
        d="M5.5 15.6 15 22l-9.8-5.8v-.6Z"
        fill="#00245B"
      />
    </svg>
  )
}

// 3. Git Official Logo
export function GitLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="m21.9 10.9-8.8-8.8a1.5 1.5 0 0 0-2.1 0l-1.8 1.8 2.7 2.7c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.6 2.6c.6-.2 1.3 0 1.8.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0a1.9 1.9 0 0 1-.4-2l-2.4-2.4v5.3c.3.2.5.5.6.8.6.6.6 1.7 0 2.3-.6.6-1.7.6-2.3 0-.6-.6-.6-1.7 0-2.3.2-.2.4-.4.7-.5v-5.4a1.9 1.9 0 0 1-1-.8l-2.7 2.7 8.8 8.8c.6.6 1.5.6 2.1 0l7.2-7.2c.6-.6.6-1.5 0-2.1Z"
        fill="#F05032"
      />
    </svg>
  )
}

// 4. Terraform Official Logo
export function TerraformLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14.6 8.3v7.4l-6.4 3.7V12l6.4-3.7Z" fill="#844FBA" />
      <path d="m7.8 4.4 6.4-3.7v7.4L7.8 12V4.4Z" fill="#5C4EE5" />
      <path d="m1.4 8.1 6.4-3.7v7.4L1.4 15.5V8.1Z" fill="#4040B2" />
      <path d="m15 15.9 6.4-3.7v7.4L15 23.3v-7.4Z" fill="#844FBA" />
    </svg>
  )
}

// 5. Docker Official Logo
export function DockerLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.8 11.2c-.3-.2-1.7-.5-3.5.5-.3-1.6-1.4-2.7-1.5-2.8l-.4-.4-.3.4c-.6.9-.9 2.2-.4 3.4-.6.3-1.6.3-2.1.2H1.6c-.7 1.5-.7 4.2.4 6.6 1.4 3.1 4.5 4.9 9.3 4.9 7.4 0 11.7-4.1 12.5-10.7.6-.2 1.3-.8 1.5-1.1l.2-.3-.3-.2v-.1ZM9.1 8.8H6.8V6.5h2.3v2.3Zm3.1 0H9.9V6.5h2.3v2.3Zm3.1 0h-2.3V6.5h2.3v2.3Zm-6.2 3.1H6.8V9.6h2.3v2.3Zm3.1 0H9.9V9.6h2.3v2.3Zm3.1 0h-2.3V9.6h2.3v2.3Zm3.1 0h-2.3V9.6h2.3v2.3ZM9.1 5.7H6.8V3.4h2.3v2.3Zm3.1 0H9.9V3.4h2.3v2.3Z"
        fill="#2496ED"
      />
    </svg>
  )
}

// 6. Kubernetes Official Logo
export function KubernetesLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 3.3 7v10L12 22l8.7-5V7L12 2Z"
        stroke="#326CE5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="#326CE5" strokeWidth="1.5" />
      <path
        d="M12 8.8V4.5M14.8 13.6l3.7 2.2M9.2 13.6l-3.7 2.2M14.8 10.4l3.7-2.2M9.2 10.4 5.5 8.2M12 15.2v4.3"
        stroke="#326CE5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 7. Azure Kubernetes Service (AKS) Logo
export function AksLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5 3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5Z"
        fill="#0078D4"
        fillOpacity="0.15"
        stroke="#0078D4"
        strokeWidth="1.4"
      />
      <path
        d="M12 5.5v3.2M17.2 9l-2.8 1.6M17.2 15l-2.8-1.6M12 18.5v-3.2M6.8 15l2.8-1.6M6.8 9l2.8 1.6"
        stroke="#5EA0EF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.8" fill="#005BA1" stroke="#50E6FF" strokeWidth="1.2" />
    </svg>
  )
}

// 8. Prometheus Official Logo
export function PrometheusLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#E6522C" strokeWidth="1.6" />
      <path
        d="M12 6.5c1.4 1.8 1.8 3.5 1.2 5.2-.4 1.1-1.3 1.9-1.2 3.1.1 1.2.9 2 2 2.2 1.6.3 3.1-1 3.1-2.6 0-.8-.3-1.6-.9-2.1 1.2.6 1.9 1.8 1.9 3.2 0 2.2-1.8 4-4 4-2.5 0-4.3-1.8-4.5-4-.2-2 .8-3.7 2.4-5V6.5Z"
        fill="#E6522C"
      />
      <circle cx="12" cy="15.5" r="1.2" fill="#FFA380" />
    </svg>
  )
}

// 9. Grafana Official Logo
export function GrafanaLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5c0-.8-.1-1.5-.3-2.2-.6 1.7-2 3-3.8 3.4-2.4.5-4.7-.9-5.4-3.1-.7-2.2.3-4.6 2.3-5.6 1-.5 2.1-.6 3.1-.3A9.5 9.5 0 0 0 12 2.5Z"
        fill="#F46800"
      />
      <circle cx="12" cy="12" r="3.2" fill="#FFA143" />
      <circle cx="12" cy="12" r="1.4" fill="#FFFFFF" />
    </svg>
  )
}

// 10. Azure Repos Logo
export function AzureReposLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
        stroke="#0078D4"
        strokeWidth="1.6"
        fill="#0078D4"
        fillOpacity="0.1"
      />
      <circle cx="8" cy="9" r="1.8" fill="#50E6FF" />
      <circle cx="16" cy="9" r="1.8" fill="#50E6FF" />
      <circle cx="12" cy="15" r="1.8" fill="#0078D4" />
      <path
        d="M8 10.8v1.4a2 2 0 0 0 2 2h2m4-3.4v1.4a2 2 0 0 1-2 2h-2"
        stroke="#5EA0EF"
        strokeWidth="1.4"
      />
    </svg>
  )
}

// 11. Azure Container Registry (ACR) Logo
export function AcrLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="m12 2.5 7.5 4.3v8.6L12 19.7l-7.5-4.3V6.8L12 2.5Z"
        stroke="#0078D4"
        strokeWidth="1.4"
        fill="#0078D4"
        fillOpacity="0.12"
      />
      <path d="M12 2.5v17.2M4.5 6.8l15 8.6M19.5 6.8l-15 8.6" stroke="#5EA0EF" strokeWidth="1.2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#005BA1" stroke="#50E6FF" strokeWidth="1" />
    </svg>
  )
}

// 12. Helm Official Logo
export function HelmLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7.5" stroke="#0F1689" strokeWidth="1.6" fill="#0F1689" fillOpacity="0.15" />
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"
        stroke="#2496ED"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="#FFFFFF" stroke="#0F1689" strokeWidth="1.2" />
    </svg>
  )
}

// 13. Linux (Tux) Logo
export function LinuxLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a4 4 0 0 0-4 4c0 1.2.4 2.2 1 3-.8 1-2 2.8-2 5 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.2-1.2-4-2-5 .6-.8 1-1.8 1-3a4 4 0 0 0-4-4Z"
        fill="#FCC624"
        fillOpacity="0.3"
        stroke="#FCC624"
        strokeWidth="1.4"
      />
      <circle cx="10.5" cy="6.5" r="0.8" fill="#1e293b" />
      <circle cx="13.5" cy="6.5" r="0.8" fill="#1e293b" />
      <path d="M11 8.5c.6.4 1.4.4 2 0" stroke="#FF7A00" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="12" cy="15" rx="2.5" ry="3.5" fill="#FFFFFF" fillOpacity="0.8" />
    </svg>
  )
}

// 14. Bash Terminal Logo
export function BashLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        fill="#1E293B"
        stroke="#4EAA25"
        strokeWidth="1.4"
      />
      <path
        d="m7 9 3.5 3L7 15M12.5 15h4"
        stroke="#4EAA25"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 15. Azure Monitor Logo
export function AzureMonitorLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4a8 8 0 0 0-8 8c0 3.3 2 6.1 4.9 7.3M20 12a8 8 0 0 0-4.9-7.3"
        stroke="#0078D4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 12 16.5 7.5"
        stroke="#50E6FF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#0078D4" />
      <path d="M7 16h10" stroke="#5EA0EF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// 16. Azure Key Vault Logo
export function AzureKeyVaultLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 4a4.5 4.5 0 1 0-3.2 7.7L7 16.5V19h2.5v-1.5H11V16l1.2-1.2A4.5 4.5 0 0 0 15 4Z"
        fill="#0078D4"
        fillOpacity="0.2"
        stroke="#0078D4"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="8.5" r="1.5" fill="#50E6FF" />
    </svg>
  )
}

// 17. Microsoft Entra ID Logo
export function EntraIdLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3"
        fill="#0078D4"
        fillOpacity="0.15"
        stroke="#0078D4"
        strokeWidth="1.4"
      />
      <path
        d="M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 18a5 5 0 0 1 10 0"
        stroke="#5EA0EF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 18. Alertmanager Logo
export function AlertmanagerLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a6 6 0 0 0-6 6v4l-1.5 2.5h15L18 13V9a6 6 0 0 0-6-6Z"
        fill="#E6522C"
        fillOpacity="0.2"
        stroke="#E6522C"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="#FFA380" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="10" r="1" fill="#FFA380" />
    </svg>
  )
}

// 19. GitHub Actions Logo
export function GitHubActionsLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#2088FF" strokeWidth="1.5" fill="#2088FF" fillOpacity="0.15" />
      <path
        d="M12 6v6l4 2.5"
        stroke="#54AEFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#54AEFF" />
    </svg>
  )
}

// 20. Ansible Official Logo
export function AnsibleLogo({ size = 24, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" fill="#000000" stroke="#EE0000" strokeWidth="1.4" />
      <path
        d="m14.2 16.2-2.8-7.3-3 7.3h1.4l.6-1.6h2.2l.5 1.6h1.1Zm-3.4-2.8 1.1-2.9 1.1 2.9h-2.2Z"
        fill="#FFFFFF"
      />
      <circle cx="15.5" cy="16.2" r="1" fill="#EE0000" />
    </svg>
  )
}

// Central Hub / DevOps Engineering Control Plane Emblem
export function DevOpsControlPlaneEmblem({ size = 32, className }: LogoProps) {
  return (
    <svg {...base(size)} className={className} viewBox="0 0 32 32" fill="none">
      {/* Outer Hexagon / Shield */}
      <polygon
        points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5"
        stroke="url(#coreGradient)"
        strokeWidth="1.8"
        fill="rgba(56, 189, 248, 0.08)"
      />
      {/* Dynamic Orbits */}
      <circle cx="16" cy="16" r="6.5" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="16" cy="16" r="2.5" fill="#38bdf8" />
      <defs>
        <linearGradient id="coreGradient" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Master Icon Lookup Map
export const technologyLogosMap: Record<string, (props: LogoProps) => React.JSX.Element> = {
  azure: AzureLogo,
  "azure-devops": AzureDevOpsLogo,
  git: GitLogo,
  terraform: TerraformLogo,
  docker: DockerLogo,
  kubernetes: KubernetesLogo,
  aks: AksLogo,
  prometheus: PrometheusLogo,
  grafana: GrafanaLogo,
  "azure-repos": AzureReposLogo,
  acr: AcrLogo,
  helm: HelmLogo,
  linux: LinuxLogo,
  bash: BashLogo,
  "azure-monitor": AzureMonitorLogo,
  "key-vault": AzureKeyVaultLogo,
  "entra-id": EntraIdLogo,
  alertmanager: AlertmanagerLogo,
  "github-actions": GitHubActionsLogo,
  ansible: AnsibleLogo,
  "devops-core": DevOpsControlPlaneEmblem,
}
