"use client";

import MenuForm from "@/components/common/MenuForm";
import Title from "@/components/ui/Title";
import useMenu from "@/hooks/useMenu";
import { poppins } from "@/styles/font";
import { useParams, useRouter } from "next/navigation";

export default function MenuEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const { items, categories, updateItem } = useMenu();
  const menuItem = items.find((item) => item.id === id);

  if (!menuItem) return null;

  const handleSubmit = (values: any) => {
    updateItem({ id: menuItem.id, values });
    router.push("/menu");
  };

  return (
    <>
      <main className={`p-3 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Edit Item" />
        </div>

        <div className="flex justify-center">
          <MenuForm
            categories={categories}
            defaultValues={{
              name: menuItem?.name,
              description: menuItem?.description,
              price: menuItem?.price,
              categoryId: menuItem?.category.id,
              foodType: menuItem?.foodType,
              image: null,
            }}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </>
  );
}
