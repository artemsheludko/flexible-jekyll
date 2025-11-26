import React, { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { getPosts, getCategories } from '../services/dataService';
import { Post, Category } from '../types';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        getPosts(),
        Promise.resolve(getCategories())
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center py-20 mb-16 bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-sm relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl mb-6 text-gray-900 dark:text-white tracking-tight">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-500">Namojo.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 px-4 font-light leading-relaxed">
              Documenting the journey through AI, agile workflows, and visual storytelling.
            </p>
        </div>
      </div>

      {/* Categories */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Explore Topics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.slug}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl hover:border-primary-200 dark:hover:border-primary-900 hover:shadow-lg hover:shadow-primary-100/50 dark:hover:shadow-none transition-all group duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-light-accent dark:bg-dark-bg flex items-center justify-center mb-4 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary-500 transition-colors text-2xl">
                    {cat.icon || 'folder'}
                  </span>
              </div>
              <p className="font-bold text-base text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{cat.name}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{cat.count} Posts</p>
            </button>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-light-border dark:border-dark-border pb-4">
          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Latest Writing</h2>
          <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View Archive 
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};