import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ExternalLink } from './ExternalLink'

type PrimaryLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

const baseClassName =
  'inline-flex items-center justify-center rounded-full border border-white/60 bg-white/85 px-6 py-2.5 font-semibold text-sky-600 shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/95 hover:text-pink-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

export function PrimaryLink({ children, className = '', ...props }: PrimaryLinkProps) {
  return (
    <ExternalLink {...props} className={`${baseClassName} ${className}`.trim()}>
      {children}
    </ExternalLink>
  )
}
