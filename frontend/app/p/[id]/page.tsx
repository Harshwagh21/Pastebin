import { notFound } from 'next/navigation';

export default async function Id({ params }: { params: { id: string } }) {

    const { id } = await params;

    let data;
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/pastes/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            if (res.status === 404) notFound();
            throw new Error('Failed to fetch');
        }
        data = await res.json();
    } catch (e) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col justify-center items-center p-24 bg-zinc-900">
            <div className="w-full max-w-xl">
                <div className="mb-4">
                    <h1 className="text-xl justify-start font-semibold text-zinc-900 dark:text-zinc-200">Here's the shared text:</h1>
                </div>
                <div className="w-full max-w-xl border border-zinc-700 rounded-md p-2 mb-2 h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-zinc-300 font-mono text-sm">{data?.content}</pre>
                </div>
            </div>
        </main>
    );
}
