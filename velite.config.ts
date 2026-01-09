import { defineConfig, s } from "velite"
import rehypeShiki from "@shikijs/rehype"

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "blog/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().max(999),
          date: s.isodate(),
          published: s.boolean().default(true),
          tags: s.array(s.string()).default([]),
          slug: s.slug("blog"),
          body: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/blog/${data.slug}`,
        })),
    },
  },
  mdx: {
    rehypePlugins: [
      [
        rehypeShiki as any,
        {
          theme: "vitesse-dark",
        },
      ],
    ],
  },
})
