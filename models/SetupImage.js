"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SetupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SetupImage.belongsTo(models.Kost, {
        foreignKey: "kost_id",
      });
    }
  }
  SetupImage.init(
    {
      url: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      kost_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SetupImage",
      tableName: "t_setup_images",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return SetupImage;
};
