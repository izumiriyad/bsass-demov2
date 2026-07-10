import type { Metadata } from "next";
import { Bell, Gift, Trophy, Info, CircleAlert as AlertCircle } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Notifications" };

const NOTIFICATIONS = [
  { id: 1, type: "bonus", title: "Welcome bonus credited!", message: "৳500 welcome bonus has been added to your account.", date: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 2, type: "win", title: "Big win on Aviator!", message: "Congratulations! You won ৳2,300 on Aviator.", date: new Date(Date.now() - 1000 * 60 * 90) },
  { id: 3, type: "info", title: "New promotion available", message: "Check out the new Sports Cashback promotion — up to 5% daily cashback.", date: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: 4, type: "alert", title: "Password security reminder", message: "For your security, please update your password regularly.", date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 5, type: "info", title: "New games added", message: "Exciting new slots from JILI and PG Soft are now available.", date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  { id: 6, type: "bonus", title: "Weekly cashback processed", message: "Your weekly cashback of ৳150 has been credited.", date: new Date(Date.now() - 1000 * 60 * 60 * 72) },
];

function getIcon(type: string) {
  switch (type) {
    case "bonus":
      return Gift;
    case "win":
      return Trophy;
    case "alert":
      return AlertCircle;
    default:
      return Info;
  }
}

function getColor(type: string) {
  switch (type) {
    case "bonus":
      return "#a855f7";
    case "win":
      return "#ffdf19";
    case "alert":
      return "#ef4444";
    default:
      return "#00a86d";
  }
}

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-[#00a86d]" />
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Notifications</h1>
      </div>

      <div className="space-y-2">
        {NOTIFICATIONS.map((notif) => {
          const Icon = getIcon(notif.type);
          const color = getColor(notif.type);
          return (
            <div key={notif.id} className="flex gap-3 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}20` }}>
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[#f0f0f0]">{notif.title}</p>
                  <p className="shrink-0 text-xs text-[#6b7280]">{timeAgo(notif.date)}</p>
                </div>
                <p className="mt-1 text-sm text-[#9ca3af]">{notif.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
