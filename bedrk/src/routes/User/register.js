const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const multer = require('multer');
const path = require("path");
const fs = require("fs");


const userSchema = Joi.object({
    nama : Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .max(255)
    .required()
    .messages({
    "string.pattern.base": "Nama hanya boleh berisi huruf a-z atau A-Z.",
    "string.empty": "Nama tidak boleh kosong.",
  }),
    username : Joi.string()
    .max(255)
    .required()
    .messages({
    "string.empty": "Nama tidak boleh kosong.",
  }),
  rank : Joi.string()
    .max(255)
    .required()
    .messages({
    "string.empty": "Nama tidak boleh kosong.",
  }),
    password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      "string.min": "Password harus memiliki minimal 8 karakter.",
      "string.empty": "Password tidak boleh kosong.",
  }),
    kpassword: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      "string.min": "Konfirmasi Password harus memiliki minimal 8 karakter.",
      "string.empty": "Konfirmasi Password tidak boleh kosong.",
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images/user");
  },
  filename: function name(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

const upload = multer({ 
  storage: storage ,
  fileFilter: fileFilter,
}); 


router.post("/register",upload.single("foto"),async function (req,res) {
    const {error} = userSchema.validate(req.body);
    if(error){
        return res.status(400).json({messages: error.details[0].message});
    }
    let{username,password,kpassword,nama,rank} = req.body;
    let statusnumber = 0;
    
    const exitingUser= await User.findOne({
        where:{username:username},
    });

    if (exitingUser) {
        return res.status(400).json({
            message:"Username telah terdaftar"
        });
    }

    if (password != kpassword) {
        return res.status(400).json({
            message:"Password Tidak Sama"
        });
    }

    if (rank == "Owner"){
        statusnumber = 1;
    }
    else if (rank == "Co-Owner") {
        statusnumber = 2;
    }
     else if (rank == "Head") {
        statusnumber = 3;
    }
    else if (rank == "Manager") {
        statusnumber = 4;
    }
    else if (rank == "Expert") {
        statusnumber = 5;
    }
    else if (rank == "Training") {
        statusnumber = 6;
    }
    let newIdFixUser = "DRK";
    let checkIdEntryUser = await User.findOne({
        where :{
            id_user :{
                [Op.like]:`${newIdFixUser}%`
            }
        },
         order: [[ 'id_user', 'DESC' ]] 
    });
    let newIdUser = 1;
    if (checkIdEntryUser){
        let checkIdUser = checkIdEntryUser.id_user;
        let totalUser = checkIdUser.replace(newIdFixUser,'');
        newIdUser = parseInt(totalUser,10)+1;
    }
    let defaultIdUser = newIdFixUser + newIdUser.toString().padStart(3,'0');
    const passwordHash = bcrypt.hashSync(password,10);
    if (!req.file) {
    return res.status(400).send("Image file is required");
  }
    try {
        const data = await User.create({
            id_user : defaultIdUser,
            nama: nama,
            username : username,
            password : passwordHash,
            rank : rank,
            status : "Active",
            foto : req.file.filename,
            numb : statusnumber
        });
        return res.status(201).json({
            message: "Registrasi "+ username + " Berhasil" ,
            data : data
        });
    } catch (error) {
        return res.status(400).json({
            message: "Gagal Registrasi",
         });
    }
    
});

router.get("/ambilusers", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes:['id_user','nama','rank','foto'],
      order: [
        ['numb', 'ASC'],
        ['nama', 'ASC'] 
      ],
    });
    res.status(200).json({
      message: "Berhasil mengambil data user",
      data: users
    });
  } catch (error) {
    console.error("Gagal ambil data user:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data user",
    });
  }
});

router.get("/takeusers", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes:['id_user','nama','rank','foto'],
      order: [
        ['numb', 'ASC'],
        ['nama', 'ASC'] 
      ],
    });
    res.status(200).json({
      message: "Berhasil mengambil data user",
      data: users
    });
  } catch (error) {
    console.error("Gagal ambil data user:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data user",
    });
  }
});

router.get("/tableusers",async (req,res) =>{
const {search} = req.query;
try {
  const datauser = await User.findAll({
    where: search
    ? {nama :{ [Op.like]: `%${search}%`}}
    :undefined,
    order: [["numb", "ASC"],["nama", "ASC"]],
  });
   res.status(200).json(datauser);
} catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
}
})

router.get("/users/:id", async function (req, res) {
  const { id } = req.params; 
  try {
    const data = await User.findOne({
      attributes:['id_user','nama','rank','foto'],
      where: {
        id_user: id,
        status : "Active"
      }
    });
    if (!data) {
      return res.status(404).json({ message: "User not found or inactive" });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Failed to get User data" });
  }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const datauser = await User.findOne({
            where: {id_user:id},
        });
        if (!datauser) {
            return req.status(404).send("Data User Tidak Ada");
        } 
        if (datauser.foto) {
            const imagePath =`./public/assets/images/user/${datauser.foto}`;
            try {
                fs.unlinkSync(imagePath);  
            } catch (error) {
                console.error(`Failed to delete image: ${datauser.foto}`, error);
            }
        }
        await User.destroy({
            where: {id_user:id},
        });

        return res.status(200).send("User dan foto berhasil dihapus");
        
    } catch (error) {
        console.error("Error deleting user:", err);
        return res.status(500).send("Failed to delete user");
    }
});

// router.put("/users/updatedata/:id",upload.single("foto"),async function (req,res) {
//     let {id} = req.params;
//     let {nama, rank} = req.body;
//     let statusnumber = 0;
//     if (rank == "CEO"){
//         statusnumber = 1;
//         }
//         else if (rank == "HOW") {
//             statusnumber = 2;
//         }
//         else if (rank == "Manager") {
//             statusnumber = 3;
//         }
//         else if (rank == "Expert") {
//             statusnumber = 4;
//         }
//         else if (rank == "Trainer") {
//             statusnumber = 5;
//         }
//     try {
//         const iduser = await User.findOne({
//           where: {id_user : id},
//         });
//         if (!iduser) {
//            return res.status(404).json({ message: "User not found" });
//         }
//         const updatedData = {
//           nama : nama || iduser.nama,
//           rank : rank || iduser.rank,
//           numb : statusnumber || iduser.numb
//         };
//         if (req.file) {
//             const imagePath = `./public/assets/images/user/${iduser.foto}`;
//             try {
//             if (iduser.foto) {
//                fs.unlinkSync(imagePath);
//                             }
//                 } catch (error) {
//             console.error(`Failed to delete old image: ${iduser.foto}`, error);
//             }
//             updatedData.foto = req.file.filename;
//         }
//         await iduser.update(updatedData);
//         return res.status(200).json({
//           message:`Data user ${nama || iduser.nama} berhasil diperbarui`,
//           data : iduser,
//         })
//     } catch (error) {
//          console.error("Error updating user:", err);
//          return res.status(500).json({ message: "Failed to update user data" });
//     }
// });

router.put("/users/updatedata/:id", upload.single("foto"), async (req, res) => {
  const { id } = req.params;
  const { nama, rank } = req.body;
  let statusnumber = 0;
  if (rank === "CEO") statusnumber = 1;
  else if (rank === "HOW") statusnumber = 2;
  else if (rank === "Manager") statusnumber = 3;
  else if (rank === "Expert") statusnumber = 4;
  else if (rank === "Trainer") statusnumber = 5;
  try {
    const iduser = await User.findOne({ where: { id_user: id } });
    if (!iduser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const updatedData = {
      nama: nama || iduser.nama,
      rank: rank || iduser.rank,
      numb: statusnumber || iduser.numb,
    };
    if (req.file) {
      const oldImagePath = path.join(__dirname, "../../public/assets/images/user", iduser.foto);
      if (iduser.foto && fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
          console.log("Foto lama berhasil dihapus:", iduser.foto);
        } catch (error) {
          console.error("Gagal menghapus foto lama:", error);
        }
      }
      updatedData.foto = req.file.filename;
    }
    await iduser.update(updatedData);
    return res.status(200).json({
      message: `Data user ${updatedData.nama} berhasil diperbarui`,
      data: iduser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Gagal memperbarui data user" });
  }
});

router.put("/users/password/:id", async function (req, res) {
  const { id } = req.params;
  const { password, kpassword  } = req.body;
  try {
    const user = await User.findOne({ 
      where: { id_user: id } 
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(password != kpassword){
      return res.status(400).json({ message: "Password dan Konfirmasi Password Tidak Sama" });
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const updatedData = {
      password: passwordHash || user.password,
    };
    await user.update(updatedData);
    return res.status(200).json({
      message: `Password berhasil diperbarui`,
      data: user,
    });
  } catch (err) {
    console.error("Error update user:", err);
    return res.status(500).json({ message: "Failed to update user data" });
  }
});

router.delete("/users/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const datauser = await User.findOne({
      where: { id_user: id },
    });

    if (!datauser) {
      return res.status(404).send("User not found");
    }

    if (datauser.foto) {
      const imagePath = path.join(__dirname, "../../public/assets/images/user", datauser.foto);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Foto berhasil dihapus:", datauser.foto);
        }
      } catch (error) {
        console.error(`Gagal menghapus foto: ${datauser.foto}`, error);
      }
    }

    await User.destroy({
      where: { id_user: id },
    });

    return res.status(200).send("User dan foto berhasil dihapus");
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).send("Gagal menghapus user");
  }
});

router.get('/total-user',async(req,res)=>{
try {
  const totalUser = await User.count();
  res.status(200).json({
    success: true,
    message: 'Total user berhasil dihitung.',
    total : totalUser,
  });
} catch (error) {
    console.error('Error menghitung total user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total user.',
    });
}
});

router.get('/total-manager', async (req, res) => {
  try {
    const totalUser = await User.count({
      where: { rank: 'Manager' },
    });
    res.status(200).json({
      success: true,
      message: 'Total user dengan rank "Manager" berhasil dihitung.',
      total: totalUser,
    });

  } catch (error) {
    console.error('Error menghitung total user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total manager.',
    });
  }
});

router.get('/total-expert', async (req, res) => {
  try {
    const totalUser = await User.count({
      where: { rank: 'Expert' },
    });
    res.status(200).json({
      success: true,
      message: 'Total user dengan rank Expert berhasil dihitung.',
      total: totalUser,
    });

  } catch (error) {
    console.error('Error menghitung total user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total expert.',
    });
  }
});

router.get('/total-trainer', async (req, res) => {
  try {
    const totalUser = await User.count({
      where: { rank: 'Training' },
    });
    res.status(200).json({
      success: true,
      message: 'Total user dengan rank Trainer berhasil dihitung.',
      total: totalUser,
    });

  } catch (error) {
    console.error('Error menghitung total user:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghitung total Trainer.',
    });
  }
});


module.exports = router;