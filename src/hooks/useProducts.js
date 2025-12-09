import { useState, useEffect, useCallback } from 'react';

const API_URL = "https://api-ar-umkm-97qh.vercel.app/api"; 

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [submitting, setSubmitting] = useState(false);

    // --- HELPER: TOAST ---
    const showToast = useCallback((message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    }, []);

    // --- HELPER: GET TOKEN ---
    // Ambil token dari brankas (localStorage) buat ditempel di header
    const getAuthHeaders = () => {
        const token = localStorage.getItem("authToken");
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // --- READ (GET) ---
    
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
                showToast('Gagal ambil data ', 'error');
            }
        } catch (err) {
            showToast('Server error', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // --- CREATE & UPDATE (POST/PATCH) - PROTECTED  ---
    const saveProduct = async (formData, isEditing, currentId) => {
        setSubmitting(true);
        const data = new FormData();

        // Convert object ke FormData
        Object.keys(formData).forEach(key => {
            if (formData[key]) data.append(key, formData[key]);
        });

        try {
            const url = isEditing ? `${API_URL}/product/${currentId}` : `${API_URL}/product/`;
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    ...getAuthHeaders() 
                },
                body: data
            });

            const result = await res.json();

            // Cek kalau token expired (401/403)
            if (res.status === 401 || res.status === 403) {
                showToast('Sesi habis! Login ulang ya.', 'error');
                localStorage.removeItem("authToken");
                setTimeout(() => window.location.reload(), 1500); // Tendang ke login page
                return false;
            }

            if (res.ok && (result.status === 'success' || result.status === 'true')) {
                showToast(isEditing ? 'Produk berhasil diupdate! ✨' : 'Produk baru meluncur!');
                fetchProducts();
                return true;
            } else {
                showToast(result.message || 'Ada yang salah...', 'error');
                return false;
            }
        } catch (error) {
            showToast('Error koneksi ke server', 'error');
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    // --- DELETE - PROTECTED 🔒 ---
    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/product/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeaders() 
                }
            });

            // Cek token expired
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

    return {
        products,
        loading,
        toast,
        submitting,
        saveProduct,
        deleteProduct
    };
};