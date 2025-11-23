const db = require('../models');

async function connectDB() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        await db.sequelize.sync({ alter: true }); // Sinkronisasi model dengan database
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Keluar dari aplikasi jika koneksi gagal
    }
}
module.exports = connectDB;