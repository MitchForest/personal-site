import { useEffect, useCallback } from "react"
import { components } from "~/data/scribble-ui-docs"
import type { GalleryTab } from "~/components/gallery"

interface UseGalleryNavOptions {
  selectedId: string
  activeTab: GalleryTab
  onSelectComponent: (id: string) => void
  onTabChange: (tab: GalleryTab) => void
  onShowHelp: () => void
}

const tabs: GalleryTab[] = ["preview", "props", "code"]

export function useGalleryNav({
  selectedId,
  activeTab,
  onSelectComponent,
  onTabChange,
  onShowHelp,
}: UseGalleryNavOptions) {
  const currentIndex = components.findIndex((c) => c.id === selectedId)

  const navigateComponent = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, components.length - 1)
          : Math.max(currentIndex - 1, 0)

      onSelectComponent(components[newIndex].id)
    },
    [currentIndex, onSelectComponent]
  )

  const cycleTab = useCallback(() => {
    const currentTabIndex = tabs.indexOf(activeTab)
    const nextTabIndex = (currentTabIndex + 1) % tabs.length
    onTabChange(tabs[nextTabIndex])
  }, [activeTab, onTabChange])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.key) {
        case "j":
        case "ArrowDown":
          e.preventDefault()
          navigateComponent("next")
          break
        case "k":
        case "ArrowUp":
          e.preventDefault()
          navigateComponent("prev")
          break
        case "Tab":
          e.preventDefault()
          cycleTab()
          break
        case "?":
          e.preventDefault()
          onShowHelp()
          break
        case "1":
          e.preventDefault()
          onTabChange("preview")
          break
        case "2":
          e.preventDefault()
          onTabChange("props")
          break
        case "3":
          e.preventDefault()
          onTabChange("code")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigateComponent, cycleTab, onShowHelp, onTabChange])

  return {
    currentIndex,
    totalCount: components.length,
  }
}
