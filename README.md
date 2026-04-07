# 🚀 Laravel 13 Docker Template (FrankenPHP + PostgreSQL + Redis)

Boilerplate profesional untuk memulai proyek Laravel 13 dengan performa tinggi menggunakan **FrankenPHP**. Template ini dirancang untuk kemudahan penggunaan, efisiensi resource, dan siap untuk skala produksi.

---

## ✨ Fitur Utama

- **Laravel 13 Core**: Versi terbaru dengan fitur paling mutakhir.
- **FrankenPHP**: Application server berbasis Go yang ultra-cepat (pengganti PHP-FPM + Nginx).
- **Spatie Role & Permission**: Sistem Role (Super Admin, Admin, User) yang sudah terkonfigurasi.
- **Spatie Activity Log**: Audit trail otomatis untuk mencatat setiap perubahan data.
- **Docker Ready**: Dilengkapi dengan PostgreSQL, Redis, dan Node.js 20.
- **Auto-Setup**: Otomatis mengunduh Laravel, menginstall composer & npm, serta menjalankan migrasi & seeder hanya dengan satu perintah.
- **Git Detachment**: Otomatis memutuskan hubungan git dari template setelah instalasi pertama (menghindari salah push ke repo template).
- **CI/CD Ready**: Konfigurasi GitHub Actions dan GitLab CI (Multi-branch: dev, staging, main) sudah tersedia.
- **Modern Stack**: Support Tailwind CSS (v4), React, Inertia.js, dan TypeScript.

---

## 🛠️ Prasyarat

Pastikan Anda sudah menginstal:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Cara Penggunaan

Cukup jalankan langkah berikut, dan docker akan mengurus sisanya:

### Metode 1: Gunakan Composer (Disarankan)
Sangat praktis untuk memulai proyek baru:
## 🚀 Cara Instalasi (Auto-Port Discovery)

Template ini dilengkapi dengan fitur **Auto-Port Discovery**. Jika port default (8000) sudah dipakai di laptop Anda, sistem akan otomatis mencari port lain yang kosong.

1. **Clone repositori ini**:
   ```bash
   git clone https://github.com/sulaksana23/template-docker.git
   cd template-docker
   ```

2. **Jalankan script otomatis**:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

3. **Selesai!** Terminal akan menampilkan URL aplikasi Anda (contoh: `http://localhost:8000` atau `http://localhost:8001`).

---

## 🛠️ Cara Manual (Docker Compose)
Jika Anda lebih suka cara manual:
1. Copy `.env.example` ke `.env`.
2. Sesuaikan port di bagian `Docker Port Mapping` jika perlu.
3. Jalankan `docker compose up -d --build`.

### 🏮 Apa yang terjadi saat `up` pertama kali?
- Docker akan mengunduh core Laravel terbaru ke folder lokal.
- Menjalankan `composer install` & `npm install`.
- Membuat `.env` dan `APP_KEY`.
- Mengatur koneksi database PostgreSQL & Redis secara otomatis.
- Menjalankan migrasi database.
- **Self-Destruct Git**: Folder `.git` dari template ini akan dihapus dan diganti dengan `git init` baru untuk proyek Anda (Hanya pada instalasi pertama).

---

## 🏗️ Struktur Docker

- **App**: `Laravel 13` + `FrankenPHP` (Port 8000)
- **DB**: `PostgreSQL 15` (Port 5432)
- **Cache**: `Redis` (Port 6380)

---

## 📈 Alur CI/CD (GitFlow)

Template ini mendukung alur kerja tim profesional:
1. **Branch `dev`**: Untuk pengembangan fitur harian (Auto-test).
2. **Branch `staging`**: Untuk pengujian kualitas (Auto-deploy ke staging).
3. **Branch `main`**: Untuk rilis produksi (Auto-deploy ke production).

---

## ☕ Dukung Proyek Ini

Jika template ini membantu mempercepat pekerjaan Anda, pertimbangkan untuk mentraktir saya kopi agar saya tetap semangat mengembangkan tools gratis lainnya!

[![Trakteer](https://trakteer.id/images/qube/trakteer-button.png)](https://trakteer.id/bali_techsolution)

**[KLIK DI SINI UNTUK TRAKTIR KOPI](https://trakteer.id/bali_techsolution)** 🚀

---

## 📄 Lisensi

Proyek ini bersifat Open Source di bawah lisensi [MIT](LICENSE). Bebas digunakan untuk proyek komersial maupun pribadi.

---
*Dibuat dengan ❤️ untuk komunitas Developer Indonesia.*
