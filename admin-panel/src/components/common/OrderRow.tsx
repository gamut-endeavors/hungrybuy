import { Order } from "@/types/order";
import StatusDropdown from "./StatusDropdown";

interface OrderRowProps {
  order: Order;
}

export default function OrderRow({ order }: OrderRowProps) {
  return (
    <>
      <tr className="border-b border-slate-400/50 tracking-wider">
        <td className="px-4 py-4 font-bold">
          T-{order.number.toString().padStart(2, "0")}
        </td>

        <td className="px-4 py-4 text-gray-500">{order.id}</td>

        <td className="px-4 py-4">
          <p className="font-medium">{order.items}</p>
        </td>

        <td className="px-4 py-4 font-medium">${order.price}</td>

        <td className="px-4 py-4">
          <StatusDropdown status={order.status} />
        </td>

        <td className="px-4 py-4 text-orange-500 font-medium cursor-pointer">
          Details
        </td>
      </tr>
    </>
  );
}
