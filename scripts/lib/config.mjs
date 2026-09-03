// Shared configuration for the GitHub content-sync scripts.
// All values are derived from environment variables so the script behaves
// correctly both in GitHub Actions and when run locally.

export const USERNAME = process.env.GITHUB_USERNAME || 'Yosshy-123'

export const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''

// Maximum number of projects to write to src/data/projects.ts.
export const MAX_PROJECTS = 6

// "owner/repo" of the homepage itself, used to make sure the homepage
// repository never lists itself as one of its own projects. GitHub Actions
// sets GITHUB_REPOSITORY automatically; the fallback only matters for local
// runs outside of Actions.
export const SELF_REPO = (process.env.GITHUB_REPOSITORY || `${USERNAME}/homepage`).toLowerCase()

// Abort any single GitHub API request that takes longer than this, so a
// network hiccup can't hang the workflow run indefinitely.
export const REQUEST_TIMEOUT_MS = 10_000
