import { cn } from "~/lib/utils"

interface GalleryShellProps {
  children: React.ReactNode
  className?: string
}

/**
 * ncurses-style frame for the gallery
 */
export function GalleryShell({ children, className }: GalleryShellProps) {
  return (
    <div className={cn("font-mono text-sm", className)}>
      {/* Top border with title */}
      <div className="text-border select-none">
        <span className="text-accent">╔═</span>
        <span className="text-fg mx-1">SCRIBBLE UI GALLERY</span>
        <span className="text-accent">
          {"═".repeat(60)}╗
        </span>
      </div>

      {/* Content area */}
      <div className="border-x border-accent/30 min-h-[70vh]">
        {children}
      </div>
    </div>
  )
}
