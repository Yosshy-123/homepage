// Renders the TypeScript source text for src/data/projects.ts.
// Kept separate from the GitHub API access and file-writing logic so each
// module has a single, easily testable responsibility.

import { USERNAME } from './config.mjs'

function toProjectLiteral({ title, description, href }) {
  // JSON.stringify safely escapes quotes/backslashes/newlines, so repo
  // names or descriptions can never break out of the generated source.
  return `  {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    href: ${JSON.stringify(href)},
  },`
}

export function generateProjectsSource(projects) {
  const body = projects.map(toProjectLiteral).join('\n')

  return `// AUTO-GENERATED FILE — do not edit by hand.
// Regenerated daily by \`scripts/update-content.mjs\` (see
// .github/workflows/update-content.yml), which pulls the pinned
// repositories from https://github.com/${USERNAME}.
// Any manual edits made here will be overwritten on the next run.
import type { Project } from '../types/project'

export const projects: readonly Project[] = [
${body}
] as const
`
}
