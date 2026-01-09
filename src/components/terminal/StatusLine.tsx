import { cn } from "~/lib/cn"
import { Text } from "./Text"

type Mode = "NORMAL" | "INSERT" | "VISUAL" | "COMMAND"

interface StatusLineProps {
  /** Current vim mode */
  mode?: Mode
  /** Current file/page path */
  filePath?: string
  /** File type indicator */
  fileType?: string
  /** Current line/position */
  position?: string
  /** Git branch */
  branch?: string
  /** Additional status items */
  items?: Array<{ label: string; value: string }>
  className?: string
}

const modeColors: Record<Mode, string> = {
  NORMAL: "bg-accent text-bg font-bold",
  INSERT: "bg-info text-bg font-bold",
  VISUAL: "bg-warning text-bg font-bold",
  COMMAND: "bg-error text-bg font-bold",
}

export function StatusLine({
  mode = "NORMAL",
  filePath = "~/mitch.dev",
  fileType = "tsx",
  position = "1:1",
  branch,
  items = [],
  className,
}: StatusLineProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "h-6 px-2 text-xs",
        "bg-bg-alt border-t border-border",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-2">
        {/* Mode indicator */}
        <span
          className={cn(
            "px-2 py-0.5 font-bold text-[10px]",
            modeColors[mode]
          )}
        >
          {mode}
        </span>

        {/* Git branch */}
        {branch && (
          <Text variant="muted" className="flex items-center gap-1">
            <span>⎇</span>
            {branch}
          </Text>
        )}

        {/* File path */}
        <Text variant="dim">{filePath}</Text>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Custom items */}
        {items.map((item) => (
          <Text key={item.label} variant="muted">
            {item.label}: <Text variant="dim">{item.value}</Text>
          </Text>
        ))}

        {/* File type */}
        <Text variant="muted">{fileType}</Text>

        {/* Position */}
        <Text variant="dim">{position}</Text>
      </div>
    </div>
  )
}
