// routes/vouchers.js

const express = require("express");
const router = express.Router();
const Voucher = require("../models/voucher");

// INDEX - List all vouchers
router.get("/", async (req, res) => {
  try {
    const vouchers = await Voucher.find({});
    res.render("vouchers/index", { vouchers });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// NEW - Form to create a new voucher
router.get("/new", (req, res) => {
  res.render("vouchers/new");
});

// CREATE - Add a new voucher
router.post("/", async (req, res) => {
  try {
    const voucher = new Voucher(req.body.voucher);
    await voucher.save();
    res.redirect("/vouchers");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SHOW - Show a specific voucher
router.get("/:id", async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).send("Voucher not found");
    }
    res.render("vouchers/show", { voucher });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// EDIT - Form to edit an existing voucher
router.get("/:id/edit", async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).send("Voucher not found");
    }
    res.render("vouchers/edit", { voucher });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE - Update a voucher in the database
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Voucher.findByIdAndUpdate(id, req.body.voucher, { new: true });
    res.redirect(`/vouchers`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE - Delete a voucher
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Voucher.findByIdAndDelete(id);
    res.redirect("/vouchers");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
