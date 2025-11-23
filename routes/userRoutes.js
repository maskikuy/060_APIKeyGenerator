const express = require('express');
const router = express.Router();

// 1. Import controller baru
const { 
    registerUser,
    loginUser,  // <-- BARU
    getMe       // <-- BARU
} = require('../controllers/userController');

// 2. Import middleware proteksi
const { protect } = require('../middleware/authMiddleware'); // <-- BARU

// --- Rute Publik ---
// (Bisa diakses siapa saja)

// @desc    Registrasi user baru
// @route   POST /api/users/register
router.post('/register', registerUser);

// @desc    Login user
// @route   POST /api/users/login
router.post('/login', loginUser); // <-- BARU


// --- Rute Terproteksi ---
// (Hanya bisa diakses dengan token)

// @desc    Mendapatkan data user yang sedang login
// @route   GET /api/users/me
// 'protect' akan dijalankan dulu, baru 'getMe'
router.get('/me', protect, getMe); // <-- BARU


module.exports = router;