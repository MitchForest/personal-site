"use client"

import {
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
} from "~/components/scribble-ui"

import {
  ScribbleUnderline,
  ScribbleHighlight,
  ScribbleBracket,
  ScribbleCircle,
  ScribbleBox,
  ScribbleCrossedOff,
} from "~/components/scribble-ui"

import {
  ScribbleArrow,
  ScribbleDivider,
  ScribbleDoodle,
  ScribbleHeart,
  ScribbleStar,
  ScribbleTape,
  ScribbleCircleBadge,
} from "~/components/scribble-ui"

interface ComponentPreviewProps {
  componentId: string
  componentName: string
  props: Record<string, unknown>
}

/**
 * Renders a live preview of a scribble-ui component
 */
export function ComponentPreview({ componentId, props }: ComponentPreviewProps) {
  // Core components
  if (componentId === "button") {
    return (
      <ScribbleButton {...props}>
        {(props.variant as string) || "Primary"} Button
      </ScribbleButton>
    )
  }

  if (componentId === "card") {
    return (
      <ScribbleCard className="w-48" {...props}>
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
    return <ScribbleBadge {...props}>Badge</ScribbleBadge>
  }

  if (componentId === "input") {
    return <ScribbleInput placeholder="Type here..." className="w-48" {...props} />
  }

  if (componentId === "textarea") {
    return <ScribbleTextarea placeholder="Write something..." className="w-48" rows={2} {...props} />
  }

  if (componentId === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <ScribbleCheckbox id="demo" {...props} />
        <ScribbleLabel htmlFor="demo">Check me</ScribbleLabel>
      </div>
    )
  }

  if (componentId === "label") {
    return <ScribbleLabel>Label Text</ScribbleLabel>
  }

  if (componentId === "toggle") {
    return <ScribbleToggle {...props}>Toggle</ScribbleToggle>
  }

  if (componentId === "progress") {
    return <ScribbleProgress value={props.value as number || 60} className="w-48" />
  }

  if (componentId === "skeleton") {
    return <ScribbleSkeleton className="h-8 w-48" />
  }

  if (componentId === "avatar") {
    return <ScribbleAvatar fallback="JD" />
  }

  if (componentId === "rating") {
    return <ScribbleRating value={props.value as number || 3} max={5} />
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
    return <ScribbleArrow direction={props.direction as "up" | "down" | "left" | "right"} size={32} />
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
