"use client"
import { WalletActions } from "@/components/Home/WalletConnect"
import WelcomeScreen from "../ui/WelcomeScreen"
import { useFrame } from '@/components/farcaster-provider'
import { SafeAreaContainer } from "../safe-area-container"
import { useEffect,useState } from "react"
function Main() {
     const { context, isLoading, isSDKLoaded, actions } = useFrame()
      const [requestedAdd, setRequestedAdd] = useState(false)
    useEffect(() => {
    // wait for SDK/context/actions to be available
    if (!isSDKLoaded || !context || !actions) return

    // NOTE: the correct flag in sdk.context is `context.client.added`
    // (not `capabilities`). See SDK docs for context shape.
    const alreadyAdded = Boolean(context.client?.added)

    if (alreadyAdded) {
      // If app already added, clear any local prompt flag and return
      localStorage.removeItem("miniapp_prompt_shown")
      return
    }

    // Don't prompt repeatedly across reloads
    if (localStorage.getItem("miniapp_prompt_shown") || requestedAdd) return

    setRequestedAdd(true)
    // mark that we've asked once (prevents immediate re-prompts)
    localStorage.setItem("miniapp_prompt_shown", "1")

    const doAdd = async () => {
      try {
        // Per docs: await sdk.actions.addMiniApp()
        await actions.addMiniApp()
        // resolves after the native prompt is shown; user may accept or reject
      } catch (err: any) {
        console.error("addMiniApp failed:", err)

        // Handle the documented error cases:zz
  
      }
    }

    doAdd()
  }, [isSDKLoaded, context, actions, requestedAdd])
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