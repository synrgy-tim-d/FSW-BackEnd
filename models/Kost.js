"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kost.hasMany(models.KostRoom, {
        foreignKey: "kost_id",
      });
      Kost.hasMany(models.Booking, {
        foreignKey: "kost_id",
      });
      Kost.belongsTo(models.SetupCity, {
        foreignKey: "city_id",
      });
      Kost.hasMany(models.SetupImage, {
        foreignKey: "kost_id",
      });
    }
  }
  Kost.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      kost_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subdistrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price_per_daily: DataTypes.INTEGER,
      price_per_monthly: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_weekly: DataTypes.INTEGER,
      f_answer_1: DataTypes.STRING,
      f_answer_2: DataTypes.STRING,
      f_answer_3: DataTypes.STRING,
      f_question_1: DataTypes.STRING,
      f_question_2: DataTypes.STRING,
      f_question_3: DataTypes.STRING,
      rules: DataTypes.TEXT,
      kost_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Kost",
      tableName: "t_kost",
    }
  );
  return Kost;
};
