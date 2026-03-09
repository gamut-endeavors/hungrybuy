import { orders } from "@/data/orders";
import OrderRow from "./OrderRow";

export default function OrderTable() {
  return (
    <>
      <div className="bg-white border border-b-0 border-slate-400/50 overflow-hidden rounded-3xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-400/50 text-xs uppercase">
            <tr>
              <th className="p-5 text-left">Table No.</th>
              <th className="p-5 text-left">Order ID</th>
              <th className="p-5 text-left">Items & Special Requests</th>
              <th className="p-5 text-left">Total Price</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
