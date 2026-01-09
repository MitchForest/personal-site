import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/projects/scribble")({
  component: ScribblePage,
})

function ScribblePage() {
  return (
    <div className="max-w-2xl">
      <AsciiTitle text="SCRIBBLE" />
      
      <div className="flex items-center gap-3 mb-6">
        <Comment>Handwriting practice for kids learning cursive</Comment>
        <span className="text-[10px] px-1.5 py-0.5 bg-warning/20 text-warning border border-warning/30">
          STEALTH
        </span>
      </div>

      <Prompt
        path="~/projects/scribble"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              <Text variant="keyword">Scribble</Text> is a handwriting practice platform 
              for children learning cursive. Built for <Text variant="keyword">Alpha School</Text>.
            </Paragraph>

            <Paragraph>
              The app validates handwriting in real-time using Apple Pencil, providing 
              immediate feedback as kids trace letters and words.
            </Paragraph>

            <div className="grid gap-3 mt-4">
              <ArchitectureCard
                title="iPad App"
                tech="SwiftUI + SwiftData + PencilKit"
                description="Main practice interface with Apple Pencil support and real-time validation."
              />
              <ArchitectureCard
                title="Web Dashboard"
                tech="React + TanStack + Tailwind"
                description="Parent/teacher dashboard for tracking progress and managing students."
              />
              <ArchitectureCard
                title="API Backend"
                tech="Hono + Bun + Drizzle + Supabase"
                description="REST API handling auth, sync, and data persistence."
              />
            </div>
          </div>
        }
      />

      <Prompt
        path="~/projects/scribble"
        command="tree -L 1"
        output={
          <CodeBlock
            code={`.
├── apps/
│   ├── ios/        # iPad app (Swift)
│   ├── web/        # Dashboard (React)
│   └── api/        # Backend (Hono)
├── AppAssets/      # Curriculum, fonts
└── tools/          # Validation scripts`}
            lang="bash"
            showLineNumbers={false}
          />
        }
      />

      <Text variant="muted" className="block mt-6 text-sm">
        This project is currently in stealth. Reach out if you'd like to learn more.
      </Text>
    </div>
  )
}

function ArchitectureCard({
  title,
  tech,
  description,
}: {
  title: string
  tech: string
  description: string
}) {
  return (
    <div className="p-3 border border-border">
      <div className="flex items-baseline justify-between mb-1">
        <Text variant="bright">{title}</Text>
        <Text variant="muted" className="text-xs">{tech}</Text>
      </div>
      <Text variant="dim" className="text-sm leading-relaxed">
        {description}
      </Text>
    </div>
  )
}
