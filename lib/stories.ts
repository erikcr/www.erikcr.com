import glob from 'fast-glob'

interface Story {
  title: string
  description: string
  author: string
  date: string
}

export interface StoryWithSlug extends Story {
  slug: string
}

async function importStory(
  storyFilename: string,
): Promise<StoryWithSlug> {
  let { story } = (await import(`../app/stories/${storyFilename}`)) as {
    default: React.ComponentType
    story: Story
  }

  return {
    slug: storyFilename.replace(/(\/page)?\.mdx$/, ''),
    ...story,
  }
}

export async function getAllStories() {
  let storyFilenames = await glob('*/page.mdx', {
    cwd: './src/app/stories',
  })

  let stories = await Promise.all(storyFilenames.map(importStory))

  return stories.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
