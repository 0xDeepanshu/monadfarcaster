import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    
  "accountAssociation": {
    "header": "eyJmaWQiOjEzNzUzNjIsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg4RDdiQzIxMDM2ZkZCQkU3NjQ3MEM1Yjk4QTFhNDBkOTI5M0E2NjAyIn0",
    "payload": "eyJkb21haW4iOiJzdGFja21vbi54eXoifQ",
    "signature": "sjDwsfcepVw2mqiEcBzdpkd6JcAtF/kkxnSeW//hoHFVs3Abr+PtKTEdzWdoeQqOq0yUl5m7oz7nu3k5JhDQlxw="
  },

    "miniapp": {
      version: "1",
      name: "Stackmon",
      iconUrl: `${APP_URL}/images/meta.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/icon.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "game", "x402"],
      primaryCategory: 'games',
      buttonTitle: "Launch ",
      splashImageUrl: `${APP_URL}/images/splash.png`,
       heroImageUrl: `${APP_URL}/images/hero.png`,
      splashBackgroundColor: "#000000",
      subtitle: "play and stack",
      description: "StackMon is a fast, addictive tile-stacking game where perfect drops earn tokens. Build the tallest tower, beat your high score, and unlock rewards."
    },
    
  };

  return NextResponse.json(farcasterConfig);
}
