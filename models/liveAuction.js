const mongoose = require("mongoose");

const LiveAuctionSchema = new mongoose.Schema({
  product: {
    type: String,
    required:true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  bids: [
    {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  auctionEndTime: {
    type: Date,
    required: true,
  },
  startingDate: { // Added field for starting date
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("LiveAuction", LiveAuctionSchema);
