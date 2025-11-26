export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  coverImage?: string;
  date: string;
  likes: number; // Changed from readTime
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  category: string;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
  slug: string;
}

export interface EditorState {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImage: string;
}