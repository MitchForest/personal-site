import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/projects/sweepa")({
  component: SweepaPage,
})

function SweepaPage() {
  return (
    <div className="max-w-3xl">
      <AsciiTitle text="SWEEPA" />
      
      <div className="flex items-center gap-3 mb-4">
        <Comment>Dead-code & dependency hygiene for TypeScript</Comment>
        <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30">
          OSS
        </span>
      </div>

      <div className="mb-6">
        <a 
          href="https://github.com/MitchForest/sweepa" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
        >
          GitHub →
        </a>
      </div>

      <Prompt
        path="~/projects/sweepa"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              <Text variant="keyword">Sweepa</Text> finds dead code and dependency issues in 
              TypeScript projects using <Text variant="keyword">call-graph reachability analysis</Text>.
            </Paragraph>

            <Paragraph>
              Similar to <Text variant="keyword">Knip</Text>, but with a focus on call-graph-based 
              detection for more accurate unused export detection.
            </Paragraph>
          </div>
        }
      />

      <Prompt
        path="~/projects/sweepa"
        command="sweepa scan --help"
        output={
          <CodeBlock
            code={`Usage: sweepa scan [options]

Scan a TypeScript project for dead code and dependency issues.

Options:
  -p, --project <path>    Path to tsconfig.json
  --reachability          Entry-point reachability for unused exports
  --dependencies          Only run dependency checks
  --unused-files          Only run unused file checks
  --fix                   Auto-fix safe issues
  --strict                Exit 1 if any issues found (CI)
  --format <type>         console, json, github-actions, sarif`}
            lang="bash"
            showLineNumbers={false}
          />
        }
      />

      <Prompt
        path="~/projects/sweepa"
        command="cat features.md"
        output={
          <div className="space-y-2 mt-2">
            <Text variant="bright" className="block">What it detects:</Text>
            <ul className="space-y-1 text-fg-dim ml-4">
              <li>→ <Text variant="keyword">unused-dependency</Text> — listed in package.json, not used</li>
              <li>→ <Text variant="keyword">unlisted-dependency</Text> — used but not listed</li>
              <li>→ <Text variant="keyword">misplaced-dependency</Text> — prod dep in devDeps or vice versa</li>
              <li>→ <Text variant="keyword">unused-export</Text> — exported but never imported</li>
              <li>→ <Text variant="keyword">unused-file</Text> — file not reachable from entry points</li>
              <li>→ <Text variant="keyword">unresolved-import</Text> — import can't be resolved</li>
            </ul>
          </div>
        }
      />

      <Prompt
        path="~/projects/sweepa"
        command="cat example.sh"
        output={
          <CodeBlock
            code={`# Scan a project
sweepa scan -p apps/web/tsconfig.json --reachability

# CI mode (fails on issues)
sweepa check -p apps/web/tsconfig.json

# Auto-fix dependency issues
sweepa scan -p apps/web/tsconfig.json --dependencies --fix`}
            lang="bash"
            showLineNumbers={false}
          />
        }
      />

      <Prompt
        path="~/projects/sweepa"
        command="cat tech.md"
        output={
          <div className="space-y-2 mt-2">
            <Text variant="bright" className="block">Built with:</Text>
            <ul className="space-y-1 text-fg-dim ml-4">
              <li>→ <Text variant="keyword">ts-morph</Text> — TypeScript AST manipulation</li>
              <li>→ <Text variant="keyword">graphology</Text> — graph data structure for call graphs</li>
              <li>→ <Text variant="keyword">TypeScript</Text> — module resolution and type checking</li>
            </ul>
          </div>
        }
      />

    </div>
  )
}
