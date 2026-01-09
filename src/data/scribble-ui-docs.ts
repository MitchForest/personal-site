/**
 * Scribble UI Component Documentation
 *
 * This file contains the documentation for all scribble-ui components
 * used by the gallery at /projects/scribble-ui/gallery
 */

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

export interface VariantExample {
  name: string
  props: Record<string, unknown>
  label: string
}

export interface ComponentDoc {
  id: string
  name: string
  title: string
  description: string
  category: "core" | "annotation" | "decorative" | "background" | "icon"
  variants: VariantExample[]
  props: PropDef[]
  usage: string
}

export const components: ComponentDoc[] = [
  // ============================================
  // CORE COMPONENTS
  // ============================================
  {
    id: "button",
    name: "ScribbleButton",
    title: "Button",
    description: "Hand-drawn button with a sketchy border that wobbles on hover. Supports multiple variants and sizes.",
    category: "core",
    variants: [
      { name: "primary", props: { variant: "primary" }, label: "Primary" },
      { name: "secondary", props: { variant: "secondary" }, label: "Secondary" },
      { name: "ghost", props: { variant: "ghost" }, label: "Ghost" },
      { name: "outline", props: { variant: "outline" }, label: "Outline" },
      { name: "destructive", props: { variant: "destructive" }, label: "Destructive" },
    ],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "outline" | "destructive"', default: '"primary"', description: "Visual style of the button" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the button" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button" },
      { name: "asChild", type: "boolean", default: "false", description: "Render as child element (for Links)" },
    ],
    usage: `import { ScribbleButton } from "~/components/scribble-ui"

<ScribbleButton variant="primary">
  Click Me
</ScribbleButton>`,
  },
  {
    id: "card",
    name: "ScribbleCard",
    title: "Card",
    description: "Container with a sketchy border and optional tape decoration. Includes header, content, and footer sub-components.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
      { name: "withTape", props: { showTape: true }, label: "With Tape" },
    ],
    props: [
      { name: "showTape", type: "boolean", default: "false", description: "Show decorative tape on corner" },
      { name: "className", type: "string", default: '""', description: "Additional CSS classes" },
    ],
    usage: `import { ScribbleCard, ScribbleCardHeader, ScribbleCardTitle, ScribbleCardContent } from "~/components/scribble-ui"

<ScribbleCard>
  <ScribbleCardHeader>
    <ScribbleCardTitle>Card Title</ScribbleCardTitle>
  </ScribbleCardHeader>
  <ScribbleCardContent>
    Card content goes here
  </ScribbleCardContent>
</ScribbleCard>`,
  },
  {
    id: "dialog",
    name: "ScribbleDialog",
    title: "Dialog",
    description: "Modal dialog with sketchy borders. Built on Radix Dialog for accessibility.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "open", type: "boolean", default: "undefined", description: "Controlled open state" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "undefined", description: "Callback when open state changes" },
    ],
    usage: `import { ScribbleDialog, ScribbleDialogTrigger, ScribbleDialogContent, ScribbleDialogHeader, ScribbleDialogTitle } from "~/components/scribble-ui"

<ScribbleDialog>
  <ScribbleDialogTrigger asChild>
    <ScribbleButton>Open Dialog</ScribbleButton>
  </ScribbleDialogTrigger>
  <ScribbleDialogContent>
    <ScribbleDialogHeader>
      <ScribbleDialogTitle>Dialog Title</ScribbleDialogTitle>
    </ScribbleDialogHeader>
    Content here
  </ScribbleDialogContent>
</ScribbleDialog>`,
  },
  {
    id: "alert-dialog",
    name: "ScribbleAlertDialog",
    title: "Alert Dialog",
    description: "Confirmation dialog with sketchy styling. Requires user action before closing.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "open", type: "boolean", default: "undefined", description: "Controlled open state" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "undefined", description: "Callback when open state changes" },
    ],
    usage: `import { ScribbleAlertDialog, ScribbleAlertDialogTrigger, ScribbleAlertDialogContent, ScribbleAlertDialogHeader, ScribbleAlertDialogTitle, ScribbleAlertDialogDescription, ScribbleAlertDialogFooter, ScribbleAlertDialogAction, ScribbleAlertDialogCancel } from "~/components/scribble-ui"

<ScribbleAlertDialog>
  <ScribbleAlertDialogTrigger asChild>
    <ScribbleButton variant="destructive">Delete</ScribbleButton>
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
      <ScribbleAlertDialogAction>Delete</ScribbleAlertDialogAction>
    </ScribbleAlertDialogFooter>
  </ScribbleAlertDialogContent>
</ScribbleAlertDialog>`,
  },
  {
    id: "input",
    name: "ScribbleInput",
    title: "Input",
    description: "Text input with hand-drawn border styling.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
      { name: "disabled", props: { disabled: true }, label: "Disabled" },
    ],
    props: [
      { name: "type", type: "string", default: '"text"', description: "Input type (text, email, password, etc.)" },
      { name: "placeholder", type: "string", default: '""', description: "Placeholder text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
    ],
    usage: `import { ScribbleInput } from "~/components/scribble-ui"

<ScribbleInput placeholder="Enter your name..." />`,
  },
  {
    id: "textarea",
    name: "ScribbleTextarea",
    title: "Textarea",
    description: "Multi-line text input with sketchy borders.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "placeholder", type: "string", default: '""', description: "Placeholder text" },
      { name: "rows", type: "number", default: "3", description: "Number of visible rows" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea" },
    ],
    usage: `import { ScribbleTextarea } from "~/components/scribble-ui"

<ScribbleTextarea placeholder="Write your message..." rows={4} />`,
  },
  {
    id: "checkbox",
    name: "ScribbleCheckbox",
    title: "Checkbox",
    description: "Checkbox with hand-drawn checkmark animation.",
    category: "core",
    variants: [
      { name: "unchecked", props: { checked: false }, label: "Unchecked" },
      { name: "checked", props: { checked: true }, label: "Checked" },
    ],
    props: [
      { name: "checked", type: "boolean", default: "false", description: "Checked state" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", default: "undefined", description: "Callback when checked changes" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox" },
    ],
    usage: `import { ScribbleCheckbox } from "~/components/scribble-ui"

<ScribbleCheckbox checked={checked} onCheckedChange={setChecked} />`,
  },
  {
    id: "select",
    name: "ScribbleSelect",
    title: "Select",
    description: "Dropdown select with sketchy styling. Built on Radix Select.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "value", type: "string", default: "undefined", description: "Selected value" },
      { name: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback when value changes" },
      { name: "placeholder", type: "string", default: '""', description: "Placeholder text" },
    ],
    usage: `import { ScribbleSelect, ScribbleSelectTrigger, ScribbleSelectContent, ScribbleSelectItem, ScribbleSelectValue } from "~/components/scribble-ui"

<ScribbleSelect value={value} onValueChange={setValue}>
  <ScribbleSelectTrigger>
    <ScribbleSelectValue placeholder="Select an option" />
  </ScribbleSelectTrigger>
  <ScribbleSelectContent>
    <ScribbleSelectItem value="option1">Option 1</ScribbleSelectItem>
    <ScribbleSelectItem value="option2">Option 2</ScribbleSelectItem>
  </ScribbleSelectContent>
</ScribbleSelect>`,
  },
  {
    id: "badge",
    name: "ScribbleBadge",
    title: "Badge",
    description: "Small label with sketchy border for tags and status indicators.",
    category: "core",
    variants: [
      { name: "default", props: { variant: "default" }, label: "Default" },
      { name: "secondary", props: { variant: "secondary" }, label: "Secondary" },
      { name: "destructive", props: { variant: "destructive" }, label: "Destructive" },
      { name: "outline", props: { variant: "outline" }, label: "Outline" },
    ],
    props: [
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline"', default: '"default"', description: "Visual style" },
    ],
    usage: `import { ScribbleBadge } from "~/components/scribble-ui"

<ScribbleBadge variant="default">New</ScribbleBadge>`,
  },
  {
    id: "avatar",
    name: "ScribbleAvatar",
    title: "Avatar",
    description: "Circular avatar with sketchy border for user images.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "src", type: "string", default: "undefined", description: "Image source URL" },
      { name: "alt", type: "string", default: '""', description: "Alt text for image" },
      { name: "fallback", type: "string", default: '""', description: "Fallback initials if image fails" },
    ],
    usage: `import { ScribbleAvatar } from "~/components/scribble-ui"

<ScribbleAvatar src="/avatar.jpg" alt="User" fallback="JD" />`,
  },
  {
    id: "avatar-picker",
    name: "ScribbleAvatarPicker",
    title: "Avatar Picker",
    description: "Grid of selectable avatars for user profile selection.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "avatars", type: "string[]", default: "[]", description: "Array of avatar image URLs" },
      { name: "value", type: "string", default: "undefined", description: "Currently selected avatar" },
      { name: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback when selection changes" },
    ],
    usage: `import { ScribbleAvatarPicker } from "~/components/scribble-ui"

<ScribbleAvatarPicker
  avatars={["/avatar1.png", "/avatar2.png", "/avatar3.png"]}
  value={selected}
  onValueChange={setSelected}
/>`,
  },
  {
    id: "tooltip",
    name: "ScribbleTooltip",
    title: "Tooltip",
    description: "Popup tooltip with sketchy styling on hover.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "content", type: "ReactNode", default: "undefined", description: "Tooltip content" },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Tooltip position" },
    ],
    usage: `import { ScribbleTooltip, ScribbleTooltipTrigger, ScribbleTooltipContent } from "~/components/scribble-ui"

<ScribbleTooltip>
  <ScribbleTooltipTrigger>Hover me</ScribbleTooltipTrigger>
  <ScribbleTooltipContent>
    Tooltip content
  </ScribbleTooltipContent>
</ScribbleTooltip>`,
  },
  {
    id: "toast",
    name: "ScribbleToast",
    title: "Toast",
    description: "Notification toast with hand-drawn styling.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
      { name: "destructive", props: { variant: "destructive" }, label: "Destructive" },
    ],
    props: [
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Visual style" },
      { name: "title", type: "string", default: "undefined", description: "Toast title" },
      { name: "description", type: "string", default: "undefined", description: "Toast description" },
    ],
    usage: `import { useScribbleToast } from "~/components/scribble-ui"

const { toast } = useScribbleToast()

toast({
  title: "Success!",
  description: "Your changes have been saved.",
})`,
  },
  {
    id: "tabs",
    name: "ScribbleTabs",
    title: "Tabs",
    description: "Tabbed interface with sketchy underlines.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "value", type: "string", default: "undefined", description: "Active tab value" },
      { name: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback when tab changes" },
      { name: "defaultValue", type: "string", default: "undefined", description: "Default active tab" },
    ],
    usage: `import { ScribbleTabs, ScribbleTabsList, ScribbleTabsTrigger, ScribbleTabsContent } from "~/components/scribble-ui"

<ScribbleTabs defaultValue="tab1">
  <ScribbleTabsList>
    <ScribbleTabsTrigger value="tab1">Tab 1</ScribbleTabsTrigger>
    <ScribbleTabsTrigger value="tab2">Tab 2</ScribbleTabsTrigger>
  </ScribbleTabsList>
  <ScribbleTabsContent value="tab1">Content 1</ScribbleTabsContent>
  <ScribbleTabsContent value="tab2">Content 2</ScribbleTabsContent>
</ScribbleTabs>`,
  },
  {
    id: "accordion",
    name: "ScribbleAccordion",
    title: "Accordion",
    description: "Collapsible content sections with sketchy borders.",
    category: "core",
    variants: [
      { name: "single", props: { type: "single" }, label: "Single" },
      { name: "multiple", props: { type: "multiple" }, label: "Multiple" },
    ],
    props: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Allow single or multiple open items" },
      { name: "collapsible", type: "boolean", default: "false", description: "Allow all items to be collapsed" },
    ],
    usage: `import { ScribbleAccordion, ScribbleAccordionItem, ScribbleAccordionTrigger, ScribbleAccordionContent } from "~/components/scribble-ui"

<ScribbleAccordion type="single" collapsible>
  <ScribbleAccordionItem value="item1">
    <ScribbleAccordionTrigger>Section 1</ScribbleAccordionTrigger>
    <ScribbleAccordionContent>Content 1</ScribbleAccordionContent>
  </ScribbleAccordionItem>
</ScribbleAccordion>`,
  },
  {
    id: "toggle",
    name: "ScribbleToggle",
    title: "Toggle",
    description: "Two-state toggle button with sketchy styling.",
    category: "core",
    variants: [
      { name: "off", props: { pressed: false }, label: "Off" },
      { name: "on", props: { pressed: true }, label: "On" },
    ],
    props: [
      { name: "pressed", type: "boolean", default: "false", description: "Toggle state" },
      { name: "onPressedChange", type: "(pressed: boolean) => void", default: "undefined", description: "Callback when state changes" },
    ],
    usage: `import { ScribbleToggle } from "~/components/scribble-ui"

<ScribbleToggle pressed={isOn} onPressedChange={setIsOn}>
  Toggle
</ScribbleToggle>`,
  },
  {
    id: "progress",
    name: "ScribbleProgress",
    title: "Progress",
    description: "Progress bar with hand-drawn fill animation.",
    category: "core",
    variants: [
      { name: "default", props: { value: 60 }, label: "60%" },
    ],
    props: [
      { name: "value", type: "number", default: "0", description: "Progress value (0-100)" },
      { name: "max", type: "number", default: "100", description: "Maximum value" },
    ],
    usage: `import { ScribbleProgress } from "~/components/scribble-ui"

<ScribbleProgress value={60} />`,
  },
  {
    id: "skeleton",
    name: "ScribbleSkeleton",
    title: "Skeleton",
    description: "Loading placeholder with sketchy animation.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "className", type: "string", default: '""', description: "Width/height classes" },
    ],
    usage: `import { ScribbleSkeleton } from "~/components/scribble-ui"

<ScribbleSkeleton className="h-4 w-[200px]" />`,
  },
  {
    id: "label",
    name: "ScribbleLabel",
    title: "Label",
    description: "Form label with optional hand-drawn styling.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "htmlFor", type: "string", default: "undefined", description: "Associated input ID" },
    ],
    usage: `import { ScribbleLabel } from "~/components/scribble-ui"

<ScribbleLabel htmlFor="email">Email</ScribbleLabel>`,
  },
  {
    id: "table",
    name: "ScribbleTable",
    title: "Table",
    description: "Data table with sketchy borders.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "className", type: "string", default: '""', description: "Additional CSS classes" },
    ],
    usage: `import { ScribbleTable, ScribbleTableHeader, ScribbleTableBody, ScribbleTableRow, ScribbleTableHead, ScribbleTableCell } from "~/components/scribble-ui"

<ScribbleTable>
  <ScribbleTableHeader>
    <ScribbleTableRow>
      <ScribbleTableHead>Name</ScribbleTableHead>
      <ScribbleTableHead>Email</ScribbleTableHead>
    </ScribbleTableRow>
  </ScribbleTableHeader>
  <ScribbleTableBody>
    <ScribbleTableRow>
      <ScribbleTableCell>John</ScribbleTableCell>
      <ScribbleTableCell>john@example.com</ScribbleTableCell>
    </ScribbleTableRow>
  </ScribbleTableBody>
</ScribbleTable>`,
  },
  {
    id: "input-otp",
    name: "ScribbleInputOTP",
    title: "Input OTP",
    description: "One-time password input with sketchy styling.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "maxLength", type: "number", default: "6", description: "Number of OTP digits" },
      { name: "value", type: "string", default: '""', description: "OTP value" },
      { name: "onChange", type: "(value: string) => void", default: "undefined", description: "Callback when value changes" },
    ],
    usage: `import { ScribbleInputOTP } from "~/components/scribble-ui"

<ScribbleInputOTP maxLength={6} value={otp} onChange={setOtp} />`,
  },
  {
    id: "rating",
    name: "ScribbleRating",
    title: "Rating",
    description: "Star rating input with hand-drawn stars.",
    category: "core",
    variants: [
      { name: "default", props: { value: 3 }, label: "3 Stars" },
    ],
    props: [
      { name: "value", type: "number", default: "0", description: "Current rating" },
      { name: "max", type: "number", default: "5", description: "Maximum stars" },
      { name: "onValueChange", type: "(value: number) => void", default: "undefined", description: "Callback when rating changes" },
      { name: "readonly", type: "boolean", default: "false", description: "Read-only mode" },
    ],
    usage: `import { ScribbleRating } from "~/components/scribble-ui"

<ScribbleRating value={rating} onValueChange={setRating} />`,
  },
  {
    id: "selection-card",
    name: "ScribbleSelectionCard",
    title: "Selection Card",
    description: "Selectable card with sketchy border, often used for options.",
    category: "core",
    variants: [
      { name: "unselected", props: { selected: false }, label: "Unselected" },
      { name: "selected", props: { selected: true }, label: "Selected" },
    ],
    props: [
      { name: "selected", type: "boolean", default: "false", description: "Selection state" },
      { name: "onSelect", type: "() => void", default: "undefined", description: "Callback when selected" },
    ],
    usage: `import { ScribbleSelectionCard } from "~/components/scribble-ui"

<ScribbleSelectionCard selected={isSelected} onSelect={() => setSelected(true)}>
  Option content
</ScribbleSelectionCard>`,
  },
  {
    id: "link",
    name: "ScribbleLink",
    title: "Link",
    description: "Anchor link with animated underline annotation.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "href", type: "string", default: '"#"', description: "Link destination" },
      { name: "external", type: "boolean", default: "false", description: "Open in new tab" },
    ],
    usage: `import { ScribbleLink } from "~/components/scribble-ui"

<ScribbleLink href="/about">About Us</ScribbleLink>`,
  },
  {
    id: "page-header",
    name: "ScribblePageHeader",
    title: "Page Header",
    description: "Page header with sketchy underline decoration.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "title", type: "string", default: '""', description: "Header title" },
      { name: "description", type: "string", default: "undefined", description: "Optional description" },
    ],
    usage: `import { ScribblePageHeader } from "~/components/scribble-ui"

<ScribblePageHeader title="Dashboard" description="Welcome back!" />`,
  },
  {
    id: "page-footer",
    name: "ScribblePageFooter",
    title: "Page Footer",
    description: "Page footer with decorative divider.",
    category: "core",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "className", type: "string", default: '""', description: "Additional CSS classes" },
    ],
    usage: `import { ScribblePageFooter } from "~/components/scribble-ui"

<ScribblePageFooter>
  © 2025 My App
</ScribblePageFooter>`,
  },

  // ============================================
  // ANNOTATION COMPONENTS
  // ============================================
  {
    id: "annotation-underline",
    name: "ScribbleUnderline",
    title: "Underline",
    description: "Animated hand-drawn underline annotation.",
    category: "annotation",
    variants: [
      { name: "default", props: {}, label: "Default" },
      { name: "animated", props: { animate: true }, label: "Animated" },
    ],
    props: [
      { name: "color", type: "string", default: '"currentColor"', description: "Underline color" },
      { name: "animate", type: "boolean", default: "false", description: "Animate on mount" },
      { name: "strokeWidth", type: "number", default: "2", description: "Line thickness" },
    ],
    usage: `import { ScribbleUnderline } from "~/components/scribble-ui"

<ScribbleUnderline animate>
  Important text
</ScribbleUnderline>`,
  },
  {
    id: "annotation-highlight",
    name: "ScribbleHighlight",
    title: "Highlight",
    description: "Highlighter pen effect annotation.",
    category: "annotation",
    variants: [
      { name: "yellow", props: { color: "yellow" }, label: "Yellow" },
      { name: "green", props: { color: "green" }, label: "Green" },
      { name: "pink", props: { color: "pink" }, label: "Pink" },
    ],
    props: [
      { name: "color", type: "string", default: '"yellow"', description: "Highlight color" },
      { name: "animate", type: "boolean", default: "false", description: "Animate on mount" },
    ],
    usage: `import { ScribbleHighlight } from "~/components/scribble-ui"

<ScribbleHighlight color="yellow">
  Highlighted text
</ScribbleHighlight>`,
  },
  {
    id: "annotation-bracket",
    name: "ScribbleBracket",
    title: "Bracket",
    description: "Hand-drawn bracket annotation around content.",
    category: "annotation",
    variants: [
      { name: "left", props: { side: "left" }, label: "Left" },
      { name: "right", props: { side: "right" }, label: "Right" },
    ],
    props: [
      { name: "side", type: '"left" | "right"', default: '"left"', description: "Bracket side" },
      { name: "color", type: "string", default: '"currentColor"', description: "Bracket color" },
    ],
    usage: `import { ScribbleBracket } from "~/components/scribble-ui"

<ScribbleBracket side="left">
  Bracketed content
</ScribbleBracket>`,
  },
  {
    id: "annotation-circle",
    name: "ScribbleCircle",
    title: "Circle",
    description: "Hand-drawn circle annotation around content.",
    category: "annotation",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "color", type: "string", default: '"currentColor"', description: "Circle color" },
      { name: "animate", type: "boolean", default: "false", description: "Animate on mount" },
      { name: "padding", type: "number", default: "4", description: "Padding around content" },
    ],
    usage: `import { ScribbleCircle } from "~/components/scribble-ui"

<ScribbleCircle animate>
  Circled!
</ScribbleCircle>`,
  },
  {
    id: "annotation-box",
    name: "ScribbleBox",
    title: "Box",
    description: "Hand-drawn box annotation around content.",
    category: "annotation",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "color", type: "string", default: '"currentColor"', description: "Box color" },
      { name: "animate", type: "boolean", default: "false", description: "Animate on mount" },
    ],
    usage: `import { ScribbleBox } from "~/components/scribble-ui"

<ScribbleBox>
  Boxed content
</ScribbleBox>`,
  },
  {
    id: "annotation-crossed-off",
    name: "ScribbleCrossedOff",
    title: "Crossed Off",
    description: "Strikethrough annotation with hand-drawn line.",
    category: "annotation",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "color", type: "string", default: '"currentColor"', description: "Line color" },
      { name: "animate", type: "boolean", default: "false", description: "Animate on mount" },
    ],
    usage: `import { ScribbleCrossedOff } from "~/components/scribble-ui"

<ScribbleCrossedOff>
  Crossed out text
</ScribbleCrossedOff>`,
  },

  // ============================================
  // DECORATIVE COMPONENTS
  // ============================================
  {
    id: "decorative-arrow",
    name: "ScribbleArrow",
    title: "Arrow",
    description: "Hand-drawn arrow pointing in any direction.",
    category: "decorative",
    variants: [
      { name: "right", props: { direction: "right" }, label: "Right" },
      { name: "down", props: { direction: "down" }, label: "Down" },
      { name: "left", props: { direction: "left" }, label: "Left" },
      { name: "up", props: { direction: "up" }, label: "Up" },
    ],
    props: [
      { name: "direction", type: '"up" | "down" | "left" | "right"', default: '"right"', description: "Arrow direction" },
      { name: "size", type: "number", default: "24", description: "Arrow size in pixels" },
      { name: "color", type: "string", default: '"currentColor"', description: "Arrow color" },
    ],
    usage: `import { ScribbleArrow } from "~/components/scribble-ui"

<ScribbleArrow direction="right" size={32} />`,
  },
  {
    id: "decorative-divider",
    name: "ScribbleDivider",
    title: "Divider",
    description: "Hand-drawn horizontal line divider.",
    category: "decorative",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "color", type: "string", default: '"currentColor"', description: "Line color" },
      { name: "className", type: "string", default: '""', description: "Additional CSS classes" },
    ],
    usage: `import { ScribbleDivider } from "~/components/scribble-ui"

<ScribbleDivider />`,
  },
  {
    id: "decorative-doodle",
    name: "ScribbleDoodle",
    title: "Doodle",
    description: "Random decorative doodle shapes.",
    category: "decorative",
    variants: [
      { name: "default", props: {}, label: "Random" },
    ],
    props: [
      { name: "seed", type: "number", default: "undefined", description: "Random seed for consistent shapes" },
      { name: "size", type: "number", default: "100", description: "Doodle size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Doodle color" },
    ],
    usage: `import { ScribbleDoodle } from "~/components/scribble-ui"

<ScribbleDoodle seed={42} size={80} />`,
  },
  {
    id: "decorative-heart",
    name: "ScribbleHeart",
    title: "Heart",
    description: "Hand-drawn heart shape.",
    category: "decorative",
    variants: [
      { name: "outline", props: { filled: false }, label: "Outline" },
      { name: "filled", props: { filled: true }, label: "Filled" },
    ],
    props: [
      { name: "size", type: "number", default: "24", description: "Heart size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Heart color" },
      { name: "filled", type: "boolean", default: "false", description: "Fill the heart" },
    ],
    usage: `import { ScribbleHeart } from "~/components/scribble-ui"

<ScribbleHeart size={32} filled />`,
  },
  {
    id: "decorative-star",
    name: "ScribbleStar",
    title: "Star",
    description: "Hand-drawn star shape.",
    category: "decorative",
    variants: [
      { name: "outline", props: { filled: false }, label: "Outline" },
      { name: "filled", props: { filled: true }, label: "Filled" },
    ],
    props: [
      { name: "size", type: "number", default: "24", description: "Star size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Star color" },
      { name: "filled", type: "boolean", default: "false", description: "Fill the star" },
    ],
    usage: `import { ScribbleStar } from "~/components/scribble-ui"

<ScribbleStar size={32} filled />`,
  },
  {
    id: "decorative-sticky-note",
    name: "ScribbleStickyNote",
    title: "Sticky Note",
    description: "Post-it note style container with tape.",
    category: "decorative",
    variants: [
      { name: "yellow", props: { color: "yellow" }, label: "Yellow" },
      { name: "pink", props: { color: "pink" }, label: "Pink" },
      { name: "blue", props: { color: "blue" }, label: "Blue" },
    ],
    props: [
      { name: "color", type: '"yellow" | "pink" | "blue" | "green"', default: '"yellow"', description: "Note color" },
      { name: "rotation", type: "number", default: "0", description: "Rotation in degrees" },
    ],
    usage: `import { ScribbleStickyNote } from "~/components/scribble-ui"

<ScribbleStickyNote color="yellow" rotation={-2}>
  Remember this!
</ScribbleStickyNote>`,
  },
  {
    id: "decorative-tape",
    name: "ScribbleTape",
    title: "Tape",
    description: "Decorative tape strip for attaching things.",
    category: "decorative",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "rotation", type: "number", default: "-5", description: "Rotation in degrees" },
      { name: "color", type: "string", default: '"#fef3c7"', description: "Tape color" },
    ],
    usage: `import { ScribbleTape } from "~/components/scribble-ui"

<ScribbleTape rotation={-3} />`,
  },
  {
    id: "decorative-badge",
    name: "ScribbleCircleBadge",
    title: "Circle Badge",
    description: "Circular badge with hand-drawn border.",
    category: "decorative",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "size", type: "number", default: "48", description: "Badge size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Badge color" },
    ],
    usage: `import { ScribbleCircleBadge } from "~/components/scribble-ui"

<ScribbleCircleBadge size={64}>
  1
</ScribbleCircleBadge>`,
  },
  {
    id: "decorative-logo",
    name: "ScribbleLogo",
    title: "Logo",
    description: "Scribble UI logo component.",
    category: "decorative",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "size", type: "number", default: "32", description: "Logo size" },
    ],
    usage: `import { ScribbleLogo } from "~/components/scribble-ui"

<ScribbleLogo size={48} />`,
  },

  // ============================================
  // BACKGROUND COMPONENTS
  // ============================================
  {
    id: "background-notebook",
    name: "ScribbleNotebook",
    title: "Notebook",
    description: "Lined notebook paper background.",
    category: "background",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "lineColor", type: "string", default: '"#e5e7eb"', description: "Line color" },
      { name: "marginColor", type: "string", default: '"#fca5a5"', description: "Margin line color" },
    ],
    usage: `import { ScribbleNotebook } from "~/components/scribble-ui"

<ScribbleNotebook>
  Content on notebook paper
</ScribbleNotebook>`,
  },
  {
    id: "background-torn-edge",
    name: "ScribbleTornEdge",
    title: "Torn Edge",
    description: "Container with torn paper edge effect.",
    category: "background",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "side", type: '"top" | "bottom" | "both"', default: '"bottom"', description: "Which edge is torn" },
    ],
    usage: `import { ScribbleTornEdge } from "~/components/scribble-ui"

<ScribbleTornEdge side="bottom">
  Content with torn edge
</ScribbleTornEdge>`,
  },

  // ============================================
  // ICON COMPONENTS
  // ============================================
  {
    id: "icon",
    name: "ScribbleIcon",
    title: "Icon",
    description: "Base icon wrapper with sketchy styling.",
    category: "icon",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "size", type: "number", default: "24", description: "Icon size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Icon color" },
    ],
    usage: `import { ScribbleIcon } from "~/components/scribble-ui"

<ScribbleIcon size={24}>
  {/* SVG or icon content */}
</ScribbleIcon>`,
  },
  {
    id: "icon-close",
    name: "ScribbleCloseIcon",
    title: "Close Icon",
    description: "Hand-drawn X/close icon.",
    category: "icon",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "size", type: "number", default: "24", description: "Icon size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Icon color" },
    ],
    usage: `import { ScribbleCloseIcon } from "~/components/scribble-ui"

<ScribbleCloseIcon size={20} />`,
  },
  {
    id: "icon-hamburger",
    name: "ScribbleHamburgerIcon",
    title: "Hamburger Icon",
    description: "Hand-drawn hamburger menu icon.",
    category: "icon",
    variants: [
      { name: "default", props: {}, label: "Default" },
    ],
    props: [
      { name: "size", type: "number", default: "24", description: "Icon size" },
      { name: "color", type: "string", default: '"currentColor"', description: "Icon color" },
    ],
    usage: `import { ScribbleHamburgerIcon } from "~/components/scribble-ui"

<ScribbleHamburgerIcon size={24} />`,
  },
  {
    id: "icon-plus-minus",
    name: "ScribblePlusMinusIcon",
    title: "Plus/Minus Icon",
    description: "Animated plus/minus icon for expand/collapse.",
    category: "icon",
    variants: [
      { name: "plus", props: { expanded: false }, label: "Plus" },
      { name: "minus", props: { expanded: true }, label: "Minus" },
    ],
    props: [
      { name: "expanded", type: "boolean", default: "false", description: "Show minus when expanded" },
      { name: "size", type: "number", default: "24", description: "Icon size" },
    ],
    usage: `import { ScribblePlusMinusIcon } from "~/components/scribble-ui"

<ScribblePlusMinusIcon expanded={isExpanded} />`,
  },
]

// Helper functions
export const categories = ["core", "annotation", "decorative", "background", "icon"] as const

export function getComponentsByCategory(category: ComponentDoc["category"]) {
  return components.filter((c) => c.category === category)
}

export function getComponentById(id: string) {
  return components.find((c) => c.id === id)
}

export const componentCount = components.length
