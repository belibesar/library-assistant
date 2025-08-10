"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface CategoryDistributionChartProps {
  data: {
    books: number;
    journals: number;
    thesis: number;
  };
  loading?: boolean;
  error?: string;
}

export default function CategoryDistributionChart({
  data,
  loading,
  error,
}: CategoryDistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  console.log("Rendering CategoryDistributionChart with data:", data);

  useEffect(() => {
    // Destroy existing chart instance before creating new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Don't create chart if loading or no canvas ref
    if (!chartRef.current || loading) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Buku", "Jurnal", "Skripsi"],
        datasets: [
          {
            data: [data.books, data.journals, data.thesis],
            backgroundColor: [
              "#3b82f6", // blue
              "#8b5cf6", // purple
              "#f97316", // orange
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

    // Store chart instance for cleanup
    chartInstanceRef.current = chart;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data, loading]); 

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center md:h-72">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center md:h-72">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-64 md:h-72">
      <canvas ref={chartRef} />
    </div>
  );
}
