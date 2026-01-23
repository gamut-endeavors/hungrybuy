import { Router } from "express";
import { createMenuItem, getMenu } from "../controllers/menu.controller";

const router = Router();

router.get("/", getMenu);
router.post("/create", createMenuItem);

export default router;
