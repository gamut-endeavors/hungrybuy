import { MenuItem } from "@/types/menu";
import MenuItemRow from "./MenuItemRow";

export default function MenuTable({ items }: { items: MenuItem[] }) {
  return (
    <>
      <div className="bg-white border border-slate-400/50 overflow-hidden rounded-3xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-400/50 text-xs uppercase">
            <tr>
              <th className="p-5 text-left">Dish Details</th>
              <th className="p-5 text-left">Category</th>
              <th className="p-5 text-left">Price</th>
              <th className="p-5 text-left">Availability</th>
              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, idx) => (
              <MenuItemRow
                key={item.id}
                item={item}
                last={idx === items.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
