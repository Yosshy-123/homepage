import type { Project } from '../types/project'

export const projects: readonly Project[] = [
  {
    title: 'KAeRU Log',
    description: 'Lightweight real-time chat powered by Redis',
    href: 'https://kaeru-log.yosshy.f5.si/',
  },
] as const
