// UnityBridge.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ExternalWalletCall?: (msg: string) => void;
    handleClaimToken?: () => void;

    // 🔥 Added global score storage
    unityScore?: number | null;
    setUnityScore?: (value: number | null) => void;
    getUnityScore?: () => number | null;
  }
}

export default function UnityBridge() {
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize global score ONLY once
    if (window.unityScore === undefined) {
      window.unityScore = null;

      window.setUnityScore = (value: number | null) => {
        window.unityScore = value;
        console.log("🔵 unityScore updated:", value);
      };

      window.getUnityScore = () => {
        return window.unityScore ?? null;
      };
    }

    window.ExternalWalletCall = (msg: string) => {
      console.log("✅ Message from Unity:", msg);

      let score: number | null = null;

      try {
        const data = JSON.parse(msg);

        if (typeof data === "number") {
          score = data;
        } else if (typeof data === "object" && data.score !== undefined) {
          score = Number(data.score);
        }
      } catch {
        const num = Number(msg);
        if (!isNaN(num)) score = num;
      }

      console.log("Final Score:", score);

      // ✅ FIRST: Save the score immediately
      if (typeof window.setUnityScore === "function") {
        window.setUnityScore(score);
      } else {
        window.unityScore = score;
      }

      // (Optional) redefine setUnityScore only ONCE — not inside this function
      // ❌ REMOVE your redefinition here completely.

      if (typeof window.handleClaimToken === "function") {
        console.log("Calling handleClaimToken from Unity...");
        window.handleClaimToken();
      } else {
        console.warn("⚠️ handleClaimToken not ready!");
      }
    };


    // cleanup (optional): remove the ExternalWalletCall on unmount if you want
    return () => {
      // keep globals if you prefer; if you want to remove ExternalWalletCall on unmount uncomment:
      // delete window.ExternalWalletCall;
    };
  }, []);

  // This component only sets up globals; no UI needed
  return null;
}
