const User = require("./User")
const Absensi = require("./Absensi")
const Izin = require("./Izin")
const Spk = require("./Spk")
module.exports = function () {
User.hasMany(Absensi,{foreignKey:id_user});
// User.hasMany(Izin,{foreignKey:id_user});
// User.hasMany(Spk,{foreignKey:id_user});
Absensi.belongsTo(User,{foreignKey:id_user});
// Izin.belongsTo(User,{foreignKey:id_user});
// Spk.belongsTo(User,{foreignKey:id_user});
};