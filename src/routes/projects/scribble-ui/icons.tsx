/**
 * Scribble Icons Showcase
 *
 * Displays all 82 Lucide-based rough icons in a visual grid.
 * Icons are rendered with the RoughIcon component which uses
 * Rough.js to create a hand-drawn aesthetic.
 */

import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { RoughIcon, lucideIconNames } from "~/components/scribble-ui"
import { cn } from "~/lib/utils"

export const Route = createFileRoute("/projects/scribble-ui/icons")({
  component: IconsShowcase,
})

function IconsShowcase() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState(24)
  const [selectedRoughness, setSelectedRoughness] = useState(1.2)
  const [selectedColor, setSelectedColor] = useState("#374151")

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          to="/projects/scribble-ui/gallery"
          className="text-fg-muted hover:text-accent text-sm mb-4 inline-block"
        >
          ← Back to Gallery
        </Link>
        <h1 className="text-3xl font-bold text-fg mb-2">Scribble Icons</h1>
        <p className="text-fg-muted max-w-2xl">
          82 hand-drawn icons powered by Rough.js. Each icon is extracted from
          Lucide's SVG paths and rendered with a sketchy, organic aesthetic.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-6 p-4 border border-border rounded-lg bg-bg-alt">
        <div className="flex items-center gap-3">
          <label className="text-sm text-fg-muted">Size:</label>
          <input
            type="range"
            min={16}
            max={48}
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-fg-dim w-8">{selectedSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-fg-muted">Roughness:</label>
          <input
            type="range"
            min={0}
            max={30}
            value={selectedRoughness * 10}
            onChange={(e) => setSelectedRoughness(Number(e.target.value) / 10)}
            className="w-24"
          />
          <span className="text-sm text-fg-dim w-8">{selectedRoughness.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-fg-muted">Color:</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Icon Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
          {lucideIconNames.map((name) => (
            <button
              key={name}
              onMouseEnter={() => setHoveredIcon(name)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => {
                navigator.clipboard.writeText(`<RoughIcon name="${name}" />`)
              }}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all",
                "hover:bg-accent/10 hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                hoveredIcon === name && "bg-accent/5"
              )}
              title={`Click to copy: <RoughIcon name="${name}" />`}
            >
              <RoughIcon
                name={name as any}
                size={selectedSize}
                color={selectedColor}
                roughness={selectedRoughness}
                seed={name.charCodeAt(0) * 7}
              />
              <span
                className={cn(
                  "text-[10px] mt-2 text-center truncate w-full transition-colors",
                  hoveredIcon === name ? "text-accent" : "text-fg-muted"
                )}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hovered Icon Detail */}
      {hoveredIcon && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bg-alt border border-border px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <RoughIcon
            name={hoveredIcon as any}
            size={32}
            color={selectedColor}
            roughness={selectedRoughness}
          />
          <div>
            <div className="font-mono text-sm text-fg">{hoveredIcon}</div>
            <div className="text-xs text-fg-muted">Click to copy usage</div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-12 text-center text-fg-muted text-sm">
        <p>
          {lucideIconNames.length} icons • Extracted from{" "}
          <a
            href="https://lucide.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Lucide
          </a>{" "}
          • ISC License
        </p>
      </div>
    </div>
  )
}
