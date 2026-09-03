type SiteFooterProps = {
  name: string
}

export function SiteFooter({ name }: SiteFooterProps) {
  return (
    <footer className="px-5 pb-10 pt-2 text-center text-sm text-slate-900/70">
      <small>© {name}. All rights reserved.</small>
    </footer>
  )
}
