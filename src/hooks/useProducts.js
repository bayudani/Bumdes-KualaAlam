import { useState, useEffect, useCallback } from 'react';

const API_URL = "https://api-ar-umkm-97qh.vercel.app/api";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [submitting, setSubmitting] = useState(false);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    }, []);

    // Helper: Ambil Token
    const getAuthHeaders = () => {
        const token = localStorage.getItem("authToken");
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // GET Data
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/product`, {
                headers: { ...getAuthHeaders() }
            });
            const json = await res.json();
            if (json.status === 'success') {
                setProducts(json.data);
            } else {
                showToast('Gagal ambil data bestie 😭', 'error');
            }
        } catch (err) {
            showToast('Server lagi ngambek nih', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // SAVE (Create/Update)
    const saveProduct = async (formData, isEditing, currentId) => {
        setSubmitting(true);
        const data = new FormData();

        Object.keys(formData).forEach(key => {
            // Handle khusus boolean has_ar biar kebaca backend string
            if (key === 'has_ar') {
                data.append(key, formData[key]);
            } else if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            const url = isEditing ? `${API_URL}/product/${currentId}` : `${API_URL}/product/`;
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { ...getAuthHeaders() },
                body: data
            });

            const result = await res.json();

            // Cek Token Expired
            if (res.status === 401 || res.status === 403) {
                showToast('Sesi habis! Login ulang ya.', 'error');
                localStorage.removeItem("authToken");
                setTimeout(() => window.location.reload(), 1500);
                return false;
            }

            if (res.ok && (result.status === 'success' || result.status === 'true')) {
                showToast(isEditing ? 'Produk berhasil diupdate! ✨' : 'Produk baru meluncur! 🚀');
                fetchProducts();
                return true;
            } else {
                showToast(result.message || 'Ada yang salah bestie...', 'error');
                return false;
            }
        } catch (error) {
            showToast('Error koneksi ke server', 'error');
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // DELETE
    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/product/${id}`, {
                method: 'DELETE',
                headers: { ...getAuthHeaders() }
            });

            if (res.status === 401 || res.status === 403) {
                showToast('Sesi habis! Login ulang ya.', 'error');
                localStorage.removeItem("authToken");
                setTimeout(() => window.location.reload(), 1500);
                return;
            }

            if (res.ok) {
                showToast('Produk berhasil dihapus 👋');
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                const result = await res.json();
                showToast(result.message || 'Gagal hapus data', 'error');
            }
        } catch (error) {
            showToast('Gagal hapus data', 'error');
        }
    };

    return { products, loading, toast, submitting, saveProduct, deleteProduct };
};