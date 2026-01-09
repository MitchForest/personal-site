"use client"

import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  GalleryShell,
  GallerySidebar,
  GalleryStatusBar,
  GalleryTabs,
  PreviewPanel,
  PropsPanel,
  CodePanel,
  type GalleryTab,
} from "~/components/gallery"
import { useGalleryNav } from "~/hooks/use-gallery-nav"
import { components, getComponentById } from "~/data/scribble-ui-docs"

export const Route = createFileRoute("/projects/scribble-ui/gallery/$id")({
  component: GalleryPage,
})

function GalleryPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<GalleryTab>("preview")
  const [showHelp, setShowHelp] = useState(false)

  const component = getComponentById(id) || components[0]

  const handleSelectComponent = useCallback(
    (newId: string) => {
      navigate({ to: "/projects/scribble-ui/gallery/$id", params: { id: newId } })
    },
    [navigate]
  )

  const { currentIndex } = useGalleryNav({
    selectedId: component.id,
    activeTab,
    onSelectComponent: handleSelectComponent,
    onTabChange: setActiveTab,
    onShowHelp: () => setShowHelp(true),
  })

  return (
    <div className="min-h-screen bg-bg p-4">
      <GalleryShell>
        <div className="flex">
          {/* Sidebar */}
          <GallerySidebar
            selectedId={component.id}
            onSelect={handleSelectComponent}
            className="h-[70vh] sticky top-0"
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <GalleryTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              componentTitle={component.title}
            />

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
              {activeTab === "preview" && <PreviewPanel component={component} />}
              {activeTab === "props" && <PropsPanel component={component} />}
              {activeTab === "code" && <CodePanel component={component} />}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <GalleryStatusBar
          selectedId={component.id}
          selectedIndex={currentIndex}
          activeTab={activeTab}
        />
      </GalleryShell>

      {/* Help overlay */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowHelp(false)}
        >
          <div className="bg-bg border border-accent p-6 max-w-md font-mono text-sm">
            <div className="text-accent mb-4">KEYBOARD SHORTCUTS</div>
            <div className="space-y-2 text-fg-dim">
              <div className="flex justify-between">
                <span>j / ↓</span>
                <span className="text-fg-muted">Next component</span>
              </div>
              <div className="flex justify-between">
                <span>k / ↑</span>
                <span className="text-fg-muted">Previous component</span>
              </div>
              <div className="flex justify-between">
                <span>Tab</span>
                <span className="text-fg-muted">Cycle panels</span>
              </div>
              <div className="flex justify-between">
                <span>1 / 2 / 3</span>
                <span className="text-fg-muted">Jump to panel</span>
              </div>
              <div className="flex justify-between">
                <span>?</span>
                <span className="text-fg-muted">Show help</span>
              </div>
              <div className="flex justify-between">
                <span>Esc</span>
                <span className="text-fg-muted">Close overlay</span>
              </div>
            </div>
            <div className="mt-4 text-center text-fg-muted text-xs">
              Press any key to close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
