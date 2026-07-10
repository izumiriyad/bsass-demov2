import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { formatBDT } from "@/lib/utils";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Profile</h1>
        <p className="text-sm text-[#9ca3af]">Manage your account information</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Username</p>
          <p className="mt-1 text-sm font-bold text-[#f0f0f0]">{user.username}</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Email</p>
          <p className="mt-1 truncate text-sm font-bold text-[#f0f0f0]">{user.email}</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Member Since</p>
          <p className="mt-1 text-sm font-bold text-[#f0f0f0]">Today</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Balance</p>
          <p className="mt-1 text-sm font-bold text-[#ffdf19]">{formatBDT(user.balance)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Edit Profile</h2>
        <ProfileForm username={user.username} email={user.email} />
      </div>
    </div>
  );
}
