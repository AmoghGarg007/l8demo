import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../_components/site-chrome";
import { renderMarkdown } from "@/lib/markdown";
import { POSTS, formatDate } from "../blogs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} · Layer8 Blogs`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const raw = await readFile(
    path.join(process.cwd(), "src/content/blogs", `${slug}.md`),
    "utf8",
  );
  const html = renderMarkdown(raw);

  return (
    <>
      <Header current="Blogs" />

      <main className="flex-1">
        <article className="wrap max-w-[52rem] pt-12 pb-20 md:pt-16">
          <Link href="/blogs" className="text-xs text-accent">
            &lt; back_to_blogs
          </Link>

          <span className="tag mt-6 inline-block">{post.category}</span>
          <h1 className="mt-3 font-display font-bold leading-[1.1] text-[clamp(1.9rem,5vw,2.8rem)]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg-faint">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime} read</span>
          </div>

          <div className="rule my-8" />

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </article>
      </main>

      <Footer current="Blogs" />
    </>
  );
}
