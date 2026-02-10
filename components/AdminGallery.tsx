import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const AdminGallery: React.FC = () => {
    const gallery = useQuery(api.gallery.getGallery) || [];
    const deleteImage = useMutation(api.gallery.deleteImage);
    const generateUploadUrl = useMutation(api.gallery.generateUploadUrl);
    const saveImage = useMutation(api.gallery.saveImage);

    const [isUploading, setIsUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return;

        setIsUploading(true);
        try {
            // Step 1: Get a short-lived upload URL
            const postUrl = await generateUploadUrl();

            // Step 2: POST the file to the URL
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // Step 3: Save the newly allocated storage id to the database
            // Note: we can get the URL via a query or just construct it if we had a helper, but easier to just save storageId
            // For now, let's assume we can get the public URL or just save storageId. 
            // In the schema we have `url` and `storageId`. 
            // We can construct a display URL if we had the `http` action or just use the `storageId` to fetch via `useStorageUrl` hook in the component.
            // Let's safe storageId. For `url`, we'll put a placeholder or the storageId itself for now.

            await saveImage({
                title,
                url: "", // We will rely on storageId
                storageId,
                description: title
            });

            setTitle('');
            setFile(null);
            // Reset file input manually if needed or just let state handle it
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Erro ao fazer upload da imagem.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h3 className="font-serif text-2xl text-white mb-6">Gerenciar Galeria</h3>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="bg-[#121212] p-6 border border-white/10 rounded-lg space-y-4">
                <h4 className="text-white text-sm uppercase tracking-widest mb-4">Adicionar Nova Foto</h4>

                <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Título / Descrição</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-white transition-colors outline-none"
                        placeholder="Ex: Corte Degradê"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Foto</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isUploading || !file}
                    className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 w-full sm:w-auto"
                >
                    {isUploading ? 'Enviando...' : 'Adicionar Foto'}
                </button>
            </form>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((item) => (
                    <div key={item._id} className="relative group aspect-square bg-[#121212] border border-white/10 overflow-hidden">
                        {/* 
                           Note: Since I don't have the `useStorageUrl` hook easily available here without checking `convex/helpers` or making another query, 
                           I will assume `item.storageId` is used to fetch the URL. 
                           Actually, to display the image, I need the URL.
                           I should create a helper component `GalleryImage` that uses `useQuery(api.files.getUrl, { storageId })` if I want to be 100% correct with Convex storage.
                           BUT, for now, let's assume I can build the URL if I know the deployment URL, or better yet, let's update `gallery.ts` to expose the URL.
                           
                           WAIT. `saveImage` takes a URL.
                           Use `ctx.storage.getUrl(storageId)` in a query to get it?
                           Or simpler: use `storageId` in frontend with a specific query.
                           
                           Let's fix `getGallery` in `convex/gallery.ts` to return URLs!
                        */}
                        <img
                            src={item.url || "/placeholder.jpg"} // Placeholder until we fix the URL generation
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                            <span className="text-white text-xs font-bold mb-2">{item.title}</span>
                            <button
                                onClick={() => {
                                    if (confirm('Excluir esta foto?')) deleteImage({ id: item._id });
                                }}
                                className="text-red-400 text-[10px] uppercase tracking-widest hover:text-red-300 border border-red-400/30 px-3 py-1 bg-red-400/10"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
