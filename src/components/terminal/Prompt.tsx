import { cn } from "~/lib/cn"
import { Text } from "./Text"
import { Cursor } from "./Cursor"
import type { ReactNode } from "react"

interface PromptProps {
  /** Current directory path */
  path?: string
  /** The command being typed/shown */
  command?: string
  /** Output from the command */
  output?: ReactNode
  /** Show blinking cursor */
  showCursor?: boolean
  /** Custom prompt symbol */
  symbol?: string
  className?: string
}

export function Prompt({
  path = "~",
  command,
  output,
  showCursor = false,
  symbol = "❯",
  className,
}: PromptProps) {
  return (
    <div className={cn("mb-2", className)}>
      {/* Command line */}
      <div className="flex items-center gap-2">
        <Text variant="muted">{path}</Text>
        <Text variant="bright">{symbol}</Text>
        {command && <Text variant="default">{command}</Text>}
        {showCursor && <Cursor />}
      </div>
      
      {/* Output */}
      {output && (
        <div className="mt-1 pl-4">
          {typeof output === "string" ? (
            <Text variant="dim" className="whitespace-pre-wrap">
              {output}
            </Text>
          ) : (
            output
          )}
        </div>
      )}
    </div>
  )
}
