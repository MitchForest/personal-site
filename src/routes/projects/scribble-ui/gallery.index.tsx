import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/projects/scribble-ui/gallery/")({
  beforeLoad: () => {
    throw redirect({
      to: "/projects/scribble-ui/gallery/$id",
      params: { id: "button" },
    })
  },
})
