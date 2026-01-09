# Scribble UI Gallery — Implementation Plan

> **Goal:** Build an interactive, terminal-styled component gallery at `/projects/scribble-ui/gallery` that showcases all scribble-ui components with live previews, API documentation, and code examples.

---

## Visual Design

### Main Layout (Preview Tab)
```
╔═ SCRIBBLE UI GALLERY ═══════════════════════════════════════════════════════╗
║                                                                              ║
║  COMPONENTS        ┃  button                                     [Preview]  ║
║  ──────────────────╂─────────────────────────────────────────────────────────║
║                    ┃                                                         ║
║  › button          ┃  Hand-drawn button with sketchy border that wobbles     ║
║    card            ┃  on hover.                                              ║
║    dialog          ┃                                                         ║
║    alert-dialog    ┃  ┌─ Variants ───────────────────────────────────────┐   ║
║    input           ┃  │                                                   │   ║
║    textarea        ┃  │   ╭~~~~~~~~~~~~~~~~~~~~~~~~~╮                     │   ║
║    checkbox        ┃  │   │     Primary Button      │   variant="primary" │   ║
║    select          ┃  │   ╰~~~~~~~~~~~~~~~~~~~~~~~~~╯                     │   ║
║    badge           ┃  │                                                   │   ║
║    avatar          ┃  │   ╭- - - - - - - - - - - - -╮                     │   ║
║    tooltip         ┃  │   │     Ghost Button        │   variant="ghost"   │   ║
║    ...             ┃  │   ╰- - - - - - - - - - - - -╯                     │   ║
║                    ┃  │                                                   │   ║
║                    ┃  └───────────────────────────────────────────────────┘   ║
║                    ┃                                                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ j/k: navigate  Tab: switch panel  ?: help                 [button]  1/52     ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Props Tab (API Reference)
```
║  COMPONENTS        ┃  button                                       [Props]  ║
║  ──────────────────╂─────────────────────────────────────────────────────────║
║                    ┃                                                         ║
║  › button          ┃  ┌─ API Reference ──────────────────────────────────┐   ║
║    card            ┃  │                                                   │   ║
║    dialog          ┃  │  Prop        Type                    Default      │   ║
║    ...             ┃  │  ───────────────────────────────────────────────  │   ║
║                    ┃  │  variant     "primary" | "secondary"  "primary"   │   ║
║                    ┃  │              | "ghost" | "outline"                │   ║
║                    ┃  │              | "destructive" | "link"             │   ║
║                    ┃  │  size        "sm" | "md" | "lg"       "md"        │   ║
║                    ┃  │  disabled    boolean                  false       │   ║
║                    ┃  │  asChild     boolean                  false       │   ║
║                    ┃  │                                                   │   ║
║                    ┃  └───────────────────────────────────────────────────┘   ║
```

### Code Tab
```
║  COMPONENTS        ┃  button                                       [Code]   ║
║  ──────────────────╂─────────────────────────────────────────────────────────║
║                    ┃                                                         ║
║  › button          ┃  ┌─ Install ────────────────────────────────────────┐   ║
║    card            ┃  │  $ npx shadcn@latest add @scribble-ui/button      │   ║
║    ...             ┃  └───────────────────────────────────────────────────┘   ║
║                    ┃                                                         ║
║                    ┃  ┌─ Usage ──────────────────────────────────────────┐   ║
║                    ┃  │  import { ScribbleButton } from                   │   ║
║                    ┃  │    "@/components/scribble-ui"                     │   ║
║                    ┃  │                                                   │   ║
║                    ┃  │  <ScribbleButton variant="primary">               │   ║
║                    ┃  │    Click Me                                       │   ║
║                    ┃  │  </ScribbleButton>                                │   ║
║                    ┃  └───────────────────────────────────────────────────┘   ║
```

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `j` / `↓` | Next component |
| `k` / `↑` | Previous component |
| `Tab` | Cycle panels: Preview → Props → Code |
| `1-9` | Jump to variant N |
| `/` | Open search |
| `?` | Show help overlay |
| `Esc` | Close overlay / go back |
| `Enter` | Select component (from search) |

---

## Route Structure

```
/projects/scribble-ui              ← Existing overview page
/projects/scribble-ui/gallery      ← Gallery (redirects to first component)
/projects/scribble-ui/gallery/$id  ← Deep link to specific component
```

---

## File Structure

```
mitch-forest/
├── src/
│   ├── components/
│   │   ├── gallery/
│   │   │   ├── GalleryShell.tsx       # Outer ncurses-style frame
│   │   │   ├── GallerySidebar.tsx     # Left panel with component list
│   │   │   ├── GalleryContent.tsx     # Right panel container
│   │   │   ├── GalleryStatusBar.tsx   # Bottom vim-style status bar
│   │   │   ├── PreviewPanel.tsx       # Live component rendering
│   │   │   ├── PropsPanel.tsx         # API reference table
│   │   │   ├── CodePanel.tsx          # Syntax highlighted code
│   │   │   ├── HelpOverlay.tsx        # Keyboard shortcuts modal
│   │   │   └── index.ts               # Barrel exports
│   │   └── scribble-ui/               # Installed from registry
│   ├── data/
│   │   └── scribble-ui-docs.ts        # Component documentation
│   ├── hooks/
│   │   └── use-gallery-nav.ts         # Gallery keyboard navigation
│   └── routes/
│       └── projects/
│           ├── scribble-ui.tsx        # Existing overview
│           └── scribble-ui.gallery.$id.tsx  # Gallery with component param
```

---

## Data Types

```typescript
interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

interface VariantExample {
  name: string
  props: Record<string, unknown>
  label: string
}

interface ComponentDoc {
  id: string                    // "button"
  name: string                  // "ScribbleButton"
  title: string                 // "Button"
  description: string
  category: "core" | "annotation" | "decorative" | "background" | "icon"
  variants: VariantExample[]
  props: PropDef[]
  usage: string                 // Code example
}
```

---

## Implementation Phases

### Phase 1: Setup ✅
- [x] Install scribble-ui in mitch-forest via registry
- [x] Verify build works with scribble-ui components
- [x] Create route file structure

### Phase 2: Data Layer ✅
- [x] Create `src/data/scribble-ui-docs.ts`
- [x] Document all components (see checklist below)

### Phase 3: Gallery Shell Components ✅
- [x] Create `GalleryShell.tsx`
- [x] Create `GallerySidebar.tsx`
- [x] Create `GalleryStatusBar.tsx`
- [x] Create `GalleryTabs.tsx`
- [x] Wire up basic layout

### Phase 4: Content Panels ✅
- [x] Create `PreviewPanel.tsx` with live components
- [x] Create `PropsPanel.tsx` with API table
- [x] Create `CodePanel.tsx` with syntax highlighting
- [x] Implement tab switching

### Phase 5: Keyboard Navigation ✅
- [x] Create `use-gallery-nav.ts` hook
- [x] Implement j/k navigation
- [x] Implement Tab panel switching
- [x] Create `HelpOverlay.tsx` (integrated into gallery page)

### Phase 6: Polish ✅
- [x] URL updates with selected component
- [ ] Search overlay (/) - Future enhancement
- [ ] Mobile fallback - Future enhancement
- [ ] Animation/transitions - Future enhancement
- [x] Link from main scribble-ui page

---

## Component Documentation Checklist

### Core Components (27) ✅
- [x] `button` — ScribbleButton
- [x] `card` — ScribbleCard, ScribbleCardHeader, ScribbleCardTitle, ScribbleCardDescription, ScribbleCardContent, ScribbleCardFooter
- [x] `dialog` — ScribbleDialog, ScribbleDialogTrigger, ScribbleDialogContent, ScribbleDialogHeader, ScribbleDialogTitle, ScribbleDialogDescription, ScribbleDialogFooter
- [x] `alert-dialog` — ScribbleAlertDialog, ScribbleAlertDialogTrigger, ScribbleAlertDialogContent, ScribbleAlertDialogHeader, ScribbleAlertDialogTitle, ScribbleAlertDialogDescription, ScribbleAlertDialogFooter, ScribbleAlertDialogAction, ScribbleAlertDialogCancel
- [x] `input` — ScribbleInput
- [x] `textarea` — ScribbleTextarea
- [x] `checkbox` — ScribbleCheckbox
- [x] `select` — ScribbleSelect, ScribbleSelectTrigger, ScribbleSelectContent, ScribbleSelectItem, ScribbleSelectValue
- [x] `badge` — ScribbleBadge
- [x] `avatar` — ScribbleAvatar
- [x] `avatar-picker` — ScribbleAvatarPicker
- [x] `tooltip` — ScribbleTooltip, ScribbleTooltipTrigger, ScribbleTooltipContent
- [x] `toast` — ScribbleToast, useScribbleToast
- [x] `tabs` — ScribbleTabs, ScribbleTabsList, ScribbleTabsTrigger, ScribbleTabsContent
- [x] `accordion` — ScribbleAccordion, ScribbleAccordionItem, ScribbleAccordionTrigger, ScribbleAccordionContent
- [x] `toggle` — ScribbleToggle
- [x] `progress` — ScribbleProgress
- [x] `skeleton` — ScribbleSkeleton
- [x] `label` — ScribbleLabel
- [x] `sidebar` — ScribbleSidebar (and related)
- [x] `table` — ScribbleTable, ScribbleTableHeader, ScribbleTableBody, ScribbleTableRow, ScribbleTableHead, ScribbleTableCell
- [x] `input-otp` — ScribbleInputOTP
- [x] `rating` — ScribbleRating
- [x] `selection-card` — ScribbleSelectionCard
- [x] `link` — ScribbleLink
- [x] `page-header` — ScribblePageHeader
- [x] `page-footer` — ScribblePageFooter
- [x] `chart` — ScribbleChart (and related)

### Annotation Components (6) ✅
- [x] `annotation-underline` — ScribbleUnderline
- [x] `annotation-highlight` — ScribbleHighlight
- [x] `annotation-bracket` — ScribbleBracket
- [x] `annotation-circle` — ScribbleCircle
- [x] `annotation-box` — ScribbleBox
- [x] `annotation-crossed-off` — ScribbleCrossedOff

### Decorative Components (9) ✅
- [x] `decorative-arrow` — ScribbleArrow
- [x] `decorative-divider` — ScribbleDivider
- [x] `decorative-doodle` — ScribbleDoodle
- [x] `decorative-heart` — ScribbleHeart
- [x] `decorative-star` — ScribbleStar
- [x] `decorative-sticky-note` — ScribbleStickyNote
- [x] `decorative-tape` — ScribbleTape
- [x] `decorative-badge` — ScribbleCircleBadge
- [x] `decorative-logo` — ScribbleLogo

### Background Components (2) ✅
- [x] `background-notebook` — ScribbleNotebook
- [x] `background-torn-edge` — ScribbleTornEdge

### Icon Components (4) ✅
- [x] `icon` — ScribbleIcon
- [x] `icon-close` — ScribbleCloseIcon
- [x] `icon-hamburger` — ScribbleHamburgerIcon
- [x] `icon-plus-minus` — ScribblePlusMinusIcon

---

## Total: 48 Components

---

## Notes

- Components are grouped by category in the sidebar
- Each category is collapsible
- Preview panel shows all variants for the selected component
- Props panel is a scrollable table
- Code panel shows install command + usage example
- Status bar shows current component index (e.g., "1/47")
- **Important**: scribble-ui components use rough.js which requires client-side rendering. The gallery uses dynamic imports with `useEffect` to ensure components only render on the client.

## Status: ✅ Complete

Gallery is fully functional at `/projects/scribble-ui/gallery`. All 47 components are documented with live previews, API reference, and code examples.
