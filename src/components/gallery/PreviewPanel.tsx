"use client"

import { cn } from "~/lib/utils"
import type { ComponentDoc } from "~/data/scribble-ui-docs"
import { ComponentPreview } from "./ComponentPreview"

interface PreviewPanelProps {
  component: ComponentDoc
  className?: string
}

export function PreviewPanel({ component, className }: PreviewPanelProps) {
  return (
    <div className={cn("p-4 space-y-6", className)}>
      {/* Description */}
      <p className="text-fg-dim text-sm leading-relaxed max-w-xl">
        {component.description}
      </p>

      {/* Variants section */}
      <div className="border border-border/50">
        <div className="border-b border-border/50 px-3 py-1 text-xs text-fg-muted">
          ─ Variants
        </div>
        <div className="p-4 space-y-6 bg-white/5">
          {component.variants.map((variant) => (
            <div key={variant.name} className="flex items-center gap-6">
              <div className="min-w-[200px] flex justify-center">
                <ComponentPreview
                  componentId={component.id}
                  componentName={component.name}
                  props={variant.props}
                />
              </div>
              <div className="text-xs text-fg-muted font-mono">
                {Object.entries(variant.props).map(([key, value]) => (
                  <span key={key}>
                    {key}=<span className="text-accent">"{String(value)}"</span>
                  </span>
                ))}
                {Object.keys(variant.props).length === 0 && (
                  <span className="text-fg-dim italic">default</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
