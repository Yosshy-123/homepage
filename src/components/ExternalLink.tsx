import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function ExternalLink({
  children,
  className = '',
  rel,
  target,
  ...props
}: ExternalLinkProps) {
  const safeRel = target === '_blank'
    ? `${rel ?? ''} noopener noreferrer`.trim()
    : rel

  return (
    <a
      {...props}
      target={target}
      rel={safeRel}
      className={className}
    >
      {children}
    </a>
  )
}
