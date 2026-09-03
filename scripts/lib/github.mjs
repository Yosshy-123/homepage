// All GitHub API access for the content-sync script lives in this module.

import { USERNAME, TOKEN, SELF_REPO, MAX_PROJECTS, REQUEST_TIMEOUT_MS } from './config.mjs'

const API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  // The GitHub REST API requires a User-Agent header on every request.
  'User-Agent': 'homepage-update-content-script',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
}

/** Fetch JSON from `url`, aborting if the request hangs longer than REQUEST_TIMEOUT_MS. */
async function fetchJson(url, options = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new Error(`Request to ${url} failed: ${response.status} ${response.statusText}\n${body}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

/** Defence in depth: only ever accept links that actually point at github.com. */
function isGitHubUrl(url) {
  try {
    return new URL(url).hostname === 'github.com'
  } catch {
    return false
  }
}

function toProject({ title, description, href }) {
  return {
    title,
    description: description?.trim() || `See the ${title} repository for details.`,
    href,
  }
}

/** The user's actual pinned repositories, via the GraphQL API. Requires a token. */
async function fetchPinnedRepos() {
  if (!TOKEN) return null

  const query = /* GraphQL */ `
    query PinnedRepos($login: String!) {
      user(login: $login) {
        pinnedItems(first: 10, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              description
              url
              isFork
            }
          }
        }
      }
    }
  `

  const data = await fetchJson('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...API_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USERNAME } }),
  })

  if (data.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`)
  }

  const nodes = data?.data?.user?.pinnedItems?.nodes ?? []

  return nodes
    .filter(
      (repo) => repo && !repo.isFork && repo.nameWithOwner.toLowerCase() !== SELF_REPO && isGitHubUrl(repo.url),
    )
    .map((repo) => toProject({ title: repo.name, description: repo.description, href: repo.url }))
}

/** Fallback: the most-starred, most-recently-pushed public repos the user owns. */
async function fetchTopOwnedRepos() {
  const repos = await fetchJson(
    `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&per_page=100`,
    { headers: API_HEADERS },
  )

  return repos
    .filter(
      (repo) => !repo.fork && !repo.archived && repo.full_name.toLowerCase() !== SELF_REPO && isGitHubUrl(repo.html_url),
    )
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    })
    .slice(0, MAX_PROJECTS)
    .map((repo) => toProject({ title: repo.name, description: repo.description, href: repo.html_url }))
}

/**
 * Resolve the list of projects to publish: prefer the user's real pinned
 * repositories, falling back to their most notable owned repos if pinned
 * items can't be fetched (e.g. no token available).
 */
export async function fetchProjects() {
  try {
    const pinned = await fetchPinnedRepos()
    if (pinned && pinned.length > 0) {
      return pinned.slice(0, MAX_PROJECTS)
    }
  } catch (error) {
    console.warn(`Could not fetch pinned repos via GraphQL, falling back to REST API.\n${error.message}`)
  }

  return fetchTopOwnedRepos()
}
