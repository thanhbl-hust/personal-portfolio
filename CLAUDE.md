# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Personal website of **thanhbl-hust**, used to document what I learn while working as a DevOps Engineer.
It is a static site built with [Astro](https://astro.build/) and deployed to GitHub Pages at https://thanhbl-hust.github.io/personal-portfolio/.

The site has two main pages:

- **CV** (`/`): name, birth year, about, education, experience, and tech stack.
- **Blog** (`/blog/`): technical posts written in Vietnamese, with tags, search, and a table of contents per post.

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
- Website UI text (navigation, labels, CV page)

**Exception: blog posts are written in Vietnamese.** This covers everything inside `src/content/blog/`: titles, descriptions, body text, image alt text, and comments or titles inside code examples. Labels generated inside post content follow the posts' language too (callout titles in `src/plugins/markdown-callouts.mjs`, footnote labels in `astro.config.mjs`). Still in English: post folder names (URL slugs, lowercase ASCII), tags (lowercase technical terms), code itself, and the UI around posts.

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
│       └── deploy.yml            # Builds the site and deploys it to GitHub Pages
├── public/                       # Static files copied to the build as-is
├── src/
│   ├── components/
│   │   ├── blog/                 # Blog UI: PostList, PostCard, PostMeta, PostHeader, PostSearch, TableOfContents, Prose
│   │   ├── layout/               # Site-wide chrome: Nav, Footer
│   │   ├── sections/             # Page sections: ProfileHero, Section, Timeline, TechStack
│   │   └── ui/                   # Small reusable pieces: TerminalWindow, TagList, ThemeToggle, BackToTop
│   ├── content/
│   │   └── blog/                 # Blog posts, one folder per post
│   │       └── <slug>/
│   │           ├── index.md      # The post: frontmatter + Markdown
│   │           └── images/       # Images used only by this post
│   ├── data/
│   │   └── cv.ts                 # All CV content (profile, education, experience, tech stack)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell shared by every page
│   │   └── PostLayout.astro      # Blog post: header, content, and table of contents sidebar
│   ├── pages/                    # File-based routes
│   │   ├── index.astro           # CV page (/)
│   │   └── blog/
│   │       ├── index.astro       # Post list with search and tags (/blog/)
│   │       ├── [...slug].astro   # Single post (/blog/<slug>/)
│   │       └── tags/
│   │           └── [tag].astro   # Posts with a given tag (/blog/tags/<tag>/)
│   ├── plugins/
│   │   └── markdown-callouts.mjs # Sätteri plugin for > [!NOTE] style callouts
│   ├── styles/
│   │   └── global.css            # Design tokens (colors, fonts, sizes), reset, utilities
│   ├── utils/
│   │   ├── posts.ts              # Blog helpers: getPosts, getTags, getTocItems, post/tag URLs, reading time, dates
│   │   ├── text.ts               # foldText() for accent-insensitive matching and slugs
│   │   └── url.ts                # withBase() for base-path-aware links
│   ├── config.ts                 # Site-wide settings: title, initials, nav links
│   └── content.config.ts         # Content collections and the blog frontmatter schema
├── astro.config.mjs              # Astro config: base path, Markdown processor, Expressive Code
├── CLAUDE.md                     # Guidance for Claude Code (this file)
├── package.json                  # Scripts and dependencies
└── tsconfig.json                 # TypeScript config (extends Astro's strict preset)
```

| Path                       | Purpose                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`       | GitHub Actions workflows. `deploy.yml` installs dependencies, builds the site, and publishes `dist/` to GitHub Pages on every push to `main`. |
| `public/`                  | Static assets served from the site root without processing (favicon, `robots.txt`). Post images go in the post's own folder instead.         |
| `src/components/blog/`     | Components for the post list, post pages, and rendered Markdown. `Prose.astro` holds all styles for post content.                            |
| `src/components/layout/`   | Components that appear on every page via `BaseLayout`.                                                                                       |
| `src/components/sections/` | Larger building blocks that make up a page.                                                                                                   |
| `src/components/ui/`       | Small, generic components reused across sections.                                                                                             |
| `src/content/blog/`        | Blog posts. Each post is a folder named after its URL slug, containing `index.md` and an `images/` folder.                                    |
| `src/data/`                | Content as typed data. Edit `cv.ts` to change what the CV page shows — no markup changes needed.                                              |
| `src/layouts/`             | Page shells. `BaseLayout` holds `<head>` metadata, fonts, theme script, nav, and footer; `PostLayout` wraps it for blog posts.               |
| `src/pages/`               | Routes. Each `.astro` file becomes a page at the matching URL; `[param]` files generate one page per post or tag.                             |
| `src/plugins/`             | Markdown processor plugins, written against the Sätteri plugin API.                                                                           |
| `src/styles/`              | Global CSS only. Component-specific styles live in each component's `<style>` block.                                                         |
| `src/utils/`               | Plain TypeScript helpers with no markup.                                                                                                      |
| `src/config.ts`            | Single source of truth for site-wide settings. Import from here instead of hardcoding.                                                        |
| `src/content.config.ts`    | Defines the `blog` collection and validates every post's frontmatter at build time.                                                           |

**Keep this section up to date** whenever a directory or top-level file is added, removed, or repurposed.

## Conventions

- **Base path**: the site is served under `/personal-portfolio/`. Build internal links and asset URLs with `withBase()` from `src/utils/url.ts`, never as bare absolute paths.
- **Styling**: use the CSS variables from `src/styles/global.css` (e.g. `var(--accent)`) instead of hardcoded colors, so both dark and light themes work.
- **Sizing**: use `rem` for font sizes and spacing so the layout scales with the browser's font size setting. The root font size is the browser default (100%).
- **Layout width**: content is 52rem wide. Pages that pass `wide` to `BaseLayout` (posts with a table of contents) grow to 72rem on screens ≥ 64em, the same breakpoint where the table of contents becomes a sidebar.
- **Floating buttons**: use the global `.fab` class for buttons fixed to the bottom-right corner, and stack them so they don't overlap (BackToTop at the bottom, the table of contents toggle above it).
- **Font**: JetBrains Mono for all text.

## Writing Blog Posts

The post `src/content/blog/how-to-write-a-blog/index.md` is the full reference for formatting (colored text, callouts, code block options, and more). Key rules:

- **Language**: write posts in Vietnamese (see [Language](#language)). Keep the folder name and tags in lowercase ASCII.
- **Location**: create `src/content/blog/<slug>/index.md`. The folder name is the URL (`/blog/<slug>/`). Put the post's images in `src/content/blog/<slug>/images/` and reference them relatively (`./images/diagram.png`).
- **Frontmatter**: `title`, `description`, and `pubDate` are required; `updatedDate`, `tags`, and `draft` are optional. The schema in `src/content.config.ts` validates them at build time.
- **Headings**: use `##` and `###` for sections; they build the table of contents, shown as a sticky sidebar on wide screens and behind a floating toggle button on narrow ones. Never use `#` in a post body, because the post title is already the page's `<h1>`.
- **Tags**: lowercase, and reuse existing tags (listed on `/blog/`) instead of creating synonyms.
- **Drafts**: `draft: true` hides a post from production builds but keeps it visible in `npm run dev`.
- **Markdown processor**: Markdown is rendered by Sätteri (Astro 7's default), not remark/rehype. Write plugins against the Sätteri visitor API and register them under `markdown.processor` in `astro.config.mjs`. Code blocks are handled by Expressive Code, configured in the same file.

## Deployment

- Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci` and `npm run build`, then deploys `dist/` to GitHub Pages (Pages source: **GitHub Actions**).
- Only the build output is published, but the repository itself is public. Never commit secrets or private files.
