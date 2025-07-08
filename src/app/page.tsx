import Hero from "@/components/Hero";
import CardsGroupFeature from "@/sections/CardGroupOnboarding";
import Divider from "@/sections/Divider";
import StatsSection from "@/sections/StatsSection";
import React from "react";

// Onboarding Page
export default function OnboardingPage() {
  return (
    <div className="">
      <Hero
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
