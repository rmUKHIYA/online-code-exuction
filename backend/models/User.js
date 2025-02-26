// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const User = sequelize.define("User", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const bcrypt = require("bcryptjs");

// const User = sequelize.define("User", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Hash password before saving user
// User.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });

// module.exports = User;





const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures valid email format
    },
  },
  passwordHash: { // Renamed 'password' to 'passwordHash' for clarity
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hash password before saving the user
User.beforeCreate(async (user) => {
  user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
});

// Method to compare hashed passwords during login
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = User;
