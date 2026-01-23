import { Router } from "express";
import {
  createMenuItem,
  createVariant,
  deleteMenuItem,
  getAllVariants,
  getMenu,
  updateMenuItem,
} from "../controllers/menu.controller";

const router = Router();

router.get("/", getMenu);
router.post("/create", createMenuItem);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

router.get("/:menuItemId/variants", getAllVariants);
router.post("/:menuItemId/variants", createVariant);

export default router;
