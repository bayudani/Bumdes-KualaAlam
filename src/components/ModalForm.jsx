import React from 'react';
import { X, Save, Loader2, Image as ImageIcon, Video as VideoIcon, Box } from 'lucide-react';

export default function ModalForm({ isOpen, isEditing, formData, previews, submitting, onClose, onSubmit, onChange, onFileChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Inputs Kiri */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                <input
                                    required name="name" type="text" value={formData.name} onChange={onChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Contoh: Keripik Pisang"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Unik)</label>
                                <input
                                    required name="slug" type="text" value={formData.slug} onChange={onChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="keripik-pisang-coklat"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                                <input
                                    required name="price" type="number" value={formData.price} onChange={onChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="15000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Komposisi</label>
                                <input
                                    name="composition" type="text" value={formData.composition} onChange={onChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Pisang, Gula, Coklat..."
                                />
                            </div>

                            {/* 🔥 CHECKBOX AR (FITUR BARU) */}
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="has_ar"
                                        id="has_ar"
                                        checked={formData.has_ar}
                                        onChange={onChange}
                                        className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label htmlFor="has_ar" className="text-sm font-bold text-indigo-700 flex items-center gap-2 cursor-pointer select-none w-full">
                                        <Box size={18} /> Aktifkan Fitur 3D / AR?
                                    </label>
                                </div>
                                <p className="text-[10px] text-gray-500 ml-1 italic">*Centang jika file model 3D (.glb) sudah diupload manual ke folder assets.</p>
                            </div>
                        </div>

                        {/* Upload Kanan */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Produk {isEditing ? '(Opsional)' : '(Wajib)'}</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative group">
                                    <input
                                        type="file" name="image" accept="image/*" onChange={onFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required={!isEditing}
                                    />
                                    {previews.image ? (
                                        <div className="relative h-32 w-full mx-auto rounded-lg overflow-hidden">
                                            <img src={previews.image} alt="Preview" className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-medium">Klik untuk ganti</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8">
                                            <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                            <p className="text-xs text-gray-500">Upload Foto (Max 1)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Video (Opsional)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative group">
                                    <input
                                        type="file" name="video" accept="video/*" onChange={onFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {previews.video ? (
                                        <div className="relative h-20 w-full mx-auto rounded-lg overflow-hidden bg-black flex items-center justify-center">
                                            <VideoIcon className="text-white" />
                                            <p className="ml-2 text-white text-xs truncate max-w-[80%]">Video Selected</p>
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <VideoIcon className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                                            <p className="text-xs text-gray-500">Upload Video</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi Full Width */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                            name="description" rows="3" value={formData.description} onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            placeholder="Ceritain sedikit tentang produknya..."
                        ></textarea>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button" onClick={onClose}
                            className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                        >
                            {submitting ? (
                                <><Loader2 size={16} className="animate-spin" /> Proses...</>
                            ) : (
                                <><Save size={16} /> Simpan Produk</>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Styles for Animations */}
            <style>{`
                .animate-fade-in { animation: fadeIn 0.2s ease-out; }
                .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}