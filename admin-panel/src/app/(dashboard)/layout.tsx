import Sidebar from "@/components/common/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="grow overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
