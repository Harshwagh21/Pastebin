import { Copy } from 'lucide-react';

export default async function Id({ params }: { params: { id: string } }) {

    const id = await params.id;
    return (
        <main className="flex min-h-screen flex-col justify-center items-center p-24 bg-zinc-900">
            <div className="w-full max-w-xl">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl justify-start font-semibold text-zinc-900 dark:text-zinc-200">Here's the shared text:</h1>
                    <button className="bg-green-500 px-4 py-1 text-sm rounded-full text-white cursor-pointer hover:bg-green-600 transition-colors duration-300 ease-in-out"><Copy className='inline-block w-3' /></button>
                </div>
                <div className="w-full max-w-xl border border-zinc-700 rounded-md p-2 mb-2 h-64 overflow-y-auto">
                    <span>{`${id}`}</span>
                </div>
            </div>
        </main>
    );
}   