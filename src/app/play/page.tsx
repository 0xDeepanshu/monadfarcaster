import ClaimTokenMount from "@/components/Home/ClaimToken";
import UnityPlayer from "@/components/unity/UnitySelect";
export default function PlayPage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ClaimTokenMount />
      <UnityPlayer />
    </div>
  );
}
