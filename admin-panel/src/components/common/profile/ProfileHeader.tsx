"use client";

import useUser from "@/hooks/useUser";
import { LucideIcon, Mail, MapPin, Pen, Phone, ShieldUser } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader() {
  const { isLoading, user } = useUser();

  if (isLoading) return null;

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 flex items-center gap-6">
        <div
          style={{ width: "140px", height: "140px", position: "relative" }}
          className="border-4 border-white rounded-xl"
        >
          <Image
            src={"/burger.jpeg"}
            alt={""}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />

          <button className="absolute bottom-0 right-0 bg-orange text-white p-2 rounded-full shadow">
            <Pen />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-x font-semibold">{user.name}</h2>

              <p className="text-gray-500">
                Super Admin • Member since March 2021
              </p>
            </div>

            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
              ACTIVE STATUS
            </span>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4 border border-gray-200 bg-gray-50 rounded-xl p-4">
            <Info icon={Mail} label="Email" value="sarah.j@hungrybuy.com" />
            <Info icon={ShieldUser} label="Role" value="Administrator" />
            <Info icon={Phone} label="Phone" value="+1 (555) 012-3456" />
            <Info icon={MapPin} label="Location" value="New York, NY" />
          </div>
        </div>
      </div>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={35} strokeWidth={1.6} fill="#ee5b2b" color="white" />
      <div>
        <p className="uppercase text-xs font-medium text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
