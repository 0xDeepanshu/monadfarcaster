import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add your own account association
    frame: {
      version: "1",
      name: "Stackmon",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/meta.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "game", "x402"],
      primaryCategory: "game with Gx402",
      buttonTitle: "Launch ",
      splashImageUrl: `${APP_URL}/images/icon.png`,
      splashBackgroundColor: "#000000",
      subtitle: "play and stack",
      description: "StackMon is a fast, addictive tile-stacking game where every perfect drop brings you closer to earning tokens. Build the tallest tower you can, beat your high score, and claim rewards based on skill — not luck."
    },
    accountAssociation: {
    header: "eyJmaWQiOjEzNzUzNjIsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg4RDdiQzIxMDM2ZkZCQkU3NjQ3MEM1Yjk4QTFhNDBkOTI5M0E2NjAyIn0",
    payload: "eyJkb21haW4iOiJ3d3cuc3RhY2ttb24ueHl6In0",
    signature: "8UjnwjtndgOMnhdUhSqumbHhXI35iaCpFcKhXPwkw494nNBWWQc1NjfH1H/Z0M5bQawqgaxpNMJ4TKv4IvJmDxs="
  }
  };

  return NextResponse.json(farcasterConfig);
}
