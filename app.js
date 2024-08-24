
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const LocalStrategy=require("passport-local");
// Import the User model
const User = require("./models/user");

// Import middleware functions

// Environment configuration
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Database connection
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GreenByte";
async function main() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
main();

// Express middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session and Flash setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "Your secret key", // Use environment variable for secret key
    resave: false,
    saveUninitialized: false,
  })
);


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  console.log("Current User: ", req.user); 
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

// Passport configuration
passport.use(new LocalStrategy(User.authenticate())); // Setting up Passport to use the `passport-local-mongoose` strategy
passport.serializeUser(User.serializeUser()); // Serialize user into session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static("public"));

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "Ashwani_Ghanghas",
//     role:"Admin",

//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.get("/demouser", async (req, res) => {
  try {
    // Create a new admin user
    let fakeUser = new User({
      email: "student@gmail.com",
      username: "Ashwani_Ghanghas", // This field is automatically added by passport-local-mongoose
      role: "admin", // Ensure this value matches the enum in your schema
    });

    // Set a password for the user
    await fakeUser.setPassword("Ashwani@9467"); // This method is provided by passport-local-mongoose

    // Save the user to the database
    await fakeUser.save();

    res.status(200).send("Demo admin user created successfully!");
  } catch (err) {
    res.status(500).send("Error creating demo admin user: " + err.message);
  }
});

// Import routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

const youtubeRoutes = require("./routes/youtube");
app.use("/youtube", youtubeRoutes);

const auctionRoutes = require("./routes/auction");
app.use("/auction", auctionRoutes);

const userRoutes = require("./routes/users");
app.use("/", userRoutes);

const voucherRoutes = require("./routes/vouchers");
app.use("/vouchers", voucherRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes); // Add "/auth" prefix for authentication routes

const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes); 

// Home route
app.get("/", (req, res) => {
  res.render("home");
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
