import { ExternalLink, ShieldCheck } from 'lucide-react'

export function WorkspaceFooter() {
  return (
    <footer className="workspace-footer">
      <span>
        <ShieldCheck size={13} />
        Mock data. Real possibilities.
      </span>
      <span>
        All changes stay in this session
        <ExternalLink size={12} />
      </span>
    </footer>
  )
}
