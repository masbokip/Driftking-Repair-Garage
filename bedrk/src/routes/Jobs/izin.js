const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const Izin = require("../../models/Izin");
const User = require("../../models/User");
const { sendUserNotification } = require('../../izinBot');

const izinSchema = Joi.object({ 
  id_user :Joi.string().required(),
  nama_user: Joi.string().required(), 
  alasan_ic: Joi.string().required(),
  alasan_ooc: Joi.string().required(),
  durasi: Joi.string().required(),
});

router.post("/izin", async (req, res) => { 
  const { error } = izinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { id_user, nama_user, alasan_ic, alasan_ooc, durasi } = req.body;

  try {
    const prefix = "IZN";
    const lastEntry = await Izin.findOne({
      where: { id_izin: { [Op.like]: `${prefix}%` } },
      order: [["id_izin", "DESC"]],
    });

    let newId = 1;
    if (lastEntry) {
      const numeric = parseInt(lastEntry.id_izin.replace(prefix, ""), 10);
      newId = numeric + 1;
    }

    const id_izin = prefix + newId.toString().padStart(3, "0");
    const created_at = new Date();

    const newIzin = await Izin.create({
      id_izin,
      id_user,
      nama_user,
      alasan_ic,
      alasan_ooc,
      durasi,
      created_at
    });

    await sendUserNotification(nama_user, alasan_ic, alasan_ooc, durasi, created_at);

    return res.status(201).json({
      message: `Izin ${nama_user} berhasil dibuat.`,
      data: newIzin
    });

  } catch (error) {
    console.error("Error insert absensi:", error);
    return res.status(500).json({ message: "Gagal menyimpan izin" });
  }
});


module.exports = router;