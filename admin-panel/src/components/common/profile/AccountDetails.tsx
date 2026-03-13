"use client";

import Input from "@/components/ui/Input";
import { UserCog2 } from "lucide-react";

export default function AccountDetails() {
  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="mb-8 flex justify-between">
          <h3 className="font-semibold text-xl">Account Details</h3>

          <UserCog2 />
        </div>

        <hr className="my-7 text-gray-300" />

        <div className="flex flex-col">
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              label="Name"
              value=""
              onChange={() => null}
              placeholder=""
              autoComplete=""
            />

            <Input
              label="Email"
              value=""
              onChange={() => null}
              placeholder=""
              autoComplete=""
            />
          </div>

          <Input
            label="Phone Number"
            value=""
            onChange={() => null}
            placeholder=""
            autoComplete=""
          />
        </div>
      </div>
    </>
  );
}
