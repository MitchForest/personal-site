import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Keyword, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="max-w-3xl">
      {/* ASCII art header */}
      <AsciiTitle text="MITCH FOREST" />

      <Comment>Problem solver building products with AI</Comment>

      {/* Social links */}
      <div className="flex gap-4 mt-4 mb-8">
        <a 
          href="https://github.com/MitchForest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-fg-dim hover:text-accent transition-colors"
        >
          [github]
        </a>
        <a 
          href="https://twitter.com/mitchforest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-fg-dim hover:text-accent transition-colors"
        >
          [twitter]
        </a>
        <a 
          href="https://www.instagram.com/mitchforest_/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-fg-dim hover:text-accent transition-colors"
        >
          [instagram]
        </a>
      </div>

      <div className="space-y-4">
        <Prompt 
          path="~" 
          command="whoami"
          output={
            <div className="space-y-2">
              <Paragraph>
                Usually based in <Keyword>Austin</Keyword>, <Keyword>Miami</Keyword>, or <Keyword>Chiang Mai</Keyword>.
              </Paragraph>
              <Paragraph>
                Currently building edtech apps for <Keyword>Alpha School</Keyword>.
              </Paragraph>
            </div>
          }
        />

        <Prompt 
          path="~" 
          command="ls projects/"
          output={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <ProjectCard 
                name="scribble" 
                description="Handwriting practice for kids"
                tech={["Swift", "React", "Hono"]}
                status="stealth"
              />
              <ProjectCard 
                name="scribble-ui" 
                description="Hand-drawn React component library"
                tech={["React", "rough.js", "Tailwind"]}
                status="open-source"
                href="/projects/scribble-ui"
              />
              <ProjectCard 
                name="context-layer" 
                description="Structured context for AI agents"
                tech={["TypeScript", "LLM"]}
                status="open-source"
                href="/projects/context-layer"
              />
              <ProjectCard 
                name="rust-terminal" 
                description="GPU-accelerated terminal inspired by Zed"
                tech={["Rust", "GPUI", "Metal"]}
                status="open-source"
                href="/projects/rust-terminal"
              />
              <ProjectCard 
                name="sweepa" 
                description="Dead-code detector for TypeScript"
                tech={["TypeScript", "ts-morph", "Call Graphs"]}
                status="open-source"
                href="/projects/sweepa"
              />
            </div>
          }
        />

        <Prompt 
          path="~" 
          command="cat stack.json"
          output={
            <CodeBlock
              code={`{
  "languages": ["TypeScript", "Swift", "Python"],
  "frontend": ["React", "SolidJS", "SwiftUI", "TailwindCSS"],
  "backend": ["Convex", "Hono", "Bun", "Drizzle", "Postgres"],
  "ai": ["Cursor (top 9% in 2025)", "Codex", "Claude Code"]
}`}
              lang="json"
              showLineNumbers={false}
            />
          }
        />

        <Prompt 
          path="~" 
          showCursor
        />
      </div>
    </div>
  )
}

function ProjectCard({ 
  name, 
  description, 
  tech,
  status,
  href,
}: { 
  name: string
  description: string
  tech: string[]
  status?: "stealth" | "open-source" | "wip"
  href?: string
}) {
  const Content = (
    <div className="p-3 border border-border hover:border-border-bright transition-colors h-full">
      <div className="flex items-center gap-2 mb-1">
        <Text variant="bright" className="block">
          {name}/
        </Text>
        {status === "stealth" && (
          <span className="text-[10px] px-1.5 py-0.5 bg-warning/20 text-warning border border-warning/30">
            STEALTH
          </span>
        )}
        {status === "open-source" && (
          <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30">
            OSS
          </span>
        )}
      </div>
      <Text variant="muted" className="block text-sm mb-2">
        {description}
      </Text>
      <div className="flex flex-wrap gap-1 mb-2">
        {tech.map((t) => (
          <span 
            key={t} 
            className="text-xs px-1.5 py-0.5 bg-bg-selection text-fg-dim"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )

  if (href) {
    return <a href={href}>{Content}</a>
  }

  return Content
}
