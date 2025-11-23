// File: controllers/userController.js

const { User } = require('../models'); // Import model User
const bcrypt = require('bcrypt');     // Import bcrypt

const registerUser = async (req, res) => {
    try {
        // 1. Ambil data dari body request
        const { nama_lengkap, email, password } = req.body;

        // 2. Validasi sederhana
        if (!nama_lengkap || !email || !password) {
            return res.status(400).json({ 
                message: 'Nama lengkap, email, dan password harus diisi' 
            });
        }

        // 3. Hash password-nya
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Buat user baru di database
        const newUser = await User.create({
            nama_lengkap: nama_lengkap,
            email: email,
            password_hash: hashedPassword // Simpan password yang sudah di-hash
        });

        // 5. Kirim respon sukses (jangan kirim password hash)
        res.status(201).json({
            id: newUser.id,
            nama_lengkap: newUser.nama_lengkap,
            email: newUser.email,
            created_at: newUser.created_at
        });

    } catch (error) {
        // Tangani error (misal: email duplikat)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email sudah terdaftar.' });
        }
        console.error('Error saat registrasi:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

// Export fungsi agar bisa dipakai di file lain
module.exports = {
    registerUser
};