# User Management UI

User Management UI adalah aplikasi web berbasis React + Vite untuk mengelola data pengguna. Proyek ini menggunakan TypeScript, modularisasi komponen, dan mengikuti best practice pengembangan frontend modern.

## Fitur

- Tabel data pengguna dengan pagination
- Form tambah/edit pengguna
- Sidebar navigasi
- Modal konfirmasi
- Validasi form
- Konsumsi API eksternal (mocked)

## Struktur Proyek

```
user-management-ui/
├── public/                # File statis (ikon, gambar)
├── src/
│   ├── assets/            # Aset gambar
│   ├── components/        # Komponen UI modular
│   │   ├── data-table/    # Tabel data pengguna
│   │   ├── header/        # Header aplikasi
│   │   ├── modal/         # Modal konfirmasi
│   │   ├── sidebar/       # Sidebar navigasi
│   │   └── user-form/     # Form tambah/edit pengguna
│   ├── constants/         # Konstanta aplikasi
│   ├── hooks/             # Custom hooks
│   ├── interface/         # Tipe data TypeScript
│   ├── services/          # Service API
│   └── utils/             # Utility functions
├── App.tsx                # Root komponen React
├── main.tsx               # Entry point aplikasi
├── package.json           # Konfigurasi npm
├── vite.config.ts         # Konfigurasi Vite
└── ...
```

## Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/ardiansoul/user-management-ui.git
   cd user-management-ui/user-management-ui
   ```
2. **Install dependencies:**
   ```bash
   yarn install
   # atau
   npm install
   ```

## Menjalankan Aplikasi (Development)

```bash
yarn dev
# atau
npm run dev
```

Akses aplikasi di [http://localhost:5173](http://localhost:5173)

## Build Production

```bash
yarn build
# atau
npm run build
```

Output build akan berada di folder `dist/`.

## Struktur Kode Utama

- `src/components/` — Semua komponen UI utama (tabel, form, modal, sidebar, header)
- `src/services/users.ts` — Service untuk request data user
- `src/interface/` — Definisi tipe data (User, Address, Company, dsb)
- `src/hooks/useModal.tsx` — Custom hook untuk modal
- `src/utils/` — Utility functions (API, validasi, dsb)

## Pengembangan

- Menggunakan React + TypeScript
- Vite sebagai bundler
- Struktur modular dan mudah dikembangkan
- Mendukung hot reload

## Kontribusi

Pull request dan issue sangat terbuka untuk pengembangan lebih lanjut.

## Lisensi

MIT
