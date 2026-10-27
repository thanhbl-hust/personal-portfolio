# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Personal website of **thanhbl-hust**, used to document what I learn while working as a DevOps Engineer.
It is a static site built with [Astro](https://astro.build/) and deployed to GitHub Pages at https://thanhbl-hust.github.io/personal-portfolio/.

The site has two main pages:

- **CV** (`/`): name, birth year, about, education, experience, and tech stack.
- **Blog** (`/blog/`): technical posts (empty for now).

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:4321/personal-portfolio/
npm run build     # Build the production site to ./dist/
npm run preview   # Preview the production build locally
```

## Language

**Everything in this repository is written in English**, including:

- Code, identifiers, and comments
- Commit messages, branch names, PR titles and descriptions
- Documentation (README, this file)
- Website content

## Commit Conventions

All commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<optional scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Use for                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `feat`     | A new feature or page                                                   |
| `fix`      | A bug fix                                                               |
| `docs`     | Documentation only (README, CLAUDE.md)                                  |
| `style`    | Formatting only (whitespace, indentation) with no behavior change      |
| `refactor` | A code change that neither fixes a bug nor adds a feature              |
| `perf`     | A performance improvement                                               |
| `test`     | Adding or updating tests                                                |
| `build`    | Build system or dependency changes                                      |
| `ci`       | GitHub Actions workflows and other CI/CD configuration                  |
| `chore`    | Maintenance that fits none of the above                                 |

### Rules

- **Subject**: imperative mood ("add", not "added"), lowercase, no trailing period, at most 72 characters.
- **Body**: optional; wrap at 72 characters and explain *what* and *why*, not *how*.
- **Breaking changes**: add `!` after the type/scope (`feat!: ...`) or a `BREAKING CHANGE:` footer.
- **One logical change per commit.**
- **Authorship**: commits are authored by `thanhbl-hust` only. Do **not** add `Co-Authored-By` lines or any AI/Claude attribution to commits or pull requests.

### Examples

```
feat(blog): add tag filter to post list
fix(ci): use correct artifact path for pages deploy
docs: describe repository structure in CLAUDE.md
ci: pin pages actions to latest major versions
```

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml        # Builds the site and deploys it to GitHub Pages
├── public/                   # Static files copied to the build as-is
├── src/
│   ├── components/
│   │   ├── layout/           # Site-wide chrome: Nav, Footer
│   │   ├── sections/         # Page sections: ProfileHero, Section, Timeline, TechStack
│   │   └── ui/               # Small reusable pieces: TerminalWindow, TagList, ThemeToggle, BackToTop
│   ├── data/
│   │   └── cv.ts             # All CV content (profile, education, experience, tech stack)
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML shell shared by every page
│   ├── pages/                # File-based routes
│   │   ├── index.astro       # CV page (/)
│   │   └── blog/
│   │       └── index.astro   # Blog page (/blog/)
│   ├── styles/
│   │   └── global.css        # Design tokens (colors, fonts, sizes), reset, utilities
│   ├── utils/
│   │   └── url.ts            # Helpers such as withBase() for base-path-aware links
│   └── config.ts             # Site-wide settings: title, description, nav links
├── astro.config.mjs          # Astro config: site URL and base path
├── CLAUDE.md                 # Guidance for Claude Code (this file)
├── package.json              # Scripts and dependencies
└── tsconfig.json             # TypeScript config (extends Astro's strict preset)
```

| Path                     | Purpose                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`     | GitHub Actions workflows. `deploy.yml` installs dependencies, builds the site, and publishes `dist/` to GitHub Pages on every push to `main`. |
| `public/`                | Static assets served from the site root without processing (favicon, images, `robots.txt`).                                                  |
| `src/components/layout/` | Components that appear on every page via `BaseLayout`.                                                                                       |
| `src/components/sections/` | Larger building blocks that make up a page.                                                                                                 |
| `src/components/ui/`     | Small, generic components reused across sections.                                                                                             |
| `src/data/`              | Content as typed data. Edit `cv.ts` to change what the CV page shows — no markup changes needed.                                              |
| `src/layouts/`           | Page shells: `<head>` metadata, font loading, theme script, nav, and footer.                                                                  |
| `src/pages/`             | Routes. Each `.astro` file becomes a page at the matching URL.                                                                                |
| `src/styles/`            | Global CSS only. Component-specific styles live in each component's `<style>` block.                                                         |
| `src/utils/`             | Plain TypeScript helpers with no markup.                                                                                                      |
| `src/config.ts`          | Single source of truth for site-wide settings. Import from here instead of hardcoding.                                                        |

**Keep this section up to date** whenever a directory or top-level file is added, removed, or repurposed.

## Conventions

- **Base path**: the site is served under `/personal-portfolio/`. Build internal links and asset URLs with `withBase()` from `src/utils/url.ts`, never as bare absolute paths.
- **Styling**: use the CSS variables from `src/styles/global.css` (e.g. `var(--accent)`) instead of hardcoded colors, so both dark and light themes work.
- **Sizing**: use `rem` for font sizes and spacing. The root font size is 110% on screens ≥ 48em, and `rem` values scale with it.
- **Font**: JetBrains Mono for all text.

## Deployment

- Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci` and `npm run build`, then deploys `dist/` to GitHub Pages (Pages source: **GitHub Actions**).
- Only the build output is published, but the repository itself is public. Never commit secrets or private files.
