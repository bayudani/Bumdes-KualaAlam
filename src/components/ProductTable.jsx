import React from 'react';
import { Edit, Trash2, Video as VideoIcon } from 'lucide-react';

export default function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Produk</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Harga</th>
                            <th className="px-6 py-4">Komposisi</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-indigo-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 relative group-hover:border-indigo-200 transition-colors">
                                            <img
                                                src={product.image_url || 'https://via.placeholder.com/150'}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                            />
                                            {product.video_url && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <VideoIcon size={12} className="text-white drop-shadow-md" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</p>
                                            <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{product.description || 'No desc'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                        {product.slug}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900">
                                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                                </td>
                                <td className="px-6 py-4 max-w-xs truncate text-gray-400">
                                    {product.composition || '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}