'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    // Di sinilah relasi One-to-Many didefinisikan
    static associate(models) {
      // 'User' (model ini) memiliki banyak (hasMany) 'ApiKey'
      User.hasMany(models.ApiKey, {
        foreignKey: 'user_id', // Nama kolom di tabel 'api_keys'
        as: 'apiKeys'          // Alias saat Anda melakukan query
      });
    }
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama_lengkap: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  });
  return User;
};