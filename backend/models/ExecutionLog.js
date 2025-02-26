const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ExecutionLog = sequelize.define("ExecutionLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  executionTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  memoryUsed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = ExecutionLog;
