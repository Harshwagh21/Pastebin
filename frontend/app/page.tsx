'use client';
import { Link } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [views, setViews] = useState('');
  const [link, setLink] = useState('');

  const create = async () => {
    if (!content) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/pastes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? parseInt(ttl) : undefined,
          max_views: views ? parseInt(views) : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const frontendUrl = `${window.location.protocol}//${window.location.host}/p/${data.id}`;
        setLink(frontendUrl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-black dark:text-white">PasteBin.</h1>
        <p className="text-xs font-light text-black dark:text-white">Paste your text here, and share!</p>
        <div className="flex flex-col">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 mt-5 mb-2 border border-zinc-700 rounded-md p-2"
          ></textarea>
          
          <div className="flex gap-4 mb-4">
            <input  
              type="number" 
              placeholder="TTL (seconds)" 
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              className="w-1/2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input 
              type="number" 
              placeholder="Max Views" 
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="w-1/2 p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end">
            <button 
              onClick={create}
              className="bg-green-500 px-3 py-0.5 text-sm w-48 rounded-lg text-white cursor-pointer hover:bg-green-600 transition-colors duration-300 ease-in-out">
              <Link className='inline-block mr-2 w-3.5' />
              Create Link
            </button>
          </div>
          
          {link && (
             <div className="mt-4 p-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md text-center">
               <a href={link} className="text-green-600 dark:text-green-400 font-mono text-sm hover:underline">{link}</a>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
