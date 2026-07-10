import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = { title: "Sign Up" };

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) redirect("/");

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-3 py-8">
      <div className="w-full max-w-md rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Create Your Account</h1>
          <p className="mt-1 text-sm text-[#9ca3af]">Join BSL Gaming and get ৳500 welcome credit</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
