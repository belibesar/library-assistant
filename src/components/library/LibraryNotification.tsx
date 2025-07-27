import { Notification } from "../../libs/types/libraryType";

interface LibraryNotificationProps {
  notification: Notification | null;
}

export const LibraryNotification = ({
  notification,
}: LibraryNotificationProps) => {
  if (!notification) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md px-4 py-2 text-white shadow-lg transition-all duration-300 ${
        notification.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {notification.message}
    </div>
  );
};
