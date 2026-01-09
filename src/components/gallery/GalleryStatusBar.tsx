import { cn } from "~/lib/utils"
import { componentCount } from "~/data/scribble-ui-docs"

interface GalleryStatusBarProps {
  selectedId: string
  selectedIndex: number
  activeTab: "preview" | "props" | "code"
  className?: string
}

export function GalleryStatusBar({
  selectedId,
  selectedIndex,
  activeTab,
  className,
}: GalleryStatusBarProps) {
  return (
    <div className={cn("border-t border-accent/30 bg-bg-alt", className)}>
      {/* Top border */}
      <div className="text-accent select-none text-sm">
        ╠{"═".repeat(78)}╣
      </div>

      {/* Status content */}
      <div className="flex items-center justify-between px-4 py-1 text-xs">
        <div className="flex gap-6 text-fg-dim">
          <span>
            <span className="text-fg-muted">j/k:</span> navigate
          </span>
          <span>
            <span className="text-fg-muted">Tab:</span> switch panel
          </span>
          <span>
            <span className="text-fg-muted">?:</span> help
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-accent">[{selectedId}]</span>
          <span className="text-fg-muted">
            {selectedIndex + 1}/{componentCount}
          </span>
        </div>
      </div>

      {/* Bottom border */}
      <div className="text-accent select-none text-sm">
        ╚{"═".repeat(78)}╝
      </div>
    </div>
  )
}
