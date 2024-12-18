# UniTIX

Penyelenggaraan acara di lingkungan kampus seringkali menjadi momen penting bagi organisasi mahasiswa, baik itu untuk mempromosikan budaya, memperluas jaringan, maupun menggalang dana. Namun, terdapat sejumlah tantangan utama dalam pengelolaan acara, terutama yang berkaitan dengan pendistribusian tiket dan manajemen peserta.
UniTIX hadir untuk memberikan solusi menyeluruh terhadap tantangan pendistribusian tiket dan manajemen peserta acara kampus. Produk ini mengintegrasikan berbagai fungsi penting yang mendukung kelancaran penyelenggaraan acara, mulai dari awal hingga akhir.

## Tech Stack

- React Vite
- Node.js & Express.js
- MongoDB dengan Mongoose

## Cara Install & Setup

### 1. Clone Repository dan Install Dependencies

```bash
# Clone repo ini
git clone <url-repo-ini>

# Masuk ke folder project di terminal yang berbeda (frontend & backend)
cd frontend & cd backend

# Install dependencies yang dibutuhkan, di kedua terminal nya
npm install
```

### 2. Setup Environment Variables

Buat file `.env` di root folder frontend dan backend. Bisa copy dari `.env.example` dari masing masing root folder frontend dan backend. terus sesuaikan isi nya:

- Frontend:
```env
VITE_API_BASE_URL= # tambahkan ke endpoint api backend
```

- Backend:
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/ # tambahkan nama collection yang anda inginkan
JWT_SECRET= # buat jwt secret nya
JWT_EXPIRES_IN=24h
EMAIL_USER= # tambahkan email untuk nodemailer
EMAIL_PASS= # tambahkan password email untuk nodemailer
MIDTRANS_SERVER= # tambahkan server key midtrans
MIDTRANS_CLIENT= # tambahkan server key midtrans
CLOUDINARY_CLOUD_NAME= # tambahkan cloudinary name
CLOUDINARY_API_KEY= # tambahkan cloudinary api key
CLOUDINARY_API_SECRET= # tambahkan cloudinary secret
```

### 3. Jalanin Database Seeder (di backend)

(Disarankan) Untuk data awal, bisa jalanin seeder:

```bash
node src/seeder/seeder.js
```

Ini bakal bikin:
- 2 user admin
- 10 event dummy

### 4. Jalanin Aplikasi di frontend & backend

- Frontend:
```bash
npm run dev
```

- Backend(menggunakan nodemon):
```bash
npm run dev
```
### Notes: pastikan untuk setup instalasi di kedua root folder project frontend & backend 

## Endpoints API

### Link Postman
https://www.postman.com/unitix/unitix/collection/ofxvkms/unitix?action=share&creator=35310270

Link postman sudah berisi variabel url yang terhubung ke link deploy backend, harap ganti ke endpoint lokal untuk menjalankan nya secara lokal.
di postman sudah lengkap endpoint api nya, serta authorization dan body pada masing masing endpoint yang membutuhkan. 

Notes: Fork collection link postman nya dan perhatikan authorization dan body pada setiap api.

---

Made by Tix Infinity
Best regards,
- M Dipo Alam Kusumo
- Aryo Yonatan
- Vella Puspitasari Wijayanti
- Dimas Adi Syahputra
- Muhammad Syahrul Akrom
