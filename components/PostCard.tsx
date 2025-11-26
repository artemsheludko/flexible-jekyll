import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/post/${post.id}`}
      className="group flex flex-col bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-gray-100 dark:bg-dark-bg">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
             <span className="material-symbols-outlined text-5xl">image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-white/95 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-white shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 mb-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <div className="flex items-center gap-1 text-pink-500">
             <span className="material-symbols-outlined text-[16px] font-variation-settings-fill">favorite</span>
             <span>{post.likes}</span>
          </div>
        </div>
        
        <h3 className="font-display font-bold text-xl mb-3 text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2">
            <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-dark-card"
            />
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-200">
                {post.author.name}
            </span>
            </div>
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                Read Article &rarr;
            </span>
        </div>
      </div>
    </Link>
  );
};