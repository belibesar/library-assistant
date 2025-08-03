"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CategoryDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Buku", "Jurnal", "Skripsi", "Laporan", "Referensi"],
        datasets: [
          {
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              "#3b82f6", // blue
              "#8b5cf6", // purple
              "#f97316", // orange
              "#10b981", // green
              "#64748b", // slate
            ],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20,
              font: {
                family: "Inter",
              },
              color: "#64748b",
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#f8fafc",
            bodyColor: "#f8fafc",
            borderColor: "#64748b",
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = typeof context.raw === "number" ? context.raw : 0;
                const total = (context.dataset.data as number[]).reduce(
                  (a, b) => a + b,
                  0,
                );

                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}% (${value})`;
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="h-64 md:h-72">
      <canvas ref={chartRef} />
    </div>
  );
}
