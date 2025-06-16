# Simple Chat

**Simple Chat** adalah aplikasi chat sederhana berbasis web yang memungkinkan banyak pengguna saling bertukar pesan secara real-time melalui WebSocket.

## Fitur

- Login dengan nama pengguna tanpa registrasi
- Chat room publik: semua pesan dapat dibaca oleh seluruh pengguna yang bergabung
- Tampilan antarmuka modern dan responsif
- Notifikasi sistem untuk status koneksi (terhubung, terputus, error)
- Pesan ditampilkan dengan animasi sederhana
- Backend menggunakan Node.js + Express + WebSocket
- Frontend menggunakan HTML, CSS, dan JavaScript murni

## Instalasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/ramadani00/simple-chat.git
   cd simple-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan server**
   ```bash
   npm start
   ```
   Secara default aplikasi akan berjalan di http://localhost:3000

## Penggunaan

1. Buka browser dan akses `http://localhost:3000`
2. Masukkan nama Anda pada halaman login, lalu klik **Masuk ke Chat**
3. Tulis pesan Anda di kolom bawah dan klik **Kirim** atau tekan Enter
4. Pesan Anda dan pesan dari pengguna lain akan muncul secara real-time

## Struktur Direktori

```
simple-chat/
├── public/
│   ├── index.html    # Halaman utama aplikasi chat
│   ├── script.js     # Logic client-side chat
│   └── style.css     # Styling tampilan chat
└── server/
    ├── config.js     # Konfigurasi server (port, env, dsb)
    ├── logger.js     # Logger sederhana
    └── server.js     # Logic backend & WebSocket server
```

## Lisensi

Aplikasi ini open source dan bebas digunakan untuk pembelajaran.

---
