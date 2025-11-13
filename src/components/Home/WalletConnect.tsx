"use client"
import { useState, useEffect, useCallback } from 'react'
import { useFrame } from '@/components/farcaster-provider'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { parseEther } from 'viem'
import { monadTestnet } from 'viem/chains'
import { wrapFetchWithPayment } from "x402-fetch";
import { config } from '../wallet-provider'
import { getWalletClient } from "wagmi/actions";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi'
import { log } from 'console'

// 


export function WalletActions() {
  const { isEthProviderAvailable } = useFrame()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { connect } = useConnect()


  if (isConnected) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <div className="flex flex-row space-x-4 justify-start items-start">
          <div className="flex flex-col space-y-4 justify-start">
            <p className="text-sm text-left">
              Connected to wallet: <span className="bg-white font-mono text-black rounded-md p-[4px]">{address}</span>
            </p>
            <p className="text-sm text-left">
              Chain Id: <span className="bg-white font-mono text-black rounded-md p-[4px]">{chainId}</span>
            </p>
            {chainId === monadTestnet.id ? (
              <div className="flex flex-col space-y-2 border border-[#333] p-4 rounded-md">
                <h2 className="text-lg font-semibold text-left">Send Transaction Example</h2>
              </div>
            ) : (
              <button
                type="button"
                className="bg-white text-black rounded-md p-2 text-sm"
                onClick={() => switchChain({ chainId: monadTestnet.id })}
              >
                Switch to Monad Testnet
              </button>
            )}

            <button type="button" className="bg-white text-black rounded-md p-2 text-sm" onClick={() => disconnect()}>
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isEthProviderAvailable) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
        <div className="flex flex-row space-x-4 justify-start items-start">
          <button
            type="button"
            className="bg-white text-black w-full rounded-md p-2 text-sm"
            onClick={() => connect({ connector: miniAppConnector() })}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }
}

export function X402 () {
      const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");


    const handleProtectedAction = useCallback(async () => {
    // if (!isConnected) {
    //   setMessage("Please connect your wallet first");
    //   return;
    // }

    setIsLoading(true);
    setMessage("");

    const walletClient = await getWalletClient(config);
console.log(walletClient);

    if (!walletClient) {
      setMessage("Wallet client not available");
      return;
    }

    // For x402-fetch, we need to pass the wallet client's account
    const fetchWithPayment = wrapFetchWithPayment(
      fetch,
      walletClient as unknown as Parameters<typeof wrapFetchWithPayment>[1]
    );
    
    try {
      const response = await fetchWithPayment("/api/protected", {
        method: "GET",
        
      });
     console.log("after protected call");
     
      console.log(response);
      
      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(`Success! Response: ${JSON.stringify(data)}`);
      console.log(data);
      
    } catch (error) {
      console.error("Error calling protected API:", error);
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  }, [ config]);
  return(
    <>
    <button onClick={handleProtectedAction}>
        check it
    </button>
    </>
  )
}