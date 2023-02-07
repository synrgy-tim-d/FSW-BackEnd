"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SetupCity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SetupCity.hasOne(models.Kost, {
        foreignKey: "city_id",
      });
    }
  }
  SetupCity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SetupCity",
      tableName: "t_setup_city",
      timestamps: false,
    }
  );

  return SetupCity;
};
