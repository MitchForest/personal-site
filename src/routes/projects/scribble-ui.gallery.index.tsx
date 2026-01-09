import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/projects/scribble-ui/gallery/")({
  beforeLoad: () => {
    // Redirect to the first component (button)
    throw redirect({
      to: "/projects/scribble-ui/gallery/$id",
      params: { id: "button" },
    })
  },
})
