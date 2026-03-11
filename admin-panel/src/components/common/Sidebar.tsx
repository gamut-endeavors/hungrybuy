"use client";

import { sidebarItems } from "@/config/sidebar";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import { LogOut, ShoppingBag } from "lucide-react";
import { poppins } from "@/styles/font";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";

export default function Sidebar() {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <>
      <aside
        className={`bg-white w-64 flex flex-col justify-between ${poppins.className} border-r-2 border-r-gray-300`}
      >
        <div>
          <div className="p-2 mb-6 flex items-center gap-3 border-b-2 border-b-gray-300">
            <div className="bg-orange p-2 rounded-lg">
              <ShoppingBag color="white" strokeWidth={2.5} />
            </div>

            <div className="font-semibold">
              <Link href={""}>Hungrybuy</Link>
              <p className="text-gray-400 tracking-wide">ADMIN PANEL</p>
            </div>
          </div>

          <div className="p-2 flex flex-col gap-1">
            {sidebarItems.map((item, idx) => (
              <SidebarItem
                key={idx}
                label={item.label}
                path={item.path}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div className="px-4 py-2 border-t-2 border-t-gray-300 flex justify-center">
          <div className="p-1 grow bg-slate-200 flex justify-center items-center gap-8 rounded-full">
            <div>
              <p className="font-medium tracking-wide">{user?.name}</p>
              <p className="text-sm text-gray-400 font-medium">Admin</p>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-full hover:shadow-md hover:bg-gray-300 duration-200 cursor-pointer"
            >
              <LogOut size={22} className="text-gray-500" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
