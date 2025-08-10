import { DividerElements } from "@/libs/types";

export default function Divider({ headerTitle, paragraph }: DividerElements) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 h-32 w-32 rounded-full bg-blue-100 opacity-60 blur-2xl"></div>
        <div className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/3">
          <div className="h-4 w-4 rotate-45 animate-pulse bg-blue-400/20"></div>
        </div>
        <div className="absolute top-1/2 left-1/5">
          <div className="h-6 w-6 animate-bounce rounded-full bg-indigo-400/20 delay-300"></div>
        </div>
        <div className="absolute right-1/5 bottom-1/3">
          <div className="h-8 w-3 animate-pulse rounded-full bg-purple-400/20 delay-700"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Animated badge */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-2 shadow-sm">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-sm font-semibold text-transparent">
                ✨ Fitur Unggulan
              </span>
            </div>
          </div>

          {/* Main heading with gradient */}
          <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              {headerTitle}
            </span>
          </h2>

          {/* Decorative line */}
          <div className="mx-auto mb-8 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="mx-4 h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-400"></div>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-600 md:text-2xl">
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
