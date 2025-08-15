"use client";

import { GraduationCap, Plus, Shield, Users } from "lucide-react";
import SearchAndFilter from "../users/SearchAndFIlter";
import UserStatsCard from "../users/StatsCard";
import UserFormModal from "../users/UserFormModal";
import UserTable from "../users/UserTable";
import MessageAlert from "../users/MessageAlert";
import { useEffect, useState } from "react";
import ModalAlert from "../shared/ModalAlert";

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [submited, setSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    employees: 0,
  });

  const [formData, setFormData] = useState<UserForm>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    id_number: "",
  });

  const [errors, setErrors] = useState<Partial<UserForm>>({});

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search term or role filter changes
  useEffect(() => {
    const filtered = users.filter((user: UserData) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id_number.toString().includes(searchTerm);

      const matchesRole = roleFilter ? user.role === roleFilter : true;

      return matchesSearch && matchesRole;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  // Update stats when users change
  useEffect(() => {
    if (users.length > 0) {
      setStats({
        total: users.length,
        students: users.filter((u: UserData) => u.role === "user").length,
        employees: users.filter((u: UserData) => u.role === "admin").length,
      });
    }
  }, [users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      if (response.ok) {
        const data: ApiResponse = await response.json();
        setUsers(data.data);
      } else {
        showMessage("error", "Gagal mengambil data pengguna");
      }
    } catch (error) {
      showMessage("error", "Error koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserForm> = {};

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.username.trim()) newErrors.username = "Username wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format email tidak valid";

    if (!editingUser && !formData.password.trim())
      newErrors.password = "Password wajib diisi";
    else if (!editingUser && formData.password.length < 6)
      newErrors.password = "Password minimal 6 karakter";

    if (!formData.id_number.trim())
      newErrors.id_number = "ID Number wajib diisi";
    else if (!/^\d+$/.test(formData.id_number))
      newErrors.id_number = "ID Number harus berupa angka";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "user",
      id_number: "",
    });
    setErrors({});
    setEditingUser(null);
    setShowPassword(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: UserForm) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmited(true);
      const url = editingUser ? `/api/users/${editingUser._id}` : "/api/users";
      const method = editingUser ? "PUT" : "POST";

      const payload = {
        ...formData,
        id_number: parseInt(formData.id_number),
      };

      // Remove password if editing and not changed
      if (editingUser && !formData.password) {
        delete (payload as any).password;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showMessage(
          "success",
          editingUser
            ? "Pengguna berhasil diperbarui"
            : "Pengguna berhasil ditambahkan",
        );
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        const errorData = await response.json();
        showMessage("error", errorData.message || "Terjadi kesalahan");
      }
    } catch (error) {
      showMessage("error", "Error koneksi ke server");
    } finally {
      setSubmited(false);
    }
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      id_number: user.id_number.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (user: UserData) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`))
      return;

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showMessage("success", "Pengguna berhasil dihapus");
        fetchUsers();
      } else {
        showMessage("error", "Gagal menghapus pengguna");
      }
    } catch (error) {
      showMessage("error", "Error koneksi ke server");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Manajemen Pengguna
                </h1>
                <p className="text-gray-600">
                  Kelola pengguna sistem perpustakaan
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>Tambah Pengguna</span>
            </button>
          </div>
        </div>
        <ModalAlert message={message} onClose={() => setMessage(null)} />
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <UserStatsCard
            title="Total Pengguna"
            count={stats.total}
            icon={Users}
            color="bg-white border border-gray-200"
            loading={loading}
          />
          <UserStatsCard
            title="Mahasiswa/Dosen"
            count={stats.students}
            icon={GraduationCap}
            color="bg-blue-50 border border-blue-100"
            loading={loading}
          />
          <UserStatsCard
            title="Admin/Pemustaka"
            count={stats.employees}
            icon={Shield}
            loading={loading}
            color="bg-purple-50 border border-purple-100"
          />
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          onSearchChange={handleSearchChange}
          onRoleFilterChange={handleRoleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {loading ? (
          <div className="mt-[64px] flex h-full items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Memuat data pengguna...</p>
            </div>
          </div>
        ) : (
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </div>

      {/* User Form Modal */}
      <UserFormModal
        submited={submited}
        showModal={showModal}
        editingUser={editingUser}
        formData={formData}
        errors={errors}
        showPassword={showPassword}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    </div>
  );
};

export default UserManagementPage;
