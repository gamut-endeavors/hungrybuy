"use client";

import { SidebarItem as SidebarItemProps } from "@/config/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
  label,
  path,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === path;

  return (
    <>
      <Link
        href={path}
        className={`flex items-center gap-3 font-medium px-4 py-3 rounded-lg ${active ? "bg-orange text-white" : " text-slate-500"}`}
      >
        <Icon size={20} strokeWidth={2.2} />
        {label}
      </Link>
    </>
  );
}
