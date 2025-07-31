import { useState, ChangeEvent } from "react";
import { User, Upload, Save, Eye, EyeOff } from "lucide-react";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta",
    institution: "Universitas Indonesia",
    studentId: "1234567890",
    role: "Mahasiswa",
    bio: "Mahasiswa Teknik Informatika semester 6, tertarik dengan AI dan Machine Learning.",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof typeof profile) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setProfile({ ...profile, [field]: e.target.value });
    };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center space-x-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
          <User className="h-12 w-12 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Foto Profil</h3>
          <p className="text-sm text-gray-500">
            Upload foto profil Anda (JPG, PNG, max 2MB)
          </p>
          <button className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Upload className="mr-2 h-4 w-4" />
            Upload Foto
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Nama Lengkap"
          placeholder="Masukan nama lengkap"
          value={profile.name}
          onChange={handleChange("name")}
          required
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange("email")}
          required
        />
        <FormInput
          label="Nomor Telepon"
          placeholder="Masukan nomor telepon"
          value={profile.phone}
          onChange={handleChange("phone")}
        />
        <FormInput
          label="NIM/NIP"
          placeholder="Masukan NIM/NIP"
          value={profile.studentId}
          onChange={handleChange("studentId")}
        />
      </div>

      <FormInput
        label="Alamat"
        placeholder="Masukan alamat"
        value={profile.address}
        onChange={handleChange("address")}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          label="Institusi"
          placeholder="Masukan institusi Anda"
          value={profile.institution}
          onChange={handleChange("institution")}
        />
        <FormSelect
          label="Role"
          value={profile.role}
          onChange={handleChange("role")}
          options={[
            { value: "Mahasiswa", label: "Mahasiswa" },
            // { value: "Dosen", label: "Dosen" },
            // { value: "Staff", label: "Staff" },
            // { value: "Umum", label: "Masyarakat Umum" },
          ]}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          value={profile.bio}
          onChange={handleChange("bio")}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder="Ceritakan sedikit tentang diri Anda..."
        />
      </div>

      {/* Password Change */}
      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Ubah Password
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative">
            <FormInput
              label="Password Lama"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password lama"
              value=""
              onChange={() => {}}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FormInput
            label="Password Baru"
            type="password"
            placeholder="Masukkan password baru"
            value=""
            onChange={() => {}}
          />
        </div>
        <FormInput
          label="Konfirmasi Password Baru"
          type="password"
          placeholder="Konfirmasi password baru"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="flex justify-end">
        <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
