import { cn } from "~/lib/cn"
import type { ReactNode } from "react"

type TextVariant =
  | "default"      // Normal fg
  | "bright"       // Bright green
  | "dim"          // Dimmer green  
  | "muted"        // Very dim
  | "comment"      // Comment color (like code comments)
  | "error"        // Red
  | "warning"      // Yellow
  | "info"         // Blue
  | "keyword"      // Accent (for special terms)

type TextElement = "span" | "p" | "h1" | "h2" | "h3" | "code" | "pre"

interface TextProps {
  children: ReactNode
  variant?: TextVariant
  as?: TextElement
  className?: string
  /** Monospace (default true) */
  mono?: boolean
}

const variantStyles: Record<TextVariant, string> = {
  default: "text-fg",
  bright: "text-fg-bright",
  dim: "text-fg-dim",
  muted: "text-fg-muted",
  comment: "text-fg-comment",
  error: "text-error",
  warning: "text-warning",
  info: "text-info",
  keyword: "text-accent font-semibold",
}

export function Text({
  children,
  variant = "default",
  as: Element = "span",
  className,
  mono = true,
}: TextProps) {
  return (
    <Element
      className={cn(
        variantStyles[variant],
        mono && "font-mono",
        className
      )}
    >
      {children}
    </Element>
  )
}

// Convenience components
export function Heading1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text as="h1" variant="bright" className={cn("text-xl mb-4", className)}>
      {children}
    </Text>
  )
}

export function Heading2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text as="h2" variant="bright" className={cn("text-lg mb-3", className)}>
      {children}
    </Text>
  )
}

export function Paragraph({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text as="p" variant="dim" className={cn("mb-4 leading-relaxed", className)}>
      {children}
    </Text>
  )
}

export function Comment({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text variant="comment" className={className}>
      {`// ${children}`}
    </Text>
  )
}

export function Keyword({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text variant="keyword" className={className}>
      {children}
    </Text>
  )
}
