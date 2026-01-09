"use client"

import { useState, useEffect, type ReactNode } from "react"

interface ComponentPreviewProps {
  componentId: string
  componentName: string
  props: Record<string, unknown>
}

/**
 * Renders a live preview of a scribble-ui component
 * Only renders on client to avoid SSR issues with rough.js
 */
export function ComponentPreview({ componentId, props }: ComponentPreviewProps) {
  const [component, setComponent] = useState<ReactNode>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dynamic import on client only
    import("~/components/scribble-ui")
      .then((ScribbleUI) => {
        const rendered = renderComponent(componentId, props, ScribbleUI)
        setComponent(rendered)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load scribble-ui:", err)
        setComponent(<div className="text-red-500 text-xs">Error: {String(err)}</div>)
        setIsLoading(false)
      })
  }, [componentId, props])

  if (isLoading) {
    return (
      <div className="h-10 w-32 bg-bg-alt animate-pulse rounded flex items-center justify-center text-xs text-fg-muted">
        Loading...
      </div>
    )
  }

  return <>{component}</>
}

// Render the appropriate component based on ID
function renderComponent(
  componentId: string,
  props: Record<string, unknown>,
  ScribbleUI: typeof import("~/components/scribble-ui")
) {
  const {
    ScribbleButton,
    ScribbleCard,
    ScribbleCardHeader,
    ScribbleCardTitle,
    ScribbleCardContent,
    ScribbleBadge,
    ScribbleInput,
    ScribbleCheckbox,
    ScribbleLabel,
    ScribbleTextarea,
    ScribbleToggle,
    ScribbleProgress,
    ScribbleSkeleton,
    ScribbleAvatar,
    ScribbleRating,
    ScribbleLink,
    ScribbleUnderline,
    ScribbleHighlight,
    ScribbleBracket,
    ScribbleCircle,
    ScribbleBox,
    ScribbleCrossedOff,
    ScribbleArrow,
    ScribbleDivider,
    ScribbleDoodle,
    ScribbleHeart,
    ScribbleStar,
    ScribbleTape,
    ScribbleCircleBadge,
  } = ScribbleUI

  // Core components
  if (componentId === "button") {
    return (
      <ScribbleButton {...(props as any)}>
        {(props.variant as string) || "Primary"} Button
      </ScribbleButton>
    )
  }

  if (componentId === "card") {
    return (
      <ScribbleCard className="w-48" {...(props as any)}>
        <ScribbleCardHeader>
          <ScribbleCardTitle>Card Title</ScribbleCardTitle>
        </ScribbleCardHeader>
        <ScribbleCardContent>
          <p className="text-sm text-muted-foreground">Card content</p>
        </ScribbleCardContent>
      </ScribbleCard>
    )
  }

  if (componentId === "badge") {
    return <ScribbleBadge {...(props as any)}>Badge</ScribbleBadge>
  }

  if (componentId === "input") {
    return <ScribbleInput placeholder="Type here..." className="w-48" {...(props as any)} />
  }

  if (componentId === "textarea") {
    return <ScribbleTextarea placeholder="Write something..." className="w-48" rows={2} {...(props as any)} />
  }

  if (componentId === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <ScribbleCheckbox id="demo" {...(props as any)} />
        <ScribbleLabel htmlFor="demo">Check me</ScribbleLabel>
      </div>
    )
  }

  if (componentId === "label") {
    return <ScribbleLabel>Label Text</ScribbleLabel>
  }

  if (componentId === "toggle") {
    return <ScribbleToggle {...(props as any)}>Toggle</ScribbleToggle>
  }

  if (componentId === "progress") {
    return <ScribbleProgress value={(props.value as number) || 60} className="w-48" />
  }

  if (componentId === "skeleton") {
    return <ScribbleSkeleton className="h-8 w-48" />
  }

  if (componentId === "avatar") {
    return <ScribbleAvatar fallback="JD" />
  }

  if (componentId === "rating") {
    return <ScribbleRating value={(props.value as number) || 3} max={5} />
  }

  if (componentId === "link") {
    return <ScribbleLink href="#">Click me</ScribbleLink>
  }

  // Annotation components
  if (componentId === "annotation-underline") {
    return (
      <ScribbleUnderline animate={props.animate as boolean}>
        Underlined text
      </ScribbleUnderline>
    )
  }

  if (componentId === "annotation-highlight") {
    return (
      <ScribbleHighlight color={props.color as string}>
        Highlighted text
      </ScribbleHighlight>
    )
  }

  if (componentId === "annotation-bracket") {
    return (
      <ScribbleBracket side={props.side as "left" | "right"}>
        Bracketed
      </ScribbleBracket>
    )
  }

  if (componentId === "annotation-circle") {
    return (
      <ScribbleCircle animate={props.animate as boolean}>
        Circled
      </ScribbleCircle>
    )
  }

  if (componentId === "annotation-box") {
    return (
      <ScribbleBox animate={props.animate as boolean}>
        Boxed
      </ScribbleBox>
    )
  }

  if (componentId === "annotation-crossed-off") {
    return (
      <ScribbleCrossedOff animate={props.animate as boolean}>
        Crossed out
      </ScribbleCrossedOff>
    )
  }

  // Decorative components
  if (componentId === "decorative-arrow") {
    return (
      <ScribbleArrow
        direction={props.direction as "up" | "down" | "left" | "right"}
        size={32}
      />
    )
  }

  if (componentId === "decorative-divider") {
    return <ScribbleDivider className="w-48" />
  }

  if (componentId === "decorative-doodle") {
    return <ScribbleDoodle size={60} />
  }

  if (componentId === "decorative-heart") {
    return <ScribbleHeart size={32} filled={props.filled as boolean} />
  }

  if (componentId === "decorative-star") {
    return <ScribbleStar size={32} filled={props.filled as boolean} />
  }

  if (componentId === "decorative-tape") {
    return <ScribbleTape />
  }

  if (componentId === "decorative-badge") {
    return <ScribbleCircleBadge size={48}>1</ScribbleCircleBadge>
  }

  // For components that need more complex setup (dialogs, etc.), show placeholder
  return (
    <div className="text-fg-muted text-sm italic p-4 border border-dashed border-border/50 rounded">
      Interactive preview not available.
      <br />
      <span className="text-xs">See Code tab for usage.</span>
    </div>
  )
}
