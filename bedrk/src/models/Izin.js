const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Izin extends Model {
  static associate(models) {
    // Izin.belongsTo(models.User,{
    //   foreignKey: 'id_user',
    //   targetKey: 'id_user',
    // })
  }
}
Izin.init(
  {
    id_izin: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    alasan_ic: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
     alasan_ooc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    durasi: {
      type: DataTypes.STRING(255),
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
    modelName: "Izin",
    tableName: "izin",
  },
);

module.exports = Izin;