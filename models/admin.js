'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    // Tidak perlu 'associate' jika tidak ada relasi
  }
  
  Admin.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: { // Sesuai dengan SQL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: true,      // Izinkan Sequelize mengelola timestamps
    updatedAt: false,      // Tapi kita tidak punya kolom 'updated_at'
    createdAt: 'created_at' // Map 'createdAt' ke kolom 'created_at'
  });
  return Admin;
};