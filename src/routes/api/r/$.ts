import { createFileRoute } from "@tanstack/react-router"
import { createAPIFileRoute } from "@tanstack/react-start/api"

// GitHub repo mapping - add future OSS projects here
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  // "context-layer": "MitchForest/context-layer",
}

// Cache duration in seconds
const CACHE_TTL = 3600 // 1 hour
const STALE_TTL = 86400 // 24 hours (serve stale while revalidating)

export const Route = createAPIFileRoute("/api/r/$")({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const path = url.pathname.replace("/api/r/", "")
    
    // Parse: {project}/{...rest}
    const [project, ...rest] = path.split("/")
    const filePath = rest.join("/")
    
    if (!project || !REPOS[project]) {
      return new Response(
        JSON.stringify({ error: "Unknown project", available: Object.keys(REPOS) }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      )
    }
    
    if (!filePath) {
      return new Response(
        JSON.stringify({ error: "No file path provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
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
        return new Response(
          JSON.stringify({ error: "File not found", path: filePath }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        )
      }
      
      const content = await response.text()
      
      // Determine content type
      const contentType = getContentType(filePath)
      
      return new Response(content, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          // Stale-while-revalidate caching
          "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
          // CORS for shadcn CLI
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      })
    } catch (error) {
      console.error("Registry proxy error:", error)
      return new Response(
        JSON.stringify({ error: "Failed to fetch from GitHub" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      )
    }
  },
})

function getContentType(path: string): string {
  if (path.endsWith(".json")) return "application/json"
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "text/plain; charset=utf-8"
  if (path.endsWith(".css")) return "text/css"
  return "text/plain"
}
