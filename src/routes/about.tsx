import { createFileRoute } from "@tanstack/react-router"
import { Paragraph, Text, Comment, Prompt, AsciiTitle } from "~/components/terminal"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="max-w-2xl">
      <AsciiTitle text="ABOUT" />
      
      <Comment>about.tsx — the backstory</Comment>

      <Prompt
        path="~/about"
        command="cat README.md"
        output={
          <div className="space-y-4">
            <Paragraph>
              I'm a problem solver who happens to write code. I care about building 
              products that feel good to use and solve real problems.
            </Paragraph>

            <Paragraph>
              Currently I'm building edtech products at <Text variant="keyword">Alpha School</Text>, 
              focused on using AI to personalize learning for kids. My main project 
              is <Text variant="keyword">Scribble</Text> — a handwriting practice app 
              for children learning cursive.
            </Paragraph>

            <Paragraph>
              I split my time between <Text variant="keyword">Austin</Text>,{" "}
              <Text variant="keyword">Miami</Text>, and <Text variant="keyword">Chiang Mai</Text>.
            </Paragraph>

            <div className="mt-6 p-4 border border-border bg-bg-alt">
              <Text variant="muted" className="block mb-2">
                {"// How I build"}
              </Text>
              <ul className="space-y-1 text-fg-dim">
                <li>→ Prototype → plan → scale</li>
                <li>→ Systems over one-off solutions</li>
                <li>→ Human intent, AI execution</li>
              </ul>
            </div>
          </div>
        }
      />

      <Prompt
        path="~/about"
        command="cat links.json"
        output={
          <pre className="text-fg-dim">
{`{`}
{"\n"}  <span className="text-fg-muted">"github"</span>: <a href="https://github.com/MitchForest" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">"github.com/MitchForest"</a>,
{"\n"}  <span className="text-fg-muted">"twitter"</span>: <a href="https://twitter.com/mitchforest" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">"@mitchforest"</a>,
{"\n"}  <span className="text-fg-muted">"instagram"</span>: <a href="https://instagram.com/mitchforest_" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">"@mitchforest_"</a>
{"\n"}{`}`}
          </pre>
        }
      />

      <Prompt path="~/about" showCursor />
    </div>
  )
}
