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

### Core Components (27)
- [ ] `button` — ScribbleButton
- [ ] `card` — ScribbleCard, ScribbleCardHeader, ScribbleCardTitle, ScribbleCardDescription, ScribbleCardContent, ScribbleCardFooter
- [ ] `dialog` — ScribbleDialog, ScribbleDialogTrigger, ScribbleDialogContent, ScribbleDialogHeader, ScribbleDialogTitle, ScribbleDialogDescription, ScribbleDialogFooter
- [ ] `alert-dialog` — ScribbleAlertDialog, ScribbleAlertDialogTrigger, ScribbleAlertDialogContent, ScribbleAlertDialogHeader, ScribbleAlertDialogTitle, ScribbleAlertDialogDescription, ScribbleAlertDialogFooter, ScribbleAlertDialogAction, ScribbleAlertDialogCancel
- [ ] `input` — ScribbleInput
- [ ] `textarea` — ScribbleTextarea
- [ ] `checkbox` — ScribbleCheckbox
- [ ] `select` — ScribbleSelect, ScribbleSelectTrigger, ScribbleSelectContent, ScribbleSelectItem, ScribbleSelectValue
- [ ] `badge` — ScribbleBadge
- [ ] `avatar` — ScribbleAvatar
- [ ] `avatar-picker` — ScribbleAvatarPicker
- [ ] `tooltip` — ScribbleTooltip, ScribbleTooltipTrigger, ScribbleTooltipContent
- [ ] `toast` — ScribbleToast, useScribbleToast
- [ ] `tabs` — ScribbleTabs, ScribbleTabsList, ScribbleTabsTrigger, ScribbleTabsContent
- [ ] `accordion` — ScribbleAccordion, ScribbleAccordionItem, ScribbleAccordionTrigger, ScribbleAccordionContent
- [ ] `toggle` — ScribbleToggle
- [ ] `progress` — ScribbleProgress
- [ ] `skeleton` — ScribbleSkeleton
- [ ] `label` — ScribbleLabel
- [ ] `sidebar` — ScribbleSidebar (and related)
- [ ] `table` — ScribbleTable, ScribbleTableHeader, ScribbleTableBody, ScribbleTableRow, ScribbleTableHead, ScribbleTableCell
- [ ] `input-otp` — ScribbleInputOTP
- [ ] `rating` — ScribbleRating
- [ ] `selection-card` — ScribbleSelectionCard
- [ ] `link` — ScribbleLink
- [ ] `page-header` — ScribblePageHeader
- [ ] `page-footer` — ScribblePageFooter
- [ ] `chart` — ScribbleChart (and related)

### Annotation Components (6)
- [ ] `annotation-underline` — ScribbleUnderline
- [ ] `annotation-highlight` — ScribbleHighlight
- [ ] `annotation-bracket` — ScribbleBracket
- [ ] `annotation-circle` — ScribbleCircle
- [ ] `annotation-box` — ScribbleBox
- [ ] `annotation-crossed-off` — ScribbleCrossedOff

### Decorative Components (9)
- [ ] `decorative-arrow` — ScribbleArrow
- [ ] `decorative-divider` — ScribbleDivider
- [ ] `decorative-doodle` — ScribbleDoodle
- [ ] `decorative-heart` — ScribbleHeart
- [ ] `decorative-star` — ScribbleStar
- [ ] `decorative-sticky-note` — ScribbleStickyNote
- [ ] `decorative-tape` — ScribbleTape
- [ ] `decorative-badge` — ScribbleCircleBadge
- [ ] `decorative-logo` — ScribbleLogo

### Background Components (2)
- [ ] `background-notebook` — ScribbleNotebook
- [ ] `background-torn-edge` — ScribbleTornEdge

### Icon Components (4)
- [ ] `icon` — ScribbleIcon
- [ ] `icon-close` — ScribbleCloseIcon
- [ ] `icon-hamburger` — ScribbleHamburgerIcon
- [ ] `icon-plus-minus` — ScribblePlusMinusIcon

---

## Total: 48 Components

---

## Notes

- Components are grouped by category in the sidebar
- Each category is collapsible
- Preview panel shows all variants for the selected component
- Props panel is a scrollable table
- Code panel shows install command + usage example
- Status bar shows current component index (e.g., "1/48")
