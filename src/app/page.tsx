import Hero from "@/components/home/Hero";
import ModernHero from "@/components/home/ModernHero";
import CardsGroupFeature from "@/components/home/sections/CardGroupOnboarding";
import Divider from "@/components/home/sections/Divider";
// import StatsSection from "@/components/home/sections/StatsSection";
import React from "react";

// Onboarding Page
export default function OnboardingPage() {
  return (
    <div className="mb-6">
      <ModernHero
  heroTitle="SADHARLib "
  span="(Sanata Dharma Library Assistant)"
  heroDescription="Sistem Perpustakaan dengan Teknologi Artificial Intelligence untuk memudahkan pencarian koleksi perpustakaan dengan fitur bersinopsis, analisis pengguna, dan deteksi kemiripan."
  buttonPrimary="Mulai Sekarang"
  buttonSecondary="Pelajari Lebih Lanjut"
      />
      <Divider
        headerTitle="Fitur Unggulan"
        paragraph="Teknologi AI terdepan untuk pengalaman perpustakaan yang lebih baik"
      />
      <CardsGroupFeature />
      {/* <StatsSection /> */}
    </div>
  );
}
