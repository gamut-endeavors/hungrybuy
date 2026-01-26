import { Router } from "express";
import { getAllOrders, createOrder } from "../controllers/order.controller";

const router = Router();

router.get("/all", getAllOrders);
router.post("/create/:tableId", createOrder);

export default router;
