const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const FILE = path.join(__dirname, "orders.json");

app.use(express.json());

// Har request par CORS allow karein, taake landing page is server ko call kar sake
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// orders.json se orders padhna
function readOrders() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

// orders.json mein orders likhna
function saveOrders(orders) {
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
}

// Sab orders dikhana
app.get("/orders", (req, res) => {
  res.json(readOrders());
});

// Naya order add karna
app.post("/orders", (req, res) => {
  const { name, phone, item, quantity } = req.body;

  if (!name || !phone || !item) {
    return res.status(400).json({ message: "name, phone aur item zaroori hain" });
  }

  const orders = readOrders();
  const order = {
    id: Date.now(),
    name,
    phone,
    item,
    quantity: quantity || 1,
    date: new Date().toLocaleString(),
  };

  orders.push(order);
  saveOrders(orders);

  res.status(201).json(order);
});

// Order delete karna
app.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const orders = readOrders();
  const remaining = orders.filter((o) => o.id !== id);

  if (remaining.length === orders.length) {
    return res.status(404).json({ message: "Order nahi mila" });
  }

  saveOrders(remaining);
  res.json({ message: "Order delete ho gaya" });
});

app.listen(PORT, () => {
  console.log(`Restaurant API running at http://localhost:${PORT}`);
});
