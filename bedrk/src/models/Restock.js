const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Restock extends Model {
  static associate(models) {
   
  }
}
Restock.init(
  {
    id_restock: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    nama_manager: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama_invoice: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    daftar_toolkit: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
     total_invoice: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Restock",
    tableName: "restock",
  },
);

module.exports = Restock;