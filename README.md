This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production deploy on GitHub

### Option A: GitHub Actions (recommended)

Every push to `main` builds and deploys automatically. No manual `npm run deploy`.

1. **Push the project to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages from Actions:**
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment**, Source: **GitHub Actions**

3. **Choose your URL:**
   - **User/org site:** Repo name = `YOUR_USERNAME.github.io` → `https://YOUR_USERNAME.github.io`
   - **Project site:** Any repo name (e.g. `selva-deployed`) → `https://YOUR_USERNAME.github.io/YOUR_REPO`

4. **If using a project site**, set base path for the build:
   - Repo → **Settings** → **Secrets and variables** → **Actions** → **Variables**
   - Add: `NEXT_PUBLIC_BASE_PATH` = `/YOUR_REPO` (e.g. `/selva-deployed`)
   - The workflow uses this; `next.config.ts` already reads it.

5. **Update SEO URLs** to your live site (see [SEO](#seo-search-engine-visibility) below), then push. The workflow will run and deploy.

### Option B: Manual deploy (gh-pages branch)

```bash
npm run deploy
```

Then in **Settings** → **Pages**: Source = **Deploy from a branch**, Branch = `gh-pages`, folder = `/ (root)`.

For a **project site**, set `NEXT_PUBLIC_BASE_PATH=/your-repo` before running `npm run build` (or set it in `next.config.ts`).

---

## SEO (Search engine visibility)

The site is tuned for search terms like **Selva**, **Selva G**, **AI Engineer Bangalore**, **Website developer Bangalore**, and project/contact pages.

| What | Where |
|------|--------|
| **Meta title, description, keywords** | `src/app/layout.tsx` (home). **Contact:** `contact/layout.tsx`. **Projects:** `projects/layout.tsx`. |
| **Open Graph & Twitter** | All layouts — better link previews and social sharing. |
| **Canonical URLs** | Root, contact, and projects layouts. |
| **robots** | Index/follow and googleBot in root layout; `public/robots.txt` allows crawl and sitemap. |
| **Sitemap** | `public/sitemap.xml` — update all `<loc>` URLs to your live site. |
| **JSON-LD** | Person (Selva, Selva G, Bangalore, job titles) + WebSite in `src/app/layout.tsx`. |

**Before deploy:** Replace `https://selva-aiworks.github.io` with your real URL in:
- `src/app/layout.tsx` (metadataBase, openGraph.url, siteUrl, canonicals)
- `src/app/contact/layout.tsx` and `src/app/projects/layout.tsx` (canonical)
- `public/robots.txt` (Sitemap URL)
- `public/sitemap.xml` (every `<loc>`; add basePath if project site)

**After deploy:** Add the site in [Google Search Console](https://search.google.com/search-console) and submit `https://yoursite/sitemap.xml` to speed up indexing.

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
