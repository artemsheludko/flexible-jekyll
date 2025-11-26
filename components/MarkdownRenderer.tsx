import React from 'react';

interface Props {
  content: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  
  const renderLine = (line: string, index: number) => {
    // Regex to detect markdown images: ![alt](url)
    const imageRegex = /!\[(.*?)\]\((.*?)\)/;
    
    // YouTube/Vimeo regex
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;

    // 1. Check if line matches Image Markdown Syntax
    if (imageRegex.test(line)) {
        const match = line.match(imageRegex);
        if(match) {
            const altText = match[1]; // Caption
            const url = match[2];

            // 1a. Check if the URL is actually a YouTube video
            if (youtubeRegex.test(url)) {
                 const videoMatch = url.match(youtubeRegex);
                 // Extract ID (simple check, might need more robust parsing for complex youtube urls)
                 // Usually v=ID or just ID. Let's try to extract cleanly.
                 let videoId = videoMatch ? videoMatch[1] : '';
                 if (videoId.includes('&')) videoId = videoId.split('&')[0];

                 if (videoId) {
                     return (
                         <figure key={index} className="my-8 w-full">
                             <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black">
                                 <iframe 
                                     width="100%" 
                                     height="100%" 
                                     src={`https://www.youtube.com/embed/${videoId}`} 
                                     title={altText || "YouTube video"} 
                                     frameBorder="0" 
                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                     allowFullScreen
                                 ></iframe>
                             </div>
                             {altText && <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium">{altText}</figcaption>}
                         </figure>
                     );
                 }
            }
            
            // 1b. Check if the URL is Vimeo
            if (vimeoRegex.test(url)) {
                 const videoMatch = url.match(vimeoRegex);
                 if (videoMatch && videoMatch[1]) {
                     return (
                         <figure key={index} className="my-8 w-full">
                             <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black">
                                 <iframe 
                                     src={`https://player.vimeo.com/video/${videoMatch[1]}`} 
                                     width="100%" 
                                     height="100%" 
                                     frameBorder="0" 
                                     allow="autoplay; fullscreen; picture-in-picture" 
                                     allowFullScreen
                                 ></iframe>
                             </div>
                             {altText && <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium">{altText}</figcaption>}
                         </figure>
                     );
                 }
            }

            // 1c. It is a standard image
            return (
                <figure key={index} className="my-8">
                    <img src={url} alt={altText} className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 w-full object-cover max-h-[600px]" />
                    {altText && <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium">{altText}</figcaption>}
                </figure>
            );
        }
    }

    // 2. Legacy check for raw video links (if user didn't use ![alt](url))
    // This maintains backward compatibility or copy-paste ease
    const trimmed = line.trim();
    if (youtubeRegex.test(trimmed) && !trimmed.includes(' ') && !trimmed.startsWith('!')) {
         const match = trimmed.match(youtubeRegex);
         let videoId = match ? match[1] : '';
         if (videoId.includes('&')) videoId = videoId.split('&')[0];
         if (videoId) {
            return (
                <figure key={index} className="my-8 w-full">
                     <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${videoId}`} 
                            title="YouTube video" 
                            frameBorder="0" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </figure>
            );
         }
    }

    // Basic Markdown Rendering
    // Headers
    if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mt-10 mb-5 pb-2 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white">{line.replace('## ', '')}</h2>;
    if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{line.replace('# ', '')}</h1>;
    
    // Lists
    if (line.startsWith('- ')) return <li key={index} className="ml-4 list-disc pl-1 mb-2 text-gray-700 dark:text-gray-300">{line.replace('- ', '')}</li>;

    // Blockquotes
    if (line.startsWith('> ')) return <blockquote key={index} className="pl-4 border-l-4 border-primary-500 italic my-6 py-1 text-gray-600 dark:text-gray-400">{line.replace('> ', '')}</blockquote>;

    // Empty lines
    if (line.trim() === '') return <div key={index} className="h-4"></div>;
    
    // Regular paragraphs with bold/italic support (Basic)
    let content = line;
    // Bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = line.split(boldRegex);
    if (parts.length > 1) {
        return (
            <p key={index} className="mb-3 leading-7 text-gray-700 dark:text-gray-300">
                {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part}</strong> : part)}
            </p>
        )
    }

    return <p key={index} className="mb-3 leading-7 text-gray-700 dark:text-gray-300">{line}</p>;
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {content.split('\n').map((line, idx) => renderLine(line, idx))}
    </div>
  );
};