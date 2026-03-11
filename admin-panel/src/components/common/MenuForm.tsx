"use client";

import { Category } from "@/types/category";
import { MenuFormValue } from "@/types/menu";
import { SyntheticEvent, useEffect, useState } from "react";
import { Camera } from "lucide-react";

interface MenuFormProps {
  categories: Category[];
  defaultValues?: MenuFormValue;
  onSubmit: (values: MenuFormValue) => void;
  loading?: boolean;
  onCancel?: () => void;
}

const initialValues: MenuFormValue = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  foodType: "VEG",
  image: null,
};

export default function MenuForm({
  categories,
  defaultValues,
  onSubmit,
  loading,
  onCancel,
}: MenuFormProps) {
  const [values, setValues] = useState<MenuFormValue>(initialValues);

  useEffect(() => {
    if (defaultValues) setValues(defaultValues);
  }, [defaultValues]);

  function handleChange(key: keyof MenuFormValue, value: any) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);

    setValues(initialValues);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-4xl max-w-400 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-6 shadow-sm"
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Item Name *
          </label>

          <input
            className="h-11 px-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="e.g. Classic Margherita Pizza"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Category *
          </label>

          <select
            className="h-11 px-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200 bg-white"
            value={values.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            <option value="">Select a category</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Description
        </label>

        <textarea
          className="h-32 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200 resize-none"
          placeholder="Briefly describe the dish, ingredients, and flavor profile..."
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Price *</label>

          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">$</span>

            <input
              type="number"
              className="h-11 w-full pl-8 pr-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="0.00"
              value={values.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Food Type
          </label>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleChange("foodType", "VEG")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                values.foodType === "VEG"
                  ? "bg-white shadow text-orange-600"
                  : "text-gray-500"
              }`}
            >
              🌱 VEG
            </button>

            <button
              type="button"
              onClick={() => handleChange("foodType", "NON_VEG")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                values.foodType === "NON_VEG"
                  ? "bg-white shadow text-orange-600"
                  : "text-gray-500"
              }`}
            >
              🍗 NON-VEG
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Item Photo
        </label>

        <label className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-orange-300 transition">
          <Camera size={28} />

          <p className="mt-2 text-sm">Drag and drop or click to upload</p>

          <span className="text-xs">PNG, JPG up to 5MB</span>

          <input
            type="file"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="flex justify-end items-center gap-6 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 font-medium"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow font-medium transition"
        >
          {loading ? "Saving..." : "Save Item"}
        </button>
      </div>
    </form>
  );
}
