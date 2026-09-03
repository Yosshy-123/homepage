#!/usr/bin/env node
/**
 * Regenerates src/data/projects.ts from the pinned GitHub repositories of
 * the account configured in scripts/lib/config.mjs (GITHUB_USERNAME).
 *
 * Run by .github/workflows/update-content.yml on a daily schedule, or
 * locally:
 *
 *   GITHUB_TOKEN=xxxx node scripts/update-content.mjs
 *
 * A token is required to read pinned items (GraphQL); without one the
 * script falls back to the most-starred, most-recently-pushed public repos.
 *
 * Note: src/data/externalLinks.ts (Qiita, Discord, ...) is maintained by
 * hand and is intentionally never touched by this script.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchProjects } from './lib/github.mjs'
import { generateProjectsSource } from './lib/generate-projects-source.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROJECTS_FILE = path.join(ROOT, 'src', 'data', 'projects.ts')

async function main() {
  console.log('Fetching pinned GitHub projects...')

  const projects = await fetchProjects()

  if (projects.length === 0) {
    throw new Error('No projects were resolved — refusing to overwrite src/data/projects.ts with an empty list.')
  }

  await mkdir(path.dirname(PROJECTS_FILE), { recursive: true })
  await writeFile(PROJECTS_FILE, generateProjectsSource(projects))

  console.log(`Wrote ${projects.length} project(s) to ${path.relative(ROOT, PROJECTS_FILE)}.`)
}

main().catch((error) => {
  console.error(error)
  // Prefer exitCode over exit() so any pending I/O is allowed to flush.
  process.exitCode = 1
})
