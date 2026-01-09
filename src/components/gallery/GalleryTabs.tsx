import { cn } from "~/lib/utils"

export type GalleryTab = "preview" | "props" | "code"

interface GalleryTabsProps {
  activeTab: GalleryTab
  onTabChange: (tab: GalleryTab) => void
  componentTitle: string
}

const tabs: { id: GalleryTab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "props", label: "Props" },
  { id: "code", label: "Code" },
]

export function GalleryTabs({ activeTab, onTabChange, componentTitle }: GalleryTabsProps) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
      <div className="text-fg font-medium">{componentTitle}</div>
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-3 py-1 text-xs transition-colors",
              activeTab === tab.id
                ? "text-bg bg-accent"
                : "text-fg-dim hover:text-fg border border-border/50 hover:border-accent/50"
            )}
          >
            [{tab.label}]
          </button>
        ))}
      </div>
    </div>
  )
}
