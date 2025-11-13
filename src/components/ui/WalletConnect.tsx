"use client"

import { useState } from "react"
import { Copy, LogOut } from "lucide-react"
import { useFrame } from "@/components/farcaster-provider"
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector"
import { monadTestnet } from "viem/chains"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { log } from "console"

export default function WalletConnect() {
  const { isEthProviderAvailable } = useFrame()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { connect } = useConnect()
  const [showWalletMenu, setShowWalletMenu] = useState(false)

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setShowWalletMenu(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setShowWalletMenu(false)
  }

  const handleConnect = () => {
    if (isEthProviderAvailable) {
      connect({ connector: miniAppConnector() })
    }
  }

  const handleSwitchChain = () => {
    if (chainId && chainId !== monadTestnet.id) {
      switchChain({ chainId: monadTestnet.id })
    }
  }
console.log(chainId);

  return (
    <div className="relative">
      {isConnected ? (
        <div
          className="flex items-center gap-2 bg-secondary/20 py-3 px-4 rounded-2xl bg-purple-200 text-black cursor-pointer"
          onClick={() => setShowWalletMenu(!showWalletMenu)}
        >
          <div className="w-2 h-2 bg-accent rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-accent truncate max-w-[100px]">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected"}
          </span>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 bg-secondary/20 py-3 px-4 rounded-2xl bg-purple-200 text-black cursor-pointer"
          onClick={handleConnect}
        >
          <div className="w-2 h-2 bg-accent rounded-full bg-black" />
          <span className="text-xs font-semibold text-accent">Connect Wallet</span>
        </div>
      )}

      {/* Wallet Menu Popup */}
      {showWalletMenu && isConnected && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="text-xs text-gray-400 mb-1">Connected Account</div>
            <div className="text-sm font-mono text-white truncate p-2 bg-gray-900 rounded mb-2">{address}</div>
            <div className="text-xs text-gray-400 mb-1">Chain</div>
            <div className="text-sm font-mono text-white truncate p-2 bg-gray-900 rounded mb-3">
              {chainId === monadTestnet.id ? "Monad Testnet" : `Chain ID: ${chainId}`}
            </div>
            {chainId !== monadTestnet.id && (
              <button
                onClick={() => {
                  handleSwitchChain()
                  setShowWalletMenu(false)
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-700 rounded-md mb-2 text-center"
              >
                Switch to Monad Testnet
              </button>
            )}
            <button
              onClick={handleCopyAddress}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-700 rounded-md"
            >
              <span>Copy Address</span>
              <Copy size={16} />
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-700 rounded-md text-red-400"
            >
              <span>Disconnect</span>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
