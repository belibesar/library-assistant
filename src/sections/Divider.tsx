import { DividerElements } from "@/libs/types";

export default function Divider({ headerTitle, paragraph }: DividerElements) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            {headerTitle}
          </h2>
          <p className="text-lg text-gray-600">{paragraph}</p>
        </div>
      </div>
    </section>
  );
}
