const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const Review = require("../models/review");
const YouTubeChannelVideo = require("../models/youtube");
const LiveAuction = require("../models/liveAuction");
const Voucher = require("../models/voucher");
// Seed data
const users = [
  {
    username: "johnDoe",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "janeSmith",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "admin1",
    name: "Admin One",
    email: "admin1@example.com",
    password: "password123",
    role: "admin",
  },
  {
    username: "user1",
    name: "User One",
    email: "user1@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user2",
    name: "User Two",
    email: "user2@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user3",
    name: "User Three",
    email: "user3@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "admin2",
    name: "Admin Two",
    email: "admin2@example.com",
    password: "password123",
    role: "admin",
  },
  {
    username: "user4",
    name: "User Four",
    email: "user4@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user5",
    name: "User Five",
    email: "user5@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user6",
    name: "User Six",
    email: "user6@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user7",
    name: "User Seven",
    email: "user7@example.com",
    password: "password123",
    role: "user",
  },
];
const products = [
  {
    name: "Laptop",
    description:
      "High-performance laptop suitable for gaming and professional work. The laptop has a few minor scratches from normal use but is fully functional. Ideal for demanding applications. It includes all essential accessories and is ready for immediate use.",
    category: "Electronics",
    price: 1200,
    condition: "Used",
    user: "user1",
    images: [
      {
        url: "/images/laptop.jpg",
        filename: "laptop1.jpg",
      },
    ],
    reviews: [],
  },
  {
    name: "Smartphone",
    description:
      "Latest model smartphone with a sleek design and advanced features. The phone is in excellent condition with minor blemishes on the back cover. The screen is pristine and the battery life is strong. Comes with original accessories and is ready for immediate use.",
    category: "Electronics",
    price: 800,
    condition: "New",
    user: "user2",
    images: [
      {
        url: "/images/mobile.jpg",
        filename: "smartphone1.jpg",
      },
    ],
    reviews: [],
  },
  {
    name: "Headphones",
    description:
      "Noise-cancelling headphones with immersive sound quality. The headphones show some wear on the ear cushions but still perform excellently. Ideal for audiophiles who want distraction-free listening. Includes original accessories and is fully functional.",
    category: "Accessories",
    price: 150,
    condition: "Used",
    user: "user3",
    images: [
      { url: "/images/headphones.jpg", filename: "headphones.jpg" },
    ],
    reviews: [],
  },
  {
    name: "Tablet",
    description:
      "Versatile tablet for work and entertainment. This refurbished tablet has a few cosmetic scratches but is otherwise in excellent condition. It includes the latest software updates and a protective case. Perfect for various tasks and applications.",
    category: "Electronics",
    price: 500,
    condition: "Refurbished",
    user: "user4",
    images: [{ url: "/images/tablet.jpg", filename: "tablet.jpg" }],
    reviews: [],
  },
  {
    name: "Gaming Console",
    description:
      "Popular gaming console with excellent performance. The console shows some signs of wear but includes all original cables and one controller. Ideal for gamers seeking high-quality performance at a budget price. It is fully operational and ready for play.",
    category: "Electronics",
    price: 300,
    condition: "Used",
    user: "user5",
    images: [
      {
        url: "/images/gaming_console.jpg",
        filename: "gamingconsole.jpg",
      },
    ],
    reviews: [],
  },
  {
    name: "Smartwatch",
    description:
      "Feature-rich smartwatch for fitness tracking and notifications. The smartwatch is new with a few minor scratches on the band from handling. It comes in its original packaging and offers flawless display and functionality. Ideal for fitness enthusiasts.",
    category: "Accessories",
    price: 200,
    condition: "New",
    user: "user6",
    images: [
      { url: "/images/smartwatch.jpg", filename: "smartwatch.jpg" },
    ],
    reviews: [],
  },
  {
    name: "Camera",
    description:
      "High-resolution camera for professional photography. The camera is refurbished with some exterior wear and minor scratches on the lens. Includes a battery and charger. Great for photographers on a budget seeking high-quality results.",
    category: "Electronics",
    price: 600,
    condition: "Refurbished",
    user: "user1",
    images: [{ url: "/images/camera.jpg", filename: "camera.jpg" }],
    reviews: [],
  },
  {
    name: "Printer",
    description:
      "Color laser printer with high-quality print output. The printer is new with minor marks from storage. It includes all necessary accessories and is fully functional. Ideal for home or office use, providing excellent print quality.",
    category: "Electronics",
    price: 150,
    condition: "New",
    user: "user2",
    images: [
      { url: "/images/printer.jpg", filename: "printer.jpg" },
    ],
    reviews: [],
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker offering excellent sound quality. The speaker is new with minor handling marks. It is compact, high-quality, and perfect for music lovers on the go. Includes all original accessories and is in perfect condition.",
    category: "Accessories",
    price: 80,
    condition: "New",
    user: "user3",
    images: [
      { url: "/images/speaker.jpg", filename: "speaker.jpg" },
    ],
    reviews: [],
  },
  {
    name: "Router",
    description:
      "High-speed wireless router enhancing internet connectivity. The router is used with some wear on the casing but is fully operational. Comes with all original accessories and is perfect for improving home network performance.",
    category: "Electronics",
    price: 100,
    condition: "Used",
    user: "user4",
    images: [{ url: "/images/router.jpg", filename: "router.jpg" }],
    reviews: [],
  },
];


const reviews = [
  {
    product: "Laptop",
    user: "johnDoe",
    rating: 5,
    comment: "Excellent product!",
  },
  {
    product: "Smartphone",
    user: "janeSmith",
    rating: 4,
    comment: "Great value for money.",
  },
  {
    product: "Headphones",
    user: "admin1",
    rating: 3,
    comment: "Good, but could be better.",
  },
  {
    product: "Tablet",
    user: "user1",
    rating: 5,
    comment: "Perfect for work and play.",
  },
  {
    product: "Gaming Console",
    user: "user2",
    rating: 4,
    comment: "Fun and entertaining.",
  },
  {
    product: "Smartwatch",
    user: "user3",
    rating: 4,
    comment: "Useful and stylish.",
  },
  {
    product: "Camera",
    user: "admin2",
    rating: 5,
    comment: "Stunning picture quality!",
  },
  {
    product: "Printer",
    user: "user4",
    rating: 3,
    comment: "Works well but noisy.",
  },
  {
    product: "Bluetooth Speaker",
    user: "user5",
    rating: 4,
    comment: "Great sound quality.",
  },
  {
    product: "Router",
    user: "user6",
    rating: 4,
    comment: "Good performance, easy setup.",
  },
];
const youtubeVideos = [
  {
    title: "Introduction to E-Waste Management",
    videoUrl: "https://www.youtube.com/watch?v=abcd1234",
    description:
      "An introductory video on e-waste management and its importance.",
    imageUrl: "https://example.com/intro-ewaste.jpg",
    views: 1500,
    likes: 200,
    dislikes: 5,
    createdAt: new Date(),
  },
  {
    title: "How to Recycle Electronic Devices",
    videoUrl: "https://www.youtube.com/watch?v=efgh5678",
    description: "A tutorial on how to properly recycle electronic devices.",
    imageUrl: "https://example.com/recycle-devices.jpg",
    views: 2000,
    likes: 250,
    dislikes: 10,
    createdAt: new Date(),
  },
  {
    title: "The Impact of E-Waste on the Environment",
    videoUrl: "https://www.youtube.com/watch?v=ijkl9101",
    description: "A detailed look at the environmental impact of e-waste.",
    imageUrl: "https://example.com/impact-environment.jpg",
    views: 1800,
    likes: 300,
    dislikes: 8,
    createdAt: new Date(),
  },
  {
    title: "Best Practices for E-Waste Disposal",
    videoUrl: "https://www.youtube.com/watch?v=mnop2345",
    description: "Learn the best practices for e-waste disposal.",
    imageUrl: "https://example.com/best-practices.jpg",
    views: 1700,
    likes: 220,
    dislikes: 6,
    createdAt: new Date(),
  },
  {
    title: "E-Waste Recycling Techniques",
    videoUrl: "https://www.youtube.com/watch?v=qrst6789",
    description: "Techniques and methods for recycling e-waste.",
    imageUrl: "https://example.com/recycling-techniques.jpg",
    views: 1900,
    likes: 270,
    dislikes: 4,
    createdAt: new Date(),
  },
  {
    title: "How E-Waste Affects the Planet",
    videoUrl: "https://www.youtube.com/watch?v=uvwx3456",
    description: "Impact of e-waste on our planet.",
    imageUrl: "https://example.com/ewaste-planet.jpg",
    views: 1600,
    likes: 230,
    dislikes: 7,
    createdAt: new Date(),
  },
  {
    title: "E-Waste Management Innovations",
    videoUrl: "https://www.youtube.com/watch?v=yzab7890",
    description: "Innovations in the field of e-waste management.",
    imageUrl: "https://example.com/ewaste-innovations.jpg",
    views: 1400,
    likes: 210,
    dislikes: 5,
    createdAt: new Date(),
  },
  {
    title: "The Future of E-Waste Recycling",
    videoUrl: "https://www.youtube.com/watch?v=cdef1234",
    description: "Future trends in e-waste recycling.",
    imageUrl: "https://example.com/future-recycling.jpg",
    views: 1500,
    likes: 200,
    dislikes: 6,
    createdAt: new Date(),
  },
  {
    title: "Understanding E-Waste Policies",
    videoUrl: "https://www.youtube.com/watch?v=ghij5678",
    description: "Overview of policies related to e-waste.",
    imageUrl: "https://example.com/ewaste-policies.jpg",
    views: 1550,
    likes: 210,
    dislikes: 8,
    createdAt: new Date(),
  },
];
const liveAuctions = [
  {
    product: "SmartPhone", // Replace with an actual product ID from your database
    startingBid: 100,
    currentBid: 100,
    bids: [], // Ensure this is an array even if empty
    auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    startingDate: new Date(),
    createdAt: new Date(),
    winner: null,
    url: "http://example.com/auction/12345", // Ensure URL is valid
  },
  {
    product: "Computer Electronics", // Replace with an actual product ID from your database
    startingBid: 150,
    currentBid: 150,
    bids: [], // Ensure this is an array even if empty
    auctionEndTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startingDate: new Date(),
    createdAt: new Date(),
    winner: null,
    url: "http://example.com/auction/67890", // Ensure URL is valid
  },
  // Add more sample data as needed
];

const vouchers = [
  {
    code: "SAVE10",
    discount: 10,
    ecoscoreRequired: 50,
    description: "Save 10% on your next purchase",
    expiryDate: new Date(Date.now() + 86400000 * 30),
    url: "https://example.com/save10.jpg",
  },
  {
    code: "ECO20",
    discount: 20,
    ecoscoreRequired: 100,
    description: "Get 20% off when you reach an ecoscore of 100",
    expiryDate: new Date(Date.now() + 86400000 * 60),
    url: "https://example.com/eco20.jpg",
  },
  {
    code: "GREEN15",
    discount: 15,
    ecoscoreRequired: 75,
    description: "15% discount on all green products",
    expiryDate: new Date(Date.now() + 86400000 * 45),
    url: "https://example.com/green15.jpg",
  },
  {
    code: "TECH10",
    discount: 10,
    ecoscoreRequired: 60,
    description: "10% off on tech products",
    expiryDate: new Date(Date.now() + 86400000 * 30),
    url: "https://example.com/tech10.jpg",
  },
  {
    code: "GIFT25",
    discount: 25,
    ecoscoreRequired: 120,
    description: "25% off on gift items",
    expiryDate: new Date(Date.now() + 86400000 * 90),
    url: "https://example.com/gift25.jpg",
  },
  {
    code: "ECO30",
    discount: 30,
    ecoscoreRequired: 150,
    description: "30% off on purchases above ecoscore 150",
    expiryDate: new Date(Date.now() + 86400000 * 60),
    url: "https://example.com/eco30.jpg",
  },
  {
    code: "DISCOUNT5",
    discount: 5,
    ecoscoreRequired: 30,
    description: "5% off on all items",
    expiryDate: new Date(Date.now() + 86400000 * 20),
    url: "https://example.com/discount5.jpg",
  },
  {
    code: "BUNDLE15",
    discount: 15,
    ecoscoreRequired: 90,
    description: "15% off on bundle purchases",
    expiryDate: new Date(Date.now() + 86400000 * 30),
    url: "https://example.com/bundle15.jpg",
  },
  {
    code: "WINTER20",
    discount: 20,
    ecoscoreRequired: 100,
    description: "20% off on winter products",
    expiryDate: new Date(Date.now() + 86400000 * 45),
    url: "https://example.com/winter20.jpg",
  },
  {
    code: "SUMMER25",
    discount: 25,
    ecoscoreRequired: 120,
    description: "25% off on summer products",
    expiryDate: new Date(Date.now() + 86400000 * 70),
    url: "https://example.com/summer25.jpg",
  },
];

// Helper functions to handle seeding
const seedUsers = async () => {
  await User.deleteMany({});
  return User.insertMany(users);
};

const seedProducts = async (users) => {
  const userMap = users.reduce((acc, user) => {
    acc[user.username] = user._id;
    return acc;
  }, {});
  const updatedProducts = products.map((product) => ({
    ...product,
    user: "66c973426b57f639fa4b93c1",
  }));
  await Product.deleteMany({});
  return Product.insertMany(updatedProducts);
};

const seedReviews = async (products, users) => {
  const productMap = products.reduce((acc, product) => {
    acc[product.name] = product._id;
    return acc;
  }, {});
  const userMap = users.reduce((acc, user) => {
    acc[user.username] = user._id;
    return acc;
  }, {});
  const updatedReviews = reviews.map((review) => ({
    ...review,
    product: productMap[review.product],
    user: userMap[review.user],
  }));
  await Review.deleteMany({});
  return Review.insertMany(updatedReviews);
};

const seedYouTubeVideos = async (users) => {
  const userMap = users.reduce((acc, user) => {
    acc[user.username] = user._id;
    return acc;
  }, {});
  const updatedVideos = youtubeVideos.map((video) => ({
    ...video,
    uploader: userMap[video.uploader], // Replace username with user _id
  }));
  await YouTubeChannelVideo.deleteMany({});
  return YouTubeChannelVideo.insertMany(updatedVideos);
};

const seedVouchers = async () => {
  await Voucher.deleteMany({});
  return Voucher.insertMany(vouchers);
};

// Main function to run the seeding
const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/GreenByte", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const users = await seedUsers();
    const products = await seedProducts(users);
    await seedReviews(products, users);
    await seedYouTubeVideos(users);
    await seedVouchers();
    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
};

module.exports = { seedDatabase };
