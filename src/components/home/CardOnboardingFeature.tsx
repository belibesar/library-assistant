import { CardOnboardingFeatureProps } from "@/libs/types";

export default function CardOnboardingFeature({
  icon,
  cardTitle,
  description,
}: CardOnboardingFeatureProps) {
  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:duration-200"></div>

      {/* Main card */}
      <div className="relative transform overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Floating dots decoration */}
        <div className="absolute top-4 right-4 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Icon with enhanced styling */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rotate-6 transform rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 transition-transform duration-300 group-hover:rotate-12"></div>
            <div className="relative transform rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-blue-800">
            {cardTitle}
          </h3>

          {/* Description */}
          <p className="leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
            {description}
          </p>

          {/* Animated arrow indicator */}
          <div className="mt-6 flex translate-x-0 transform items-center text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
            <span className="mr-2 text-sm font-medium">Learn More</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
