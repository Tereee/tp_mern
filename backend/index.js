const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API LeBonCoin MERN en ligne");
});

const authRoutes = require("./routes/auth");
const adsRoutes = require("./routes/ads");

app.use("/api/auth", authRoutes);
app.use("/api/ads", adsRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie");
    app.listen(port, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("❌ Erreur de connexion MongoDB :", error));
