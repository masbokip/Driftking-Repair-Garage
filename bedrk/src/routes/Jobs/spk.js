const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const Spk = require("../../models/Spk");
const User = require("../../models/User");
const { sendUserNotification } = require('../../spkDiscordBot');

const spkSchema = Joi.object({ 
  id_user :Joi.string().required(),
  nama_user: Joi.string().required(), 
  nama_client: Joi.string().required(),
  jenis_kendaraan: Joi.string().required(),
  pengerjaan: Joi.string().required(),
  total_pengerjaan: Joi.number().required(),
  total_modal:Joi.number().required()
});


router.post("/spk", async (req, res) => { 
  const { error } = spkSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id_user, nama_user, nama_client, jenis_kendaraan, pengerjaan, total_pengerjaan, total_modal } = req.body;
  try {
    const prefix = "SPK";
    const lastEntry = await Spk.findOne({
      where: { id_spk: { [Op.like]: `${prefix}%` } },
      order: [["id_spk", "DESC"]],
    });
    let newId = 1;
    if (lastEntry) {
      const numeric = parseInt(lastEntry.id_spk.replace(prefix, ""), 10);
      newId = numeric + 1;
    }
    const id_spk = prefix + newId.toString().padStart(3, "0");
    const created_at = new Date();
    const newSPK = await Spk.create({
      id_spk,
      id_user,
      nama_user,
      nama_client,
      jenis_kendaraan,
      pengerjaan,
      total_pengerjaan,
      total_modal,
      created_at
    });
    await sendUserNotification(id_spk, nama_user, nama_client, jenis_kendaraan, pengerjaan, total_pengerjaan, total_modal, created_at);
    return res.status(201).json({
      message: `SPK ${nama_user} berhasil dibuat.`,
      data: newSPK
    });
  } catch (error) {
    console.error("Error insert absensi:", error);
    return res.status(500).json({ message: "Gagal menyimpan SPK" });
  }
});

router.get("/laporan/spk", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Tanggal mulai dan akhir wajib diisi" });
    }

    const startTime = new Date(`${startDate}T00:00:00`);
    const endTime = new Date(`${endDate}T23:59:59`);

    const spkList = await Spk.findAll({
      where: {
        created_at: {
          [Op.between]: [startTime, endTime],
        },
      },
      raw: true,
    });

    const grouped = {};

    spkList.forEach((item) => {
      const id_user = item.id_user;
      if (!grouped[id_user]) {
        grouped[id_user] = {
          nama_user: item.nama_user,
          jumlah_spk: 0,
          total_modal: 0,
          total_pengerjaan: 0,
        };
      }

      grouped[id_user].jumlah_spk += 1;
      grouped[id_user].total_modal += item.total_modal;
      grouped[id_user].total_pengerjaan += item.total_pengerjaan;
    });

    const result = Object.values(grouped).map((user) => {
      const gaji_awal = 1000000;
      let bonus_modal = 0;
      const bonus_invoice = user.jumlah_spk * 40000;

      if (user.total_modal >= 7000000 && user.total_modal < 10000000) {
        bonus_modal = 200000;
      } else if (user.total_modal >= 10000000 && user.total_modal < 15000000) {
        bonus_modal = 350000;
      } else if (user.total_modal > 15000000) {
        bonus_modal = 500000;
      }
      const total_gaji = gaji_awal + bonus_modal + bonus_invoice;
      return {
        nama_user: user.nama_user,
        jumlah_spk: user.jumlah_spk,
        total_modal: user.total_modal,
        total_pengerjaan: user.total_pengerjaan,
        bonus_modal,
        bonus_invoice,
        gaji_awal,
        total_gaji,
      };
    });

    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error get laporan spk:", error);
    res.status(500).json({ message: "Gagal mengambil data SPK" });
  }
});



module.exports = router;