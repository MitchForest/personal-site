import { useState, useCallback } from "react"
import { cn } from "~/lib/cn"
import { Text } from "./Text"
import { useKeyboardNav, flattenNavItems } from "~/hooks/use-keyboard-nav"
import { useNavigate } from "@tanstack/react-router"

export type FileTreeNode = {
  id: string
  name: string
  type: "file" | "folder"
  href?: string
  children?: FileTreeNode[]
  icon?: string
}

interface FileTreeProps {
  items: FileTreeNode[]
  title?: string
  className?: string
}

export function FileTree({ items, title = "EXPLORER", className }: FileTreeProps) {
  const navigate = useNavigate()
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(["root"]) // Start with root expanded
  )

  const flatItems = flattenNavItems(
    items.map((item) => ({
      id: item.id,
      type: item.type,
      href: item.href,
      children: item.children?.map((child) => ({
        id: child.id,
        type: child.type,
        href: child.href,
        children: child.children as any,
      })),
    })),
    expandedIds
  )

  const handleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => new Set([...prev, id]))
  }, [])

  const handleCollapse = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const handleSelect = useCallback(
    (item: { id: string; href?: string }) => {
      if (item.href) {
        navigate({ to: item.href })
      }
    },
    [navigate]
  )

  const { activeIndex } = useKeyboardNav(flatItems, {
    onExpand: handleExpand,
    onCollapse: handleCollapse,
    onSelect: handleSelect,
  })

  // Build a map for quick lookup
  const itemMap = new Map<string, FileTreeNode>()
  const buildMap = (nodes: FileTreeNode[]) => {
    for (const node of nodes) {
      itemMap.set(node.id, node)
      if (node.children) buildMap(node.children)
    }
  }
  buildMap(items)

  return (
    <nav className={cn("py-2", className)}>
      {/* Header */}
      <div className="px-3 py-1 mb-2">
        <Text variant="muted" className="text-xs tracking-wider">
          {title}
        </Text>
      </div>

      {/* Tree items */}
      <div className="space-y-0">
        {flatItems.map((flatItem, index) => {
          const node = itemMap.get(flatItem.id)
          if (!node) return null

          const isActive = index === activeIndex
          const isExpanded = expandedIds.has(node.id)

          return (
            <FileTreeItem
              key={node.id}
              node={node}
              depth={flatItem.depth}
              isActive={isActive}
              isExpanded={isExpanded}
              onClick={() => {
                if (node.type === "folder") {
                  if (isExpanded) {
                    handleCollapse(node.id)
                  } else {
                    handleExpand(node.id)
                  }
                } else if (node.href) {
                  handleSelect({ id: node.id, href: node.href })
                }
              }}
            />
          )
        })}
      </div>

      {/* Keyboard hints */}
      <div className="px-3 py-3 mt-4 border-t border-border">
        <Text variant="comment" className="text-xs">
          {"// j/k or ↑/↓ to navigate"}
        </Text>
        <br />
        <Text variant="comment" className="text-xs">
          {"// Enter or l to select"}
        </Text>
      </div>
    </nav>
  )
}

interface FileTreeItemProps {
  node: FileTreeNode
  depth: number
  isActive: boolean
  isExpanded: boolean
  onClick: () => void
}

function FileTreeItem({
  node,
  depth,
  isActive,
  isExpanded,
  onClick,
}: FileTreeItemProps) {
  const indent = depth * 12 + 8

  const icon = node.type === "folder" 
    ? (isExpanded ? "▼" : "▶") 
    : node.icon || "◦"

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left py-0.5 flex items-center gap-2 transition-colors",
        "hover:bg-bg-highlight",
        isActive && "bg-bg-selection border-l-2 border-accent",
        !isActive && "border-l-2 border-transparent"
      )}
      style={{ paddingLeft: indent }}
    >
      <Text 
        variant={node.type === "folder" ? "muted" : "dim"} 
        className="w-4 text-center text-xs"
      >
        {icon}
      </Text>
      <Text 
        variant={isActive ? "bright" : node.type === "folder" ? "default" : "dim"}
        className={cn(
          "truncate",
          node.type === "folder" && "font-medium"
        )}
      >
        {node.name}
      </Text>
    </button>
  )
}
