const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const Restock = require("../../models/Restock");
const { sendUserNotification } = require('../../restockBot');

const restockSchema = Joi.object({ 
  id_user :Joi.string().required(),
  nama_manager: Joi.string().required(), 
  nama_invoice: Joi.string().required(),
  daftar_toolkit: Joi.string().required(),
  total_invoice: Joi.number().required(),
});

router.post("/restock", async (req, res) => { 
  const { error } = restockSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id_user, nama_manager, nama_invoice, daftar_toolkit, total_invoice } = req.body;
  try {
    const prefix = "RTK";
    const lastEntry = await Restock.findOne({
      where: { id_restock: { [Op.like]: `${prefix}%` } },
      order: [["id_restock", "DESC"]],
    });
    let newId = 1;
    if (lastEntry) {
      const numeric = parseInt(lastEntry.id_restock.replace(prefix, ""), 10);
      newId = numeric + 1;
    }
    const id_restock = prefix + newId.toString().padStart(3, "0");
    const created_at = new Date();
    const newRestock = await Restock.create({
      id_restock,
      id_user,
      nama_manager,
      nama_invoice,
      daftar_toolkit,
      total_invoice,
      created_at
    });
    await sendUserNotification(nama_manager, nama_invoice, daftar_toolkit, total_invoice, created_at);
    return res.status(201).json({
      message: `Restock ${nama_invoice} berhasil dibuat.`,
      data: newRestock
    });
  } catch (error) {
    console.error("Error insert absensi:", error);
    return res.status(500).json({ message: "Gagal menyimpan Restock" });
  }
});

module.exports = router;