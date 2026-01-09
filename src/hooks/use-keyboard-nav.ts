import { useEffect, useCallback, useState } from "react"

type NavItem = {
  id: string
  type: "file" | "folder" | "link"
  href?: string
  children?: NavItem[]
}

type FlatItem = {
  id: string
  depth: number
  type: "file" | "folder" | "link"
  href?: string
  parentId?: string
  isExpanded?: boolean
}

/**
 * Keyboard navigation hook for terminal-style UI
 * 
 * Keys:
 * - j/↓: Move down
 * - k/↑: Move up  
 * - l/→/Enter: Expand folder or navigate to file
 * - h/←: Collapse folder or go to parent
 * - g: Go to first item
 * - G: Go to last item
 * - /: Focus search (if enabled)
 */
export function useKeyboardNav(
  items: FlatItem[],
  options: {
    onSelect?: (item: FlatItem) => void
    onExpand?: (id: string) => void
    onCollapse?: (id: string) => void
    enabled?: boolean
  } = {}
) {
  const { onSelect, onExpand, onCollapse, enabled = true } = options
  const [activeIndex, setActiveIndex] = useState(0)
  const [mode, setMode] = useState<"normal" | "search">("normal")

  const activeItem = items[activeIndex]

  const moveUp = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const moveDown = useCallback(() => {
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1))
  }, [items.length])

  const goToFirst = useCallback(() => {
    setActiveIndex(0)
  }, [])

  const goToLast = useCallback(() => {
    setActiveIndex(items.length - 1)
  }, [items.length])

  const select = useCallback(() => {
    if (!activeItem) return
    
    if (activeItem.type === "folder") {
      if (activeItem.isExpanded) {
        onCollapse?.(activeItem.id)
      } else {
        onExpand?.(activeItem.id)
      }
    } else {
      onSelect?.(activeItem)
    }
  }, [activeItem, onSelect, onExpand, onCollapse])

  const goBack = useCallback(() => {
    if (!activeItem) return
    
    if (activeItem.type === "folder" && activeItem.isExpanded) {
      onCollapse?.(activeItem.id)
    } else if (activeItem.parentId) {
      // Find parent and move to it
      const parentIndex = items.findIndex((i) => i.id === activeItem.parentId)
      if (parentIndex !== -1) {
        setActiveIndex(parentIndex)
      }
    }
  }, [activeItem, items, onCollapse])

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
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
          moveDown()
          break
        case "k":
        case "ArrowUp":
          e.preventDefault()
          moveUp()
          break
        case "l":
        case "ArrowRight":
        case "Enter":
          e.preventDefault()
          select()
          break
        case "h":
        case "ArrowLeft":
          e.preventDefault()
          goBack()
          break
        case "g":
          if (!e.shiftKey) {
            e.preventDefault()
            goToFirst()
          }
          break
        case "G":
          e.preventDefault()
          goToLast()
          break
        case "/":
          e.preventDefault()
          setMode("search")
          break
        case "Escape":
          if (mode === "search") {
            e.preventDefault()
            setMode("normal")
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enabled, moveDown, moveUp, select, goBack, goToFirst, goToLast, mode])

  return {
    activeIndex,
    activeItem,
    setActiveIndex,
    mode,
    setMode,
  }
}

/**
 * Flatten a tree of nav items for keyboard navigation
 */
export function flattenNavItems(
  items: NavItem[],
  expandedIds: Set<string>,
  parentId?: string,
  depth = 0
): FlatItem[] {
  const result: FlatItem[] = []

  for (const item of items) {
    const isExpanded = expandedIds.has(item.id)
    
    result.push({
      id: item.id,
      depth,
      type: item.type,
      href: item.href,
      parentId,
      isExpanded: item.type === "folder" ? isExpanded : undefined,
    })

    if (item.children && isExpanded) {
      result.push(
        ...flattenNavItems(item.children, expandedIds, item.id, depth + 1)
      )
    }
  }

  return result
}
