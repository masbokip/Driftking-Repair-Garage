const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const Absensi = require("../../models/Absensi");
const User = require("../../models/User");

const { sendUserNotification } = require('../../testBot');

const absenSchema = Joi.object({
  id_user: Joi.string().required(),
  nama_user: Joi.string().required(),
  total_duty: Joi.string().required(),
  tgl_absen1: Joi.date().required(),
  tgl_absen2: Joi.date().required(),
});

router.post("/absencok", async (req, res) => {
  const { error } = absenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id_user, tgl_absen1, tgl_absen2, nama_user,total_duty  } = req.body;
  try {
    const prefix = "ABS";
    const lastEntry = await Absensi.findOne({
      where: { id_absensi: { [Op.like]: `${prefix}%` } },
      order: [["id_absensi", "DESC"]],
    });
    let newId = 1;
    if (lastEntry) {
      const numeric = parseInt(lastEntry.id_absensi.replace(prefix, ""), 10);
      newId = numeric + 1;
    }
    const id_absensi = prefix + newId.toString().padStart(3, "0");
    const newAbsen = await Absensi.create({
      id_absensi,
      id_user,
      nama_user,
      tgl_absen1,
      tgl_absen2,
      total_duty,
      status: "Active"
    });
      await sendUserNotification(nama_user, tgl_absen1, tgl_absen2, total_duty);
      return res.status(201).json({
      message: `Absensi ${id_absensi} berhasil dibuat.`,
      data: newAbsen
    });
  } catch (err) {
    console.error("Error insert absensi:", err);
    return res.status(500).json({ message: "Gagal menyimpan absensi", error: err.message });
  }
});

router.post("/totjam", async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Tanggal tidak boleh kosong" });
  }

  // const startTime = new Date(`${startDate}T00:00:00.000Z`);
  // const endTime = new Date(`${endDate}T23:59:59.999Z`);

  const startTime = new Date(`${startDate}T00:00:00`);
  const endTime = new Date(`${endDate}T23:59:59`);

  try {
    const absensiList = await Absensi.findAll({
      where: {
        tgl_absen1: {
          [Op.between]: [startTime, endTime],
        },
      },
      include: {
        model: User,
        attributes: ["nama", "rank"],
        where: {
          rank: {
            [Op.in]: ["Training", "Expert"],
          },
        },
      },
    });

    const hasil = {};
    absensiList.forEach((absen) => {
      const id = absen.id_user;
      if (!absen.tgl_absen2 || !absen.tgl_absen1) return; // Skip if null
      const jam = (new Date(absen.tgl_absen2) - new Date(absen.tgl_absen1)) / (1000 * 60 * 60);
      if (!hasil[id]) {
        hasil[id] = {
          nama: absen.User.nama,
          rank: absen.User.rank,
          totalJam: jam,
        };
      } else {
        hasil[id].totalJam += jam;
      }
    });

    const resultArray = Object.values(hasil);
    res.json(resultArray);
  } catch (err) {
    console.error("Gagal mengambil data totjam:", err);
    res.status(500).json({ message: "Gagal mengambil data", error: err.message });
  }
});

router.get("/laporan/absensi", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Tanggal awal dan akhir wajib diisi" });
    }

    const startTime = new Date(`${startDate}T00:00:00`);
    const endTime = new Date(`${endDate}T23:59:59`);

    // Ambil semua absensi dalam rentang tanggal
    const absensiList = await Absensi.findAll({
      where: {
        tgl_absen1: { [Op.between]: [startTime, endTime] },
        // status: 'berhasil', // hanya yang berhasil
      },
      include: {
        model: User,
        attributes: ['nama', 'rank'],
      },
      raw: true,
    });

    // Grup berdasarkan user
    const grouped = {};

    for (const row of absensiList) {
      const id_user = row.id_user;

      // Hitung durasi absensi harian
      const start = new Date(row.tgl_absen1);
      const end = new Date(row.tgl_absen2);
      const durasiJam = Math.max(0, (end - start) / (1000 * 60 * 60)); // hasil jam

      if (!grouped[id_user]) {
        grouped[id_user] = {
          nama_user: row["User.nama"],
          rank: row["User.rank"],
          absensi_berhasil: [],
          total_durasi: 0,
        };
      }

      grouped[id_user].absensi_berhasil.push({
        tanggal: row.tgl_absen1,
        durasi_jam: durasiJam.toFixed(2),
      });

      grouped[id_user].total_durasi += durasiJam;
    }

    // Hitung bonus
    const result = Object.values(grouped).map((user) => {
      let bonusPerJam = 0;
      let batasJam = 0;
      let syaratDurasi = 0;

      if (user.rank === "Training") {
        bonusPerJam = 12500;
        batasJam = 3;
        syaratDurasi = 14;
      } else if (user.rank === "Expert") {
        bonusPerJam = 20000;
        batasJam = 2;
        syaratDurasi = 8;
      }

      // Hitung total bonus
      let totalBonus = 0;

      if (user.total_durasi >= syaratDurasi) {
        for (const absen of user.absensi_berhasil) {
          const jamBonus = Math.min(parseFloat(absen.durasi_jam), batasJam);
          totalBonus += jamBonus * bonusPerJam;
        }
      }
      return {
        nama_user: user.nama_user,
        rank: user.rank,
        total_durasi: user.total_durasi.toFixed(2),
        jumlah_absensi_berhasil: user.absensi_berhasil.length,
        bonus: totalBonus,
        daftar_absensi: user.absensi_berhasil,
      };
    });

    res.status(200).json({ data: result });

  } catch (error) {
    console.error("Error laporan absensi:", error);
    res.status(500).json({ message: "Gagal mengambil data laporan absensi" });
  }
});




module.exports = router;
