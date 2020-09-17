"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    isValidPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNUll: false,
      },
      phone: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      secretKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
