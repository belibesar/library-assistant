"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PublicRoute from "@/components/PublicRoute";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
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
      const tokenPayload = JSON.parse(atob(resJson.access_token.split('.')[1]));
      
      // Update auth context dengan user data
      login({
        id: tokenPayload._id,
        email: tokenPayload.email,
        name: tokenPayload.name || tokenPayload.email,
        username: tokenPayload.username || tokenPayload.email
      });

      Swal.fire({
        title: "Login Berhasil",
        text: "Selamat datang di aplikasi kami!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      
      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: (error as Error).message || "Login gagal, silakan coba lagi.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      value={input.email}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={input.password}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full hover:bg-cyan-600 transition-all"
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </div>
                  <p className="text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                      Register here
                    </Link>
                  </p>
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      className="flex items-center bg-white border border-gray-300 rounded-lg shadow px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    >
                      <svg
                        className="h-6 w-6 mr-2"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.262 2.407 10.39l7.904-6.051A14.174 14.174 0 019.827 24"
                            fill="#FBBC05"
                          />
                          <path
                            d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533c-9.286 0-17.268 5.311-21.09 13.071l7.909 6.039c1.822-5.532 7.017-9.511 13.181-9.511"
                            fill="#EB4335"
                          />
                          <path
                            d="M23.714 37.867c-6.164 0-11.359-3.978-13.181-9.51l-7.909 6.038c3.822 7.761 11.804 13.072 21.09 13.072 5.732 0 11.205-2.035 15.312-5.849l-7.508-5.804c-2.118 1.335-4.785 2.053-7.804 2.053"
                            fill="#34A853"
                          />
                          <path
                            d="M46.145 24c0-1.387-.214-2.88-.534-4.267H23.714v9.067h12.604c-.63 3.091-2.345 5.468-4.8 7.014l7.508 5.804C43.34 37.614 46.145 31.649 46.145 24"
                            fill="#4285F4"
                          />
                        </g>
                      </svg>
                      <span>Continue with Google</span>
                    </button>
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
