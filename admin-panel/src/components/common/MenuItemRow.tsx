import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Switch from "../ui/Switch";
import { Pen, Trash2 } from "lucide-react";
import useMenu from "@/hooks/useMenu";

export default function MenuItemRow({
  last,
  item,
}: {
  last?: boolean;
  item: MenuItem;
}) {
  const { deleteItem } = useMenu();

  return (
    <>
      <tr
        className={`${last ? "" : "border-b border-slate-400/50"} tracking-wider`}
      >
        <td className="px-4 py-4 flex items-center gap-3">
          <div style={{ width: "55px", height: "55px", position: "relative" }}>
            <Image
              src={item.image || "/burger.jpeg"}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>

          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-gray-400 font-medium">{item.description}</p>
          </div>
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

            <button
              onClick={() => deleteItem(item.id)}
              className="p-1 border border-gray-300 text-gray-500 rounded-md"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
