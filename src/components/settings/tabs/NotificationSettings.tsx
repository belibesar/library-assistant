import { useState } from "react";
import ToggleSwitch from "../forms/ToggleSwitch";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    borrowingReminders: true,
    overdueNotifications: true,
    newBookAlerts: true,
    maintenanceNotices: true,
    promotionalEmails: false,
    weeklyDigest: true,
    instantAlerts: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Preferensi Notifikasi
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Notifikasi Email"
            description="Terima notifikasi melalui email"
            checked={notifications.emailNotifications}
            onChange={(checked: boolean) =>
              setNotifications({
                ...notifications,
                emailNotifications: checked,
              })
            }
          />

          <ToggleSwitch
            label="Notifikasi Push"
            description="Terima notifikasi push di browser"
            checked={notifications.pushNotifications}
            onChange={(checked: boolean) =>
              setNotifications({ ...notifications, pushNotifications: checked })
            }
          />

          <ToggleSwitch
            label="Notifikasi SMS"
            description="Terima notifikasi penting melalui SMS"
            checked={notifications.smsNotifications}
            onChange={(checked: boolean) =>
              setNotifications({ ...notifications, smsNotifications: checked })
            }
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Jenis Notifikasi
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Pengingat Peminjaman"
            description="Pengingat jatuh tempo dan perpanjangan"
            checked={notifications.borrowingReminders}
            onChange={(checked: boolean) =>
              setNotifications({
                ...notifications,
                borrowingReminders: checked,
              })
            }
          />

          <ToggleSwitch
            label="Notifikasi Keterlambatan"
            description="Pemberitahuan buku yang terlambat dikembalikan"
            checked={notifications.overdueNotifications}
            onChange={(checked: boolean) =>
              setNotifications({
                ...notifications,
                overdueNotifications: checked,
              })
            }
          />

          <ToggleSwitch
            label="Buku Baru"
            description="Pemberitahuan koleksi buku terbaru"
            checked={notifications.newBookAlerts}
            onChange={(checked: boolean) =>
              setNotifications({ ...notifications, newBookAlerts: checked })
            }
          />

          <ToggleSwitch
            label="Pemberitahuan Maintenance"
            description="Jadwal maintenance sistem"
            checked={notifications.maintenanceNotices}
            onChange={(checked: boolean) =>
              setNotifications({
                ...notifications,
                maintenanceNotices: checked,
              })
            }
          />

          <ToggleSwitch
            label="Email Promosi"
            description="Penawaran dan event perpustakaan"
            checked={notifications.promotionalEmails}
            onChange={(checked: boolean) =>
              setNotifications({ ...notifications, promotionalEmails: checked })
            }
          />

          <ToggleSwitch
            label="Ringkasan Mingguan"
            description="Laporan aktivitas mingguan"
            checked={notifications.weeklyDigest}
            onChange={(checked: boolean) =>
              setNotifications({ ...notifications, weeklyDigest: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
