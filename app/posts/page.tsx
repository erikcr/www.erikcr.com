import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <article className="py-6">
        <h1>Blog</h1>

        {allPosts
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map((post) => (
            <article key={post._id}>
              <Link href={post.slug}>
                <h2>{post.title}</h2>
              </Link>
              {post.description && <p>{post.description}</p>}
            </article>
          ))}
      </article>
    </div>
  );
}