"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

function sendJSON(url: string, data: unknown) {
  const body = JSON.stringify(data);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
}

export function ProductionTelemetry() {
  useReportWebVitals((metric) => {
    sendJSON("/api/analytics/web-vitals", {
      ...metric,
      path: window.location.pathname,
      timestamp: Date.now(),
    });
  });

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      sendJSON("/api/client-events", {
        type: "error",
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        path: window.location.pathname,
        timestamp: Date.now(),
      });
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      sendJSON("/api/client-events", {
        type: "unhandledrejection",
        message: event.reason instanceof Error ? event.reason.message : String(event.reason),
        path: window.location.pathname,
        timestamp: Date.now(),
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
