const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ProcessingRequest = sequelize.define('ProcessingRequest', {
  requestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  webhookUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = ProcessingRequest;