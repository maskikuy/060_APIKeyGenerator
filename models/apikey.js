'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    
    // Di sinilah relasi Many-to-One didefinisikan
    static associate(models) {
      // 'ApiKey' (model ini) dimiliki oleh (belongsTo) 'User'
      ApiKey.belongsTo(models.User, {
        foreignKey: 'user_id', // Nama kolom di tabel ini
        as: 'user'             // Alias
      });
    }
  }

  ApiKey.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    key_value: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    user_id: { // Ini adalah Foreign Key
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nama tabel yang direferensikan
        key: 'id'
      }
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true // Bisa jadi null jika key tidak kedaluwarsa
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ApiKey',
    tableName: 'api_keys',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  });
  return ApiKey;
};