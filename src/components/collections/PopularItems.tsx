import { LibraryItemType } from "@/libs/types/libraryType";
import { TrendingUp, Eye } from "lucide-react";

interface PopularItem {
  id: string;
  title: string;
  views: number;
  borrowed: number;
  type: LibraryItemType;
}

interface PopularItemsProps {
  popularItems: PopularItem[];
}

export const PopularItems = ({ popularItems }: PopularItemsProps) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Item Terpopuler</h3>
      <TrendingUp className="h-5 w-5 text-gray-400" />
    </div>
    <div className="space-y-3">
      {popularItems.length > 0 ? (
        popularItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-800"
                    : index === 1
                      ? "bg-gray-100 text-gray-800"
                      : "bg-orange-100 text-orange-800"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.borrowed} dipinjam
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Eye className="h-4 w-4" />
              <span>{item.views}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="py-4 text-center text-sm text-gray-500">
          Belum ada data populer
        </p>
      )}
    </div>
  </div>
);
