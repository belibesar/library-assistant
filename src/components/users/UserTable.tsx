import { Edit, Trash2 } from "lucide-react";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  loading,
}: {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (user: UserData) => void;
  loading: boolean;
}) => (
  <div className="rounded-lg border bg-white shadow-sm">
    <div className="border-b px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Daftar Pengguna ({users.length})
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              NIM/NRP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Memuat data...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Tidak ada data pengguna
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.id_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      user.role === "user"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role === "user" ? "Mahasiswa" : "Admin"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                      title="Edit pengguna"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-800"
                      title="Hapus pengguna"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
export default UserTable;
