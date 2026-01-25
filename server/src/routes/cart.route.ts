import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getCart,
  updateCart,
} from "../controllers/cart.controller";

const router = Router();

router.get("/:tableId", getCart);
router.post("/add-to-cart/:tableId", addToCart);
router.patch("/:cartId", updateCart);
router.delete("/:cartId", deleteCartItem);

export default router;
deleteCart