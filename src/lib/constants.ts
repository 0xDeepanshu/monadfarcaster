
const APP_URL = process.env.NEXT_PUBLIC_URL;

if (!APP_URL) {
  throw new Error('NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL is not set');
}


export const LEADERBOARD_CONTRACT_ADDRESS = "0x4EF8d444CF8456220d4c0A49bd9Ae0E3cA7f492D";
export { APP_URL };
