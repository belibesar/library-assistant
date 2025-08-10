import Hero from "@/components/home/Hero";
import ModernHero from "@/components/home/ModernHero";
import CardsGroupFeature from "@/components/home/sections/CardGroupOnboarding";
import Divider from "@/components/home/sections/Divider";
import StatsSection from "@/components/home/sections/StatsSection";
import React from "react";

// Onboarding Page
export default function OnboardingPage() {
  return (
    <div>
      <ModernHero
        heroTitle="Asisten Perpustakaan "
        span="AI"
        heroDescription="Sistem perpustakaan cerdas dengan teknologi AI untuk membantu Anda menemukan buku, mendapatkan rekomendasi,
            dan mengelola koleksi dengan mudah."
        buttonPrimary="Mulai Sekarang"
        buttonSecondary="Pelajari Lebih Lanjut"
      />
      <Divider
        headerTitle="Fitur Unggulan"
        paragraph="Teknologi AI terdepan untuk pengalaman perpustakaan yang lebih baik"
      />
      <CardsGroupFeature />
      <StatsSection />
    </div>
  );
}
