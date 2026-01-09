import { createFileRoute } from "@tanstack/react-router"

// GitHub repo mapping - add future OSS projects here
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  // "context-layer": "MitchForest/context-layer",
}

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

async function fetchRegistry(repo: string): Promise<Registry | null> {
  const url = `https://raw.githubusercontent.com/${repo}/main/registry.json`
  const response = await fetch(url, {
    headers: { "User-Agent": "mitchforest.com-registry-proxy" },
    // Bypass GitHub's CDN cache to get fresh content
    cache: "no-store",
  })

  if (!response.ok) return null

  return response.json() as Promise<Registry>
}

async function fetchFileContent(repo: string, filePath: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${repo}/main/${filePath}`
  const response = await fetch(url, {
    headers: { "User-Agent": "mitchforest.com-registry-proxy" },
    cache: "no-store",
  })

  if (!response.ok) return null
  return response.text()
}

function getHeaders() {
  return {
    // No caching - always serve fresh from GitHub
    "Cache-Control": "no-store, no-cache, must-revalidate",
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
          return Response.json(registry, { headers: getHeaders() })
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
          // All scribble-ui files go to components/scribble-ui/ to keep imports simple
          // (The lib/hooks are scribble-specific, not generic utilities)
          const filesWithContent = await Promise.all(
            item.files.map(async (file) => {
              const content = await fetchFileContent(repo, file.path)
              const relativePath = file.path.replace(/^registry\//, "")
              
              // All files go to components/scribble-ui/{path}
              // This keeps relative imports working (e.g., ./lib/utils)
              const target = `components/scribble-ui/${relativePath}`
              
              return {
                path: file.path,
                type: file.type, // Preserve original type (registry:lib, registry:component, etc.)
                target,
                content: content || "",
              }
            })
          )

          // registryDependencies use bare names (e.g., "lib", "button")
          // The shadcn CLI will prepend @scribble-ui/ automatically when resolving
          const registryDeps = item.registryDependencies

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

          return Response.json(registryItem, { headers: getHeaders() })
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
              ...getHeaders(),
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
