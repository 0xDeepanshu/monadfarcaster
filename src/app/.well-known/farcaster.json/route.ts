import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    "accountAssociation": {
    "header": "eyJmaWQiOjEzNzUzNjIsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg4RDdiQzIxMDM2ZkZCQkU3NjQ3MEM1Yjk4QTFhNDBkOTI5M0E2NjAyIn0",
    "payload": "eyJkb21haW4iOiJzdGFja21vbi54eXoifQ",
    "signature": "+Z/sjDwsfcepVw2mqiEcBzdpkd6JcAtF="
  },
    "miniapp": {
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
       heroImageUrl: `${APP_URL}/images/hero.png`,
      splashBackgroundColor: "#000000",
      subtitle: "play and stack",
      description: "StackMon is a fast, addictive tile-stacking game where every perfect drop brings you closer to earning tokens. Build the tallest tower you can, beat your high score, and claim rewards based on skill — not luck."
    },
    
  };

  return NextResponse.json(farcasterConfig);
}
