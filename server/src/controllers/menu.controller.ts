import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../types/auth";
import { FoodType } from "@prisma/client";

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

export async function getMenu(req: AuthenticatedRequest, res: Response) {
  try {
    const { categoryId, foodType, search } = req.query;

    const items = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        ...(categoryId && { categoryId: String(categoryId) }),
        ...(foodType && { foodType: foodType as any }),
        ...(search && {
          name: { contains: String(search).trim(), mode: "insensitive" },
        }),
      },
      include: { category: true },
    });

    return res
      .status(200)
      .json({ message: "Fetched all menu items", data: { items } });
  } catch (error) {
    console.log("MENU_GET_ERROR", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
