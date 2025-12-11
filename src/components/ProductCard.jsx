import React from 'react';
import { Edit, Trash2, Video as VideoIcon, Box } from 'lucide-react'; // 🔥 Tambah import Box

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col group animate-fade-in-up">
            {/* Image Area */}
            <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                <img
                    src={product.image_url || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Error'; }}
                />
                
                {/* 🔥 FITUR BARU: BADGE AR */}
                {/* Kalau has_ar true, munculin badge ini */}
                {(product.has_ar === true || product.has_ar === 1) && (
                    <div className="absolute bottom-2 left-2 bg-indigo-600/90 backdrop-blur text-white p-1.5 rounded-md shadow-sm z-10 flex items-center gap-1 text-[10px] font-bold">
                        <Box size={12} /> AR READY
                    </div>
                )}

                {product.video_url && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-md backdrop-blur-sm">
                        <VideoIcon size={14} />
                    </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                        onClick={() => onEdit(product)}
                        className="p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer transform hover:scale-110"
                        title="Edit"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 bg-white text-rose-500 rounded-full hover:bg-rose-50 transition-colors shadow-lg cursor-pointer transform hover:scale-110"
                        title="Hapus"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={product.name}>{product.name}</h3>
                    <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                        #{product.slug}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                    {product.description || 'Tidak ada deskripsi.'}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-400 uppercase font-semibold">Harga</span>
                        <p className="text-indigo-600 font-bold text-lg">
                            Rp {parseInt(product.price).toLocaleString('id-ID')}
                        </p>
                    </div>
                    {product.composition && (
                        <div className="text-right max-w-[50%]">
                            <span className="text-xs text-gray-400 uppercase font-semibold">Komposisi</span>
                            <p className="text-xs text-gray-600 truncate">{product.composition}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}