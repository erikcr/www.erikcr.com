import { allStories } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <article className="py-6">
        <h1>Stories</h1>

        {allStories
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map((Story) => (
            <article key={Story._id}>
              <Link href={Story.slug}>
                <h2>{Story.title}</h2>
              </Link>
              {Story.description && <p>{Story.description}</p>}
            </article>
          ))}
      </article>
    </div>
  );
}
