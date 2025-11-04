const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Absensi extends Model {
  static associate(models) {
    Absensi.belongsTo(models.User,{
      foreignKey: 'id_user',
      targetKey: 'id_user',
    })
  }
}
Absensi.init(
  {
    id_absensi: {
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
    tgl_absen1: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tgl_absen2: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_duty: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Absensi",
    tableName: "absensi",
  },
);
module.exports = Absensi;
