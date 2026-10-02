# 🛠️ DevOps Portfolio Customization Guide for Sahil Modan

Welcome! Your portfolio website has been engineered to be **100% customizable**, whether you prefer tweaking values interactively directly in your web browser or editing code files in VS Code / Antigravity.

---

## ⚡ Method 1: The Live In-Browser Customizer (Fastest & Easiest)

You can customize your portfolio in real time without touching a single line of code!

1. Open your live website (or `http://localhost:5173/`).
2. Click the floating **`[ ⚙ Customize ]`** button in the bottom-left corner of the screen, or press **`⌘K` / `Ctrl+K`** and select **`Customize Portfolio & Theme`**.
3. Inside the Customizer modal:
   - **👤 Identity & Profile Tab**:
     - Edit your **Full Name**, **Role / Title**, **Headline**, **Location**, **Availability Status Beacon**, **Email**, **Phone**, **GitHub**, and **LinkedIn**.
     - As you type, the website updates **immediately live on your screen**.
     - All changes are automatically preserved in your browser's local storage.
     - Click **`Copy Full Config to Clipboard`** to export your updated TypeScript configuration anytime!
   - **🎨 Theme & Colors Tab**:
     - Pick from 5 custom-engineered accent palettes:
       - 🌌 **Azure Cyan** (`#38bdf8`) — Cloud Platform & Microsoft Azure
       - 🟢 **SRE Emerald** (`#10b981`) — 99.9% Production SLA & Prometheus
       - 🟣 **Cyber Violet** (`#a855f7`) — Modern Futuristic Tech
       - 🟠 **Amber Rust** (`#f59e0b`) — Industrial High-Contrast
       - ⚪ **Bryan Monochrome** (`#e2e8f0`) — Pure Bryan Garage Minimalist
   - **⚡ Features & FX Tab**:
     - **3D Cloud Topology Canvas**: Toggle the Three.js interactive particle sphere in the hero.
     - **Interactive Glow Cursor**: Toggle the GSAP ambient cursor spotlight.
     - **Tactile Synthesizer Audio**: Toggle mechanical keyboard clicks, switch ticks, and success chimes (powered by Web Audio API).
     - **CRT Scanlines Overlay**: Toggle subtle retro terminal scanlines.
   - Click **`Reset to Defaults`** at any time to return to factory settings.

---

## 💻 Method 2: The Master Config File (`src/data/portfolio.config.ts`)

All content on the entire website is centralized in one master file:
👉 **[`src/data/portfolio.config.ts`](file:///c:/Users/sahi/Downloads/DevOps-Portfolio-ready/DevOps-Portfolio/src/data/portfolio.config.ts)**

### 1. Update Personal & Contact Info
In `portfolio.config.ts`, find the `personal` object:
```ts
personal: {
  name: "Sahil Modan",
  role: "Azure DevOps / Cloud Operations Engineer",
  headline: "Building reliable cloud infrastructure, automation & deployment systems.",
  statusBeacon: "Available for DevOps & Cloud Operations roles",
  location: "Bengaluru, Karnataka, India",
  timezone: "Asia/Kolkata",
  email: "sahilmodan333@gmail.com",
  phone: "+91 83201 22323",
  github: "https://github.com/SahilModan333",
  linkedin: "https://www.linkedin.com/in/sahil-modan-b5a73b184/",
  resumePath: "/resume.pdf",
  company: "Stibo Systems",
  startedAt: "2022-05",
}
```

### 2. Customize the Bryan Garage Narrative Hero
In `portfolio.config.ts`, find the `hero` section:
- **`sentenceWords`**: An array of word tokens that fade from blur to sharp one by one. You can add, remove, or modify any word, set `bold: true`, or link it to an interactive hover peek card using `peek: "azure"` or `peek: "stibo"`.
- **`philosophyQuote`**: The secondary paragraph explaining your engineering philosophy.
- **`peekCards`**: The rich preview popups that appear when a visitor hovers over terms like `Stibo Systems`, `Azure`, `Kubernetes`, or `Terraform`.

### 3. Customize Projects (The Garage Grid)
Featured builds are defined in:
👉 **[`src/data/projects.ts`](file:///c:/Users/sahi/Downloads/DevOps-Portfolio-ready/DevOps-Portfolio/src/data/projects.ts)**
Each project includes:
- `title`, `tagline`, and `badge`
- `summary`, `problem`, and `result` / `impact`
- `architecture`: Step-by-step pipeline flow diagram
- `actions`: Bullet points of engineering achievements
- `stack`: Array of tech tags
- `codeSnippet`: Production YAML/HCL manifest that visitors can inspect and copy

### 4. Customize Career & Milestone Timeline
The horizontal ruler track (2016–2027) is configured in:
👉 **[`src/data/timeline.ts`](file:///c:/Users/sahi/Downloads/DevOps-Portfolio-ready/DevOps-Portfolio/src/data/timeline.ts)**
To add a new role or promotion, add an entry to `timelineEntries`:
```ts
{
  id: "new-role",
  title: "Senior Cloud Platform Engineer",
  subtitle: "SRE & Cloud Infrastructure",
  organization: "Company Name",
  fromYear: 2026,
  toYear: "Present",
  color: "from-sky-500 to-indigo-600",
  type: "work",
  logo: "azure",
  badge: "Promotion",
  details: "Leading multi-cluster Kubernetes and cloud automation...",
  link: "#experience",
}
```

### 5. Update Your Resume PDF
To update your downloadable resume:
1. Place your new resume PDF file into the **`public/`** folder:
   👉 `public/resume.pdf`
2. It will automatically update the download links in the header, hero, command palette, and contact sections.

---

## 🚀 Pushing Changes to Production (Automated AWS S3 Deploy)

Your repository is connected directly to **GitHub Actions**:
- Repository: **`https://github.com/SahilModan333/portfolio.git`**
- Live Production URL: **`https://www.sahildevops.me/`**

Whenever you make any changes, run:
```bash
git add .
git commit -m "feat: customize portfolio content and settings"
git push origin main
```

**What happens automatically:**
1. GitHub Actions detects the push on `main`.
2. It builds the production bundle with Vite.
3. It assumes the AWS IAM role `arn:aws:iam::612062119797:role/GitHubActions-Portfolio-Deploy`.
4. It syncs the static build files directly to your AWS S3 bucket (`s3://sahilops2026`).
5. Your live website at **`https://www.sahildevops.me/`** is refreshed in under 60 seconds!
