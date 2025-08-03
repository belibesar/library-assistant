import { useState } from "react";
import { Download, Database, Trash2 } from "lucide-react";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import ToggleSwitch from "../forms/ToggleSwitch";

const SystemSettings = () => {
  const [systemSettings, setSystemSettings] = useState({
    libraryName: "Perpustakaan Digital UI",
    maxBooksPerUser: 5,
    borrowDuration: 14,
    finePerDay: 1000,
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    theme: "light",
    language: "id",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Pengaturan Umum
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput
            label="Nama Perpustakaan"
            value={systemSettings.libraryName}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                libraryName: e.target.value,
              })
            }
            required
          />
          <FormSelect
            label="Bahasa Default"
            value={systemSettings.language}
            onChange={(e) =>
              setSystemSettings({ ...systemSettings, language: e.target.value })
            }
            options={[
              { value: "id", label: "Bahasa Indonesia" },
              { value: "en", label: "English" },
            ]}
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Pengaturan Peminjaman
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FormInput
            label="Maks Buku per User"
            type="number"
            value={systemSettings.maxBooksPerUser.toString()}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                maxBooksPerUser: parseInt(e.target.value || "0"),
              })
            }
          />
          <FormInput
            label="Durasi Peminjaman (hari)"
            type="number"
            value={systemSettings.borrowDuration.toString()}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                borrowDuration: parseInt(e.target.value || "0"),
              })
            }
          />
          <FormInput
            label="Denda per Hari (Rp)"
            type="number"
            value={systemSettings.finePerDay.toString()}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                finePerDay: parseInt(e.target.value || "0"),
              })
            }
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Sistem & Backup
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Mode Maintenance"
            description="Aktifkan mode maintenance untuk pemeliharaan sistem"
            checked={systemSettings.maintenanceMode}
            onChange={(checked) =>
              setSystemSettings({ ...systemSettings, maintenanceMode: checked })
            }
          />

          <ToggleSwitch
            label="Auto Backup"
            description="Backup otomatis database setiap hari"
            checked={systemSettings.autoBackup}
            onChange={(checked) =>
              setSystemSettings({ ...systemSettings, autoBackup: checked })
            }
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormSelect
            label="Frekuensi Backup"
            value={systemSettings.backupFrequency}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                backupFrequency: e.target.value,
              })
            }
            options={[
              { value: "daily", label: "Harian" },
              { value: "weekly", label: "Mingguan" },
              { value: "monthly", label: "Bulanan" },
            ]}
          />
          <div className="flex items-end">
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Download Backup
            </button>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Data Management
        </h3>
        <div className="flex space-x-4">
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Database className="mr-2 h-4 w-4" />
            Export Data
          </button>
          <button className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
