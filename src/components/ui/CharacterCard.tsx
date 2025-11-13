"use client"

export default function CharacterCard() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {/* Card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl border-2 border-primary/30 backdrop-blur-md" />

      {/* Character placeholder - Using placeholder image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src="/monad.png"
          alt="GameHub Mascot"
          className="w-full h-fullobject-contain drop-shadow-2xl rounded-3xl"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-accent/30 rounded-full blur-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary/30 rounded-full blur-lg" />
    </div>
  )
}
