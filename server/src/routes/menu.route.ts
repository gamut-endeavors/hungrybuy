import { Router } from "express";
import {
  createMenuItem,
  createVariant,
  deleteMenuItem,
  getMenu,
  updateMenuItem,
} from "../controllers/menu.controller";

const router = Router();

router.get("/", getMenu);
router.post("/create", createMenuItem);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

router.post("/:menuItemId/variants", createVariant);

export default router;
