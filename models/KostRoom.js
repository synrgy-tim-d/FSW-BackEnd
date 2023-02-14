"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KostRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KostRoom.hasMany(models.Booking, {
        foreignKey: "room_id",
      });
      KostRoom.belongsTo(models.Kost, {
        foreignKey: "kost_id",
      });
    }
  }
  KostRoom.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      // price_per_daily: DataTypes.INTEGER,
      // price_per_monthly: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // price_per_weekly: DataTypes.INTEGER,
      room_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // rules: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      kost_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "KostRoom",
      tableName: "t_kost_rooms",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return KostRoom;
};
