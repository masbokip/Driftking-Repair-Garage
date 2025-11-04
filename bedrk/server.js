const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routesregister = require("./src/routes/User/register")
const routesabsensi= require("./src/routes/Jobs/absensi")
const routeslogin = require("./src/routes/login");
const routesizin = require("./src/routes/Jobs/izin");
const routeSpk = require("./src/routes/Jobs/spk");
const routeRestock = require("./src/routes/Jobs/restock");

const User = require("./src/models/User");
const Absensi = require("./src/models/Absensi");
const Izin = require("./src/models/Izin");
const Spk = require("./src/models/Spk");
const Restock = require("./src/models/Restock");

User.associate({Absensi});
Absensi.associate({User});
// Izin.associate({User});
// Spk.associate({User});

const app = express();
app.set("port", 5000);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use ("/api", routesregister);
app.use ("/api", routesabsensi);
app.use ("/api", routeslogin);
app.use ("/api", routesizin);
app.use ("/api", routeSpk);
app.use("/api", routeRestock);

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
  });

  module.exports = app;