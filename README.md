# 📋 Dokumentasi Lengkap: Bumdes-KualaAlam

## 📌 Informasi Umum

| Item                      | Detail                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Repository** | Bumdes-KualaAlam                                                                                                                                                        |
| **Nama Proyek**     | dashboard-umkm                                                                                                                                                          |
| **Owner**           | bayudani                                                                                                                                                                |
| **Visibilitas**     | Public                                                                                                                                                                  |
| **Bahasa Utama**    | JavaScript                                                                                                                                                              |
| **Default Branch**  | dev                                                                                                                                                                     |
| **Live Demo**       | [[https://bumdes-kuala-alam-8zzb.vercel.app](](https://bumdes-kuala-alam-8zzb.vercel.app](/)[https://bumdes-kuala-alam-8zzb](https://bumdes-kuala-alam-8zzb/). vercel.app) |
| **Repository URL**  | [https://github.com/bayudani/Bumdes-KualaAlam](https://github.com/bayudani/Bumdes-KualaAlam)                                                                               |

---

## 🎯 Deskripsi Proyek

**Bumdes-KualaAlam** adalah aplikasi **Dashboard UMKM** (Usaha Mikro, Kecil, dan Menengah) yang dibangun untuk  **BUMDes (Badan Usaha Milik Desa) Kuala Alam** . Aplikasi ini merupakan Single Page Application (SPA) berbasis web yang dikembangkan menggunakan teknologi modern React + Vite.

---

## 🛠️ Tech Stack

### Frontend Framework & Tools

| Teknologi              | Versi    | Kegunaan                        |
| ---------------------- | -------- | ------------------------------- |
| **React**        | ^19.2.0  | Library UI utama                |
| **React DOM**    | ^19.2.0  | React renderer untuk browser    |
| **Vite**         | ^7.2.4   | Build tool & development server |
| **Tailwind CSS** | ^4.1.17  | Utility-first CSS framework     |
| **Lucide React** | ^0.556.0 | Icon library                    |

### Development Dependencies

| Teknologi                             | Versi   | Kegunaan                         |
| ------------------------------------- | ------- | -------------------------------- |
| **ESLint**                      | ^9.39.1 | Code linting                     |
| **eslint-plugin-react-hooks**   | ^7.0.1  | Linting untuk React Hooks        |
| **eslint-plugin-react-refresh** | ^0.4.24 | Linting untuk React Refresh      |
| **@vitejs/plugin-react**        | ^5.1.1  | Vite plugin untuk React          |
| **@types/react**                | ^19.2.5 | TypeScript types untuk React     |
| **@types/react-dom**            | ^19.2.3 | TypeScript types untuk React DOM |

---

## 📁 Struktur Proyek

**Code**

```
Bumdes-KualaAlam/
├── 📄 index.html           # Entry point HTML
├── 📄 package.json         # Konfigurasi npm & dependencies
├── 📄 package-lock.json    # Lock file dependencies
├── 📄 vite.config.js       # Konfigurasi Vite
├── 📄 eslint.config.js     # Konfigurasi ESLint
├── 📄 . gitignore           # Git ignore rules
├── 📄 README.md            # Dokumentasi dasar
├── 📁 public/              # Static assets
├── 📁 src/                 # Source code
│   ├── 📄 main.jsx         # Entry point aplikasi React
│   ├── 📄 App.jsx          # Komponen utama aplikasi
│   ├── 📄 App.css          # Styling untuk App
│   ├── 📄 index.css        # Global CSS styles
│   ├── 📁 assets/          # Assets (gambar, icons, dll)
│   ├── 📁 components/      # Komponen React reusable
│   └── 📁 hooks/           # Custom React Hooks
```

---

## 🚀 Instalasi & Setup

### Prasyarat

* **Node.js** (versi terbaru LTS disarankan)
* **npm** atau **yarn**

### Langkah Instalasi

1. **Clone Repository**
   **bash**

   ```
   git clone https://github.com/bayudani/Bumdes-KualaAlam.git
   cd Bumdes-KualaAlam
   ```
2. **Install Dependencies**
   **bash**

   ```
   npm install
   ```
3. **Jalankan Development Server**
   **bash**

   ```
   npm run dev
   ```
4. **Buka di Browser**
   **Code**

   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Script            | Command             | Deskripsi                                                          |
| ----------------- | ------------------- | ------------------------------------------------------------------ |
| **dev**     | `npm run dev`     | Menjalankan development server dengan Hot Module Replacement (HMR) |
| **build**   | `npm run build`   | Build aplikasi untuk production                                    |
| **preview** | `npm run preview` | Preview hasil build production                                     |
| **lint**    | `npm run lint`    | Menjalankan ESLint untuk code linting                              |
| **start**   | `npm run start`   | Menjalankan server dengan nodemon                                  |

---

## 🌐 Deployment

Aplikasi ini di-deploy menggunakan **Vercel** dan dapat diakses melalui:

* **URL** : [https://bumdes-kuala-alam-8zzb.vercel.app](https://bumdes-kuala-alam-8zzb.vercel.app/)

### Deploy ke Vercel (Manual)

1. Push code ke repository GitHub
2. Connect repository ke Vercel
3. Vercel akan otomatis build dan deploy

---

## ⚙️ Konfigurasi

### Vite Configuration

File `vite.config.js` berisi konfigurasi untuk:

* React plugin dengan Babel untuk Fast Refresh
* Tailwind CSS integration via `@tailwindcss/vite`

### ESLint Configuration

File `eslint.config.js` dikonfigurasi untuk:

* JavaScript linting
* React Hooks rules
* React Refresh rules

---

## 🎨 Fitur Utama

Berdasarkan nama proyek "dashboard-umkm", aplikasi ini kemungkinan memiliki fitur:

* 📊 **Dashboard** - Tampilan ringkasan data UMKM
* 🏪 **Manajemen UMKM** - Pengelolaan data usaha mikro

## 👤 Kontributor

* **bayudani** - Owner & Developer

---

## 📞 Kontak & Support

* **GitHub** : [@bayudani](https://github.com/bayudani)
* **Repository Issues** : [Issues Page](https://github.com/bayudani/Bumdes-KualaAlam/issues)
