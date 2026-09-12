// Manually maintained — NOT touched by scripts/update-content.mjs.
// Add or edit external profile links (Qiita, Discord, etc.) here directly.
import type { ExternalLinkItem } from '../types/externalLink'

export const externalLinks: readonly ExternalLinkItem[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/Yosshy-123/',
  },
  {
    label: 'Qiita',
    url: 'https://qiita.com/Yosshy_123',
  },
  {
    label: 'Discord',
    url: 'https://discord.gg/QcrEzNtgVc',
  },
] as const
