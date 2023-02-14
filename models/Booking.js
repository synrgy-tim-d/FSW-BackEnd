"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasOne(models.BookingDetail, {
        foreignKey: "booking_id",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Booking.belongsTo(models.KostRoom, {
        foreignKey: "room_id",
      });
      Booking.belongsTo(models.Kost, {
        foreignKey: "kost_id",
      });
    }
  }
  Booking.init(
    {
      booking_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kost_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      booking_date_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      booking_date_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Booking",
      tableName: "t_booking",
    }
  );
  return Booking;
};
