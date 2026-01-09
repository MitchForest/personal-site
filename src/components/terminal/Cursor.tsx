import { cn } from "~/lib/cn"

interface CursorProps {
  type?: "block" | "line" | "underscore"
  className?: string
}

export function Cursor({ type = "block", className }: CursorProps) {
  const cursorStyles = {
    block: "w-[1ch] h-[1.2em] bg-accent",
    line: "w-[2px] h-[1.2em] bg-accent",
    underscore: "w-[1ch] h-[2px] bg-accent",
  }

  return (
    <span
      className={cn(
        "inline-block cursor-blink",
        cursorStyles[type],
        className
      )}
      aria-hidden
    />
  )
}
