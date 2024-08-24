const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const { isLoggedIn } = require("../middleware.js");

// INDEX - Display all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

// NEW - Form to create a new product
router.get("/new", isLoggedIn, (req, res) => {
  res.render("products/new");
});

// Add product to cart (protected route)
router.post("/cart/add/:id", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { cart: productId },
    });

    res.redirect("/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send("Server error");
  }
});


// CREATE - Add a new product to the database
router.post("/", isLoggedIn, async (req, res) => {
  const product = new Product(req.body.product);
  product.user = req.user._id; // Set the user to the logged-in user
  await product.save();
  res.redirect(`/products`);
});

// GET - Show product with reviews
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "user", select: "name" },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    console.log("Product:", product); // Log the product and reviews for debugging

    const defaultUserId = "66c1addc041fcaa28643a30a"; // Replace with an actual default user ID

    res.render("products/show", {
      product,
      defaultUserId,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// EDIT - Form to edit an existing product
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});

// UPDATE - Update a product in the database
router.put("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product || !product.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/products/${id}`);
  }
  await Product.findByIdAndUpdate(id, req.body.product);
  res.redirect(`/products/${id}`);
});

// DELETE - Delete a product from the database
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product || !product.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/products/${id}`);
  }
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// POST - Create a new review
router.post("/:productId/reviews", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const review = new Review({
      product: productId,
      user: req.user._id, // Use the authenticated user's ID
      rating,
      comment,
    });
    await review.save();

    // Add review to the product's reviews array
    product.reviews.push(review._id);
    await product.save();

    res.redirect(`/products/${productId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE - Remove a review
router.delete("/:productId/reviews/:reviewId", isLoggedIn, async (req, res) => {
  const { reviewId, productId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review || !review.user.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that.");
      return res.redirect(`/products/${productId}`);
    }

    await Review.findByIdAndDelete(reviewId);

    // Remove review from the product's reviews array
    await Product.findByIdAndUpdate(productId, {
      $pull: { reviews: reviewId },
    });

    res.redirect(`/products/${productId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
