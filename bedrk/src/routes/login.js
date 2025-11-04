const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.post("/login", async function (req, res) {
    let { username, password } = req.body;
    const user = await User.findAll({
        where:{
            username:username
        },
    });
    try {
        if (user.length>0) {
            let cekPassword = null;
            user.forEach((item)=>{
                cekPassword = item.password;
            })
            let passwordHashUser = cekPassword;
            console.log(passwordHashUser);
            if (bcrypt.compareSync(password, passwordHashUser)) {
                const dataUser = await User.findOne({
                    where:{username : username}
                })
                const token = jwt.sign(
                    {
                        id_user: user.id_user,
                        username: user.username,
                        nama: user.nama,
                        rank: user.rank,
                        foto: user.foto,
                        status: user.status,
                    },
                    process.env.JWT_CODE,
                    { expiresIn: '30d' }
                  );
                  const userData = {
                    ...dataUser.dataValues,
                    token
                  };
                  return res.status(200).json(userData);
            }else{
                return res.status(400).json("Password salah");
            }
        }else {
            return res.status(404).json("Data user tidak ditemukan");
        }
    } catch (error) {
        return res.status(400).json("Data salah");
    }
});



module.exports = router;