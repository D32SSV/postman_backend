import { Router } from "express";
import { purchaseOrder, declineOrder } from "../controllers/orderController.mjs";

const router = Router();

router.post("/order", purchaseOrder);
router.put("/order/:orderId/decline", declineOrder);

export default router;
