import { cn } from "~/lib/cn"
import { FileTree, StatusLine, type FileTreeNode } from "~/components/terminal"
import type { ReactNode } from "react"

interface ShellProps {
  children: ReactNode
  currentPath?: string
  className?: string
}

// Site navigation structure
const navItems: FileTreeNode[] = [
  {
    id: "root",
    name: "mitchforest.com",
    type: "folder",
    children: [
      {
        id: "home",
        name: "index.tsx",
        type: "file",
        href: "/",
        icon: "◇",
      },
      {
        id: "about",
        name: "about.tsx",
        type: "file",
        href: "/about",
        icon: "◇",
      },
      {
        id: "projects-folder",
        name: "projects",
        type: "folder",
        children: [
          {
            id: "scribble",
            name: "scribble.tsx",
            type: "file",
            href: "/projects/scribble",
            icon: "🔒",
          },
          {
            id: "scribble-ui",
            name: "scribble-ui.tsx",
            type: "file",
            href: "/projects/scribble-ui",
            icon: "✎",
          },
          {
            id: "context-layer",
            name: "context-layer.tsx",
            type: "file",
            href: "/projects/context-layer",
            icon: "◈",
          },
          {
            id: "rust-terminal",
            name: "rust-terminal.tsx",
            type: "file",
            href: "/projects/rust-terminal",
            icon: "▣",
          },
          {
            id: "sweepa",
            name: "sweepa.tsx",
            type: "file",
            href: "/projects/sweepa",
            icon: "⌫",
          },
        ],
      },
      {
        id: "blog-folder",
        name: "blog",
        type: "folder",
        children: [
          {
            id: "blog-index",
            name: "index.tsx",
            type: "file",
            href: "/blog",
            icon: "◇",
          },
        ],
      },
    ],
  },
]

export function Shell({ children, currentPath = "/", className }: ShellProps) {
  // Convert route path to file path display
  const filePath = currentPath === "/" 
    ? "~/mitchforest.com/index.tsx" 
    : `~/mitchforest.com${currentPath}.tsx`

  return (
    <div className={cn("h-screen flex flex-col bg-bg", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-bg-alt border-b border-border">
        {/* Window controls */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error/80" />
          <div className="w-3 h-3 rounded-full bg-warning/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
        </div>
        
        {/* Title */}
        <span className="ml-4 text-fg-muted text-sm">
          mitchforest.com — nvim
        </span>

        {/* Right side - keyboard hint */}
        <span className="ml-auto text-fg-comment text-xs">
          Press ? for help
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - File tree */}
        <aside className="w-56 border-r border-border bg-bg-alt overflow-y-auto">
          <FileTree items={navItems} />
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Status line */}
      <StatusLine 
        mode="NORMAL"
        filePath={filePath}
        fileType="tsx"
        position="1:1"
        branch="main"
      />
    </div>
  )
}
