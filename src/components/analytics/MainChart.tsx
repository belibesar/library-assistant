"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface MainChartProps {
  timeRange: string;
}

export default function MainChart({ timeRange }: MainChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Generate labels and data based on time range
    const getChartData = (range: string) => {
      switch (range) {
        case "day": {
          const labels = Array.from({ length: 24 }, (_, i) =>
            i === 0 ? "00:00" : `${i.toString().padStart(2, "0")}:00`,
          );
          // Pola kunjungan harian: rendah di malam, tinggi di siang
          const basePattern = [
            2, 1, 1, 1, 2, 4, 8, 12, 15, 18, 22, 25, 28, 30, 28, 25, 22, 18, 15,
            12, 8, 6, 4, 3,
          ];
          const data = basePattern.map(
            (base) => base + Math.floor(Math.random() * 5),
          );
          return { labels, data };
        }

        case "week": {
          const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
          // Pola kunjungan mingguan: tinggi di weekdays, rendah di weekend
          const basePattern = [180, 200, 190, 210, 170, 120, 100];
          const data = basePattern.map(
            (base) => base + Math.floor(Math.random() * 50 - 25),
          );
          return { labels, data };
        }

        case "month": {
          const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
          // Pola kunjungan bulanan dengan tren naik-turun
          const data = labels.map((_, i) => {
            const baseValue = 150 + Math.sin(i / 5) * 50; // Pola gelombang
            return Math.floor(baseValue + Math.random() * 80 - 40);
          });
          return { labels, data };
        }

        case "year": {
          const labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Ags",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ];
          // Pola kunjungan tahunan: tinggi di awal/akhir tahun
          const basePattern = [
            4200, 3800, 4100, 3900, 4300, 3700, 3500, 3600, 4000, 4200, 4500,
            4800,
          ];
          const data = basePattern.map(
            (base) => base + Math.floor(Math.random() * 800 - 400),
          );
          return { labels, data };
        }

        default:
          return getChartData("week");
      }
    };

    const { labels, data } = getChartData(timeRange);

    // Get chart configuration based on time range
    const getChartConfig = (range: string) => {
      const configs = {
        day: {
          stepSize: 5,
          maxTicksLimit: 12,
          displayFormats: { hour: "HH:mm" },
        },
        week: {
          stepSize: 20,
          maxTicksLimit: 7,
          displayFormats: { day: "ddd" },
        },
        month: {
          stepSize: 50,
          maxTicksLimit: 15,
          displayFormats: { day: "DD" },
        },
        year: {
          stepSize: 500,
          maxTicksLimit: 12,
          displayFormats: { month: "MMM" },
        },
      };
      return configs[range as keyof typeof configs] || configs.week;
    };

    const config = getChartConfig(timeRange);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Jumlah Kunjungan",
            data,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 2,
            pointRadius: timeRange === "month" ? 2 : 4, // Smaller points for month view
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
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
              title: function (context) {
                const label = context[0].label;
                switch (timeRange) {
                  case "day":
                    return `Jam ${label}`;
                  case "week":
                    return `Hari ${label}`;
                  case "month":
                    return `Tanggal ${label}`;
                  case "year":
                    return `Bulan ${label}`;
                  default:
                    return label;
                }
              },
              label: function (context) {
                const value = context.parsed.y;
                return `Kunjungan: ${value.toLocaleString()}`;
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
              color: "#64748b",
              maxTicksLimit: config.maxTicksLimit,
              font: {
                size: 11,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e2e8f0",
            },
            ticks: {
              color: "#64748b",
              stepSize: config.stepSize,
              callback: function (value) {
                // Format numbers with K for thousands
                if (typeof value === "number") {
                  if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                  }
                  return value.toString();
                }
                return value;
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [timeRange]);

  return (
    <div className="h-80">
      <canvas ref={chartRef} />
    </div>
  );
}
