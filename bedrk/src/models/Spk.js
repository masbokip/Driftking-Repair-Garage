const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Spk extends Model {
  static associate(models) {
    // Spk.belongsTo(models.User,{
    //   foreignKey: 'id_user',
    //   targetKey: 'id_user',
    // })
  }
}
Spk.init(
  {
    id_spk: {
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
    nama_client: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
     jenis_kendaraan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pengerjaan: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    total_pengerjaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_modal: {
      type: DataTypes.INTEGER,
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
    modelName: "Spk",
    tableName: "spk",
  },
);

module.exports = Spk;