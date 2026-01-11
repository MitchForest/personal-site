import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/projects/scribble-ui")({
  component: ScribbleUILayout,
})

/**
 * Layout wrapper for scribble-ui routes.
 * The actual content is in scribble-ui/index.tsx
 */
function ScribbleUILayout() {
  return <Outlet />
}
