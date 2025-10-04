const express = require("express");
const cors = require("cors");
const products = require("./data/products");

const app = express();
app.use(cors());
app.use(express.json());

// Products API
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Order API
app.post("/api/order", (req, res) => {
  const { firstName, lastName, address, cart } = req.body;

  if (!firstName || !lastName || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("New Order:", { firstName, lastName, address, cart });
  res.json({ message: "Order placed successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
