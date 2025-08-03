import { useState } from "react";
import { Book, AlertCircle, CheckCircle } from "lucide-react";
import ToggleSwitch from "../forms/ToggleSwitch";
import FormInput from "../forms/FormInput";

interface Borrowing {
  id: number;
  title: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: "active" | "overdue";
  fine?: number;
  canRenew: boolean;
}

const BorrowingSettings = () => {
  const [borrowingSettings, setBorrowingSettings] = useState({
    maxBooks: 5,
    borrowDuration: 14,
    renewalLimit: 2,
    finePerDay: 1000,
    reservationDuration: 3,
    autoRenewal: true,
    emailReminder: true,
    smsReminder: false,
  });

  const currentBorrowings: Borrowing[] = [
    {
      id: 1,
      title: "Algoritma dan Struktur Data",
      author: "Thomas H. Cormen",
      borrowDate: "2024-01-15",
      dueDate: "2024-01-29",
      status: "active",
      canRenew: true,
    },
    {
      id: 2,
      title: "Machine Learning for Dummies",
      author: "John Paul Mueller",
      borrowDate: "2024-01-10",
      dueDate: "2024-01-24",
      status: "overdue",
      fine: 5000,
      canRenew: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current Borrowings */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Peminjaman Aktif
        </h3>
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {currentBorrowings.map((book) => (
            <div key={book.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {book.title}
                  </h4>
                  <p className="text-sm text-gray-500">oleh {book.author}</p>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>Dipinjam: {book.borrowDate}</span>
                    <span>Jatuh Tempo: {book.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {book.status === "overdue" && (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      <span className="text-xs">Terlambat</span>
                      <span className="ml-2 text-xs font-medium">
                        Denda: Rp{book.fine?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {book.status === "active" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      <span className="text-xs">Aktif</span>
                    </div>
                  )}
                  {book.canRenew && (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                      Perpanjang
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Borrowing Preferences */}
      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Preferensi Peminjaman
        </h3>

        <div className="space-y-4">
          <ToggleSwitch
            label="Perpanjangan Otomatis"
            description="Perpanjang otomatis buku yang akan jatuh tempo (jika memungkinkan)"
            checked={borrowingSettings.autoRenewal}
            onChange={(checked) =>
              setBorrowingSettings({
                ...borrowingSettings,
                autoRenewal: checked,
              })
            }
          />

          <ToggleSwitch
            label="Pengingat Email"
            description="Kirim pengingat email 3 hari sebelum jatuh tempo"
            checked={borrowingSettings.emailReminder}
            onChange={(checked) =>
              setBorrowingSettings({
                ...borrowingSettings,
                emailReminder: checked,
              })
            }
          />

          <ToggleSwitch
            label="Pengingat SMS"
            description="Kirim pengingat SMS 1 hari sebelum jatuh tempo"
            checked={borrowingSettings.smsReminder}
            onChange={(checked) =>
              setBorrowingSettings({
                ...borrowingSettings,
                smsReminder: checked,
              })
            }
          />
        </div>
      </div>

      {/* Borrowing Limits (Admin Only) */}
      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Pengaturan Sistem (Admin)
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label="Maksimal Peminjaman"
            type="number"
            value={borrowingSettings.maxBooks.toString()}
            onChange={(e) =>
              setBorrowingSettings({
                ...borrowingSettings,
                maxBooks: parseInt(e.target.value),
              })
            }
          />
          <FormInput
            label="Durasi Peminjaman (hari)"
            type="number"
            value={borrowingSettings.borrowDuration.toString()}
            onChange={(e) =>
              setBorrowingSettings({
                ...borrowingSettings,
                borrowDuration: parseInt(e.target.value),
              })
            }
          />
          <FormInput
            label="Limit Perpanjangan"
            type="number"
            value={borrowingSettings.renewalLimit.toString()}
            onChange={(e) =>
              setBorrowingSettings({
                ...borrowingSettings,
                renewalLimit: parseInt(e.target.value),
              })
            }
          />
          <FormInput
            label="Denda per Hari (Rupiah)"
            type="number"
            value={borrowingSettings.finePerDay.toString()}
            onChange={(e) =>
              setBorrowingSettings({
                ...borrowingSettings,
                finePerDay: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowingSettings;
