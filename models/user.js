const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ecoScore: {
    type: Number,
    default: 100,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

UserSchema.plugin(passportLocalMongoose); // Adds username, hash, and salt fields for passport authentication

module.exports = mongoose.model("User", UserSchema);
