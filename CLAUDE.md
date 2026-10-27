# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Personal website of **thanhbl-hust**, used to document what I learn while working as a DevOps Engineer.
It is a static site deployed to GitHub Pages at https://thanhbl-hust.github.io/personal-portfolio/.

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
│       └── deploy.yml   # Deploys the site to GitHub Pages
├── CLAUDE.md            # Guidance for Claude Code (this file)
└── index.html           # Site entry point (placeholder home page)
```

| Path                 | Purpose                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `.github/`           | GitHub-specific configuration for the repository.                                                                          |
| `.github/workflows/` | GitHub Actions workflows. `deploy.yml` publishes the site to GitHub Pages on every push to `main` and on manual dispatch. |
| `CLAUDE.md`          | Conventions and context for Claude Code: language, commit format, repository structure.                                   |
| `index.html`         | Home page of the site. Currently a placeholder with JetBrains Mono as the site font.                                      |

**Keep this section up to date** whenever a directory or top-level file is added, removed, or repurposed.

## Deployment

- Pushing to `main` triggers `.github/workflows/deploy.yml`, which deploys to GitHub Pages (Pages source: **GitHub Actions**).
- There is no build step yet: the workflow uploads the repository root (`path: .`) as-is, so committed files are publicly served. Never commit secrets or private files.
