Portfolio

A React + TypeScript portfolio website built with Vite and Tailwind CSS.

Tech Stack
React 19
TypeScript
Vite 8
Tailwind CSS 4
Framer Motion
Lucide React
pnpm
Requirements

You need:

Node.js 22+
npm
pnpm
Git

Check your versions:

node --version
npm --version
pnpm --version
git --version

Quick Start
1. Clone the repository
git clone https://github.com/SahilModan333/portfolio.git

2. Enter the project
cd portfolio

3. Install pnpm

If pnpm is not installed:

sudo npm install --global pnpm


Check:

pnpm --version

4. Install dependencies
pnpm install

5. Build the project

Always test the build before running/deploying:

pnpm run build


A successful build creates:

dist/

6. Start the development server
pnpm run dev


Vite will show something similar to:

VITE ready

Local:   http://localhost:5173/
Network: http://YOUR_SERVER_IP:5173/


Open the URL shown by Vite in your browser.

Running on a Remote Linux Server / KodeKloud

The Vite configuration is already configured to listen on all interfaces:

0.0.0.0


It also allows remote hostnames used by sandbox environments.

Run:

pnpm run dev


Then open the URL provided by the environment.

If port 5173 is already being used, Vite will automatically use another port such as 5174.

For example:

http://localhost:5174/


or the corresponding Network URL.

Production Build

Create the production version:

pnpm run build


The production files are generated inside:

dist/


Preview the production build locally:

pnpm run preview

Development Workflow

After making changes to the source code:

pnpm run build


If the build succeeds, start the development server:

pnpm run dev


The main application code is located in:

src/

Project Structure
portfolio/
├── src/
│   ├── components/
│   └── ...
├── public/
├── dist/              # Generated after build
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md

Troubleshooting
Node.js is not installed

On CentOS Stream 9:

sudo dnf module enable nodejs:22 -y
sudo dnf install nodejs npm -y


Check:

node --version
npm --version

pnpm is not installed
sudo npm install --global pnpm


Check:

pnpm --version

Port 5173 is already in use

Check:

ss -ltnp | grep 5173


You can also simply run:

pnpm run dev


Vite will automatically select another available port.

Clean reinstall

If dependencies become corrupted:

rm -rf node_modules
pnpm install
pnpm run build

Deployment

This is a Vite frontend application.

The deployment flow is:

GitHub
   ↓
Clone repository
   ↓
pnpm install
   ↓
pnpm run build
   ↓
dist/
   ↓
Web server / Static hosting


The contents of dist/ are the production-ready website.

You can deploy the dist/ directory to a static hosting provider or serve it using a web server such as Nginx.

Important

Do not commit node_modules/ or other generated files.

Before committing changes:

git status


Then:

git add .
git commit -m "Update portfolio"
git push origin main

Verified Environment

This project has been successfully tested on:

OS:       CentOS Stream 9
CPU:      x86_64
Node.js:  22.23.1
npm:      10.9.8
pnpm:     11.22.0
React:    19.2.4
Vite:     8.0.3


The production build completed successfully:

✓ 2218 modules transformed
✓ built

Quick Command Reference
# Clone
git clone https://github.com/SahilModan333/portfolio.git

# Enter project
cd portfolio

# Install dependencies
pnpm install

# Build
pnpm run build

# Run development server
pnpm run dev

# Preview production build
pnpm run preview



