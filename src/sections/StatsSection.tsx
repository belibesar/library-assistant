export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-4xl font-bold text-blue-600">10,000+</div>
            <div className="text-lg text-gray-600">Koleksi Buku</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-green-600">5,000+</div>
            <div className="text-lg text-gray-600">Pengguna Aktif</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-purple-600">99.9%</div>
            <div className="text-lg text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
