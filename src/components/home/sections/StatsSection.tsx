export default function StatsSection() {
  const stats = [
    {
      number: "10,000+",
      label: "Koleksi Buku",
      icon: "📚",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      number: "5,000+",
      label: "Pengguna Aktif",
      icon: "👥",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: "⚡",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/10 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-500"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2 shadow-lg backdrop-blur-md">
              <span className="text-sm font-medium text-white/90">
                📊 Statistik Platform
              </span>
            </div>
          </div>

          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Dipercaya oleh{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ribuan
            </span>{" "}
            Pengguna
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-blue-100/80">
            Platform perpustakaan AI terdepan dengan performa dan kepercayaan
            tinggi
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
    
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="relative transform rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent"></div>

                <div className="mb-4 transform text-4xl transition-transform duration-300 group-hover:scale-110">
                  {stat.icon}
                </div>

                <div
                  className={`mb-3 bg-gradient-to-r text-5xl font-black md:text-6xl ${stat.gradient} transform bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`}
                >
                  {stat.number}
                </div>

                <div className="text-xl font-medium text-blue-100/90 transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </div>

                <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} origin-left scale-x-0 transform rounded-full transition-transform delay-300 duration-1000 group-hover:scale-x-100`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-200/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            <span className="text-sm">Data diperbarui secara real-time</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
