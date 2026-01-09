import { cn } from "~/lib/utils"
import type { ComponentDoc } from "~/data/scribble-ui-docs"

interface PropsPanelProps {
  component: ComponentDoc
  className?: string
}

export function PropsPanel({ component, className }: PropsPanelProps) {
  return (
    <div className={cn("p-4", className)}>
      {/* API Reference section */}
      <div className="border border-border/50">
        <div className="border-b border-border/50 px-3 py-1 text-xs text-fg-muted">
          ─ API Reference
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-left">
                <th className="px-4 py-2 text-fg-muted font-normal">Prop</th>
                <th className="px-4 py-2 text-fg-muted font-normal">Type</th>
                <th className="px-4 py-2 text-fg-muted font-normal">Default</th>
                <th className="px-4 py-2 text-fg-muted font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map((prop, i) => (
                <tr
                  key={prop.name}
                  className={cn(
                    "border-b border-border/20",
                    i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  )}
                >
                  <td className="px-4 py-2 text-accent font-mono">{prop.name}</td>
                  <td className="px-4 py-2 text-fg-dim font-mono text-xs">
                    {prop.type}
                  </td>
                  <td className="px-4 py-2 text-fg-muted font-mono text-xs">
                    {prop.default || "—"}
                  </td>
                  <td className="px-4 py-2 text-fg-dim">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Component exports */}
      <div className="mt-6 border border-border/50">
        <div className="border-b border-border/50 px-3 py-1 text-xs text-fg-muted">
          ─ Exports
        </div>
        <div className="p-4">
          <code className="text-accent text-sm">{component.name}</code>
          {component.id === "card" && (
            <div className="mt-2 text-fg-dim text-xs space-y-1">
              <div>+ ScribbleCardHeader</div>
              <div>+ ScribbleCardTitle</div>
              <div>+ ScribbleCardDescription</div>
              <div>+ ScribbleCardContent</div>
              <div>+ ScribbleCardFooter</div>
            </div>
          )}
          {component.id === "dialog" && (
            <div className="mt-2 text-fg-dim text-xs space-y-1">
              <div>+ ScribbleDialogTrigger</div>
              <div>+ ScribbleDialogContent</div>
              <div>+ ScribbleDialogHeader</div>
              <div>+ ScribbleDialogTitle</div>
              <div>+ ScribbleDialogDescription</div>
              <div>+ ScribbleDialogFooter</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
