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
## 🚀 Cara Instalasi (Zero-Conf Native Docker)

Template ini menggunakan **Pencarian Port Otomatis Bawaan Docker**. Anda tidak perlu pusing memikirkan bentrok port.

1. **Jalankan Project**:
   ```bash
   docker compose up -d --build
   ```

2. **Cek Alamat Aplikasi**:
   Karena port dipilih secara otomatis oleh Docker, jalankan perintah ini untuk melihat URL yang aktif:
   ```bash
   docker compose ps
   ```
   *Lihat bagian `PORTS`. Contoh: `0.0.0.0:32768->80/tcp` berarti buka `http://localhost:32768` di browser Anda.*

---

## 🛠️ Cara Manual (Docker Compose)
Jika Anda lebih suka cara manual:
1. Copy `.env.example` ke `.env`.
2. Sesuaikan port di bagian# Docker Port Mapping (Optional Override)
# Anda bisa membiarkannya kosong untuk pencarian otomatis oleh Docker.
# APP_PORT=8000
# DB_PORT=5432
# REDIS_PORT=6380
. Jalankan `docker compose up -d --build`.

### 🏮 Apa yang terjadi saat `up` pertama kali?
- Docker akan mengunduh core Laravel terbaru ke folder lokal.
- Menjalankan `composer install` & `npm install`.
- Membuat `.env` dan `APP_KEY`.
- Mengatur koneksi database PostgreSQL & Redis secara otomatis.
- Menjalankan migrasi database.

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
