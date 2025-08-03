"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface VerticalBarChartProps {
  data: {
    _id: string;
    judul: string;
    count: number;
  }[];
  color: string;
}

export default function VerticalBarChart({
  data,
  color,
}: VerticalBarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) =>
          item.judul.length > 15
            ? `${item.judul.substring(0, 15)}...`
            : item.judul,
        ),
        datasets: [
          {
            data: data.map((item) => item.count),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} views`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e2e8f0",
            },
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data, color]);

  return (
    <div className="h-40">
      <canvas ref={chartRef} />
    </div>
  );
}
