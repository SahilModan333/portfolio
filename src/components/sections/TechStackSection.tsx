import Section from "../ui/Section"
import DevOpsLifecycleConvergence from "../devops/DevOpsLifecycleConvergence"

export default function TechStackSection() {
  return (
    <Section
      id="skills"
      label="Production Engineering Stack"
      title="The Tools I Use &amp; How They Connect in Production"
      intro="A transparent view of my daily engineering toolkit across the delivery lifecycle: Source Control (Git &amp; Azure Repos) → CI/CD (Azure DevOps YAML) → Infrastructure as Code (Terraform) → Container Orchestration (Docker &amp; AKS) → Fleet Automation (Ansible) → Observability &amp; SRE (Prometheus &amp; Grafana)."
      sunk
    >
      <DevOpsLifecycleConvergence />
    </Section>
  )
}
