import { Router } from "express";
import {
  createMenuItem,
  createVariant,
  deleteMenuItem,
  deleteVariant,
  getAllVariants,
  getMenu,
  updateMenuItem,
  updateVariant,
} from "../controllers/menu.controller";
import { upload } from "../utils/upload";

const router = Router();

router.get("/", getMenu);
router.post("/create", upload.single("image"), createMenuItem);
router.patch("/:id", upload.single("image"), updateMenuItem);
router.delete("/:id", deleteMenuItem);

router.get("/:menuItemId/variants", getAllVariants);
router.post("/:menuItemId/variants", createVariant);
router.patch("/:menuItemId/variants/:variantId", updateVariant);
router.delete("/:menuItemId/variants/:variantId", deleteVariant);

export default router;
