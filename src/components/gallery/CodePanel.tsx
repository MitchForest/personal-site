import { cn } from "~/lib/utils"
import type { ComponentDoc } from "~/data/scribble-ui-docs"
import { CodeBlock } from "~/components/terminal/CodeBlock"

interface CodePanelProps {
  component: ComponentDoc
  className?: string
}

export function CodePanel({ component, className }: CodePanelProps) {
  const installCommand = `npx shadcn@latest add @scribble-ui/${component.id}`

  return (
    <div className={cn("p-4 space-y-6", className)}>
      {/* Install section */}
      <div className="border border-border/50">
        <div className="border-b border-border/50 px-3 py-1 text-xs text-fg-muted">
          ─ Install
        </div>
        <div className="p-4 bg-black/20">
          <div className="flex items-center gap-2">
            <span className="text-accent">$</span>
            <code className="text-fg text-sm font-mono">{installCommand}</code>
          </div>
        </div>
      </div>

      {/* Usage section */}
      <div className="border border-border/50">
        <div className="border-b border-border/50 px-3 py-1 text-xs text-fg-muted">
          ─ Usage
        </div>
        <div className="p-4 bg-black/20">
          <CodeBlock code={component.usage} lang="tsx" showLineNumbers={false} />
        </div>
      </div>

      {/* Registry info */}
      <div className="text-xs text-fg-muted space-y-2">
        <div>
          <span className="text-fg-dim">Registry:</span>{" "}
          <a
            href="https://mitchforest.com/r/scribble-ui/registry.json"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            mitchforest.com/r/scribble-ui
          </a>
        </div>
        <div>
          <span className="text-fg-dim">Source:</span>{" "}
          <a
            href={`https://github.com/MitchForest/scribble-ui/blob/main/registry/${component.id}.tsx`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
