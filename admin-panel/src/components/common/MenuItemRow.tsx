import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Switch from "../ui/Switch";
import { Pen, Trash2 } from "lucide-react";

export default function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <>
      <tr className="border-b border-slate-400/50 tracking-wider">
        <td className="px-4 py-4 font-bold flex items-center gap-3">
          <div style={{ width: "50px", height: "50px", position: "relative" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {item.name}
        </td>

        <td className="px-4 py-4 text-gray-500">{item.category.name}</td>

        <td className="px-4 py-4">
          <p className="font-medium">{item.price}</p>
        </td>

        <td className="px-4 py-4 font-medium">
          <div className="flex items-center gap-2">
            <Switch id={item.id} on={item.isAvailable} />
            <p
              className={`${item.isAvailable ? "text-green-500" : "text-red-500"}`}
            >
              {item.isAvailable ? "Available" : "Sold Out"}
            </p>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <button className="p-1 border border-gray-300 text-gray-500 rounded-md">
              <Pen size={20} />
            </button>

            <button className="p-1 border border-gray-300 text-gray-500 rounded-md">
              <Trash2 size={20} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
