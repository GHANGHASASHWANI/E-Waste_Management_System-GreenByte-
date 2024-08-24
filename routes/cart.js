const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const isLoggedIn = require("../middleware").isLoggedIn;

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user and populate the cart with product details
    const user = await User.findById(userId).populate("cart").exec();

    res.render("cart/show", { user });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Server error");
  }
});


router.get('/checkout', (req, res) => {
  res.render('cart/checkout');
});


// Add product to cart (protected route)
router.post("/add/:id", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find the user and update their cart
    await User.findByIdAndUpdate(userId, {
      $addToSet: { cart: productId },
    });

    res.redirect("/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send("Server error");
  }
});
router.post("/remove/:id", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find the user and remove the product from their cart
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId },
    });

    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
