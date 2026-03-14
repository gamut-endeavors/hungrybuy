"use client";

import AccountDetails from "@/components/common/profile/AccountDetails";
import Alerts from "@/components/common/profile/Alerts";
import ProfileHeader from "@/components/common/profile/ProfileHeader";
import SecurityCard from "@/components/common/profile/SecurityCard";
import Title from "@/components/ui/Title";
import useUser from "@/hooks/useUser";
import { poppins } from "@/styles/font";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <>
      <main className={`p-3 flex flex-col gap-5 ${poppins.className}`}>
        <div className="my-2 flex justify-between">
          <Title text="My Profile">
            Personalize your admin experience and security settings.
          </Title>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-6 col-span-2">
            <ProfileHeader />
            <AccountDetails user={user} />
          </div>

          <div className="flex flex-col gap-6">
            <SecurityCard />
            <Alerts />
          </div>
        </div>
      </main>
    </>
  );
}
