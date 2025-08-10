"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PublicRoute from "@/components/PublicRoute";
import { User, Lock, Info } from "lucide-react";

export default function Login() {
  const [input, setInput] = useState({
    id_number: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!input.id_number.trim()) {
      Swal.fire({
        title: "Input Tidak Lengkap",
        text: "Mohon masukkan NIM/NRP Anda",
        icon: "warning",
      });
      return;
    }

    if (!input.password.trim()) {
      Swal.fire({
        title: "Input Tidak Lengkap",
        text: "Mohon masukkan password Anda",
        icon: "warning",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const resJson = await res.json();
      if (!res.ok) throw resJson;

      // Simpan token ke localStorage
      localStorage.setItem("token", resJson.access_token);

      // Decode token untuk mendapatkan user data
      const tokenPayload = JSON.parse(atob(resJson.access_token.split(".")[1]));

      // Update auth context dengan user data
      login({
        id: tokenPayload._id,
        email: tokenPayload.email,
        name: tokenPayload.name || tokenPayload.email,
        username: tokenPayload.username || tokenPayload.email,
        role: tokenPayload.role || "user",
      });

      Swal.fire({
        title: "Login Berhasil! 🎉",
        text: `Selamat datang kembali, ${tokenPayload.name || "Pengguna"}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "Login gagal, silakan coba lagi.";

      if (error.message === "Invalid id_number/password") {
        errorMessage =
          "NIM/NRP atau password tidak valid. Mohon periksa kembali data Anda.";
      }

      Swal.fire({
        title: "Login Gagal",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Coba Lagi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-2 sm:py-4">
        <div className="relative py-2 sm:mx-auto sm:max-w-xl">
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-2xl"></div>
          <div className="relative border border-gray-200 bg-white px-6 py-6 shadow-lg sm:rounded-2xl sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="mx-auto max-w-md">
                {/* Header */}
                <div className="mb-4 text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-500">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="mb-1 text-2xl font-bold text-gray-800">
                    Selamat Datang
                  </h1>
                  <p className="text-sm text-gray-600">
                    Masuk ke akun perpustakaan Anda
                  </p>
                </div>

                {/* Info Box */}
                <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-2.5">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-600" />
                    <div className="text-xs text-blue-700">
                      <p className="mb-1 font-medium">Info Login:</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span>
                          • <strong>NIM</strong> (mahasiswa)
                        </span>
                        <span>
                          • <strong>NRP</strong> (pegawai)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="space-y-4 py-4 text-base leading-6 text-gray-700">
                    {/* NIM/NRP Field */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        autoComplete="off"
                        id="id_number"
                        name="id_number"
                        type="text"
                        value={input.id_number}
                        onChange={handleChange}
                        className="peer h-10 w-full rounded-lg border-2 border-gray-300 pr-4 pl-9 text-sm text-gray-900 placeholder-transparent transition-all focus:border-sky-500 focus:outline-none"
                        placeholder="NIM/NRP"
                        maxLength={20}
                      />
                      <label
                        htmlFor="id_number"
                        className="absolute -top-2.5 left-9 bg-white px-2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-9 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-9 peer-focus:text-xs peer-focus:font-medium peer-focus:text-sky-600"
                      >
                        NIM/NRP
                      </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        value={input.password}
                        onChange={handleChange}
                        className="peer h-10 w-full rounded-lg border-2 border-gray-300 pr-4 pl-9 text-sm text-gray-900 placeholder-transparent transition-all focus:border-sky-500 focus:outline-none"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute -top-2.5 left-9 bg-white px-2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-9 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-9 peer-focus:text-xs peer-focus:font-medium peer-focus:text-sky-600"
                      >
                        Password
                      </label>
                    </div>

                    {/* Login Button */}
                    <div className="relative pt-2">
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full transform rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-cyan-600 hover:to-sky-600 active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-white"></div>
                            Sedang Masuk...
                          </div>
                        ) : (
                          "Masuk ke Dashboard"
                        )}
                      </button>
                    </div>

                    {/* Register Link */}
                    <div className="pt-2 text-center">
                      <p className="text-xs text-gray-600">
                        Belum memiliki akun?{" "}
                        <Link
                          href="/register"
                          className="font-semibold text-sky-600 transition-all hover:text-sky-700 hover:underline"
                        >
                          Daftar di sini
                        </Link>
                      </p>
                    </div>
                    {/* Help Text */}
                    <div className="pt-2 text-center">
                      <p className="text-xs text-gray-500">
                        Butuh bantuan? <a href="mailto:admin@perpustakaan.com" className="font-semibold text-sky-600 transition-all hover:text-sky-700 hover:underline">Hubungi admin perpustakaan</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
