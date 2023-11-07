import Image from "next/image";
import { notFound } from "next/navigation";
import { allStories } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

interface StoryProps {
  params: {
    slug: string[];
  };
}

async function getStoryFromParams(params: StoryProps["params"]) {
  const slug = params?.slug?.join("/");
  const Story = allStories.find((Story) => Story.slugAsParams === slug);

  if (!Story) {
    null;
  }

  return Story;
}

export async function generateMetadata({
  params,
}: StoryProps): Promise<Metadata> {
  const Story = await getStoryFromParams(params);

  if (!Story) {
    return {};
  }

  return {
    title: Story.title,
    description: Story.description,
  };
}

export async function generateStaticParams(): Promise<StoryProps["params"][]> {
  return allStories.map((Story) => ({
    slug: Story.slugAsParams.split("/"),
  }));
}

export default async function StoryPage({ params }: StoryProps) {
  const Story = await getStoryFromParams(params);

  if (!Story) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      {Story.headerImg && (
        <Image
          className="pt-0"
          src={Story.headerImg}
          width="718"
          height="404"
          alt="Outdoor stone seating overlooking the ocean."
        />
      )}

      <h1 className="mb-2">{Story.title}</h1>

      {Story.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {Story.description}
        </p>
      )}

      <hr className="my-4" />
      <Mdx code={Story.body.code} />
    </article>
  );
}
