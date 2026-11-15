"use client";

import { useEffect } from "react";

const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"];

export function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!keys.some((key) => params.get(key))) return;
    const utm: Record<string, string> = {};
    for (const key of keys) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 120);
    }
    sessionStorage.setItem("vvv-utm", JSON.stringify(utm));
  }, []);

  return null;
}
