import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { person } from '../data/cv';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'pavels.im',
    description: `Writing by ${person.name} on software engineering, AI, Scala, functional programming and distributed systems.`,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
