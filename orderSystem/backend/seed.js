require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/order-system";

const seedProducts = [
  {
    name: "Midnight Echo Smartwatch",
    price: 3499,
    description: "A premium smartwatch with an edge-to-edge AMOLED display, precise health tracking, and 7-day battery life.",
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Quantum Noise-Canceling Headphones",
    price: 8999,
    description: "Immersive audio experience with industry-leading active noise cancellation and memory foam ear cups for all-day comfort.",
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Aura Mechanical Keyboard",
    price: 5499,
    description: "Wireless mechanical keyboard with customizable RGB backlighting, hot-swappable switches, and a sleek aluminum chassis.",
    image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Zenith Minimalist Backpack",
    price: 2199,
    description: "Water-resistant, ergonomic daily backpack with smart compartments for your laptop and gadgets.",
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // Insert new products
    await Product.insertMany(seedProducts);
    console.log("Successfully seeded", seedProducts.length, "products.");

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
