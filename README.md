# UniTIX Documentation

UniTIX adalah platform yang dirancang untuk mendukung penyelenggaraan acara di lingkungan
kampus. Produk ini membantu organisasi mahasiswa dalam mengatasi tantangan utama terkait
distribusi tiket dan manajemen peserta acara. Dengan UniTIX, proses dari awal hingga akhir
penyelenggaraan acara menjadi lebih terstruktur dan efisien.

---

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js & Express.js
- Database: MongoDB dengan Mongoose

---

## Cara Install dan Setup

### 1. Clone Repository dan Install Dependencies

1. Clone repository ini:

 ```bash
 git clone <url-repo-ini>
 ```

2. Masuk ke folder proyek untuk frontend dan backend di terminal yang berbeda:
   
 ```bash
 cd frontend
 cd backend
 ```

3. Install dependencies yang dibutuhkan di kedua folder:
   
 ```bash
 npm install
 ```

### 2. Setup Environment Variables

Buat file .env di root folder frontend dan backend, lalu salin isi dari file .env.example masing-masing
folder dan sesuaikan dengan kebutuhan.

- Frontend (.env):
  
 ```env
 VITE_API_BASE_URL= # URL endpoint API backend
 ```

- Backend (.env):
  
 ```env
 PORT=8080
 MONGODB_URI=mongodb://localhost:27017/<nama-database>
 JWT_SECRET=<your-jwt-secret>
 JWT_EXPIRES_IN=24h
 EMAIL_USER=<email-untuk-nodemailer>
 EMAIL_PASS=<password-email-untuk-nodemailer>
 MIDTRANS_SERVER=<midtrans-server-key>
 MIDTRANS_CLIENT=<midtrans-client-key>
 CLOUDINARY_CLOUD_NAME=<cloudinary-name>
 CLOUDINARY_API_KEY=<cloudinary-api-key>
 CLOUDINARY_API_SECRET=<cloudinary-secret>
 ```

### 3. Menjalankan Database Seeder (Opsional)

Untuk memulai dengan data awal:

```bash
node src/seeder/seeder.js
```

Script ini akan menghasilkan:
- 2 akun admin
- 10 data dummy acara

### 4. Menjalankan Aplikasi (Frontend dan Backend)

- Frontend:
 ```bash
 npm run dev
 ```

- Backend (menggunakan nodemon):
 ```bash
 npm run dev
 ```

### Notes: pastikan untuk setup instalasi di kedua root folder project frontend & backend 

---

## API Endpoints

### Postman Collection

Anda dapat mengakses dokumentasi lengkap API menggunakan link Postman berikut:
https://www.postman.com/unitix/unitix/collection/ofxvkms/unitix?action=share&creator=35310270.

Catatan:
1. Gunakan fork pada Postman Collection untuk dapat menggunakan endpoint API sesuai
kebutuhan Anda.
2. Pastikan menyesuaikan variabel url di Postman ke endpoint lokal jika menjalankan aplikasi
secara lokal.
3. Postman Collection sudah dilengkapi dengan:
 - Authorization
 - Body request untuk setiap endpoint yang relevan.

---

## Tentang Kami

UniTIX dikembangkan oleh Tix Infinity:
- M. Dipo Alam Kusumo
- Aryo Yonatan
- Vella Puspitasari Wijayanti
- Dimas Adi Syahputra
- Muhammad Syahrul Akrom
