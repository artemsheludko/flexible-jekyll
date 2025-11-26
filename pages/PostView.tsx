
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';
import { getPosts } from '../services/dataService';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { authService } from '../services/authService';

export const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Local interaction state
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check auth
    setIsAdmin(authService.isAdmin());

    const fetchPost = async () => {
      const posts = await getPosts();
      const found = posts.find(p => p.id === id);
      if (found) {
        setPost(found);
        setLikes(found.likes);
        
        // Check local storage for liked state
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');
        if (likedPosts[found.id]) {
            setIsLiked(true);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleLike = () => {
    if (!post) return;
    
    // Toggle like state
    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? likes + 1 : likes - 1;
    
    setIsLiked(newIsLiked);
    setLikes(newLikes);
    
    // Save to local storage
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');
    if (newIsLiked) {
        likedPosts[post.id] = true;
    } else {
        delete likedPosts[post.id];
    }
    localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!post) return <div className="p-10 text-center">Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="mb-6 flex justify-end">
            <Link 
                to={`/editor/${post.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
            >
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit Post
            </Link>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
           <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
             {post.category}
           </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
            <span className="font-medium text-gray-900 dark:text-gray-200">{post.author.name}</span>
          </div>
          <span>•</span>
          <time>{post.date}</time>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary-600 prose-img:rounded-xl">
        <MarkdownRenderer content={post.content} />
      </div>
      
      {/* Like Button Section */}
      <div className="mt-12 flex justify-center">
        <button 
            onClick={handleLike}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 shadow-sm ${
                isLiked 
                ? 'bg-pink-500 text-white shadow-pink-200 dark:shadow-none' 
                : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:border-pink-300 dark:hover:border-pink-800'
            }`}
        >
            <span className={`material-symbols-outlined text-2xl ${isLiked ? 'font-variation-settings-fill' : ''}`}>favorite</span>
            <span className="font-bold text-lg">{likes}</span>
            <span className="text-sm font-medium opacity-80">{isLiked ? 'Liked!' : 'Like this post'}</span>
        </button>
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
