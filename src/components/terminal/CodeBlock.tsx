import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import { cn } from "~/lib/cn"
import { Text } from "./Text"

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  code,
  lang = "typescript",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function highlight() {
      try {
        const result = await codeToHtml(code.trim(), {
          lang,
          theme: "vitesse-dark",
          transformers: [
            {
              line(node, line) {
                if (highlightLines.includes(line)) {
                  this.addClassToHast(node, "highlighted")
                }
                if (showLineNumbers) {
                  node.children.unshift({
                    type: "element",
                    tagName: "span",
                    properties: { class: "line-number" },
                    children: [{ type: "text", value: String(line).padStart(3, " ") }],
                  })
                }
              },
            },
          ],
        })
        setHtml(result)
      } catch {
        // Fallback to plain text if highlighting fails
        setHtml(`<pre class="shiki"><code>${code}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }
    highlight()
  }, [code, lang, showLineNumbers, highlightLines])

  return (
    <div className={cn("border border-border overflow-hidden", className)}>
      {/* Filename header */}
      {filename && (
        <div className="px-3 py-1.5 bg-bg-alt border-b border-border flex items-center gap-2">
          <Text variant="muted" className="text-xs">◇</Text>
          <Text variant="dim" className="text-xs">{filename}</Text>
        </div>
      )}
      
      {/* Code content */}
      <div 
        className={cn(
          "p-3 overflow-x-auto text-sm",
          "[&_.shiki]:bg-transparent [&_.shiki]:m-0",
          "[&_code]:block [&_code]:w-fit [&_code]:min-w-full",
          "[&_.line]:block [&_.line]:px-1",
          "[&_.line.highlighted]:bg-bg-selection",
          "[&_.line-number]:text-fg-comment [&_.line-number]:mr-4 [&_.line-number]:select-none",
          isLoading && "animate-pulse"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
