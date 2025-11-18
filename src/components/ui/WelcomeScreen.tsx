"use client"
import UnityPlayer from "../unity/UnitySelect"
import { useState } from "react"
import { Play } from "lucide-react"
import CharacterCard from "./CharacterCard"
import WalletConnect from "./WalletConnect"
import Link from "next/link"
export default function WelcomeScreen() {
  const [currentPage, setCurrentPage] = useState(0)

  const handlePlayClick = () => {
    console.log("Play button clicked")
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#1a0f2e] via-[#2d1b4e] to-[#1a0f2e] flex flex-col items-center justify-between px-4 py-8 pb-14 italic">

      {/* Top bar */}
      <div className="relative z-10 w-full max-w-sm flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-primary font-sans text-purple-200">
          <img
          src="/images/stackmon/text.png"
          alt="GameHub Mascot"
          className="w-40 h-full object-contain drop-shadow-2xl rounded-3xl"
        />
        </h1>
        <WalletConnect />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        {/* Character card */}
        <div className="w-full">
          <CharacterCard />
        </div>

        {/* Welcome text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground text-balance">Welcome, Stackmon Player</h2>
          <p className="text-secondary text-sm font-medium"></p>
        </div>

        {/* Play button */}
         <Link
      href="/play"
      className="bg-purple-200 relative group w-full max-w-xs py-4 px-8 bg-gradient-to-r from-primary to-secondary 
                 rounded-2xl flex items-center justify-center gap-3 font-bold text-primary-foreground 
                 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
    >
      <Play size={24} className="fill-black" />
      <span className="text-lg text-black">Play</span>
    </Link>

      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
