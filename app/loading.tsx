"use client";
import ThunderAnimation from "@/components/animation/thundar";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ThunderAnimation size={150} animated={true} speed={1} />
    </div>
  );
}
