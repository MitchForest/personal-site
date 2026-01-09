import { createFileRoute, Link } from "@tanstack/react-router"
import { Text, Comment } from "~/components/terminal"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
})

// Placeholder posts data - in production this comes from Velite
const postsContent: Record<string, { title: string; date: string; content: string }> = {
  "hello-world": {
    title: "Hello World",
    date: "2025-01-09",
    content: `
# Hello World

This is the first post on my new terminal-style website. Built with:

- **TanStack Start** for React + routing
- **Shiki** for syntax highlighting
- **Velite** for MDX content
- **Tailwind CSS** for styling

## Why Terminal Style?

I spend most of my day in neovim and the terminal. This aesthetic feels like home.

More posts coming soon.
    `,
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

      {/* In production, this would render the MDX content */}
      <div className="mt-8 prose-terminal">
        <div className="text-fg-dim whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </div>
    </div>
  )
}
