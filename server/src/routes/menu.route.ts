import { Router } from "express";
import { createMenuItem } from "../controllers/menu.controller";

const router = Router();

router.post("/create", createMenuItem);

export default router;
