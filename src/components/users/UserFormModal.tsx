import { Eye, EyeOff, Save, X } from "lucide-react";

const UserFormModal = ({
  showModal,
  editingUser,
  formData,
  errors,
  showPassword,
  onClose,
  onSubmit,
  onChange,
  onTogglePassword,
  submited,
}: {
  showModal: boolean;
  editingUser: UserData | null;
  formData: UserForm;
  errors: Partial<UserForm>;
  showPassword: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onTogglePassword: () => void;
  submited: boolean;
}) =>
  showModal && (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            </h3>
            <button
              onClick={onClose}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={onChange}
                className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                id="id_number"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                NIM/NRP *
              </label>
              <input
                id="id_number"
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={onChange}
                className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  errors.id_number ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan ID Number (NIM/NRP)"
              />
              {errors.id_number && (
                <p className="mt-1 text-xs text-red-500">{errors.id_number}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password {!editingUser && "*"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={
                    editingUser
                      ? "Kosongkan jika tidak ingin mengubah password"
                      : "Masukkan password"
                  }
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Mahasiswa</option>
                <option value="admin">Pegawai</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submited}
                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                {submited ? (
                  <span className="animate-pulse text-xs">Menyimpan...</span>
                ) : (
                  <span>{editingUser ? "Update" : "Simpan"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

export default UserFormModal;
