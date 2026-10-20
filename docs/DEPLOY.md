# DEPLOY.md: Put the Portfolio Live on GitHub Pages

Goal: publish this site for free at **<https://daviddonikapanjaitan.github.io/>**.

How it works: you push the code to GitHub, and the workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes it to GitHub Pages. After the first setup, **every push to `main` updates the live site automatically** (about 1 to 2 minutes).

Time needed: about 15 minutes the first time.

---

## Before you start

You need:

- A GitHub account: `daviddonikapanjaitan` (<https://github.com/daviddonikapanjaitan>).
- Git installed (already done; Git for Windows includes Git Credential Manager, which handles sign-in in the browser).
- A terminal open in the project folder:

  ```powershell
  cd "C:\Users\David Donika\Documents\dokumen_cv\portofolio_website"
  ```

> **Repository name decides the URL.**
>
> | Repository name                                    | Live URL                                            |
> | -------------------------------------------------- | --------------------------------------------------- |
> | `daviddonikapanjaitan.github.io` **(recommended)** | `https://daviddonikapanjaitan.github.io/`           |
> | anything else, e.g. `portfolio`                    | `https://daviddonikapanjaitan.github.io/portfolio/` |
>
> This guide uses the recommended name. The workflow detects the name automatically, so the other option also works without code changes (see [Option: a different repository name](#option-a-different-repository-name)).

---

## Step 1: Check the site builds locally

```powershell
npm install
npm run check
```

`npm run check` runs lint, type-check, and the production build. It must finish without errors. If it fails, fix it before pushing; the same build runs on GitHub.

Optional: preview the site with `npm run dev` and open <http://localhost:3000>.

---

## Step 2: Create the repository on GitHub

1. Go to <https://github.com/new>.
2. **Owner:** `daviddonikapanjaitan`.
3. **Repository name:** `daviddonikapanjaitan.github.io` (exactly, all lowercase).
4. **Visibility:** **Public**. (GitHub Pages on a free account only works with public repositories. Your private files are excluded by `.gitignore`, see Step 4.)
5. **Leave everything else empty:** no README, no `.gitignore`, no license. The project already has them, and an empty repo avoids merge conflicts.
6. Click **Create repository**.

---

## Step 3: Turn on GitHub Pages (source = GitHub Actions)

1. In the new repository, open **Settings → Pages** (left sidebar, under "Code and automation").
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's all. There is no branch or folder to pick; the workflow handles it.

> If the Pages settings are not available yet on the empty repository, do this step right after Step 5 and then follow [Step 6, if the first run failed](#if-the-first-run-failed).

---

## Step 4: Make the first commit

```powershell
git status
```

Check the list before committing. These **must not** appear (they are ignored on purpose):

- `assets/` (the whole folder: your private CV with the home address and phone, and the original photo `profile_photo.png`)
- `node_modules/`, `.next/`, `out/`

`public/resume.pdf` **should** appear: it is the public CV with the address and phone removed.

Then commit:

```powershell
git add -A
git commit -m "feat: portfolio website v1"
```

Double-check that no private file was committed (this should print nothing):

```powershell
git ls-files | Select-String -Pattern "^assets/|EDITED|profile_photo"
```

> **Important:** once a file is pushed to a public repo, it is public, even if you delete it later (it stays in git history). If the check above prints anything, stop and run `git rm --cached "<file name>"`, then `git commit --amend`, before pushing.

---

## Step 5: Push to GitHub

```powershell
git branch -M main
git remote add origin https://github.com/daviddonikapanjaitan/daviddonikapanjaitan.github.io.git
git push -u origin main
```

The first push opens a browser window to sign in to GitHub (Git Credential Manager). Approve it, and the push continues.

---

## Step 6: Watch the deployment

1. Open the repository's **Actions** tab.
2. You will see two workflows run:
   - **CI**: lint, type-check, build (a safety check).
   - **Deploy to GitHub Pages**: builds the static site and publishes it.
3. Wait for **Deploy to GitHub Pages** to show a green check (about 1 to 2 minutes). Click it: the **deploy** job shows the live URL.

### If the first run failed

The most common reason is that Pages was not yet set to **GitHub Actions** when you pushed. Fix it:

1. Do Step 3 (Settings → Pages → Source: **GitHub Actions**).
2. Go to **Actions → Deploy to GitHub Pages → Run workflow → Run workflow** (or open the failed run and click **Re-run all jobs**).

---

## Step 7: Check the live site

Open **<https://daviddonikapanjaitan.github.io/>** (the very first deploy can take a few minutes to appear; refresh if you see a 404).

Check:

- [ ] Photo, name, and all sections load.
- [ ] Nav links scroll to each section; the mobile menu works on your phone.
- [ ] Dark mode toggle works.
- [ ] **Download CV** downloads `David-Donika-Panjaitan-CV.pdf` and it has no home address or phone.
- [ ] Email, LinkedIn, and GitHub buttons work.
- [ ] <https://daviddonikapanjaitan.github.io/robots.txt> and <https://daviddonikapanjaitan.github.io/sitemap.xml> open.
- [ ] A wrong URL such as <https://daviddonikapanjaitan.github.io/abc> shows the custom "Page not found" page.

Optional: in the repository's main page, click the gear next to **About**, set **Website** to the live URL, and add topics `nextjs`, `portfolio`, `typescript`, `tailwindcss`.

---

## Step 8: After launch

1. **Google Search Console:** <https://search.google.com/search-console> → Add property → **URL prefix** → `https://daviddonikapanjaitan.github.io/`. Verify with the **HTML tag** method:
   - Copy only the `content` value from the tag Google gives you.
   - Add it to `src/app/layout.tsx` inside `metadata`: `verification: { google: "<that value>" },`
   - Commit and push, wait for the deploy, then click **Verify**.
   - Then submit the sitemap: `https://daviddonikapanjaitan.github.io/sitemap.xml`.
2. **LinkedIn:** add the URL in **Contact info → Website** and as a **Featured → Link**.
   Check the preview with LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>.
3. **GitHub profile:** add the URL in your profile's **Website** field.
4. **CV:** add the URL to the header of your CV, then replace `public/resume.pdf` with the new public version.

---

## Updating the site later

Edit the content in `src/data/*` (see README.md), then:

```powershell
npm run check
git add -A
git commit -m "docs: update experience"
git push
```

The site updates automatically about 1 to 2 minutes after the push. Track progress in the **Actions** tab.

To replace the CV: overwrite `public/resume.pdf` with the new **public** version (no home address), then commit and push.

---

## Option: a different repository name

If you name the repository something else, such as `portfolio`:

- The site is served at `https://daviddonikapanjaitan.github.io/portfolio/`.
- Nothing needs to change in the code: the workflow sets the base path (`/portfolio`) and the site URL automatically.
- In Step 5, use `https://github.com/daviddonikapanjaitan/portfolio.git` as the remote.

You can only have one `daviddonikapanjaitan.github.io` repository, and it is the only way to get the short root URL.

---

## Option: custom domain (later)

If you buy a domain, e.g. `daviddonika.dev`:

1. Use the `daviddonikapanjaitan.github.io` repository (served from the root, which a custom domain needs).
2. **Settings → Pages → Custom domain:** enter the domain and save.
3. At your domain registrar, add the DNS records GitHub shows. For an apex domain, these are `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. For `www`, add a `CNAME` to `daviddonikapanjaitan.github.io`.
4. After DNS works, tick **Enforce HTTPS**.
5. **Settings → Secrets and variables → Actions → Variables → New repository variable:** name `SITE_URL`, value `https://daviddonika.dev`. Then re-run the deploy so canonical links, the sitemap, and social previews use the new domain.

---

## Troubleshooting

| Problem                                             | Fix                                                                                                                                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push asks for a password                            | GitHub no longer accepts account passwords for git. Let the browser sign-in window (Git Credential Manager) complete, or create a Personal Access Token and use it as the password. |
| `remote origin already exists`                      | `git remote set-url origin https://github.com/daviddonikapanjaitan/daviddonikapanjaitan.github.io.git`                                                                              |
| `failed to push some refs` / rejected               | The GitHub repo is not empty (e.g. it was created with a README). Easiest: delete the repo, recreate it empty, and push again.                                                      |
| Deploy fails at **configure-pages** or **deploy**   | Pages source is not set to **GitHub Actions**. See Step 3, then re-run.                                                                                                             |
| Deploy fails at **npm ci** or **Build static site** | Open the failed step's log. Run `npm run check` locally, fix the error, commit, and push.                                                                                           |
| Site shows 404 right after the first deploy         | Wait 2 to 5 minutes and hard refresh (Ctrl+F5).                                                                                                                                     |
| Site loads without styles or images                 | The repository name and the URL don't match. A project repo must be opened at `/<repo>/`, not at the root.                                                                          |
| Old content still showing                           | Hard refresh (Ctrl+F5); browsers and GitHub's CDN cache for a few minutes.                                                                                                          |
