"use client";

import { useState, useMemo } from "react";
import { BookOpen, FileText, GraduationCap, Plus, Users2 } from "lucide-react";
import {
  LibraryItem,
  LibraryItemType,
  Notification,
} from "@/libs/types/libraryType";
import { useLibraryItems } from "@/hooks/useLibraryItems";
import { useAuth } from "@/contexts/AuthContext";
import { LibraryFormModal } from "@/components/library/LibraryFormModal";
import { LibraryDetailModal } from "@/components/library/LibraryDetailModal";
import { LibraryNotification } from "@/components/library/LibraryNotification";
import { LibraryPagination } from "@/components/library/LibraryPagination";
import LibrarySkeletonLoading from "@/components/library/LibrarySkeletonLoading";
import { StatCard } from "./StatsCard";
import { CategorySelector } from "./CategorySelectior";
import { SearchAndActions } from "./SearchAndActions";
import { PopularItems } from "./PopularItems";
import { ItemsList } from "./ItemList";
import { RecentActivity } from "./RecentActivity";

export default function Collections() {
  const {
    search,
    category,
    items,
    page,
    total,
    loading,
    notification,
    totalPages,
    setCategory,
    handleSearchChange,
    handleCategoryChange,
    handlePrev,
    handleNext,
    fetchItems,
    showNotification,
  } = useLibraryItems();

  const [selectedViewMode, setSelectedViewMode] = useState<
    "overview" | LibraryItemType
  >("overview");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const { role } = useAuth();

  // Calculate statistics from actual data
  const stats = useMemo(() => {
    const books = items.filter((item) => item.type === "book");
    const journals = items.filter((item) => item.type === "journal");
    const thesis = items.filter((item) => item.type === "skripsi");

    const totalBorrowed = items.reduce(
      (sum, item) => sum + (item.dipinjam || 0),
      0,
    );
    const totalAvailable = items.reduce(
      (sum, item) => sum + (item.tersedia || 0),
      0,
    );

    const monthlyViews = 2340;

    const popularItems = [...items]
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, 3)
      .map((item, index) => ({
        id: item.id,
        title: item.judul,
        views: item.count || 0,
        borrowed: item.dipinjam || 0,
        type: item.type,
      }));

    const recentActivity = [
      { type: "book", title: "Buku baru ditambahkan", time: "2 jam yang lalu" },
      { type: "journal", title: "Jurnal diperbarui", time: "4 jam yang lalu" },
      {
        type: "skripsi",
        title: "Skripsi baru disubmit",
        time: "1 hari yang lalu",
      },
    ];

    return {
      totalBooks: books.length,
      totalJournals: journals.length,
      totalThesis: thesis.length,
      totalBorrowed,
      totalAvailable,
      monthlyViews,
      popularItems,
      recentActivity,
    };
  }, [items]);

  const handleCategorySelect = (newCategory: "overview" | LibraryItemType) => {
    setSelectedViewMode(newCategory);
    if (newCategory !== "overview") {
      setCategory(newCategory);
    }
  };

  const handleOpenFormModal = (itemType: LibraryItemType) => {
    setCategory(itemType);
    setSelectedViewMode(itemType);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const handleEditItem = (item: LibraryItem) => {
    setSelectedItem(item);
    setIsFormModalOpen(true);
    setIsEditMode(true);
    setCategory(item.type);
  };

  const handleViewDetail = async (item: LibraryItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleAddItem = async (item: LibraryItem) => {
    try {
      if (isEditMode) {
        await fetch(`/api/library/${item.type}/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        showNotification("success", "error");
      } else {
        await fetch(`/api/library/${item.type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        showNotification("success", "error");
      }
      setIsFormModalOpen(false);
      fetchItems();
    } catch (error) {
      showNotification("error", "error");
    }
  };

  const handleDeleteItem = async (id: string, type: LibraryItemType) => {
    try {
      await fetch(`/api/library/${type}/${id}`, {
        method: "DELETE",
      });
      showNotification("success", "error");
      fetchItems();
    } catch (error) {
      showNotification("error", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Koleksi Perpustakaan
      </h1>
      <p className="mb-8 text-gray-600">
        Kelola semua koleksi buku, jurnal, dan skripsi di perpustakaan
      </p>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          title="Total Buku"
          value={stats.totalBooks}
          color="blue"
        />
        <StatCard
          icon={FileText}
          title="Total Jurnal"
          value={stats.totalJournals}
          color="purple"
        />
        <StatCard
          icon={GraduationCap}
          title="Total Skripsi"
          value={stats.totalThesis}
          color="orange"
        />
        <StatCard
          icon={Users2}
          title="Total Dipinjam"
          value={stats.totalBorrowed}
          subtitle={`${stats.totalAvailable} tersedia`}
          color="green"
        />
      </div>

      <CategorySelector
        selectedViewMode={selectedViewMode}
        onSelect={handleCategorySelect}
        stats={stats}
      />

      <div className="my-6 flex flex-col gap-4">
        <div className="w-full lg:col-span-2">
          <SearchAndActions
            search={search}
            selectedViewMode={selectedViewMode}
            onSearchChange={handleSearchChange}
            onOpenFormModal={handleOpenFormModal}
            role={role}
          />
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <LibrarySkeletonLoading />
          ) : (
            <ItemsList
              items={items}
              selectedViewMode={selectedViewMode}
              onEditItem={handleEditItem}
              onViewDetail={handleViewDetail}
              onDeleteItem={handleDeleteItem}
              role={role}
            />
          )}
          <LibraryPagination
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      <div className="my-6 flex flex-col gap-6">
        <PopularItems popularItems={stats.popularItems} />
        <RecentActivity recentActivity={stats.recentActivity} />
      </div>

      <LibraryFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        category={category}
        isEditMode={isEditMode}
        selectedItem={selectedItem}
        onSubmit={handleAddItem}
        showNotification={showNotification}
        fetchItems={fetchItems}
      />

      <LibraryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedItem}
      />

      <LibraryNotification
        notification={notification}
        onClose={() => showNotification("","error")}
      />
    </div>
  );
}
