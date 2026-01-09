import { createFileRoute, Link } from "@tanstack/react-router"
import { Text, Comment, AsciiTitle } from "~/components/terminal"

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
})

// For now, hardcoded posts until Velite builds
// In production, this would be: import { posts } from ".velite"
const posts = [
  {
    slug: "coming-soon",
    title: "Coming Soon",
    description: "Blog posts are on the way. Check back soon for thoughts on building software, AI tooling, and more.",
    date: "2025-01-09",
    tags: ["meta"],
    permalink: "/blog/coming-soon",
  },
]

function BlogIndexPage() {
  return (
    <div className="max-w-2xl">
      <AsciiTitle text="BLOG" />
      
      <Comment>Thoughts on building software</Comment>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={post.permalink}
            className="block p-4 border border-border hover:border-border-bright transition-colors"
          >
            <div className="flex items-baseline justify-between mb-2">
              <Text variant="bright">{post.title}</Text>
              <Text variant="muted" className="text-xs">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </div>
            <Text variant="dim" className="block text-sm mb-2">
              {post.description}
            </Text>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-1.5 py-0.5 bg-bg-selection text-fg-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
