
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { EditorState } from '../types';
import { getPost } from '../services/dataService';
import { authService } from '../services/authService';

export const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [state, setState] = useState<EditorState>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    coverImage: ''
  });
  
  // Tab state only for mobile
  const [mobileTab, setMobileTab] = useState<'write' | 'preview'>('write');

  useEffect(() => {
      // Check auth
      if (!authService.isAdmin()) {
          alert("Access Denied");
          navigate('/login');
          return;
      }

      // Load existing post if ID is present
      if (id) {
          setLoading(true);
          getPost(id).then(post => {
              if (post) {
                  setState({
                      title: post.title,
                      content: post.content,
                      excerpt: post.excerpt,
                      category: post.category,
                      tags: post.tags.join(', '),
                      coverImage: post.coverImage || ''
                  });
              }
              setLoading(false);
          });
      }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const afterText = text.substring(end, text.length);
    const selection = text.substring(start, end);

    const newText = beforeText + before + selection + after + afterText;
    setState({ ...state, content: newText });
    
    setTimeout(() => {
        textarea.focus();
        // Move cursor to middle of inserted text if no selection
        const cursorOffset = selection.length > 0 ? selection.length + before.length + after.length : before.length;
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
    }, 0);
  };

  const handleDownload = () => {
    const postData = {
        id: id || Date.now().toString(), // Keep existing ID if editing
        ...state,
        tags: state.tags.split(',').map(t => t.trim()).filter(Boolean),
        // If editing, usually we might want to keep original date or add an updated date
        // For simplicity here, we set current date on save.
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0, // In a real app, we'd fetch existing likes count if editing
        author: {
            name: 'Namojo',
            avatar: 'https://i.pravatar.cc/150?u=namojo'
        }
    };

    const blob = new Blob([JSON.stringify(postData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `post-${postData.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('Post JSON downloaded! Add this to your data source.');
  };

  if (loading) return <div className="p-10 text-center">Loading post data...</div>;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 h-[calc(100vh-64px)] flex flex-col">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
         <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                {id ? 'Edit Post' : 'Create Post'}
            </h1>
            <p className="text-sm text-gray-500">Content is key. Design is white.</p>
         </div>
         <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors shadow-sm">
                Save Draft
            </button>
            <button 
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
                <span className="material-symbols-outlined text-sm">download</span>
                {id ? 'Download Updates' : 'Download Data'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow overflow-hidden">
        
        {/* Editor & Preview Column (Spans 3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-hidden">
            {/* Title Input */}
            <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-4 shadow-sm">
                <input 
                    type="text" 
                    name="title"
                    placeholder="Enter an engaging title..." 
                    value={state.title}
                    onChange={handleChange}
                    className="w-full bg-transparent text-3xl font-bold font-display placeholder-gray-300 dark:placeholder-gray-700 border-none focus:ring-0 p-0 text-gray-900 dark:text-white"
                />
            </div>

            {/* Split Editor Area */}
            <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-sm flex flex-col flex-grow overflow-hidden relative">
                
                {/* Toolbar */}
                <div className="border-b border-light-border dark:border-dark-border p-2 flex justify-between items-center bg-gray-50 dark:bg-dark-bg">
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                        <button onClick={() => insertText('**', '**')} title="Bold" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">format_bold</span>
                        </button>
                        <button onClick={() => insertText('*', '*')} title="Italic" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">format_italic</span>
                        </button>
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-2"></div>
                        <button onClick={() => insertText('### ')} title="Heading 3" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">title</span>
                        </button>
                        <button onClick={() => insertText('> ')} title="Quote" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">format_quote</span>
                        </button>
                        <button onClick={() => insertText('- ')} title="List" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
                        </button>
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-border mx-2"></div>
                        
                        {/* Image with Caption Helper */}
                        <button onClick={() => insertText('![Caption](', ')')} title="Image with Caption" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors relative group">
                            <span className="material-symbols-outlined text-xl">image</span>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">Image+Caption</span>
                        </button>
                        
                        <button onClick={() => insertText('[Link text](', ')')} title="Link" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">link</span>
                        </button>
                        
                        {/* Video with Caption Helper */}
                        <button onClick={() => insertText('\n![Video Caption](https://www.youtube.com/watch?v=...)')} title="Video Embed" className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded text-gray-500 transition-colors relative group">
                            <span className="material-symbols-outlined text-xl">smart_display</span>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">Video+Caption</span>
                        </button>
                    </div>
                    
                    {/* Mobile Tabs */}
                    <div className="flex lg:hidden bg-gray-200 dark:bg-dark-border rounded-lg p-1">
                        <button 
                            onClick={() => setMobileTab('write')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileTab === 'write' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-gray-500'}`}
                        >
                            Write
                        </button>
                        <button 
                            onClick={() => setMobileTab('preview')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileTab === 'preview' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-gray-500'}`}
                        >
                            Preview
                        </button>
                    </div>
                    
                    {/* Desktop Split Label */}
                    <div className="hidden lg:flex items-center gap-4 px-4 text-xs font-medium text-gray-400">
                        <span>EDITOR</span>
                        <div className="w-px h-4 bg-gray-200 dark:bg-dark-border"></div>
                        <span>LIVE PREVIEW</span>
                    </div>
                </div>

                {/* Split View Container */}
                <div className="flex-grow flex overflow-hidden relative">
                    {/* Editor Pane */}
                    <div className={`w-full lg:w-1/2 h-full border-r border-light-border dark:border-dark-border ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
                        <textarea 
                            id="content-editor"
                            name="content"
                            value={state.content}
                            onChange={handleChange}
                            className="w-full h-full p-6 bg-transparent border-none focus:ring-0 resize-none font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200"
                            placeholder="# Start writing your story...&#10;&#10;Use ![Caption](url) for images and videos to enable captions."
                        ></textarea>
                    </div>
                    
                    {/* Preview Pane */}
                    <div className={`w-full lg:w-1/2 h-full bg-gray-50/50 dark:bg-dark-bg/50 overflow-y-auto ${mobileTab === 'write' ? 'hidden lg:block' : 'block'}`}>
                        <div className="p-6 prose dark:prose-invert max-w-none">
                            {state.content ? (
                                <MarkdownRenderer content={state.content} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400 italic">
                                    Preview will appear here...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Settings (Spans 1 col) */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto">
            <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 shadow-sm">
                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Settings</h3>
                
                <div className="flex flex-col gap-5">
                    <label>
                        <span className="text-xs font-semibold uppercase text-gray-400 mb-1.5 block tracking-wider">Category</span>
                        <div className="relative">
                            <select 
                                name="category"
                                value={state.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 text-sm py-2.5"
                            >
                                <option value="">Select Category</option>
                                <option value="AI">AI</option>
                                <option value="Agile">Agile</option>
                                <option value="Drawing">Drawing</option>
                                <option value="Story">Story</option>
                            </select>
                        </div>
                    </label>

                     <label>
                        <span className="text-xs font-semibold uppercase text-gray-400 mb-1.5 block tracking-wider">Tags</span>
                        <input 
                            type="text" 
                            name="tags"
                            value={state.tags}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 text-sm py-2.5"
                            placeholder="e.g. Tutorial, Idea"
                        />
                    </label>

                     <label>
                        <span className="text-xs font-semibold uppercase text-gray-400 mb-1.5 block tracking-wider">Cover Image</span>
                        <input 
                            type="text" 
                            name="coverImage"
                            value={state.coverImage}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 text-sm py-2.5"
                            placeholder="https://..."
                        />
                    </label>
                    
                     <label>
                        <span className="text-xs font-semibold uppercase text-gray-400 mb-1.5 block tracking-wider">Excerpt</span>
                        <textarea 
                            name="excerpt"
                            value={state.excerpt}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-lg border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-primary-500 focus:border-primary-500 text-sm py-2.5 resize-none"
                            placeholder="Write a short summary for the card view..."
                        />
                    </label>
                </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                 <div className="flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200 font-medium">
                    <span className="material-symbols-outlined text-lg">tips_and_updates</span>
                    <span>Pro Tip</span>
                 </div>
                 <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                    To add a caption to a video, use the image syntax: <br/>
                    <code className="bg-gray-100 dark:bg-dark-bg px-1 rounded text-primary-600">![My Caption](https://youtube...)</code>
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};
