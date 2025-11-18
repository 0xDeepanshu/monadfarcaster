"use client";
import "@/components/unity/Bridge"
import { useEffect, useRef, useState } from "react";

export default function UnityPlayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    // run only in browser
    if (typeof window === "undefined") return;

    // If unity already created (hot reload / navigation), don't re-add
    if ((window as any).createUnityInstance || (window as any).unityInstance) {
      console.log("[unity] loader already present");
      setIsReady(!!(window as any).unityInstance);
      return;
    }

    // Adjust these names to match the files in /public/unity/Build/
     const LOADER = "/unity/Build/Build.loader.js";
    const DATA = "/unity/Build/Build.data";
    const FRAMEWORK = "/unity/Build/Build.framework.js";
    const WASM = "/unity/Build/Build.wasm";

    const script = document.createElement("script");
    script.src = LOADER;
    script.async = true;

    script.onload = () => {
      console.log("[unity] loader script loaded");
      const createUnityInstance = (window as any).createUnityInstance;
      if (!createUnityInstance) {
        console.error("[unity] createUnityInstance not found. Check loader file.");
        return;
      }

      // createUnityInstance(canvas, buildConfig, progressCallback)
      createUnityInstance(canvasRef.current, {
        dataUrl: DATA,
        frameworkUrl: FRAMEWORK,
        codeUrl: WASM,
        streamingAssetsUrl: "/unity/StreamingAssets",
        companyName: "Company",
        productName: "Product",
        productVersion: "1.0",
      }, (p: number) => {
        // progress callback (0 -> 1)
        setProgress(p);
        // optional: log
        // console.log("[unity] progress", p);
      }).then((instance: any) => {
        console.log("[unity] instance ready", instance);
        (window as any).unityInstance = instance; // global reference
        setIsReady(true);
        setProgress(1);
      }).catch((err: any) => {
        console.error("[unity] createUnityInstance error:", err);
      });
    };

    script.onerror = (e) => {
      console.error("[unity] failed to load loader script:", e);
    };

    document.body.appendChild(script);

    // cleanup on unmount - don't hard destroy the instance (optional)
    return () => {
      // you could call instance.Quit() here if desired
      // (window as any).unityInstance?.Quit?.();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {!isReady && (
        <button className="px-6 py-3 bg-purple-600 text-white rounded-xl">
          {progress === null ? "Loading Game..." : `Loading Game... ${(progress * 100).toFixed(0)}%`}
        </button>
      )}

      <canvas
        id="unity-canvas"
        ref={canvasRef}
        className="rounded-xl h-screen w-full mt-4 border border-gray-700"
        
      />
    </div>
  );
}
