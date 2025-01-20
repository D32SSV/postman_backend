import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from "../controllers/productController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = Router();

router.get("/product", getAllProducts)
router.post("/product", addProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id",authMiddleware, deleteProduct);

export default router;
