"use client";

import { useReadContract } from "wagmi";
import { X, Trophy, Loader2 } from "lucide-react";
import leaderboardAbi from "@/app/abi/leaderboard.json";
import { LEADERBOARD_CONTRACT_ADDRESS } from "@/lib/constants";
import { formatAddress } from "@/lib/utils"; // Assuming a utility exists, else I'll inline it or create it.

interface LeaderboardProps {
    onClose: () => void;
}

interface Player {
    wallet: string;
    score: bigint;
}

export default function Leaderboard({ onClose }: LeaderboardProps) {
    const { data: players, isLoading, isError } = useReadContract({
        address: LEADERBOARD_CONTRACT_ADDRESS as `0x${string}`,
        abi: leaderboardAbi,
        functionName: "getTopPlayers",
        args: [BigInt(10)], // Fetch top 10
    });

    const formatAddr = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-[#1a0f2e] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-purple-900/50 to-[#1a0f2e] border-b border-purple-500/20 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <Trophy className="text-yellow-400" size={24} />
                        <h2 className="text-2xl font-bold text-white tracking-wide">
                            Leaderboard
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="text-white/70" size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <Loader2 className="animate-spin text-purple-400" size={32} />
                            <p className="text-purple-200/60 text-sm">Loading scores...</p>
                        </div>
                    ) : isError ? (
                        <div className="text-center py-12 text-red-400 bg-red-900/10 rounded-xl border border-red-500/20">
                            <p>Failed to load leaderboard.</p>
                        </div>
                    ) : !players || (players as Player[]).length === 0 ? (
                        <div className="text-center py-12 text-purple-200/40 italic">
                            No scores yet. Be the first!
                        </div>
                    ) : (
                        (players as Player[]).map((player, index) => (
                            <div
                                key={player.wallet}
                                className={`flex items-center justify-between p-4 rounded-xl border ${index === 0
                                        ? "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30"
                                        : index === 1
                                            ? "bg-gradient-to-r from-slate-400/10 to-transparent border-slate-400/30"
                                            : index === 2
                                                ? "bg-gradient-to-r from-orange-400/10 to-transparent border-orange-400/30"
                                                : "bg-white/5 border-purple-500/10"
                                    } hover:bg-white/10 transition-colors`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${index === 0
                                                ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                                : index === 1
                                                    ? "bg-slate-400 text-black"
                                                    : index === 2
                                                        ? "bg-orange-400 text-black"
                                                        : "bg-purple-900/50 text-purple-200"
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium font-mono">
                                            {formatAddr(player.wallet)}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-purple-200 font-bold font-mono text-lg">
                                    {player.score.toString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
