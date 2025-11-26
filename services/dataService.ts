
import { Post, Category } from '../types';

// Initial data for fallback and structure reference
const INITIAL_POSTS: Post[] = [
  {
    id: 'about',
    title: 'I\'m Namojo.',
    excerpt: 'Software Engineer & Open Source Enthusiast',
    content: `
Hello! I'm a software engineer with a passion for building scalable web applications. This blog serves as my digital garden where I cultivate ideas, document my learning process, and share tutorials on modern web development.

I specialize in the React ecosystem, TypeScript, and cloud architecture. When I'm not coding, you can find me contributing to open-source projects or exploring the latest in tech.

### My Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Go
- **Infrastructure**: Docker, Kubernetes, GitHub Actions
    `,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Updated Oct 2023',
    likes: 999,
    author: {
        name: 'Namojo',
        avatar: 'https://i.pravatar.cc/150?u=namojo'
    },
    tags: ['Profile', 'About'],
    category: 'Story'
  },
  {
    id: '1',
    title: 'The Future of Generative AI in Creative Work',
    excerpt: 'Exploring how LLMs and diffusion models are changing the landscape of digital art and storytelling.',
    content: `
Generative AI is reshaping how we create. The speed at which we can now iterate on concepts is mind-blowing.

## The Shift

From text-to-image to video generation, the tools available today allow for unprecedented speed in prototyping ideas.

![An AI generated concept art of a futuristic city](https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)

## Video Generation

We are seeing rapid advancements in video synthesis. This changes the game for indie creators.

![What does the future hold for AI Video?](https://www.youtube.com/watch?v=aircAruvnKk)

## Conclusion

The future is collaborative, not replacive.
    `,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 26, 2023',
    likes: 124,
    author: {
      name: 'Namojo',
      avatar: 'https://i.pravatar.cc/150?u=namojo'
    },
    tags: ['AI', 'Creativity', 'Future'],
    category: 'AI'
  },
  {
    id: '2',
    title: 'Agile Methodologies for Solo Developers',
    excerpt: 'How to apply Scrum and Kanban principles to your personal projects to maintain momentum and clarity.',
    content: `
Agile isn't just for teams. It's a mindset for iterative improvement.

### The Kanban Board

Visualizing your work is half the battle.

![A clean Kanban board setup for personal use](https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)

1. **Backlog**: Everything you *might* do.
2. **Todo**: What you will do this week.
3. **Doing**: Focus on one thing.
4. **Done**: Celebrate the win.
    `,
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 24, 2023',
    likes: 85,
    author: {
      name: 'Namojo',
      avatar: 'https://i.pravatar.cc/150?u=namojo'
    },
    tags: ['Agile', 'Productivity', 'Workflow'],
    category: 'Agile'
  },
  {
    id: '3',
    title: 'Sketching Ideas: The Power of Visual Thinking',
    excerpt: 'Why picking up a pencil might be the best way to solve complex coding problems.',
    content: `
Before I write code, I draw. Here is why visual thinking unlocks better architecture.

### Mind Mapping

![Mind maps help connect unrelated concepts](https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)

When you draw out the data flow, edge cases become visible immediately, long before you write a single line of logic.
    `,
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 22, 2023',
    likes: 210,
    author: {
      name: 'Namojo',
      avatar: 'https://i.pravatar.cc/150?u=namojo'
    },
    tags: ['Drawing', 'Design', 'Thinking'],
    category: 'Drawing'
  },
    {
    id: '4',
    title: 'The Art of Storytelling in Software',
    excerpt: 'Code tells a story. How to write documentation and comments that guide the future reader.',
    content: `
Every function is a plot point. Every module is a chapter.

> "Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson

When we approach coding as storytelling, we prioritize clarity, flow, and context.
    `,
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 18, 2023',
    likes: 92,
    author: {
      name: 'Namojo',
      avatar: 'https://i.pravatar.cc/150?u=namojo'
    },
    tags: ['Story', 'Documentation', 'Communication'],
    category: 'Story'
  }
];

export const getPosts = async (): Promise<Post[]> => {
  try {
    // Attempt to fetch from the public posts.json file (Static CMS pattern)
    // In dev, this might 404 if not set up, falling back to INITIAL_POSTS
    const response = await fetch('./posts.json');
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    const data: Post[] = await response.json();
    // Filter out 'about' for the main list if it exists in the json
    return data.filter(p => p.id !== 'about');
  } catch (error) {
    console.warn('Could not fetch posts.json, falling back to initial data.', error);
    return new Promise((resolve) => {
        setTimeout(() => resolve(INITIAL_POSTS.filter(p => p.id !== 'about')), 300);
    });
  }
};

export const getPost = async (id: string): Promise<Post | undefined> => {
    try {
        const response = await fetch('./posts.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await response.json();
        return data.find(p => p.id === id);
    } catch (error) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(INITIAL_POSTS.find(p => p.id === id)), 200);
        });
    }
}

export const getCategories = (): Category[] => [
  { name: 'AI', count: 12, icon: 'smart_toy', slug: 'ai' },
  { name: 'Agile', count: 8, icon: 'sprint', slug: 'agile' },
  { name: 'Drawing', count: 5, icon: 'brush', slug: 'drawing' },
  { name: 'Story', count: 10, icon: 'auto_stories', slug: 'story' },
];
