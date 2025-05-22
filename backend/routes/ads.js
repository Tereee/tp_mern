const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const newAd = new Ad({
      title,
      description,
      price,
      category,
      author: req.user.userId,
    });

    await newAd.save();
    res.status(201).json({ message: "Annonce créée", ad: newAd });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    res.json({ message: "Annonce supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
