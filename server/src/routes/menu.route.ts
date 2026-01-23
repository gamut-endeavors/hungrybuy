import { Router } from "express";
import { createMenuItem, getMenu, updateMenuItem } from "../controllers/menu.controller";

const router = Router();

router.get("/", getMenu);
router.post("/create", createMenuItem);
router.patch("/:id", updateMenuItem);

export default router;
