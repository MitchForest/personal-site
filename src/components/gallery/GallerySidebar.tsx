import { cn } from "~/lib/utils"
import { components, categories, getComponentsByCategory, type ComponentDoc } from "~/data/scribble-ui-docs"

interface GallerySidebarProps {
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

const categoryLabels: Record<ComponentDoc["category"], string> = {
  core: "COMPONENTS",
  annotation: "ANNOTATIONS",
  decorative: "DECORATIVE",
  background: "BACKGROUNDS",
  icon: "ICONS",
}

// Strip redundant prefixes from display names
function getDisplayName(id: string): string {
  return id
    .replace(/^annotation-/, "")
    .replace(/^decorative-/, "")
    .replace(/^background-/, "")
    .replace(/^icon-/, "")
}

export function GallerySidebar({ selectedId, onSelect, className }: GallerySidebarProps) {
  return (
    <div className={cn("w-48 border-r border-border/50 overflow-y-auto", className)}>
      {categories.map((category) => {
        const items = getComponentsByCategory(category)
        if (items.length === 0) return null

        return (
          <div key={category} className="mb-4">
            <div className="px-3 py-1 text-fg-muted text-xs tracking-wider">
              {categoryLabels[category]}
            </div>
            <div className="text-border px-3 mb-1">{"─".repeat(18)}</div>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={cn(
                  "w-full text-left px-3 py-0.5 text-sm transition-colors",
                  selectedId === item.id
                    ? "text-accent bg-accent/10"
                    : "text-fg-dim hover:text-fg hover:bg-bg-alt"
                )}
              >
                <span className="mr-2">{selectedId === item.id ? "›" : " "}</span>
                {getDisplayName(item.id)}
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}
