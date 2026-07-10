"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark" data-theme="dark">
      <body style={{ margin: 0, background: "#121315", color: "#f0f0f0", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <section style={{ maxWidth: 520, border: "1px solid #2a2c30", borderRadius: 20, background: "#1b1c1e", padding: 28, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}>
            <div style={{ fontSize: 56 }}>⚠️</div>
            <h1 style={{ margin: "16px 0 8px", fontSize: 28, fontWeight: 900 }}>BSL Gaming could not load</h1>
            <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>A critical application error occurred. Please try again, return home, or contact support if the problem continues.</p>
            {error.digest && <p style={{ color: "#6b7280", fontSize: 12 }}>Reference: {error.digest}</p>}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
              <button onClick={reset} style={{ border: 0, borderRadius: 10, background: "#ffdf19", color: "#241a05", padding: "12px 18px", fontWeight: 900, cursor: "pointer" }}>Reload</button>
              <Link href="/" style={{ borderRadius: 10, background: "#008d5b", color: "white", padding: "12px 18px", fontWeight: 800, textDecoration: "none" }}>Home</Link>
              <Link href="/support" style={{ borderRadius: 10, background: "#242628", color: "#f0f0f0", padding: "12px 18px", fontWeight: 800, textDecoration: "none" }}>Support</Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
