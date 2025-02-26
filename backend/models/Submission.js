const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Submission = sequelize.define("Submission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Submission;
