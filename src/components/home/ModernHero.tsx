"use client";

import { HeroSectionProps } from "@/libs/types";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";

export default function ModernHero({
  heroTitle,
  heroDescription,
  buttonPrimary,
  buttonSecondary,
  span,
}: HeroSectionProps) {
  const router = useRouter();
  return (
    <div className="hero relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-[100px] md:py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl delay-1000"></div>
        <div className="absolute right-1/4 -bottom-32 h-64 w-64 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-500"></div>

        {/* Floating Books Animation */}
        <div className="absolute top-1/4 left-1/4 h-8 w-8 rotate-12 animate-bounce bg-blue-400/30 delay-300"></div>
        <div className="absolute top-1/3 right-1/3 h-6 w-6 rotate-45 animate-bounce bg-indigo-400/30 delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 h-10 w-10 -rotate-12 animate-bounce bg-purple-400/30 delay-1000"></div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center justify-center">
          {/* <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white/90 shadow-lg backdrop-blur-md">
            <span className="relative flex items-center">
              <span className="absolute -left-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
              🚀 Teknologi AI Terdepan
            </span>
          </div> */}
        </div>

        {/* Main Title */}
        <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-7xl">
          <span className="block animate-pulse bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {heroTitle}
          </span>
          <span className="block animate-pulse bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text font-extrabold text-transparent delay-300">
            {span}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed font-light text-blue-100/90 md:text-2xl">
          {heroDescription}
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col justify-center gap-6 sm:flex-row sm:gap-8">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
            <Button
              onClick={() => router.push("/login")}
              className="relative transform rounded-xl border-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
              buttonName={buttonPrimary}
            />
          </div>
          <Button
            className="transform rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl"
            buttonName={buttonSecondary}
          />
        </div>

        {/* Stats/Features Preview */}
        {/* <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
            <div className="mb-2 text-3xl">📚</div>
            <div className="mb-1 text-2xl font-bold text-white">10K+</div>
            <div className="text-sm text-blue-200">Koleksi Buku Digital</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
            <div className="mb-2 text-3xl">🤖</div>
            <div className="mb-1 text-2xl font-bold text-white">AI-Powered</div>
            <div className="text-sm text-blue-200">Rekomendasi Cerdas</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
            <div className="mb-2 text-3xl">⚡</div>
            <div className="mb-1 text-2xl font-bold text-white">Instant</div>
            <div className="text-sm text-blue-200">Pencarian Real-time</div>
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/50"></div>
        </div>
      </div>
    </div>
  );
}
