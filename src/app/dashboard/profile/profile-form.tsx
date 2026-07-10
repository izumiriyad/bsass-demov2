"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ProfileFormProps {
  username: string;
  email: string;
}

export function ProfileForm({ username, email }: ProfileFormProps) {
  const [formUsername, setFormUsername] = useState(username);
  const [formEmail, setFormEmail] = useState(email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUsername || !formEmail) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Username</label>
        <input
          type="text"
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
          className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none transition focus:border-[#008d5b]"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Email</label>
        <input
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
          className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none transition focus:border-[#008d5b]"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-2.5 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
