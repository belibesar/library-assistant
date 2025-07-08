"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.name || !input.username || !input.email || !input.password) {
      Swal.fire({
        title: "Error",
        text: "All fields are required. Please fill out the form completely.",
        icon: "error",
      });
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const resJson = await res.json();

      if (!res.ok) throw resJson;

      Swal.fire({
        title: "Registration Successful",
        text: "Your account has been created successfully!",
        icon: "success",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: (error as Error).message || "Registration failed, please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleRegister}>
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold text-center mb-6">Create an Account</h1>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={input.name}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Your name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={input.username}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Username"
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={input.email}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={input.password}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-sky-500"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 transition-all"
                    >
                      Create an Account
                    </button>
                  </div>

                  <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
