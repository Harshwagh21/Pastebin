import Image from "next/image";
import {Link} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-black dark:text-white">PasteBin.</h1>
        <p className="text-xs font-light text-black dark:text-white">Paste your text here, and share!</p>
        <div className="flex flex-col">
          <textarea className="w-full h-64 mt-5 mb-2 border border-zinc-700 rounded-md p-2"></textarea>
          <div className="flex justify-end">
            <button className="bg-green-500 px-3 py-0.5 text-sm w-48 rounded-lg text-white cursor-pointer hover:bg-green-600 transition-colors duration-300 ease-in-out"><Link className='inline-block mr-2 w-3.5' />Create Link</button>
          </div>
        </div>
      </main>
    </div>
  );
}
