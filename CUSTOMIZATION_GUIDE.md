# 🛠️ DevOps Portfolio Customization Guide for Sahil Modan

Welcome! Your portfolio website has been customized specifically for you, adopting the signature aesthetic of **[bryangarage.dev](https://bryangarage.dev/)**:
- **Vintage Macintosh CRT Terminal Monitor** centerpiece with cute pixel art capybara on top
- **Stickers on the monitor bezel**: `GAME!`, `Y2K`, `Yellow Star`, `Daisy Flower`, and `Smiley Face`
- **Post-It Sticky Notes** pinned along the bezel sides with customizable messages
- **Interactive Retro Mac CLI**: ` File Edit Screen Special Help` menu, `[Help]` and `[Ask Sahil]` buttons, and a live interactive command prompt
- **Two-Tone Atmospheric Background**: Deep dark scanline top (`#111317`) transitioning into clean modern silver
- **Cursive Calligraphy Monogram**: Signature cursive **`SM`** in the top right (just like `BO` on Bryan's garage)
- **Top Actions**: Minimal `Jump to [⌘][K]` trigger, signature orange circular terminal button `(>_)`, and `[Say hi →]` button with paper airplane icon

---

## 💻 The Master Config File (`src/data/portfolio.config.ts`)

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
- **`sentenceWords`**: An array of word tokens that fade from blur to sharp one by one. You can modify any word, set `bold: true`, or link it to an interactive hover peek card using `peek: "azure"` or `peek: "stibo"`.
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
git commit -m "feat: update portfolio"
git push origin main
```

**What happens automatically:**
1. GitHub Actions detects the push on `main`.
2. It builds the production bundle with Vite.
3. It assumes the AWS IAM role `arn:aws:iam::612062119797:role/GitHubActions-Portfolio-Deploy`.
4. It syncs the static build files directly to your AWS S3 bucket (`s3://sahilops2026`).
5. Your live website at **`https://www.sahildevops.me/`** is refreshed in under 60 seconds!
