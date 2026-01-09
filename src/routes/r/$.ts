import { createFileRoute } from "@tanstack/react-router"

// GitHub repo mapping - add future OSS projects here
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  // "context-layer": "MitchForest/context-layer",
}

// Cache duration in seconds
const CACHE_TTL = 3600 // 1 hour
const STALE_TTL = 86400 // 24 hours (serve stale while revalidating)

interface RegistryFile {
  path: string
  type: string
  target?: string
}

interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  cssVars?: Record<string, unknown>
}

interface Registry {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

// Cache the registry.json in memory (refreshed on cold start)
let registryCache: Record<string, Registry> = {}

async function fetchRegistry(repo: string): Promise<Registry | null> {
  if (registryCache[repo]) {
    return registryCache[repo]
  }

  const url = `https://raw.githubusercontent.com/${repo}/main/registry.json`
  const response = await fetch(url, {
    headers: { "User-Agent": "mitchforest.com-registry-proxy" },
  })

  if (!response.ok) return null

  const registry = await response.json() as Registry
  registryCache[repo] = registry
  return registry
}

async function fetchFileContent(repo: string, filePath: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${repo}/main/${filePath}`
  const response = await fetch(url, {
    headers: { "User-Agent": "mitchforest.com-registry-proxy" },
  })

  if (!response.ok) return null
  return response.text()
}

function getCacheHeaders() {
  return {
    "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  }
}

export const Route = createFileRoute("/r/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat || ""

        // Parse: {project}/{componentName}.json or {project}/registry.json
        const [project, ...rest] = path.split("/")
        const filePath = rest.join("/")

        if (!project || !REPOS[project]) {
          return Response.json(
            { error: "Unknown project", available: Object.keys(REPOS) },
            { status: 404 }
          )
        }

        const repo = REPOS[project]

        // Handle registry.json request - return the full registry
        if (filePath === "registry.json") {
          const registry = await fetchRegistry(repo)
          if (!registry) {
            return Response.json(
              { error: "Registry not found" },
              { status: 404 }
            )
          }
          return Response.json(registry, { headers: getCacheHeaders() })
        }

        // Handle {name}.json request - return a single component with embedded content
        if (filePath.endsWith(".json")) {
          const componentName = filePath.replace(".json", "")

          const registry = await fetchRegistry(repo)
          if (!registry) {
            return Response.json(
              { error: "Registry not found" },
              { status: 404 }
            )
          }

          const item = registry.items.find((i) => i.name === componentName)
          if (!item) {
            return Response.json(
              { error: "Component not found", name: componentName },
              { status: 404 }
            )
          }

          // Fetch content for each file and add target paths
          const filesWithContent = await Promise.all(
            item.files.map(async (file) => {
              const content = await fetchFileContent(repo, file.path)
              
              // Generate target path: all scribble-ui files go to components/scribble-ui/
              // registry/button.tsx → components/scribble-ui/button.tsx
              // registry/lib/utils.ts → components/scribble-ui/lib/utils.ts
              // registry/annotation/underline.tsx → components/scribble-ui/annotation/underline.tsx
              const relativePath = file.path.replace(/^registry\//, "")
              const target = `components/scribble-ui/${relativePath}`
              
              return {
                path: file.path,
                type: "registry:file", // Use registry:file with explicit target
                target,
                content: content || "",
              }
            })
          )

          // Transform registryDependencies to use @scribble-ui namespace
          const registryDeps = item.registryDependencies?.map((dep) => {
            // Convert "scribble-ui/button" to "@scribble-ui/button"
            if (dep.startsWith("scribble-ui/")) {
              return `@scribble-ui/${dep.replace("scribble-ui/", "")}`
            }
            return dep
          })

          const registryItem = {
            $schema: "https://ui.shadcn.com/schema/registry-item.json",
            name: item.name,
            type: item.type,
            title: item.title,
            description: item.description,
            dependencies: item.dependencies,
            devDependencies: item.devDependencies,
            registryDependencies: registryDeps,
            files: filesWithContent,
            cssVars: item.cssVars,
          }

          return Response.json(registryItem, { headers: getCacheHeaders() })
        }

        // Fallback: serve raw file (for backwards compatibility)
        const rawUrl = `https://raw.githubusercontent.com/${repo}/main/${filePath}`

        try {
          const response = await fetch(rawUrl, {
            headers: { "User-Agent": "mitchforest.com-registry-proxy" },
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
              ...getCacheHeaders(),
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
