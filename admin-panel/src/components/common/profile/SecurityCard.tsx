"use client";

import Input from "@/components/ui/Input";
import { LockKeyhole } from "lucide-react";

export default function SecurityCard() {
  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="mb-8 flex justify-between">
          <h3 className="font-semibold text-xl">Security</h3>

          <LockKeyhole fill="#99a1af" color="white" />
        </div>

        <hr className="my-7 text-gray-300" />

        <Input
          label="Current Password"
          type="password"
          value=""
          onChange={() => null}
          placeholder="•••••••"
          autoComplete=""
        />

        <hr className="my-7 text-gray-300" />

        <div>
          <Input
            label="New Password"
            type="password"
            value=""
            onChange={() => null}
            placeholder="Create new password"
            autoComplete=""
          />

          <Input
            label="Confirm New Password"
            type="password"
            value=""
            onChange={() => null}
            placeholder="Verify new password"
            autoComplete=""
          />
        </div>

        <button className="mt-3 text-orange text-sm font-semibold cursor-pointer">
          Forgot Password?
        </button>
      </div>
    </>
  );
}
