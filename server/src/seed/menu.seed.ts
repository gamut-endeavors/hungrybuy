// server/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_DIRECT,
    },
  },
});

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean up existing data (optional, to avoid duplicates)
  // await prisma.cartItem.deleteMany();
  // await prisma.menuVariant.deleteMany();
  // await prisma.menuItem.deleteMany();
  // await prisma.category.deleteMany();

  // 2. Create Categories
  // Note: We use specific IDs to match your frontend constants
  await prisma.category.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', name: 'veg' },
  });
  await prisma.category.upsert({
    where: { id: '2' },
    update: {},
    create: { id: '2', name: 'non-veg' },
  });

  // 3. Create Products (Matches your FRONTEND constants)
  const products = [
    {
      id: '1',
      name: 'Rolled Sushi',
      description: 'Rolled sushi, or maki, is sushi where ingredients...',
      price: 799, // Store as cents/lowest unit OR update schema to Float. Using Int 799 for now based on Schema Int?
      foodType: 'NON_VEG',
      categoryId: '2',
      sizes: [
        { id: "1_6pcs", label: "6 pcs", price: 799 },
        { id: "1_12pcs", label: "12 pcs", price: 1499 }
      ]
    },
    {
      id: '2',
      name: 'Spicy Ramen',
      description: 'Spicy ramen features a flavorful broth...',
      price: 899,
      foodType: 'NON_VEG',
      categoryId: '2',
      sizes: [
        { id: "2_small", label: "Small", price: 899 },
        { id: "2_medium", label: "Medium", price: 1099 },
        { id: "2_large", label: "Large", price: 1299 }
      ]
    },
    {
      id: '3',
      name: 'Japanese Fried Chicken',
      description: 'Popular dish featuring bite-sized pieces...',
      price: 699,
      foodType: 'NON_VEG',
      categoryId: '2',
      sizes: [
        { id: "3_half", label: "Half", price: 699 },
        { id: "3_full", label: "Full", price: 1199 }
      ]
    },
    {
      id: '4',
      name: 'Veg Burger',
      description: 'Popular dish featuring bite-sized pieces of paneer...',
      price: 699,
      foodType: 'VEG',
      categoryId: '1',
      sizes: [] // No variants
    },
  ];

  for (const p of products) {
    // Convert price to Int (assuming your DB uses Integers for price)
    // If your DB uses Float/Decimal, you can remove the * 100 logic if you change input above
    // Your schema said `price Int?`. Usually implies cents ($7.99 -> 799). 
    // If you prefer plain dollars in DB, change schema to Float. 
    // For now, I will insert exactly what is in the object above.

    await prisma.menuItem.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price, 
        // @ts-ignore - Assuming enum matches string
        foodType: p.foodType, 
        categoryId: p.categoryId,
        variants: {
          create: p.sizes.map(s => ({
            id: s.id,
            label: s.label,
            price: s.price
          }))
        }
      }
    });
  }

  // 4. Create a Test Table (So you can add to cart)
  await prisma.table.upsert({
    where: { number: 5 },
    update: {},
    create: {
      id: 'table-123', // <--- USE THIS ID IN YOUR FRONTEND TEST
      number: 5,
      qrToken: 'test-token-123'
    }
  });

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });