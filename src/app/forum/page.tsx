"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Pin, Crown, Flame, HelpCircle, Megaphone } from "lucide-react";
import type { Metadata } from "next";

const CATEGORIES = [
  { id: "all",         icon: "📋", label: "All Topics",          count: 842 },
  { id: "cricket",     icon: "🏏", label: "Cricket Talk",         count: 312 },
  { id: "sports",      icon: "⚽", label: "Sports Betting",       count: 187 },
  { id: "casino",      icon: "♠️", label: "Casino & Slots",       count: 156 },
  { id: "promotions",  icon: "🎁", label: "Promotions",           count: 94 },
  { id: "support",     icon: "🎧", label: "Help & Support",       count: 93 },
];

const TOPICS = [
  {
    id: "t1",
    pinned: true,
    category: "cricket",
    emoji: "🏏",
    title: "Bangladesh vs West Indies - ICC ODI Championship Live Discussion",
    titleLocal: "লাইভ ম্যাচ আলোচনা",
    author: "Admin_BSL",
    isAdmin: true,
    time: "10 mins ago",
    replies: 284,
    views: 12840,
    likes: 473,
    tag: "HOT",
    tagColor: "#ef4444",
  },
  {
    id: "t2",
    pinned: true,
    category: "promotions",
    emoji: "🎁",
    title: "July Mega Bonus Campaign — All Promotions Explained",
    titleLocal: "জুলাই মেগা বোনাস ক্যাম্পেইন",
    author: "BSL_Support",
    isAdmin: true,
    time: "2 hours ago",
    replies: 156,
    views: 8920,
    likes: 328,
    tag: "ANNOUNCEMENT",
    tagColor: "#008d5b",
  },
  {
    id: "t3",
    pinned: false,
    category: "cricket",
    emoji: "🏏",
    title: "T20 World Cup 2025 — Betting Tips & Predictions Thread",
    titleLocal: "টি২০ বিশ্বকাপ বেটিং টিপস",
    author: "Sakib***",
    isAdmin: false,
    time: "4 hours ago",
    replies: 98,
    views: 4210,
    likes: 201,
    tag: "TRENDING",
    tagColor: "#f59e0b",
  },
  {
    id: "t4",
    pinned: false,
    category: "casino",
    emoji: "🎰",
    title: "JILI Fortune Gems 500 — Is it worth playing? My strategy after 100 spins",
    titleLocal: "JILI স্লট স্ট্র্যাটেজি",
    author: "JiliKing***",
    isAdmin: false,
    time: "6 hours ago",
    replies: 67,
    views: 2890,
    likes: 145,
    tag: null,
    tagColor: null,
  },
  {
    id: "t5",
    pinned: false,
    category: "support",
    emoji: "🎧",
    title: "How to deposit via bKash — Step-by-step guide [2025 Updated]",
    titleLocal: "বিকাশ ডিপোজিট গাইড",
    author: "BSL_Support",
    isAdmin: true,
    time: "1 day ago",
    replies: 203,
    views: 18402,
    likes: 894,
    tag: "GUIDE",
    tagColor: "#3b82f6",
  },
  {
    id: "t6",
    pinned: false,
    category: "sports",
    emoji: "⚽",
    title: "Asian Handicap Explained — For Bangladesh Bettors",
    titleLocal: "এশিয়ান হ্যান্ডিক্যাপ কি?",
    author: "OddsExpert***",
    isAdmin: false,
    time: "1 day ago",
    replies: 44,
    views: 1940,
    likes: 89,
    tag: null,
    tagColor: null,
  },
  {
    id: "t7",
    pinned: false,
    category: "casino",
    emoji: "🃏",
    title: "Baccarat Road Strategy — Which pattern to follow for big wins?",
    titleLocal: "বাকারা রোড স্ট্র্যাটেজি",
    author: "CasinoMaster***",
    isAdmin: false,
    time: "2 days ago",
    replies: 38,
    views: 1620,
    likes: 73,
    tag: null,
    tagColor: null,
  },
  {
    id: "t8",
    pinned: false,
    category: "promotions",
    emoji: "💸",
    title: "Weekly Cashback — How to claim and what counts toward it?",
    titleLocal: "ক্যাশব্যাক দাবি করার নিয়ম",
    author: "NewPlayer***",
    isAdmin: false,
    time: "3 days ago",
    replies: 52,
    views: 2780,
    likes: 111,
    tag: null,
    tagColor: null,
  },
];

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? TOPICS
    : TOPICS.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#1b1c1e] to-[#121315] p-6">
        <div className="absolute -right-10 -top-10 opacity-5">
          <MessageSquare size={180} />
        </div>
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-1">Community</p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">BSL Forum</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#9ca3af]">
            বাংলাদেশের সবচেয়ে বড় বেটিং কমিউনিটি — ক্রিকেট আলোচনা, স্লট টিপস, সাপোর্ট এবং আরও অনেক কিছু।
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { icon: "💬", val: "842", label: "Total Topics" },
              { icon: "👥", val: "24,182", label: "Members" },
              { icon: "🟢", val: "1,294", label: "Online Now" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2">
                <span className="text-lg">{s.icon}</span>
                <div>
                  <p className="text-sm font-black text-[#ffdf19] leading-none">{s.val}</p>
                  <p className="text-[9px] text-[#6b7280] font-bold leading-none mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={"shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition " +
              (activeCategory === cat.id
                ? "bg-[#ffdf19] text-[#241a05]"
                : "border border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:border-[#ffdf19]/40 hover:text-white")}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span className={"rounded-full px-1.5 py-0.5 text-[9px] font-black " +
              (activeCategory === cat.id ? "bg-[#241a05]/20 text-[#241a05]" : "bg-[#2a2c30] text-[#6b7280]")}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Topics list */}
      <div className="space-y-2">
        {filtered.map((topic) => (
          <Link
            key={topic.id}
            href={`/forum/${topic.id}`}
            className="block rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 transition hover:border-[#ffdf19]/30 hover:bg-[#1e2026] active:scale-[.99]"
          >
            <div className="flex items-start gap-3">
              {/* Emoji avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2a2c30] bg-[#121315] text-xl">
                {topic.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  {topic.pinned && (
                    <span className="flex items-center gap-0.5 text-[9px] font-black text-[#008d5b]">
                      <Pin size={8} /> PINNED
                    </span>
                  )}
                  {topic.tag && (
                    <span className="rounded-full px-1.5 py-0.5 text-[8px] font-black text-white" style={{ background: topic.tagColor ?? "#6b7280" }}>
                      {topic.tag}
                    </span>
                  )}
                  {topic.isAdmin && (
                    <span className="flex items-center gap-0.5 rounded-full bg-[#ffdf19]/10 px-1.5 py-0.5 text-[8px] font-black text-[#ffdf19]">
                      <Crown size={7} /> OFFICIAL
                    </span>
                  )}
                </div>

                <h2 className="text-sm font-black text-white leading-snug line-clamp-2">{topic.title}</h2>
                <p className="text-[10px] text-[#6b7280] mt-0.5">{topic.titleLocal}</p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <span className={"font-bold " + (topic.isAdmin ? "text-[#ffdf19]" : "text-[#9ca3af]")}>{topic.author}</span>
                    · {topic.time}
                  </span>
                  <span className="flex items-center gap-1"><MessageSquare size={9} /> {topic.replies}</span>
                  <span className="flex items-center gap-1"><Eye size={9} /> {topic.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={9} /> {topic.likes}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-[#ffdf19]/20 bg-gradient-to-br from-[#1c1400] to-[#1b1c1e] p-5 text-center">
        <p className="text-lg font-black text-white">Join the BSL Community</p>
        <p className="mt-1 text-xs text-[#9ca3af]">Share tips, get help, and discuss your wins with 24K+ members.</p>
        <Link href="/register" className="mt-4 inline-block rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-6 py-2.5 text-sm font-black text-[#241a05] transition hover:brightness-110">
          Create Account &amp; Join →
        </Link>
      </div>
    </div>
  );
}
