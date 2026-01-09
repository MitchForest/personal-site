# mitchforest.com

Personal website and OSS registry hub. Terminal/Neovim-themed portfolio built with TanStack Start.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

```
src/
├── components/
│   ├── terminal/     # Terminal-style UI components
│   └── layout/       # Shell, FileTree, StatusLine
├── routes/
│   ├── api/r/        # OSS Registry proxy
│   ├── blog/         # MDX blog posts
│   └── projects/     # Project pages
└── styles.css        # Terminal color tokens
```

## OSS Registry Proxy

This site serves as a registry hub for all my open source projects. The proxy endpoint fetches from GitHub with edge caching:

```
GET /r/{project}/{path}
```

**Example:**
```
https://mitchforest.com/r/scribble-ui/registry.json
        ↓ (cached proxy)
https://raw.githubusercontent.com/MitchForest/scribble-ui/main/registry.json
```

### Adding a New Project

Edit `src/routes/r/$.ts`:

```typescript
const REPOS: Record<string, string> = {
  "scribble-ui": "MitchForest/scribble-ui",
  "context-layer": "MitchForest/context-layer",  // Add new projects here
}
```

### Caching

- **max-age**: 1 hour (serve cached version)
- **stale-while-revalidate**: 24 hours (serve stale while fetching fresh)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Deploy (zero config needed)

### Environment Variables

None required for basic functionality.

## Commands

```bash
bun run dev       # Start dev server on port 3000
bun run build     # Build for production
bun run preview   # Preview production build
bun run test      # Run tests
```

## Stack

- **Framework**: TanStack Start + React 19
- **Styling**: Tailwind CSS v4
- **Syntax Highlighting**: Shiki
- **Content**: Velite + MDX
- **Deployment**: Vercel

## License

MIT
