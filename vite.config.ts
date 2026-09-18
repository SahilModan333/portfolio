import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Minimal prerender: inject crawlable content into empty #root so view-source is not empty.
// Full SSR migration (vite-ssg / Next) is the long-term fix — this gives immediate SEO value with zero runtime cost.
function crawlableContentPlugin() {
  return {
    name: "crawlable-content",
    transformIndexHtml(html: string) {
      const crawlable = `
    <!-- SSR: crawlable static shell — replaced at hydration, visible in view-source -->
    <div id="root" data-prerendered>
      <section aria-label="Hero">
        <h1>Sahil Modan — DevOps &amp; Cloud Engineer</h1>
        <p>Azure Cloud Operations Engineer with 4+ years — CI/CD, Terraform, Kubernetes, Ansible, Prometheus at Stibo Systems, Bengaluru.</p>
        <p><a href="https://github.com/SahilModan333">GitHub</a> • <a href="https://www.linkedin.com/in/sahil-modan-b5a73b184/">LinkedIn</a> • <a href="/Sahil_Modan_DevOps_Engineer_Resume.pdf">Resume</a></p>
      </section>
      <section>
        <h2>Professional Experience — Stibo Systems (May 2022 — Present)</h2>
        <p>20+ Azure DevOps pipelines across 4 environments • 50+ servers automated • 99.9% platform uptime</p>
      </section>
      <section>
        <h2>Engineering Work</h2>
        <p>Azure DevOps Infrastructure Pipeline • Containerized Deployment • Monitoring &amp; Observability • Ansible Automation</p>
      </section>
      <noscript>This site requires JavaScript for full interactivity; core content is rendered above for crawlers.</noscript>
    </div>`;
      return html.replace('<div id="root"></div>', crawlable);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), crawlableContentPlugin()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    // manualChunks via function for Rolldown compatibility
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "vendor"
          if (id.includes("framer-motion")) return "motion"
          if (id.includes("node_modules")) return "deps"
        },
      },
    },
  },
});
