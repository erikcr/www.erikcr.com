import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type StoryWithSlug, getAllStories } from '@/lib/stories'
import { formatDate } from '@/lib/formatDate'

function Story({ story }: { story: StoryWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/stories/${story.slug}`}>
          {story.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={story.date}
          className="md:hidden"
          decorate
        >
          {formatDate(story.date)}
        </Card.Eyebrow>
        <Card.Description>{story.description}</Card.Description>
        <Card.Cta>Read story</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={story.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(story.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'Stories from my years of world travel.',
}

export default async function StoriesIndex() {
  let stories = await getAllStories()

  return (
    <SimpleLayout
      title="Stories of my world travels, random mishaps, and many other detours."
      intro="Narrative essays recounting travels across Europe, the US, and Mexico."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {stories.map((story) => (
            <Story key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
