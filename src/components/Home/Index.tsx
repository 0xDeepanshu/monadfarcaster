"use client"
import { WalletActions } from "@/components/Home/WalletConnect"
import WelcomeScreen from "../ui/WelcomeScreen"
import { useFrame } from '@/components/farcaster-provider'
import { SafeAreaContainer } from "../safe-area-container"
function Main() {
     const { context, isLoading, isSDKLoaded } = useFrame()
    if (isLoading) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center">Loading...</h1>
        </div>
      </SafeAreaContainer>
    )
  }

  if (!isSDKLoaded) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center">
            No farcaster SDK found, please use this miniapp in the farcaster app
          </h1>
        </div>
      </SafeAreaContainer>
    )
  }
     return (
    <div className="min-h-screen h-full w-full">
        <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        {/* <WalletActions /> */}
        <WelcomeScreen />
        </SafeAreaContainer>
    </div>
  )
}

export default Main