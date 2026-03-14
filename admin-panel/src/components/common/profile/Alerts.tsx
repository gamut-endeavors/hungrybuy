import { BellRing } from "lucide-react";

export default function Alerts() {
  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="mb-8 flex justify-between">
          <h3 className="font-semibold text-xl">Alerts</h3>

          <BellRing color="#99a1af" />
        </div>

        <hr className="my-7 text-gray-300" />
      </div>
    </>
  );
}
