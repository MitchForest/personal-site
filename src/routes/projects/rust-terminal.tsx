import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle, CodeBlock } from "~/components/terminal"

export const Route = createFileRoute("/projects/rust-terminal")({
  component: RustTerminalPage,
})

function RustTerminalPage() {
  return (
    <div className="max-w-3xl">
      <AsciiTitle text="RUST TERMINAL" />
      
      <div className="flex items-center gap-3 mb-4">
        <Comment>GPU-accelerated terminal inspired by Zed</Comment>
        <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30">
          OSS
        </span>
      </div>

      <div className="mb-6">
        <a 
          href="https://github.com/MitchForest/rust-terminal" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
        >
          GitHub →
        </a>
      </div>

      <Prompt
        path="~/projects/rust-terminal"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              A hobby project building a <Text variant="keyword">GPU-accelerated terminal emulator</Text> from 
              scratch using Rust and the <Text variant="keyword">GPUI</Text> framework.
            </Paragraph>

            <Paragraph>
              Inspired by <Text variant="keyword">Zed</Text> — an excellent example of a high-performance 
              Rust application that pushes the boundaries of what native apps can feel like.
            </Paragraph>
          </div>
        }
      />

      <Prompt
        path="~/projects/rust-terminal"
        command="tree --depth 1"
        output={
          <CodeBlock
            code={`rust-terminal/
├── app/       # GPUI app, window wiring, menus
├── pty/       # PTY spawn and shell hook plumbing
├── screen/    # Terminal state model and VT parsing
├── renderer/  # GPU text rendering and tab UI
├── ui/        # Shared state, tabs model, config
└── vendor/    # Vendored GPUI and font stack`}
            lang="bash"
            showLineNumbers={false}
          />
        }
      />

      <Prompt
        path="~/projects/rust-terminal"
        command="cat tech.md"
        output={
          <div className="space-y-2 mt-2">
            <Text variant="bright" className="block">Tech Stack:</Text>
            <ul className="space-y-1 text-fg-dim ml-4">
              <li>→ <Text variant="keyword">Rust</Text> — systems programming with safety guarantees</li>
              <li>→ <Text variant="keyword">GPUI</Text> — Zed's GPU-accelerated UI framework</li>
              <li>→ <Text variant="keyword">Metal</Text> — Apple's low-level graphics API</li>
              <li>→ <Text variant="keyword">VTE</Text> — terminal state machine and ANSI parsing</li>
              <li>→ <Text variant="keyword">portable-pty</Text> — cross-platform PTY abstraction</li>
            </ul>
          </div>
        }
      />

      <Prompt
        path="~/projects/rust-terminal"
        command="cat why.md"
        output={
          <div className="space-y-4 mt-2">
            <Paragraph>
              Building a terminal from scratch is a great way to learn about 
              <Text variant="keyword"> PTYs</Text>, <Text variant="keyword">VT escape sequences</Text>, 
              and <Text variant="keyword">GPU rendering</Text>.
            </Paragraph>
            <Paragraph>
              It's also just fun to use software you built yourself every day.
            </Paragraph>
          </div>
        }
      />

    </div>
  )
}
