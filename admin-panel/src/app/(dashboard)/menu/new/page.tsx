"use client";

import { createMenuItem } from "@/api/menu";
import MenuForm from "@/components/common/MenuForm";
import Title from "@/components/ui/Title";
import useMenu from "@/hooks/useMenu";
import { poppins } from "@/styles/font";
import { MenuFormValue } from "@/types/menu";

export default function NewMenuPage() {
  const { categories } = useMenu();

  async function handleSubmit(values: MenuFormValue) {
    await createMenuItem(values);
  }

  return (
    <>
      <main className={`p-3 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="Add New Item" />
        </div>

        <div className="flex justify-center">
          <MenuForm categories={categories} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
}
