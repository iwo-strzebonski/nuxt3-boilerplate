# Content Submodule Pattern

This project uses `@nuxt/content` with a Git submodule for shared documentation. The `content/` directory is structured so that local content lives at the top level, while documentation from another repository is pulled in as a submodule.

## Directory Structure

```
content/
├── content/       ← local markdown pages
├── docs/          ← git submodule (shared docs repo)
├── README.md
└── package.json
```

## Setup

### 1. Add the submodule

```bash
git submodule add https://github.com/your-org/your-docs-repo.git content/docs
```

### 2. Initialize after cloning

When someone clones the project for the first time:

```bash
git submodule update --init --recursive
```

### 3. Update to latest docs

```bash
git submodule update --remote content/docs
git add content/docs
git commit -m "chore: update docs submodule"
```

## GitHub Action: Notify Parent on Docs Update

If you want the parent project to automatically update when the docs repo changes, add this workflow to your **docs repository**:

```yaml
# .github/workflows/notify-parent.yml
name: Notify Parent Repository

on:
  push:
    branches: [main]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger parent workflow
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PARENT_REPO_TOKEN }}
          repository: your-org/your-parent-repo
          event-type: docs-updated
```

Then in the **parent repository**, add a workflow that listens for the dispatch:

```yaml
# .github/workflows/update-docs.yml
name: Update Docs Submodule

on:
  repository_dispatch:
    types: [docs-updated]

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Update submodule
        run: |
          git submodule update --remote content/docs
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add content/docs
          git diff --cached --quiet || git commit -m "chore: update docs submodule"
          git push
```

## Notes

- The `content/package.json` is used by `@nuxt/content` for metadata — keep it minimal.
- Make sure `.gitmodules` is committed to the repository.
- The submodule approach works well with both SSR and static generation modes.
