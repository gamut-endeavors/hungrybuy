import { FoodType, PrismaClient } from "@prisma/client";

export async function seedMenu() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_DIRECT,
      },
    },
  });

  try {
    // create categories
    await prisma.category.createMany({
      data: [{ name: "Burger" }, { name: "Pizza" }, { name: "Sandwich" }],
      skipDuplicates: true,
    });

    const categories = await prisma.category.findMany();

    // create menu items
    const foodItemsData = [];

    for (const category of categories) {
      if (category.name === "Burger") {
        foodItemsData.push(
          {
            name: "Classic Burger",
            description: "Adipoli burger",
            foodType: FoodType.NON_VEG,
            categoryId: category.id,
            price: 120,
          },
          {
            name: "Smashed Beef Burger",
            description: "Scn burger",
            foodType: FoodType.NON_VEG,
            categoryId: category.id,
            price: 140,
          },
        );
      }

      if (category.name === "Pizza") {
        foodItemsData.push(
          {
            name: "BBQ Pizza",
            description: "Adipoli pizza",
            foodType: FoodType.NON_VEG,
            categoryId: category.id,
          },
          {
            name: "Muzhroom Pizza",
            description: "Scn pizza",
            foodType: FoodType.VEG,
            categoryId: category.id,
            price: 130,
          },
        );
      }

      if (category.name === "Sandwich") {
        foodItemsData.push(
          {
            name: "Club Sandwich",
            description: "Adipoli sandwich",
            foodType: FoodType.NON_VEG,
            categoryId: category.id,
            price: 100,
          },
          {
            name: "Grilled Chicken Sandwich",
            description: "Scn sandwich",
            foodType: FoodType.NON_VEG,
            categoryId: category.id,
            price: 120,
          },
        );
      }
    }

    await prisma.menuItem.createMany({
      data: foodItemsData,
      skipDuplicates: true,
    });

    const menuItems = await prisma.menuItem.findMany();

    // create menu variants
    const variantsData = [];

    for (const item of menuItems) {
      if (item.name === "BBQ Pizza") {
        variantsData.push(
          { label: "Regular", price: 120, menuItemId: item.id },
          { label: "Medium", price: 140, menuItemId: item.id },
          { label: "Large", price: 150, menuItemId: item.id },
        );
      }

      if (item.name === "Classic Burger") {
        variantsData.push(
          { label: "Single Patty", price: 140, menuItemId: item.id },
          { label: "Double Patty", price: 160, menuItemId: item.id },
        );
      }
    }

    await prisma.menuVariant.createMany({
      data: variantsData,
      skipDuplicates: true,
    });

    console.log("Menu seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
