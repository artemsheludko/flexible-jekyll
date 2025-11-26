
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPost } from '../services/dataService';
import { authService } from '../services/authService';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Post } from '../types';

export const About: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(authService.isAdmin());
    getPost('about').then(data => {
        if(data) setPost(data);
    });
  }, []);

  if (!post) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {isAdmin && (
        <div className="flex justify-end mb-4">
            <Link 
                to="/editor/about"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
            >
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit Profile
            </Link>
        </div>
      )}

      <div className="text-center mb-12">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-tr from-primary-500 to-purple-600">
             <img src={post.author.avatar} alt="Namojo" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-dark-bg" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{post.excerpt}</p>
      </div>
      
      <div className="prose dark:prose-invert prose-lg mx-auto">
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
};
