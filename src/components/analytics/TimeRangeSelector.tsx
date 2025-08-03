"use client";

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
}

export default function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: TimeRangeSelectorProps) {
  const ranges = [
    { value: "day", label: "Hari Ini" },
    { value: "week", label: "Minggu Ini" },
    { value: "month", label: "Bulan Ini" },
    { value: "year", label: "Tahun Ini" },
  ];

  return (
    <div className="mb-6 flex w-fit rounded-lg bg-gray-50 p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => setTimeRange(range.value)}
          className={`rounded-md px-4 py-2 text-sm transition-colors ${
            timeRange === range.value
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
