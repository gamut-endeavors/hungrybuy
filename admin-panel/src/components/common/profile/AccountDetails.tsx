"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useUser from "@/hooks/useUser";
import { User } from "@/types/user";
import { UserCog2 } from "lucide-react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
}

export default function AccountDetails({ user }: { user: User }) {
  if (!user) return null;

  const [form, setForm] = useState<FormState>({
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
  });

  const handleChange = (field: keyof FormState) => {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  };

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="mb-8 flex justify-between">
          <h3 className="font-semibold text-xl">Account Details</h3>

          <UserCog2 color="#99a1af" />
        </div>

        <hr className="my-7 text-gray-300" />

        <form className="flex flex-col">
          <div className="grid md:grid-cols-2 gap-2">
            <Input
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder=""
            />

            <Input
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder=""
            />
          </div>

          <Input
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder=""
          />

          <Button type="submit" disabled={false}>
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
