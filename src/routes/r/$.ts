import { createFileRoute } from "@tanstack/react-router"

// GitHub repo mapping - add future OSS projects here
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  // "context-layer": "MitchForest/context-layer",
}

// Cache duration in seconds
const CACHE_TTL = 3600 // 1 hour
const STALE_TTL = 86400 // 24 hours (serve stale while revalidating)

export const Route = createFileRoute("/r/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat || ""

        // Parse: {project}/{...rest}
        const [project, ...rest] = path.split("/")
        const filePath = rest.join("/")

        if (!project || !REPOS[project]) {
          return Response.json(
            { error: "Unknown project", available: Object.keys(REPOS) },
            { status: 404 }
          )
        }

        if (!filePath) {
          return Response.json(
            { error: "No file path provided" },
            { status: 400 }
          )
        }

        const repo = REPOS[project]
        const rawUrl = `https://raw.githubusercontent.com/${repo}/main/${filePath}`

        try {
          const response = await fetch(rawUrl, {
            headers: {
              "User-Agent": "mitchforest.com-registry-proxy",
            },
          })

          if (!response.ok) {
            return Response.json(
              { error: "File not found", path: filePath },
              { status: 404 }
            )
          }

          const content = await response.text()
          const contentType = getContentType(filePath)

          return new Response(content, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS",
            },
          })
        } catch (error) {
          console.error("Registry proxy error:", error)
          return Response.json(
            { error: "Failed to fetch from GitHub" },
            { status: 502 }
          )
        }
      },
    },
  },
})

function getContentType(path: string): string {
  if (path.endsWith(".json")) return "application/json"
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "text/plain; charset=utf-8"
  if (path.endsWith(".css")) return "text/css"
  return "text/plain"
}
