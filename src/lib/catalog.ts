export const SITE = {
  name: "BSL Gaming",
  shortName: "BSL",
  tagline: "Bangladesh's trusted online sports betting and gaming platform",
  description:
    "BSL Gaming — Bangladesh-focused online sports betting, cricket betting, live casino, slots, fishing, lottery, arcade and crash games frontend with BDT wallet UI, Bangla-friendly content and local payment flows.",
  url: "https://bslgaming.com.bd",
  locale: "en-BD",
  currency: "BDT",
  currencySymbol: "৳",
  country: "Bangladesh",
  supportEmail: "support@bslgaming.com.bd",
};

export interface GameCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export const GAME_CATEGORIES: GameCategory[] = [
  { id: "popular", label: "POPULAR", emoji: "⭐", color: "#ffdf19" },
  { id: "sports", label: "SPORTS", emoji: "⚽", color: "#22c55e" },
  { id: "cockfighting", label: "COCKFIGHTING", emoji: "🐓", color: "#ef4444" },
  { id: "slots", label: "SLOTS", emoji: "🎰", color: "#a855f7" },
  { id: "casino", label: "CASINO", emoji: "♠️", color: "#f43f5e" },
  { id: "table", label: "TABLE", emoji: "🎲", color: "#06b6d4" },
  { id: "fishing", label: "FISHING", emoji: "🎣", color: "#14b8a6" },
  { id: "lottery", label: "LOTTERY", emoji: "🎟️", color: "#f97316" },
  { id: "arcade", label: "ARCADE", emoji: "🕹️", color: "#8b5cf6" },
  { id: "crash", label: "CRASH", emoji: "🚀", color: "#ec4899" },
];

export interface BSLGame {
  id: string;
  title: string;
  provider: string;
  category: string;
  gradient: [string, string];
  emoji: string;
  isHot?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  players?: number;
}

function g(id: string, title: string, provider: string, category: string, c1: string, c2: string, emoji: string, flags: Partial<BSLGame> = {}): BSLGame {
  return { id, title, provider, category, gradient: [c1, c2], emoji, ...flags };
}

export const POPULAR_GAMES: BSLGame[] = [
  g("sportsbook", "SPORTSBOOK", "BSL Sports", "popular", "#064e3b", "#065f46", "⚽", { isHot: true, players: 8100 }),
  g("pp-slots", "PRAGMATIC PLAY", "Pragmatic Play", "popular", "#1a0533", "#3b0764", "🎰", { players: 5200 }),
  g("sexy-baccarat", "SEXY BACCARAT", "AE Sexy", "popular", "#3b0011", "#6b0020", "💃", { isHot: true, players: 6200 }),
  g("aviator", "AVIATOR", "Spribe", "popular", "#7c2d12", "#ea580c", "✈️", { isHot: true, players: 9200 }),
  g("crazy-time", "CRAZY TIME", "Evolution", "popular", "#7c0000", "#991b1b", "🎪", { isFeatured: true, isHot: true, players: 9100 }),
  g("gates-olympus", "GATES OF OLYMPUS", "Pragmatic Play", "popular", "#2e1065", "#5b21b6", "⚡", { isFeatured: true, players: 8200 }),
  g("mega-wheel", "MEGA WHEEL", "Pragmatic Play", "popular", "#1e1b4b", "#4c1d95", "🎡", { isFeatured: true, players: 6200 }),
  g("high-flyer", "HIGH FLYER", "Pragmatic Play", "popular", "#0c4a6e", "#0369a1", "🛩️", { players: 5500 }),
  g("fortune-gems-3", "FORTUNE GEMS 3", "JILI", "popular", "#713f12", "#92400e", "💍", { players: 3900 }),
  g("aztec-gems", "AZTEC GEMS", "Pragmatic Play", "popular", "#7c2d12", "#9a3412", "💎", { isHot: true, players: 4100 }),
  g("super-ace", "SUPER ACE", "JILI", "popular", "#422006", "#713f12", "♠️", { isHot: true, players: 4800 }),
  g("sweet-bonanza", "SWEET BONANZA", "Pragmatic Play", "popular", "#be185d", "#ec4899", "🍭", { players: 5100 }),
  g("lightning-roulette", "LIGHTNING ROULETTE", "Evolution", "popular", "#7c0000", "#b91c1c", "⚡", { isHot: true, players: 8400 }),
  g("starlight-princess", "STARLIGHT PRINCESS", "Pragmatic Play", "popular", "#4c1d95", "#8b5cf6", "⭐", { isNew: true, players: 6700 }),
  g("cockfight-derby", "COCKFIGHT DERBY", "SV388", "popular", "#7c0000", "#991b1b", "🐓", { isHot: true, players: 3400 }),
  g("wild-west-gold", "WILD WEST GOLD", "Pragmatic Play", "popular", "#78350f", "#b45309", "🤠", { players: 3200 }),
  g("big-bass", "BIG BASS BONANZA", "Pragmatic Play", "popular", "#065f46", "#10b981", "🐟", { players: 3600 }),
  g("dog-house", "THE DOG HOUSE", "Pragmatic Play", "popular", "#1d4ed8", "#3b82f6", "🐕", { players: 2900 }),
  g("no-comm-baccarat", "NO COMM. BACCARAT", "Evolution", "popular", "#1c1917", "#292524", "🂡", { players: 7200 }),
  g("spaceman", "SPACEMAN", "Pragmatic Play", "popular", "#1e1b4b", "#312e81", "🚀", { isNew: true, players: 4500 }),
];

export const SLOTS_GAMES: BSLGame[] = [
  g("s1", "Fortune Gems 3", "JILI", "slots", "#713f12", "#92400e", "💍", { isHot: true, players: 3900 }),
  g("s2", "Aztec Gems", "Pragmatic Play", "slots", "#7c2d12", "#9a3412", "💎", { isHot: true, players: 4100 }),
  g("s3", "Gates of Olympus", "Pragmatic Play", "slots", "#2e1065", "#5b21b6", "⚡", { isFeatured: true, players: 8200 }),
  g("s4", "Sweet Bonanza", "Pragmatic Play", "slots", "#be185d", "#ec4899", "🍭", { players: 5100 }),
  g("s5", "Wild West Gold", "Pragmatic Play", "slots", "#78350f", "#b45309", "🤠", { players: 3200 }),
  g("s6", "The Dog House", "Pragmatic Play", "slots", "#1d4ed8", "#3b82f6", "🐕", { players: 2900 }),
  g("s7", "Big Bass Bonanza", "Pragmatic Play", "slots", "#065f46", "#10b981", "🐟", { players: 3600 }),
  g("s8", "Starlight Princess", "Pragmatic Play", "slots", "#4c1d95", "#8b5cf6", "⭐", { isNew: true, players: 6700 }),
  g("s9", "Super Ace", "JILI", "slots", "#422006", "#713f12", "♠️", { isHot: true, players: 4800 }),
  g("s10", "Boxing King", "JILI", "slots", "#7c0000", "#991b1b", "🥊", { players: 2600 }),
  g("s11", "Golden Empire", "JILI", "slots", "#713f12", "#d97706", "👑", { isNew: true, players: 3400 }),
  g("s12", "Money Coming", "JILI", "slots", "#065f46", "#10b981", "💰", { players: 2200 }),
  g("s13", "Crazy Hunter", "JILI", "slots", "#7c2d12", "#ea580c", "🎯", { players: 1800 }),
  g("s14", "Lucky Neko", "PG Soft", "slots", "#be185d", "#9d174d", "🐱", { isHot: true, players: 3100 }),
  g("s15", "Mahjong Ways", "PG Soft", "slots", "#1e1b4b", "#312e81", "🀄", { players: 4200 }),
  g("s16", "Treasure of Aztec", "PG Soft", "slots", "#7c2d12", "#9a3412", "🗿", { players: 2800 }),
  g("s17", "Wild Fireworks", "PG Soft", "slots", "#be185d", "#ec4899", "🎆", { isNew: true, players: 2400 }),
  g("s18", "Leprechaun Riches", "PG Soft", "slots", "#166534", "#15803d", "🌈", { players: 1900 }),
  g("s19", "Pirate Gold", "Pragmatic Play", "slots", "#1e3a5f", "#1d4ed8", "🏴‍☠️", { players: 2700 }),
  g("s20", "Fruit Party", "Pragmatic Play", "slots", "#be185d", "#f472b6", "🍓", { players: 2100 }),
];

export const CASINO_GAMES: BSLGame[] = [
  g("c1", "Lightning Roulette", "Evolution", "casino", "#7c0000", "#991b1b", "⚡", { isHot: true, players: 8400 }),
  g("c2", "Crazy Time", "Evolution", "casino", "#1e1b4b", "#312e81", "🎪", { isHot: true, players: 9100 }),
  g("c3", "Baccarat", "Evolution", "casino", "#1c1917", "#292524", "🃏", { players: 5200 }),
  g("c4", "Dream Catcher", "Evolution", "casino", "#0c4a6e", "#075985", "🎯", { players: 4100 }),
  g("c5", "Dragon Tiger", "Evolution", "casino", "#7c2d12", "#9a3412", "🐉", { isNew: true, players: 6300 }),
  g("c6", "Monopoly Live", "Evolution", "casino", "#166534", "#15803d", "🎩", { players: 7800 }),
  g("c7", "Andar Bahar", "Ezugi", "casino", "#1e3a5f", "#1d4ed8", "🀄", { players: 3900 }),
  g("c8", "Teen Patti", "Ezugi", "casino", "#831843", "#be185d", "🃏", { isHot: true, players: 4500 }),
  g("c9", "Sic Bo", "Evolution", "casino", "#713f12", "#b45309", "🎲", { players: 2300 }),
  g("c10", "Mega Ball", "Evolution", "casino", "#2e1065", "#5b21b6", "🎱", { isNew: true, players: 3400 }),
  g("c11", "Speed Roulette", "Evolution", "casino", "#7c0000", "#b91c1c", "🎯", { players: 5100 }),
  g("c12", "Blackjack Party", "Evolution", "casino", "#1c1917", "#57534e", "🂡", { players: 3800 }),
  g("c13", "Sexy Baccarat A", "AE Sexy", "casino", "#3b0011", "#6b0020", "💃", { isHot: true, players: 6200 }),
  g("c14", "Sexy Baccarat B", "AE Sexy", "casino", "#3b0011", "#8b0033", "💃", { players: 4800 }),
  g("c15", "Sexy Roulette", "AE Sexy", "casino", "#4a0019", "#7a0030", "💃", { players: 4100 }),
  g("c16", "Mega Wheel", "Pragmatic Play", "casino", "#1e1b4b", "#4c1d95", "🎡", { isFeatured: true, players: 6200 }),
];

export const FISHING_GAMES: BSLGame[] = [
  g("f1", "Ocean King", "JILI", "fishing", "#065f46", "#0d9488", "🦈", { isHot: true, players: 3100 }),
  g("f2", "Fish Hunter", "JILI", "fishing", "#0c4a6e", "#0369a1", "🐙", { players: 2200 }),
  g("f3", "Golden Toad", "Fa Chai", "fishing", "#713f12", "#b45309", "🐸", { players: 1800 }),
  g("f4", "Deep Sea Bounty", "JILI", "fishing", "#1e3a5f", "#1d4ed8", "🐠", { isNew: true, players: 2500 }),
  g("f5", "Dragon Fishing", "JILI", "fishing", "#7c0000", "#991b1b", "🐉", { isHot: true, players: 3400 }),
  g("f6", "Cai Shen Fishing", "Fa Chai", "fishing", "#713f12", "#d97706", "🎣", { players: 1900 }),
  g("f7", "Star Fish", "JDB", "fishing", "#2e1065", "#5b21b6", "⭐", { players: 1200 }),
  g("f8", "Fishing Master", "Spade Gaming", "fishing", "#064e3b", "#10b981", "🐟", { players: 2700 }),
];

export const ARCADE_GAMES: BSLGame[] = [
  g("a1", "Plinko", "Spribe", "arcade", "#4c1d95", "#8b5cf6", "🟣", { isHot: true, players: 5400 }),
  g("a2", "Mines", "Spribe", "arcade", "#7c0000", "#991b1b", "💣", { players: 4200 }),
  g("a3", "Dice", "Spribe", "arcade", "#0c4a6e", "#0369a1", "🎲", { players: 3800 }),
  g("a4", "Tower", "Spribe", "arcade", "#065f46", "#10b981", "🗼", { players: 2100 }),
  g("a5", "Crash", "Spribe", "arcade", "#7c2d12", "#ea580c", "🚀", { isHot: true, players: 6100 }),
  g("a6", "Mini Roulette", "Spribe", "arcade", "#1c1917", "#57534e", "🎯", { players: 1700 }),
  g("a7", "Goal", "Spribe", "arcade", "#166534", "#15803d", "⚽", { players: 2300 }),
  g("a8", "HiLo", "Spribe", "arcade", "#831843", "#be185d", "🎴", { players: 1500 }),
];

export const LOTTERY_GAMES: BSLGame[] = [
  g("l1", "Keno", "JILI", "lottery", "#713f12", "#d97706", "🔢", { players: 2100 }),
  g("l2", "Bingo", "JILI", "lottery", "#0c4a6e", "#0369a1", "🎟️", { players: 1800 }),
  g("l3", "Lucky 5", "JILI", "lottery", "#7c0000", "#991b1b", "🍀", { players: 1400 }),
  g("l4", "Power Ball", "JILI", "lottery", "#1e1b4b", "#4c1d95", "🔮", { players: 1100 }),
];

export const CRASH_GAMES: BSLGame[] = [
  g("cr1", "Aviator", "Spribe", "crash", "#7c2d12", "#ea580c", "✈️", { isHot: true, players: 9200 }),
  g("cr2", "JetX", "SmartSoft", "crash", "#1e3a5f", "#1d4ed8", "🚀", { isHot: true, players: 6800 }),
  g("cr3", "High Flyer", "Pragmatic", "crash", "#0c4a6e", "#0369a1", "🛩️", { isFeatured: true, players: 5500 }),
  g("cr4", "Space XY", "BGaming", "crash", "#2e1065", "#5b21b6", "🌌", { players: 3200 }),
  g("cr5", "Lucky Jet", "1Win", "crash", "#713f12", "#b45309", "🚀", { isNew: true, players: 4100 }),
  g("cr6", "Spaceman", "Pragmatic Play", "crash", "#1e1b4b", "#312e81", "🚀", { players: 4500 }),
  g("cr7", "Rocketman", "Elbet", "crash", "#7c0000", "#991b1b", "👨‍🚀", { players: 2800 }),
];

export const TABLE_GAMES: BSLGame[] = [
  g("t1", "Texas Hold'em", "Evolution", "table", "#0c4a6e", "#0369a1", "♠️", { players: 3400 }),
  g("t2", "Blackjack VIP", "Evolution", "table", "#1c1917", "#292524", "🂡", { isHot: true, players: 5200 }),
  g("t3", "Baccarat Squeeze", "Evolution", "table", "#7c0000", "#991b1b", "🃏", { players: 4100 }),
  g("t4", "Sic Bo", "Evolution", "table", "#713f12", "#b45309", "🎲", { players: 2300 }),
  g("t5", "Casino Hold'em", "Evolution", "table", "#065f46", "#10b981", "♥️", { players: 1900 }),
  g("t6", "Dragon Tiger", "Evolution", "table", "#7c2d12", "#9a3412", "🐉", { isNew: true, players: 2700 }),
];

export const SPORTS_GAMES_LIST: BSLGame[] = [
  g("sp1", "Football", "BSL Sports", "sports", "#065f46", "#10b981", "⚽", { isHot: true, players: 8100 }),
  g("sp2", "Cricket", "BSL Sports", "sports", "#0c4a6e", "#1d4ed8", "🏏", { isHot: true, players: 7500 }),
  g("sp3", "Basketball", "BSL Sports", "sports", "#7c2d12", "#ea580c", "🏀", { players: 3200 }),
  g("sp4", "Tennis", "BSL Sports", "sports", "#166534", "#22c55e", "🎾", { players: 2400 }),
  g("sp5", "Kabaddi", "BSL Sports", "sports", "#7c0000", "#991b1b", "🤼", { players: 1800 }),
  g("sp6", "Esports", "BSL Sports", "sports", "#2e1065", "#5b21b6", "🎮", { isNew: true, players: 4100 }),
  g("sp7", "Horse Racing", "BSL Sports", "sports", "#713f12", "#b45309", "🏇", { players: 1500 }),
  g("sp8", "Boxing", "BSL Sports", "sports", "#1c1917", "#57534e", "🥊", { players: 1200 }),
];

export const CRICKET_GAMES_LIST: BSLGame[] = [
  g("cr1", "BPL T20", "BSL Cricket", "cricket", "#065f46", "#10b981", "🏏", { isHot: true, players: 5500 }),
  g("cr2", "IPL", "BSL Cricket", "cricket", "#7c0000", "#991b1b", "🏏", { isHot: true, players: 8200 }),
  g("cr3", "ICC World Cup", "BSL Cricket", "cricket", "#0c4a6e", "#1d4ed8", "🏆", { players: 6700 }),
  g("cr4", "Bangladesh vs India", "BSL Cricket", "cricket", "#166534", "#15803d", "🇧🇩", { isNew: true, players: 4200 }),
  g("cr5", "T20 World Cup", "BSL Cricket", "cricket", "#713f12", "#d97706", "🏆", { players: 5800 }),
  g("cr6", "Asia Cup", "BSL Cricket", "cricket", "#2e1065", "#5b21b6", "🏆", { players: 3900 }),
];

export const COCKFIGHTING_GAMES: BSLGame[] = [
  g("cf1", "Cockfight Derby", "SV388", "cockfighting", "#7c0000", "#991b1b", "🐓", { isHot: true, players: 3400 }),
  g("cf2", "Live Cockfight A", "SV388", "cockfighting", "#3b0011", "#6b0020", "🐓", { isHot: true, players: 2800 }),
  g("cf3", "Live Cockfight B", "SV388", "cockfighting", "#4a0019", "#7a0030", "🐓", { players: 2100 }),
  g("cf4", "Cockfight Arena", "SV388", "cockfighting", "#7c2d12", "#9a3412", "🐓", { isNew: true, players: 1900 }),
  g("cf5", "Champion Cockfight", "SV388", "cockfighting", "#713f12", "#b45309", "🐓", { players: 1600 }),
  g("cf6", "Golden Cockfight", "SV388", "cockfighting", "#713f12", "#d97706", "🐓", { players: 1200 }),
];

export const FEATURED_GAMES: BSLGame[] = [
  g("feat-1", "Mega Wheel", "Pragmatic Play", "casino", "#1e1b4b", "#4c1d95", "🎡", { isFeatured: true }),
  g("feat-2", "High Flyer", "Pragmatic Play", "crash", "#0c4a6e", "#0369a1", "🛩️", { isFeatured: true }),
  g("feat-3", "Gates of Olympus", "Pragmatic Play", "slots", "#2e1065", "#5b21b6", "⚡", { isFeatured: true }),
  g("feat-4", "Crazy Time", "Evolution", "casino", "#7c0000", "#991b1b", "🎪", { isFeatured: true }),
];

export const SPORTS_EVENTS = [
  { id: "se1", league: "Bangladesh Premier League", sport: "Cricket", team1: "Dhaka Dominators", team2: "Chattogram Challengers", odds: [1.85, 3.4, 2.1] as number[], status: "live" as const, minute: "18.4 overs" },
  { id: "se2", league: "BPL T20", sport: "Cricket", team1: "Sylhet Strikers", team2: "Khulna Tigers", odds: [2.1, 4.2, 1.75] as number[], status: "upcoming" as const },
  { id: "se3", league: "Premier League", sport: "Football", team1: "Sheikh Jamal DC", team2: "Bashundhara Kings", odds: [2.4, 3.1, 2.9] as number[], status: "live" as const, minute: "67'" },
  { id: "se4", league: "IPL", sport: "Cricket", team1: "Mumbai Indians", team2: "Chennai Super Kings", odds: [1.95, 3.8, 1.9] as number[], status: "upcoming" as const },
];

export const PROMOTIONS = [
  { id: "welcome-bonus",    title: "100% Welcome Bonus",       subtitle: "Double your first deposit up to ৳10,000",          badge: "New Member",  emoji: "🎁", gradient: ["#008d5b", "#006640"] as [string, string], minDeposit: 500,  maxBonus: 10000, wagering: 10, validity: "7 days" },
  { id: "sports-cashback",  title: "5% Daily Sports Cashback", subtitle: "Get cashback on all sports losses daily",           badge: "Sports",      emoji: "⚽", gradient: ["#065f46", "#0d9488"] as [string, string], minDeposit: 500,  maxBonus: 5000,  wagering: 3,  validity: "Daily" },
  { id: "slots-bonus",      title: "Free Spins Bonanza",       subtitle: "50 free spins daily on selected JILI slots",        badge: "Slots",       emoji: "🎰", gradient: ["#1e1b4b", "#4c1d95"] as [string, string], minDeposit: 200,  maxBonus: 2000,  wagering: 25, validity: "Daily" },
  { id: "cricket-promo",    title: "Cricket Special",          subtitle: "50% bonus on first cricket bet this season",        badge: "Cricket",     emoji: "🏏", gradient: ["#0c4a6e", "#0369a1"] as [string, string], minDeposit: 500,  maxBonus: 5000,  wagering: 8,  validity: "Season" },
  { id: "referral",         title: "Refer & Earn ৳500",        subtitle: "Earn ৳500 for every friend who deposits",           badge: "Referral",    emoji: "🤝", gradient: ["#78350f", "#b45309"] as [string, string], minDeposit: 0,    maxBonus: 99999, wagering: 0,  validity: "No Expiry" },
  { id: "vip-weekly",       title: "VIP Weekly Cashback",      subtitle: "15% cashback on weekly losses — no wagering",       badge: "VIP",         emoji: "👑", gradient: ["#713f12", "#d97706"] as [string, string], minDeposit: 1000, maxBonus: 50000, wagering: 0,  validity: "Weekly" },
  { id: "bkash-deposit",    title: "bKash Reload Bonus",       subtitle: "10% extra on every bKash deposit on Fridays",       badge: "Deposit",     emoji: "💗", gradient: ["#7f1d1d", "#e2136e"] as [string, string], minDeposit: 500,  maxBonus: 3000,  wagering: 5,  validity: "Fridays" },
  { id: "live-casino",      title: "Live Casino Welcome",      subtitle: "200% bonus up to ৳20,000 for new casino players",   badge: "Casino",      emoji: "♠️", gradient: ["#3b0011", "#8b0033"] as [string, string], minDeposit: 1000, maxBonus: 20000, wagering: 25, validity: "7 days" },
  { id: "red-envelope",     title: "Red Envelope Rain 🧧",     subtitle: "Random cash drops during BD cricket nights",        badge: "Seasonal",    emoji: "🧧", gradient: ["#7f1d1d", "#991b1b"] as [string, string], minDeposit: 200,  maxBonus: 5000,  wagering: 5,  validity: "Event Only" },
  { id: "daily-check-in",   title: "Daily Check-In Streak",    subtitle: "Login 7 days in a row and claim ৳500 super reward", badge: "Daily",       emoji: "📅", gradient: ["#0f172a", "#1e3a5f"] as [string, string], minDeposit: 0,    maxBonus: 500,   wagering: 5,  validity: "Ongoing" },
  { id: "lucky-spin",       title: "Lucky Spin Wheel",         subtitle: "Spin daily for cash, free bets and bonus funds",    badge: "Bonus",       emoji: "🎡", gradient: ["#4c0519", "#9f1239"] as [string, string], minDeposit: 0,    maxBonus: 2000,  wagering: 10, validity: "Daily" },
  { id: "new-game-launch",  title: "New Game Launch Bonus",    subtitle: "50 free spins on every new game launch",            badge: "New Game",    emoji: "🆕", gradient: ["#042f2e", "#115e59"] as [string, string], minDeposit: 500,  maxBonus: 1000,  wagering: 20, validity: "Launch Only" },
];


export const PROVIDERS = [
  { name: "PRAGMATIC PLAY", emoji: "🎯" },
  { name: "JILI", emoji: "🎰" },
  { name: "EVOLUTION", emoji: "🃏" },
  { name: "AE SEXY", emoji: "💃" },
  { name: "PG SOFT", emoji: "🎮" },
  { name: "SPADE GAMING", emoji: "♠️" },
  { name: "JDB", emoji: "🎲" },
  { name: "SV388", emoji: "🐓" },
];

export const PAYMENT_OPTIONS = [
  { id: "bkash", name: "bKash", emoji: "💗", fee: "Free", time: "Instant" },
  { id: "nagad", name: "Nagad", emoji: "🟠", fee: "Free", time: "Instant" },
  { id: "rocket", name: "Rocket", emoji: "🚀", fee: "Free", time: "Instant" },
  { id: "upay", name: "Upay", emoji: "🟡", fee: "Free", time: "Instant" },
  { id: "bank", name: "BD Bank Transfer", emoji: "🏦", fee: "Free", time: "1–3 hrs" },
];

export const ALL_GAMES: BSLGame[] = [
  ...POPULAR_GAMES,
  ...SLOTS_GAMES,
  ...CASINO_GAMES,
  ...FISHING_GAMES,
  ...ARCADE_GAMES,
  ...LOTTERY_GAMES,
  ...CRASH_GAMES,
  ...TABLE_GAMES,
  ...SPORTS_GAMES_LIST,
  ...CRICKET_GAMES_LIST,
  ...COCKFIGHTING_GAMES,
];

export const PUBLIC_LINKS = [
  { title: "Download App", href: "/download", description: "Install the BSL Gaming PWA-style app shell on mobile or desktop.", emoji: "⬇️" },
  { title: "Affiliate", href: "/affiliate", description: "Commission tiers, referral tracking cards and media-kit UI.", emoji: "🤝" },
  { title: "Ambassador", href: "/ambassador", description: "Creator program landing page with application states.", emoji: "⭐" },
  { title: "Leaderboard", href: "/leaderboard", description: "Daily winners, VIP race and sports leaderboard UI.", emoji: "🏆" },
  { title: "Help Page", href: "/help", description: "Support center, FAQs, contact routes and responsible gaming links.", emoji: "ℹ️" },
];
