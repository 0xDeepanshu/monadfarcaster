"use client";

declare global {
  interface Window {
    ExternalWalletCall?: (msg: string) => void;
    handleClaimToken?: () => void;

  }
}

if (typeof window !== "undefined") {
  window.ExternalWalletCall = (msg: string) => {
    console.log("✅ Message from Unity:", msg);

    // 🔹 Optional: parse JSON from Unity
    try {
      const data = JSON.parse(msg);
      console.log("Unity sent data:", data);
    } catch {
      console.log("Raw message:", msg);
    }

    // 🔹 Safely call handleProtectedAction if it exists
    if (typeof window.handleClaimToken === "function") {
      console.log("Calling handleProtectedAction from Unity...");
      window.handleClaimToken();
    } else {
      console.warn("⚠️ handleProtectedAction not found on window yet!");
      alert("Wallet action not ready yet. Try again once wallet is connected.");
    }
  };
}

export { };
