import { Router } from "express";
import { getAllCategories, createCategory, deleteCategory } from "../controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.post("/create", createCategory);
router.delete("/:id", deleteCategory)

export default router;
