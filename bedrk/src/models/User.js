const { getDB } = require("../config/env");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    this.hasMany(models.Absensi, { foreignKey: "id_user"});
    // this.hasMany(models.Izin, { foreignKey: "id_user" });
    // this.hasMany(models.Spk, { foreignKey: "id_user" });
  }
}
User.init(
  {
    id_user: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
     nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    numb: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
    tableName: "user",
  },
);

module.exports = User;
