import { createFileRoute, Link } from "@tanstack/react-router"
import { Text, Comment } from "~/components/terminal"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
})

// Placeholder posts data - in production this comes from Velite
const postsContent: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  "coming-soon": {
    title: "Coming Soon",
    date: "2025-01-09",
    content: (
      <div className="space-y-4">
        <p className="text-fg-dim">I'm setting up this blog to share thoughts on:</p>
        
        <ul className="space-y-2 text-fg-dim ml-4">
          <li>→ <span className="text-accent">Building with AI</span> — Cursor, Claude Code, Codex, and the new wave of AI-native development</li>
          <li>→ <span className="text-accent">EdTech</span> — What I'm learning building apps for kids at Alpha School</li>
          <li>→ <span className="text-accent">Open Source</span> — Updates on scribble-ui, context-layer, and other projects</li>
          <li>→ <span className="text-accent">Engineering</span> — TanStack, Swift, React, and the tools I use daily</li>
        </ul>

        <p className="text-fg-dim">
          Check back soon, or follow me on{" "}
          <a href="https://twitter.com/mitchforest" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{" "}
          for updates.
        </p>

        <pre className="p-3 bg-bg-alt border border-border text-fg-dim text-sm mt-6">
{`// The traditional first post
console.log("Hello, world!")`}
        </pre>
      </div>
    ),
  },
}

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = postsContent[slug]

  if (!post) {
    return (
      <div className="max-w-2xl">
        <Text variant="error">404 — Post not found</Text>
        <Link to="/blog" className="text-fg-dim hover:text-accent mt-4 block">
          ← Back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <Link to="/blog" className="text-fg-muted hover:text-accent text-sm mb-4 block">
        ← blog/
      </Link>

      <Text variant="bright" as="h1" className="text-2xl mb-2">
        {post.title}
      </Text>
      
      <Comment>
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Comment>

      <div className="mt-8">
        {post.content}
      </div>
    </div>
  )
}
