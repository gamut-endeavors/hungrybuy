import { Router } from "express";
import { getAllCategories, createCategory } from "../controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.post("/create", createCategory);

export default router;
