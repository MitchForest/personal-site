import { createFileRoute, Link } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/projects/scribble-ui/")({
  component: ScribbleUIPage,
})

function ScribbleUIPage() {
  return (
    <div className="max-w-2xl">
      <AsciiTitle text="SCRIBBLE UI" />
      
      <div className="flex items-center gap-3 mb-4">
        <Comment>Hand-drawn React components powered by rough.js</Comment>
        <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30">
          OSS
        </span>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/projects/scribble-ui/gallery/$id"
          params={{ id: "button" }}
          className="px-4 py-2 bg-accent text-bg hover:bg-accent/90 transition-colors text-sm font-medium"
        >
          → View Gallery
        </Link>
        <Link
          to="/projects/scribble-ui/icons"
          className="px-3 py-1.5 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
        >
          ✏️ Icons (82)
        </Link>
        <a 
          href="https://github.com/MitchForest/scribble-ui" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
        >
          GitHub →
        </a>
      </div>

      <Prompt
        path="~/projects/scribble-ui"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              <Text variant="keyword">Scribble UI</Text> is a React component library 
              with a hand-drawn, sketchy aesthetic. Every component renders with 
              organic, wobbly lines that feel alive.
            </Paragraph>

            <Paragraph>
              Built on <Text variant="info">rough.js</Text> and distributed as a 
              shadcn-style registry — copy the components you need into your project.
            </Paragraph>
          </div>
        }
      />

      <Prompt
        path="~/projects/scribble-ui"
        command="ls registry/"
        output={
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              "button.tsx",
              "card.tsx", 
              "dialog.tsx",
              "select.tsx",
              "input.tsx",
              "checkbox.tsx",
              "badge.tsx",
              "avatar.tsx",
              "progress.tsx",
              "tooltip.tsx",
              "toast.tsx",
              "accordion.tsx",
            ].map((name) => (
              <Text key={name} variant="dim" className="text-sm">
                {name}
              </Text>
            ))}
          </div>
        }
      />

      <Prompt
        path="~/projects/scribble-ui"
        command="cat example.tsx"
        output={
          <CodeBlock
            code={`import { ScribbleButton, ScribbleCard } from "~/components/scribble-ui"

export function Demo() {
  return (
    <ScribbleCard>
      <h2>Hand-drawn UI</h2>
      <p>Components that feel alive</p>
      <ScribbleButton variant="primary">
        Get Started
      </ScribbleButton>
    </ScribbleCard>
  )
}`}
            lang="tsx"
            filename="example.tsx"
          />
        }
      />

    </div>
  )
}
