"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingDetail.belongsTo(models.Booking, {
        foreignKey: "booking_id",
      });
    }
  }
  BookingDetail.init(
    {
      booking_detail_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      booking_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      will_pay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      payment_method: {
        type: DataTypes.ENUM("BANK", "CASH"),
        allowNull: true,
      },
      payment_image_url: DataTypes.TEXT,
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "BookingDetail",
      tableName: "t_booking_detail",
    }
  );
  return BookingDetail;
};
