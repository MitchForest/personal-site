import { defineEventHandler, getRouterParam, setResponseHeaders } from "h3"

// GitHub repo mapping - add future OSS projects here
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  // "context-layer": "MitchForest/context-layer",
}

// Cache duration in seconds
const CACHE_TTL = 3600 // 1 hour
const STALE_TTL = 86400 // 24 hours (serve stale while revalidating)

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path") || ""
  
  // Parse: {project}/{...rest}
  const [project, ...rest] = path.split("/")
  const filePath = rest.join("/")
  
  if (!project || !REPOS[project]) {
    setResponseHeaders(event, { "Content-Type": "application/json" })
    return { error: "Unknown project", available: Object.keys(REPOS) }
  }
  
  if (!filePath) {
    setResponseHeaders(event, { "Content-Type": "application/json" })
    return { error: "No file path provided" }
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
      setResponseHeaders(event, { "Content-Type": "application/json" })
      return { error: "File not found", path: filePath }
    }
    
    const content = await response.text()
    
    // Determine content type
    const contentType = getContentType(filePath)
    
    setResponseHeaders(event, {
      "Content-Type": contentType,
      // Stale-while-revalidate caching
      "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
      // CORS for shadcn CLI
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    })
    
    return content
  } catch (error) {
    console.error("Registry proxy error:", error)
    setResponseHeaders(event, { "Content-Type": "application/json" })
    return { error: "Failed to fetch from GitHub" }
  }
})

function getContentType(path: string): string {
  if (path.endsWith(".json")) return "application/json"
  if (path.endsWith(".tsx") || path.endsWith(".ts")) return "text/plain; charset=utf-8"
  if (path.endsWith(".css")) return "text/css"
  return "text/plain"
}
