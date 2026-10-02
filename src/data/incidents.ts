export interface IncidentStep {
  step: number
  name: string
  action: string
  cliCommand?: string
  outputPreview?: string
}

export interface IncidentClass {
  id: string
  page: string
  severity: "crit" | "warn"
  surface: string
  mttd: string
  mttr: string
  triggerAlert: string
  blastRadius: string
  triage: string[]
  diagnosticSteps: IncidentStep[]
  resolution: string
  prevention: string
  outcome: string
  rootCause: string
}

export const incidents: IncidentClass[] = [
  {
    id: "cassandra-node-down",
    page: "Cassandra Node Down & Disk Saturation",
    severity: "crit",
    surface: "Data Tier / Distributed Storage",
    mttd: "1m 40s",
    mttr: "12m 10s",
    triggerAlert: "ALERT: CassandraNodeDown (instance: cas-prod-db-03) - gossip status UNREACHABLE",
    blastRadius: "Single ring node unreachable; read quorum preserved via RF=3 / LOCAL_QUORUM consistency.",
    triage: [
      "Confirm the alert against live cluster status to rule out monitoring false positive",
      "Inspect token ring topology and gossip heartbeat across peer nodes",
      "Check OS storage mount, commitlog disk fullness, and JVM heap garbage collection pause",
      "Execute safe commitlog and tombstones purge routine without data corruption",
      "Restore daemon and hand off pre-triaged diagnostic logs to database engineering team",
    ],
    diagnosticSteps: [
      {
        step: 1,
        name: "Cluster Ring Verification",
        action: "Query the cluster gossip table to identify unreachable nodes across datacenters.",
        cliCommand: "nodetool status keyspace_production",
        outputPreview: `Datacenter: dc-azure-westeurope
==============================
Status=Up/Down | State=Normal/Leaving/Joining/Moving
--  Address       Load       Tokens  Owns (effective)  Host ID                               Rack
UN  10.240.12.10  421.4 GiB  256     33.2%             9b8c2e11-8a4b-4c22-b911-38fe84aa1101  rack1
UN  10.240.12.11  398.1 GiB  256     33.4%             7a1e4d22-1b2c-4e33-a122-49cf95bb2202  rack2
DN  10.240.12.12  892.8 GiB  256     33.4%             3f4b5a33-2c3d-4f44-b233-50da06cc3303  rack3 [OFFLINE]`,
      },
      {
        step: 2,
        name: "Host Resource & Disk Inspection",
        action: "SSH into failing node via bastion; verify disk mounts and filesystem capacity.",
        cliCommand: "df -h /var/lib/cassandra/data /var/lib/cassandra/commitlog",
        outputPreview: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sdc1       1.0T  992G  4.2G 100% /var/lib/cassandra/data
/dev/sdd1       100G   24G   76G  24% /var/lib/cassandra/commitlog
[WARN]: Disk /var/lib/cassandra/data reached emergency threshold (>99%). SSTable compaction locked.`,
      },
      {
        step: 3,
        name: "Controlled Storage Purge & Recovery",
        action: "Clear stale temporary compactions and obsolete snapshots safely, then restart service.",
        cliCommand: "nodetool clearsnapshot --all && systemctl restart cassandra",
        outputPreview: `Purging snapshots across all keyspaces... Done (reclaimed 98.4 GB).
Restarting Cassandra daemon...
Checking service status: Active: active (running) since Fri 05:14:22 UTC.
Gossip ring synched: cas-prod-db-03 marked UN (Up/Normal).`,
      },
    ],
    resolution:
      "Performed initial diagnosis and emergency safe snapshot purge to unblock compaction, restarted the daemon, verified ring re-synchronization, and transferred pre-triaged post-mortem data to the specialist database team.",
    prevention:
      "Provisioned automated Prometheus disk trajectory alerts at 75% and 85% capacity with automated snapshot lifecycle cleanup cron jobs.",
    outcome:
      "Escalation arrived pre-triaged with zero data loss and read availability preserved under SLA.",
    rootCause:
      "Concurrent heavy analytical batch queries triggered massive compaction tasks, causing disk starvation on a single rack before the scheduled weekend cleanup.",
  },
  {
    id: "worker-node-failure",
    page: "AKS Kubernetes Worker Node NotReady",
    severity: "crit",
    surface: "Compute / Azure Kubernetes Service",
    mttd: "45s",
    mttr: "8m 30s",
    triggerAlert: "ALERT: KubeNodeNotReady (node: aks-nodepool1-38291024-vmss000004) - heartbeat timeout > 40s",
    blastRadius: "12 microservice pods evicted; Horizontal Pod Autoscaling (HPA) redistributed workloads to healthy pool instances.",
    triage: [
      "Verify node status via kubectl and Azure VMSS control plane metrics",
      "Inspect kubelet daemon and container runtime (containerd) logs on the VMSS host",
      "Separate node-level kernel lockup from workload resource exhaustion",
      "Gracefully cordon and drain node to prevent scheduling loops",
      "Trigger Azure VMSS instance re-image and verify cluster pod rebalancing",
    ],
    diagnosticSteps: [
      {
        step: 1,
        name: "Kubernetes Cluster Node State",
        action: "Query the Kubernetes API server for node conditions and pod scheduling states.",
        cliCommand: "kubectl get nodes -o wide",
        outputPreview: `NAME                                STATUS     ROLES   AGE   VERSION   INTERNAL-IP
aks-nodepool1-38291024-vmss000002   Ready      agent   42d   v1.29.4   10.240.0.4
aks-nodepool1-38291024-vmss000003   Ready      agent   42d   v1.29.4   10.240.0.5
aks-nodepool1-38291024-vmss000004   NotReady   agent   42d   v1.29.4   10.240.0.6 [KubeletNotReady]`,
      },
      {
        step: 2,
        name: "Cordon & Safe Drain",
        action: "Mark node unschedulable and evict remaining pods gracefully using PodDisruptionBudgets.",
        cliCommand: "kubectl cordon aks-nodepool1-38291024-vmss000004 && kubectl drain aks-nodepool1-38291024-vmss000004 --ignore-daemonsets --delete-emptydir-data --force",
        outputPreview: `node/aks-nodepool1-38291024-vmss000004 cordoned
evicting pod default/core-api-68b497b77d-x9q8w
evicting pod default/auth-service-75cfdb876-2k4np
pod default/core-api-68b497b77d-x9q8w evicted (rescheduled on vmss000002)
pod default/auth-service-75cfdb876-2k4np evicted (rescheduled on vmss000003)
drain complete.`,
      },
      {
        step: 3,
        name: "Azure VMSS Instance Re-image",
        action: "Re-image the unhealthy Virtual Machine Scale Set instance using Azure CLI.",
        cliCommand: "az vmss reimage --resource-group rg-prod-aks --name aks-nodepool1-38291024-vmss --instance-id 4",
        outputPreview: `{
  "status": "Succeeded",
  "instanceId": "4",
  "provisioningState": "Updating -> Succeeded"
}
Node aks-nodepool1-38291024-vmss000004 rejoined cluster in Ready state.`,
      },
    ],
    resolution:
      "Safely cordoned and drained the node, confirmed zero dropped requests due to Pod Disruption Budgets, re-imaged the faulty Azure VMSS instance, and validated automatic node re-admission into the cluster.",
    prevention:
      "Tuned kubelet node-problem-detector rules, increased Azure VMSS instance ephemeral disk IOPS tier, and configured auto-repair node pool policies.",
    outcome:
      "Zero customer downtime; workloads relocated transparently in under 60 seconds.",
    rootCause:
      "Azure underlying host hardware NIC driver fault triggered an irrecoverable kernel deadlock in the guest containerd socket.",
  },
  {
    id: "java-application-failure",
    page: "Java SaaS Microservice Out-of-Memory & OOM Killer",
    severity: "warn",
    surface: "Application / JVM Runtime",
    mttd: "2m 10s",
    mttr: "9m 45s",
    triggerAlert: "ALERT: ContainerMemoryUsageHigh (>95%) & ExitCode 137 (OOMKilled) on pod core-api-7b8f99",
    blastRadius: "Intermittent HTTP 504 errors on catalog search endpoints; affected 2 out of 8 replicas.",
    triage: [
      "Correlate the failure spike with recent Azure DevOps YAML pipeline releases",
      "Inspect Kubernetes pod termination status and lastState.terminated.reason",
      "Analyze Prometheus Grafana JVM memory heap charts and GC pause time trends",
      "Extract heap dump diagnostics and correlate with runaway database connection pool",
      "Execute automated rollback to previous stable image tag via Helm",
    ],
    diagnosticSteps: [
      {
        step: 1,
        name: "Kubernetes Pod Diagnostic",
        action: "Check pod events and exit codes to confirm kernel OOM killer termination.",
        cliCommand: "kubectl describe pod core-api-7b8f99-x7lw2 -n production",
        outputPreview: `State:          Waiting
  Reason:       CrashLoopBackOff
Last State:     Terminated
  Reason:       OOMKilled
  Exit Code:    137
  Started:      Fri, 02 Oct 05:02:10 UTC
  Finished:     Fri, 02 Oct 05:08:44 UTC`,
      },
      {
        step: 2,
        name: "JVM Heap Telemetry Correlation",
        action: "Query Prometheus for JVM Old Generation heap growth and Garbage Collection latency.",
        cliCommand: "promql 'jvm_memory_used_bytes{area=\"heap\",id=\"G1 Old Gen\"} / jvm_memory_max_bytes * 100'",
        outputPreview: `core-api-7b8f99-x7lw2: 98.7% (Unrelieved memory pressure despite back-to-back Full GC pauses)
Avg GC Pause Duration: 4,820ms (Spike from baseline 85ms)
Correlated Deployment: Commit #8f219a "feature: bulk catalog exporter" deployed 35m prior.`,
      },
      {
        step: 3,
        name: "Automated Helm Rollback",
        action: "Roll back release to the preceding validated container build in production.",
        cliCommand: "helm rollback core-api-release 42 -n production",
        outputPreview: `Rollback to release revision 42 initiated...
Pods terminating: core-api-7b8f99 (v2.6.2-unstable)
Pods deploying:   core-api-6cb411 (v2.6.1-stable)
All 8 replicas reporting Healthy HTTP 200 on /healthz.
Latency normalized to p95 = 48ms.`,
      },
    ],
    resolution:
      "Identified memory leak from unclosed streaming ResultSet in the new release, initiated an immediate zero-downtime Helm rollback to revision 42, restored p95 latency to 48ms, and opened a critical remediation defect in Jira with full heap dump analysis.",
    prevention:
      "Configured mandatory JVM container limits (-XX:MaxRAMPercentage=75.0), integrated leak canary stages into the QA Azure DevOps pipeline, and enforced connection pool checkout timeouts.",
    outcome:
      "Service latency recovered within 10 minutes; root cause resolved permanently in next sprint cycle.",
    rootCause:
      "A newly introduced batch export routine bypassed the pooled connection manager, accumulating uncollected byte buffers until kernel cgroup memory limits were breached.",
  },
]
