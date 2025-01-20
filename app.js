import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";

dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

