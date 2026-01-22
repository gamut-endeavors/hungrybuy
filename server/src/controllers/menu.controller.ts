import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../types/auth";

export async function createMenuItem(req: AuthenticatedRequest, res: Response) {
  try {
    const userRole = req.headers["x-user-role"];
    if (userRole !== "ADMIN" && userRole !== "SHOP") {
      return res.status(401).json({ message: "Forbidden" });
    }

    const { name, price, foodType, categoryId, description } = req.body;
    if (!name || !price || !foodType || !categoryId) {
      return res.status(400).json({ message: "Missing required " });
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        description: description || "",
        price: Number(price),
        foodType,
        categoryId,
      },
    });

    return res
      .status(201)
      .json({ message: "Menu item created successfully", data: { item } });
  } catch (error) {
    console.log("MENU_ITEM_CREATE_ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
