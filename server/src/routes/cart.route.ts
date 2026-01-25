import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller";

const router = Router();

router.get("/:tableId", getCart);
router.post("/add-to-cart/:tableId", addToCart);
router.patch("/:cartId", updateCart);

export default router;
