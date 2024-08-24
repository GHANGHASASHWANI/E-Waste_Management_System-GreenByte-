const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  ecoscoreRequired: {
    type: Number,
    required: true,
  },
  description: String,
  expiryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
