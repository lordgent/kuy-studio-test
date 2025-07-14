# Technical Test – Fullstack (Laravel + Next.js)

Project ini terdiri dari:
- **Backend (Laravel)** – API manajemen task
- **Frontend (Next.js + Tailwind CSS)** – Dashboard UI untuk mengelola task

---

## Struktur Folder

technical-tes-kuystudio/
├── api-task # Backend
└── frontend-task # Frontend

---


## Setup Backend (Laravel)

Masuk ke direktori backend:

cd api-task

Salin file .env:

cp .env.example .env
Edit file .env dan sesuaikan konfigurasi database di local:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

jalankan perintah berikut:
- composer install
- php artisan key:generate
- php artisan migrate
- php artisan serve
- Laravel akan running di: http://localhost:8000


## Setup Frontend (Next.js)

Masuk ke direktori frontend:

cd frontend-task
Install dependensi:
- npm install

Jalankan development server:
- npm run dev
Next.js akan running di: http://localhost:3000