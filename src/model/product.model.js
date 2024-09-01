const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Product = sequelize.define('Product', {
  serialNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inputUrls: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  outputUrls: {
    type: DataTypes.TEXT,
  },
  processingRequestId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = Product;