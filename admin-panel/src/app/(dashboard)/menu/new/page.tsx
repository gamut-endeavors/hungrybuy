"use client";

import MenuForm from "@/components/common/MenuForm";
import Title from "@/components/ui/Title";
import useMenu from "@/hooks/useMenu";
import { poppins } from "@/styles/font";

export default function NewMenuPage() {
  const { categories, createItem } = useMenu();

  return (
    <>
      <main className={`p-3 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Add New Item" />
        </div>

        <div className="flex justify-center">
          <MenuForm categories={categories} onSubmit={createItem} />
        </div>
      </main>
    </>
  );
}
