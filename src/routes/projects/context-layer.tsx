import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/projects/context-layer")({
  component: ContextLayerPage,
})

function ContextLayerPage() {
  return (
    <div className="max-w-3xl">
      <AsciiTitle text="CONTEXT LAYER" />
      
      <div className="flex items-center gap-3 mb-6">
        <Comment>Structured context for AI agents</Comment>
        <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30">
          OSS
        </span>
      </div>

      <Prompt
        path="~/projects/context-layer"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              <Text variant="keyword">Context Layer</Text> is a specification and 
              tooling for providing structured context to AI coding agents.
            </Paragraph>

            <Paragraph>
              Instead of stuffing everything into a single prompt, Context Layer 
              organizes context into layers that AI can query as needed — like 
              giving an agent access to documentation, codebase knowledge, and 
              project conventions on demand.
            </Paragraph>
          </div>
        }
      />

      <Prompt
        path="~/projects/context-layer"
        command="cat example.ts"
        output={
          <CodeBlock
            code={`// Define your project's context layers
export const contextLayers = {
  // High-level project info (always included)
  project: {
    name: "my-app",
    description: "A web app for...",
    conventions: ["Use Tailwind", "Prefer server components"],
  },
  
  // Module-specific context (included when relevant)
  modules: {
    auth: { /* auth patterns, schemas */ },
    api: { /* API conventions, endpoints */ },
    ui: { /* component patterns, design system */ },
  },
  
  // On-demand lookups
  docs: async (query) => searchDocs(query),
  codebase: async (query) => searchCode(query),
}`}
            lang="typescript"
            filename="context-layer.config.ts"
          />
        }
      />

      <Prompt
        path="~/projects/context-layer"
        command="cat philosophy.md"
        output={
          <div className="space-y-2 mt-2">
            <Text variant="bright" className="block">Core Ideas:</Text>
            <ul className="space-y-1 text-fg-dim ml-4">
              <li>→ Context should be <Text variant="keyword">structured</Text>, not a wall of text</li>
              <li>→ Agents should <Text variant="keyword">pull</Text> context, not have it pushed</li>
              <li>→ <Text variant="keyword">Layers</Text> separate concerns (project, module, task)</li>
              <li>→ Context is <Text variant="keyword">executable</Text> — can include functions</li>
            </ul>
          </div>
        }
      />

      <div className="mt-6 flex gap-4">
        <a 
          href="https://github.com/MitchForest/context-layer" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
        >
          → View on GitHub
        </a>
        <a 
          href="https://github.com/MitchForest/context-layer" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-accent bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm flex items-center gap-1.5"
        >
          <span>★</span> Star this project
        </a>
      </div>
    </div>
  )
}
