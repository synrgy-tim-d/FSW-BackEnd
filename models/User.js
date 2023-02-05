"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      not_expired: DataTypes.BOOLEAN,
      not_locked: DataTypes.BOOLEAN,
      credential_not_expired: DataTypes.BOOLEAN,
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      expired_verify_token: DataTypes.DATE,
      fullname: DataTypes.STRING,
      otp: DataTypes.STRING,
      otp_expired_date: DataTypes.DATE,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      username: DataTypes.STRING,
      verify_token: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "oauth_user",
      timestamps: false,
    }
  );

  return User;
};
