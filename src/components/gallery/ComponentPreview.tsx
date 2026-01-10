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
    // Dynamic import on client only - use relative path
    import("../scribble-ui")
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
    // Core
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
    // Dialog
    ScribbleDialog,
    ScribbleDialogTrigger,
    ScribbleDialogContent,
    ScribbleDialogHeader,
    ScribbleDialogTitle,
    ScribbleDialogDescription,
    // Alert Dialog
    ScribbleAlertDialog,
    ScribbleAlertDialogTrigger,
    ScribbleAlertDialogContent,
    ScribbleAlertDialogHeader,
    ScribbleAlertDialogTitle,
    ScribbleAlertDialogDescription,
    ScribbleAlertDialogFooter,
    ScribbleAlertDialogAction,
    ScribbleAlertDialogCancel,
    // Select
    ScribbleSelect,
    ScribbleSelectTrigger,
    ScribbleSelectContent,
    ScribbleSelectItem,
    ScribbleSelectValue,
    // Tabs
    ScribbleTabs,
    ScribbleTabsList,
    ScribbleTabsTrigger,
    ScribbleTabsContent,
    // Accordion
    ScribbleAccordion,
    ScribbleAccordionItem,
    ScribbleAccordionTrigger,
    ScribbleAccordionContent,
    // Tooltip
    ScribbleTooltip,
    ScribbleTooltipTrigger,
    ScribbleTooltipContent,
    ScribbleTooltipProvider,
    // Toast
    ScribbleToaster,
    toast,
    // Table
    ScribbleTable,
    ScribbleTableHeader,
    ScribbleTableBody,
    ScribbleTableRow,
    ScribbleTableHead,
    ScribbleTableCell,
    // Input OTP
    ScribbleInputOTP,
    ScribbleInputOTPGroup,
    ScribbleInputOTPSlot,
    // Selection Card
    ScribbleSelectionCard,
    // Avatar Picker
    ScribbleAvatarPicker,
    // Annotations
    ScribbleUnderline,
    ScribbleHighlight,
    ScribbleBracket,
    ScribbleCircle,
    ScribbleBox,
    ScribbleCrossedOff,
    // Decorative
    ScribbleArrow,
    ScribbleDivider,
    ScribbleDoodle,
    ScribbleHeart,
    ScribbleStar,
    ScribbleTape,
    ScribbleCircleBadge,
    ScribbleStickyNote,
    ScribbleLogo,
    // Icons
    ScribbleIcon,
    ScribbleClose,
    ScribbleHamburger,
    ScribblePlusMinus,
    // Backgrounds
    ScribbleNotebook,
    ScribbleTornEdge,
    // Page components removed - app-specific
  } = ScribbleUI

  // Core components
  if (componentId === "button") {
    return (
      <ScribbleButton {...(props as any)}>
        {(props.variant as string) || "primary"} Button
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
          <p className="text-sm text-gray-600">Card content</p>
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
    return (
      <div className="space-y-2">
        <ScribbleLabel htmlFor="example-input">Your Name</ScribbleLabel>
        <ScribbleInput id="example-input" placeholder="Enter your name..." className="w-48" />
      </div>
    )
  }

  if (componentId === "toggle") {
    return <ScribbleToggle {...(props as any)}>Toggle</ScribbleToggle>
  }

  if (componentId === "progress") {
    return <ScribbleProgress value={(props.value as number) || 60} className="w-48" />
  }

  if (componentId === "skeleton") {
    return (
      <div className="space-y-2 w-48">
        <ScribbleSkeleton className="h-4 w-full" />
        <ScribbleSkeleton className="h-4 w-3/4" />
        <ScribbleSkeleton className="h-8 w-24" />
      </div>
    )
  }

  if (componentId === "avatar") {
    return (
      <div className="flex gap-2">
        <ScribbleAvatar src="/avatars/notionists/Aria.png" fallback="AR" />
        <ScribbleAvatar src="/avatars/notionists/Felix.png" fallback="FX" />
        <ScribbleAvatar fallback="JD" />
      </div>
    )
  }

  if (componentId === "rating") {
    return <ScribbleRating value={(props.value as number) || 3} max={5} />
  }

  if (componentId === "link") {
    return <ScribbleLink href="#">Click me</ScribbleLink>
  }

  // Dialog
  if (componentId === "dialog") {
    return (
      <ScribbleDialog>
        <ScribbleDialogTrigger asChild>
          <ScribbleButton variant="outline">Open Dialog</ScribbleButton>
        </ScribbleDialogTrigger>
        <ScribbleDialogContent>
          <ScribbleDialogHeader>
            <ScribbleDialogTitle>Dialog Title</ScribbleDialogTitle>
            <ScribbleDialogDescription>
              This is a sketchy dialog with hand-drawn borders.
            </ScribbleDialogDescription>
          </ScribbleDialogHeader>
        </ScribbleDialogContent>
      </ScribbleDialog>
    )
  }

  // Alert Dialog
  if (componentId === "alert-dialog") {
    return (
      <ScribbleAlertDialog>
        <ScribbleAlertDialogTrigger asChild>
          <ScribbleButton variant="destructive">Delete Item</ScribbleButton>
        </ScribbleAlertDialogTrigger>
        <ScribbleAlertDialogContent>
          <ScribbleAlertDialogHeader>
            <ScribbleAlertDialogTitle>Are you sure?</ScribbleAlertDialogTitle>
            <ScribbleAlertDialogDescription>
              This action cannot be undone.
            </ScribbleAlertDialogDescription>
          </ScribbleAlertDialogHeader>
          <ScribbleAlertDialogFooter>
            <ScribbleAlertDialogCancel>Cancel</ScribbleAlertDialogCancel>
            <ScribbleAlertDialogAction>Continue</ScribbleAlertDialogAction>
          </ScribbleAlertDialogFooter>
        </ScribbleAlertDialogContent>
      </ScribbleAlertDialog>
    )
  }

  // Select
  if (componentId === "select") {
    return (
      <ScribbleSelect>
        <ScribbleSelectTrigger className="w-48">
          <ScribbleSelectValue placeholder="Select option..." />
        </ScribbleSelectTrigger>
        <ScribbleSelectContent>
          <ScribbleSelectItem value="apple">Apple</ScribbleSelectItem>
          <ScribbleSelectItem value="banana">Banana</ScribbleSelectItem>
          <ScribbleSelectItem value="orange">Orange</ScribbleSelectItem>
        </ScribbleSelectContent>
      </ScribbleSelect>
    )
  }

  // Tabs
  if (componentId === "tabs") {
    return (
      <ScribbleTabs defaultValue="tab1" className="w-64">
        <ScribbleTabsList>
          <ScribbleTabsTrigger value="tab1">Tab 1</ScribbleTabsTrigger>
          <ScribbleTabsTrigger value="tab2">Tab 2</ScribbleTabsTrigger>
        </ScribbleTabsList>
        <ScribbleTabsContent value="tab1">
          <p className="text-sm p-2">Content for tab 1</p>
        </ScribbleTabsContent>
        <ScribbleTabsContent value="tab2">
          <p className="text-sm p-2">Content for tab 2</p>
        </ScribbleTabsContent>
      </ScribbleTabs>
    )
  }

  // Accordion
  if (componentId === "accordion") {
    return (
      <ScribbleAccordion type="single" collapsible className="w-64">
        <ScribbleAccordionItem value="item-1">
          <ScribbleAccordionTrigger>Section 1</ScribbleAccordionTrigger>
          <ScribbleAccordionContent>
            Content for section 1
          </ScribbleAccordionContent>
        </ScribbleAccordionItem>
        <ScribbleAccordionItem value="item-2">
          <ScribbleAccordionTrigger>Section 2</ScribbleAccordionTrigger>
          <ScribbleAccordionContent>
            Content for section 2
          </ScribbleAccordionContent>
        </ScribbleAccordionItem>
      </ScribbleAccordion>
    )
  }

  // Tooltip
  if (componentId === "tooltip") {
    return (
      <ScribbleTooltipProvider>
        <ScribbleTooltip>
          <ScribbleTooltipTrigger asChild>
            <ScribbleButton variant="outline">Hover me</ScribbleButton>
          </ScribbleTooltipTrigger>
          <ScribbleTooltipContent>
            <p>Sketchy tooltip!</p>
          </ScribbleTooltipContent>
        </ScribbleTooltip>
      </ScribbleTooltipProvider>
    )
  }

  // Toast - interactive demo
  if (componentId === "toast") {
    return <ToastDemo ScribbleButton={ScribbleButton} ScribbleToaster={ScribbleToaster} toast={toast} />
  }

  // Table
  if (componentId === "table") {
    return (
      <ScribbleTable>
        <ScribbleTableHeader>
          <ScribbleTableRow>
            <ScribbleTableHead>Name</ScribbleTableHead>
            <ScribbleTableHead>Status</ScribbleTableHead>
          </ScribbleTableRow>
        </ScribbleTableHeader>
        <ScribbleTableBody>
          <ScribbleTableRow>
            <ScribbleTableCell>Item 1</ScribbleTableCell>
            <ScribbleTableCell>Active</ScribbleTableCell>
          </ScribbleTableRow>
          <ScribbleTableRow>
            <ScribbleTableCell>Item 2</ScribbleTableCell>
            <ScribbleTableCell>Pending</ScribbleTableCell>
          </ScribbleTableRow>
        </ScribbleTableBody>
      </ScribbleTable>
    )
  }

  // Input OTP
  if (componentId === "input-otp") {
    return (
      <ScribbleInputOTP maxLength={4}>
        <ScribbleInputOTPGroup>
          <ScribbleInputOTPSlot index={0} />
          <ScribbleInputOTPSlot index={1} />
          <ScribbleInputOTPSlot index={2} />
          <ScribbleInputOTPSlot index={3} />
        </ScribbleInputOTPGroup>
      </ScribbleInputOTP>
    )
  }

  // Selection Card
  if (componentId === "selection-card") {
    return (
      <ScribbleSelectionCard 
        selected={props.selected as boolean}
        className="w-32 h-24 flex items-center justify-center"
      >
        <span className="text-sm">Select me</span>
      </ScribbleSelectionCard>
    )
  }

  // Avatar Picker - interactive demo
  if (componentId === "avatar-picker") {
    return <AvatarPickerDemo ScribbleAvatarPicker={ScribbleAvatarPicker} />
  }

  // NOTE: page-header and page-footer removed - they are scribble-app-specific

  // Annotation components
  if (componentId === "annotation-underline") {
    return (
      <ScribbleUnderline show animate={props.animate as boolean}>
        Underlined text
      </ScribbleUnderline>
    )
  }

  if (componentId === "annotation-highlight") {
    return (
      <ScribbleHighlight show color={props.color as string}>
        Highlighted text
      </ScribbleHighlight>
    )
  }

  if (componentId === "annotation-bracket") {
    return (
      <ScribbleBracket show type={props.side as "left" | "right" | "parenthesis" | "box"}>
        Bracketed
      </ScribbleBracket>
    )
  }

  if (componentId === "annotation-circle") {
    return (
      <ScribbleCircle show animate={props.animate as boolean}>
        Circled
      </ScribbleCircle>
    )
  }

  if (componentId === "annotation-box") {
    return (
      <ScribbleBox show animate={props.animate as boolean}>
        Boxed
      </ScribbleBox>
    )
  }

  if (componentId === "annotation-crossed-off") {
    return (
      <ScribbleCrossedOff show animate={props.animate as boolean}>
        Crossed out
      </ScribbleCrossedOff>
    )
  }

  // Decorative components
  if (componentId === "decorative-arrow") {
    return (
      <ScribbleArrow
        direction={props.direction as "up" | "down" | "left" | "right" || "right"}
        size={32}
      />
    )
  }

  if (componentId === "decorative-divider") {
    return <ScribbleDivider className="w-48" />
  }

  if (componentId === "decorative-doodle") {
    return (
      <div className="flex gap-4">
        <ScribbleDoodle type="sun" size={48} />
        <ScribbleDoodle type="lightbulb" size={48} />
        <ScribbleDoodle type="trophy" size={48} />
      </div>
    )
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

  if (componentId === "decorative-sticky-note") {
    return (
      <ScribbleStickyNote className="w-32 h-32">
        <p className="text-sm">A sticky note!</p>
      </ScribbleStickyNote>
    )
  }

  if (componentId === "decorative-logo") {
    return <ScribbleLogo size="md" />
  }

  // Icons
  if (componentId === "icon") {
    return (
      <div className="flex gap-4">
        <ScribbleIcon name="star" size={24} />
        <ScribbleIcon name="heart" size={24} />
        <ScribbleIcon name="check" size={24} />
      </div>
    )
  }

  if (componentId === "icon-close") {
    return <ScribbleClose size={24} />
  }

  if (componentId === "icon-hamburger") {
    return <ScribbleHamburger size={24} />
  }

  if (componentId === "icon-plus-minus") {
    return (
      <div className="flex gap-4">
        <ScribblePlusMinus isPlus size={24} />
        <ScribblePlusMinus isPlus={false} size={24} />
      </div>
    )
  }

  // Backgrounds
  if (componentId === "background-notebook") {
    return (
      <ScribbleNotebook className="w-48 h-32 p-2">
        <p className="text-sm text-gray-700">Notebook lined background</p>
      </ScribbleNotebook>
    )
  }

  if (componentId === "background-torn-edge") {
    return (
      <div className="bg-gray-300 p-4 rounded">
        <ScribbleTornEdge className="w-56 h-32 p-4 bg-[#fffef8]">
          <p className="text-sm text-gray-700">Paper with torn edge effect</p>
        </ScribbleTornEdge>
      </div>
    )
  }

  // Fallback for any missing components
  return (
    <div className="text-fg-muted text-sm italic p-4 border border-dashed border-border/50 rounded">
      Preview not implemented for: {componentId}
    </div>
  )
}

// Interactive avatar picker demo
function AvatarPickerDemo({ ScribbleAvatarPicker }: { ScribbleAvatarPicker: any }) {
  const [selected, setSelected] = useState("Aria")
  return (
    <div className="space-y-2">
      <ScribbleAvatarPicker
        value={selected}
        onChange={setSelected}
        columns={6}
        size={48}
      />
      <p className="text-xs text-gray-500 text-center">Selected: {selected}</p>
    </div>
  )
}

// Interactive toast demo
function ToastDemo({ ScribbleButton, ScribbleToaster, toast }: { ScribbleButton: any, ScribbleToaster: any, toast: any }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <ScribbleButton 
          variant="primary" 
          onClick={() => toast.success("Success!", "Your action was completed.")}
        >
          Success
        </ScribbleButton>
        <ScribbleButton 
          variant="secondary" 
          onClick={() => toast.info("Info", "Here's some information.")}
        >
          Info
        </ScribbleButton>
        <ScribbleButton 
          variant="destructive" 
          onClick={() => toast.error("Error", "Something went wrong.")}
        >
          Error
        </ScribbleButton>
      </div>
      <ScribbleToaster position="top-right" />
    </div>
  )
}
