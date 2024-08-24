const express = require("express");
const router = express.Router();
const LiveAuction = require("../models/liveAuction");

// Create a new auction - GET form
router.get("/new", (req, res) => {
  res.render("auction/new");
});

// Create a new auction - POST form
router.post("/", async (req, res) => {
  try {
    const auction = new LiveAuction(req.body);
    await auction.save();
    res.redirect("/auction");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await LiveAuction.find()
      .populate("product")
      .populate("bids.bidder")
      .populate("winner");
    res.render("auction/index", { auctions });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get an auction by ID
router.get("/:id", async (req, res) => {
  try {
    const auction = await LiveAuction.findById(req.params.id)
      .populate("product")
      .populate("bids.bidder")
      .populate("winner");
    if (!auction) {
      return res.status(404).send("Auction not found");
    }
    res.render("auction/show", { auction });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an auction by ID - GET form
router.get("/:id/edit", async (req, res) => {
  try {
    const auction = await LiveAuction.findById(req.params.id);
    if (!auction) {
      return res.status(404).send("Auction not found");
    }
    res.render("auction/edit", { auction });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an auction by ID - POST form
router.put("/:id", async (req, res) => {
  try {
    const auction = await LiveAuction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!auction) {
      return res.status(404).send("Auction not found");
    }
    res.redirect(`/auction/${auction._id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete an auction by ID
router.delete("/:id", async (req, res) => {
  try {
    await LiveAuction.findByIdAndDelete(req.params.id);
    res.redirect("/auction");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
