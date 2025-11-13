import Image from "next/image";
import Main from "@/components/Home/Index";
import { X402 } from "@/components/Home/WalletConnect";
import { APP_URL } from '@/lib/constants'
import type { Metadata } from 'next'
const miniapp = {
  version: 'next',
  imageUrl: `${APP_URL}/images/icon.png`,
  button: {
    title: 'Launch Template',
    action: {
      type: 'launch_miniapp',
      name: 'stackmon',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/meta.png`,
      splashBackgroundColor: '#f7f7f7',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'stackmon mini app ',
    openGraph: {
      title: 'Stackmon MiniApp ',
      description: 'A Rupture Labs gaming formation',
    },
    other: {
      'fc:miniapp': JSON.stringify(miniapp),
    },
  }
}

export default function Home() {
  return (
    <>
    <Main />
    {/* <X402/> */}
    </>
  );
}
