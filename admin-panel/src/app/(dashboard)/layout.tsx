import Sidebar from "@/components/common/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="grow">{children}</div>
      </div>
    </>
  );
}
