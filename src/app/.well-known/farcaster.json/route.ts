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
      splashBackgroundColor: "#ffffff",
    },
  };

  return NextResponse.json(farcasterConfig);
}
