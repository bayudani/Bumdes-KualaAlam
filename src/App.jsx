import React, { useState } from 'react';
import { 
  Search, 
  Loader2, 
  PackageOpen, 
  LayoutGrid, 
  List as ListIcon,
  Plus 
} from 'lucide-react';

// === IMPORTS KOMPONEN ===
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductTable from './components/ProductTable';
import ModalForm from './components/ModalForm';
import Toast from './components/Toast';
import LoginPage from './components/LoginPage';
import { useProducts } from './hooks/useProducts';

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Ambil token, kalau ada berarti true
    return !!localStorage.getItem("authToken");
  });

  const [viewMode, setViewMode] = useState('table'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State Form & Preview
  const [formData, setFormData] = useState({ 
    slug: '', name: '', price: '', description: '', composition: '', image: null, video: null 
  });
  const [previews, setPreviews] = useState({ image: null, video: null });

  // Panggil logic produk dari Custom Hook (Otak-nya)
  const { products, loading, toast, submitting, saveProduct, deleteProduct } = useProducts();

  
  const handleLogout = () => {
    if(window.confirm("Yakin mau logout?")) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    }
  };

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const resetForm = () => {
    setFormData({ slug: '', name: '', price: '', description: '', composition: '', image: null, video: null });
    setPreviews({ image: null, video: null });
    setIsEditing(false);
    setCurrentId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setFormData({
      slug: product.slug, name: product.name, price: product.price,
      description: product.description || '', composition: product.composition || '',
      image: null, video: null
    });
    setPreviews({ image: product.image_url, video: product.video_url });
    setIsModalOpen(true);
  };

  // --- CRUD ACTIONS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await saveProduct(formData, isEditing, currentId);
    if (success) resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus? Gak bisa undo loh... 🥺")) {
      deleteProduct(id);
    }
  };

  // --- FILTERING ---
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🛑 GUARD: Belum Login -> Tampil Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // ✅ SUDAH LOGIN -> Tampil Dashboard
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      
      <Navbar onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* CONTROLS SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          
          {/* KIRI: Search Bar */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 outline-none sm:text-sm shadow-sm transition-all"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* KANAN: Action Buttons (Tambah & Toggle View) */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            {/* Tombol Tambah Produk (Sekarang di Body!) */}
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus size={18} />
              <span>Tambah Produk</span>
            </button>

            {/* View Toggle */}
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm shrink-0">
              <button 
                onClick={() => setViewMode('table')} 
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`} 
                title="Table View"
              >
                <ListIcon size={20} />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`} 
                title="Grid View"
              >
                <LayoutGrid size={20} />
              </button>
            </div>

          </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p>Lagi loading data nih...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
            <PackageOpen size={48} className="mb-2 opacity-50" />
            <p>Belum ada produk nih.</p>
          </div>
        ) : (
          /* Conditional Rendering: Table vs Grid */
          viewMode === 'table' ? (
            <ProductTable 
              products={filteredProducts} 
              onEdit={openEditModal} 
              onDelete={handleDelete}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={openEditModal} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )
        )}
      </main>

      {/* MODALS & NOTIFICATIONS */}
      <ModalForm 
        isOpen={isModalOpen} 
        isEditing={isEditing} 
        formData={formData} 
        previews={previews} 
        submitting={submitting} 
        onClose={resetForm} 
        onSubmit={handleSubmit} 
        onChange={handleInputChange} 
        onFileChange={handleFileChange} 
      />
      
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
      />
    </div>
  );
}