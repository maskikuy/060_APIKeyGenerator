const express = require('express');
const connectDB = require('./config/db');

// --- TAMBAHAN 1: Import file route Anda ---
const userRoutes = require('./routes/userRoutes'); 
// (Pastikan Anda juga punya file routes/adminRoutes atau lainnya jika perlu)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware bawaan Anda
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- TAMBAHAN 2: Memberi tahu Express untuk menggunakan route Anda ---
// Setiap request ke /api/users akan ditangani oleh userRoutes
app.use('/api/users', userRoutes); 

// (Tambahkan route lain di sini jika ada)
// app.use('/api/admins', adminRoutes);

// Fungsi startServer Anda (TIDAK BERUBAH)
async function startServer() {
    await connectDB(); // Menjalankan fungsi koneksi Anda
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Memulai server (TIDAK BERUBAH)
startServer();