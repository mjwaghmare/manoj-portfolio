# Manoj Waghmare — Portfolio

Personal portfolio website for **Manoj Waghmare**, Senior Mobile Developer (Flutter, Android, iOS).

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, pre-rendered as a static export and hosted on **GitHub Pages**.

🔗 **Live Site:** [https://mjwaghmare.github.io/manoj-portfolio/](https://mjwaghmare.github.io/manoj-portfolio/)

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+ (recommended: Node 22)
* npm 10+

### Run Locally

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000/manoj-portfolio/](http://localhost:3000/manoj-portfolio/) (or [http://localhost:3000](http://localhost:3000)) in your browser.

### Build & Static Export

```bash
# Type check and build static export into out/
npm run build
```

The output is generated into the `out/` directory ready for static hosting.

---

## ✏️ Editing Portfolio Content

All copy, profile information, experiences, projects, and skills live in a single structured file:

📁 **[`src/data/portfolio-data.ts`](src/data/portfolio-data.ts)**

| Section | What to Edit |
| --- | --- |
| **Profile & Hero** | `PortfolioData.profile` (name, role, headline, about, social links) |
| **Experience** | `PortfolioData.experiences` (companies, roles, dates, descriptions) |
| **Featured Projects** | `PortfolioData.projects` (titles, tags, category, mockups, URLs) |
| **Tech Stack & Skills**| `PortfolioData.techStack` & `PortfolioData.skillGroups` |
| **Resume PDF** | Replace `public/Manoj_Waghmare_Resume.pdf` (and update `resumeUpdated` in `portfolio-data.ts`) |
| **Images & Logos** | `public/images/` and `public/icons/` |

---

## 📁 Project Structure

```text
├── public/                 # Static assets (images, icons, resume PDF, favicons)
│   ├── icons/              # PWA and technology icons (SVG)
│   └── images/             # Portrait, logos, and phone mockups
├── src/
│   ├── app/                # Next.js App Router (layout, page, sitemap, robots, manifest)
│   ├── components/         # React UI sections & interactive components
│   ├── data/               # Portfolio content (portfolio-data.ts)
│   └── lib/                # Utilities and site configuration
├── .github/workflows/      # Automated GitHub Pages CI/CD workflow (deploy.yml)
├── next.config.ts          # Next.js configuration (static export, basePath)
└── tsconfig.json           # TypeScript configuration
```

---

## 🚢 CI/CD & Deployment

Deployments are automated with GitHub Actions via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Pushing commits to the `main` branch automatically triggers a build and publishes to GitHub Pages.

---

## 📜 Historical Version

The original Flutter Web version of this portfolio has been archived in git history and tagged under `archive/flutter-version`.
To inspect or restore the Flutter version at any time:

```bash
git checkout archive/flutter-version
```
