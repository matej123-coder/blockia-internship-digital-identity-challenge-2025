"use client"
import { useRouter } from "next/navigation";
import { FaFingerprint } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const name = "Matej Minoski";
  const githubId = "matejm";
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const message = `BLOCKIA-${name}-${githubId}-${today}`;

  const handleLogin = async () => {
    const res = await fetch("/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, githubId }),
    });

    const data = await res.json();
    console.log(data)
    router.push(`/result?message=${encodeURIComponent(data.messages)}&signature=${encodeURIComponent(data.signature)}`);
  };

  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f9fbff] px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Sign & Verify</h1>
        <p className="text-lg text-center text-gray-500 mb-8">A Personal Digital Identity Demo</p>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Digital Identity</h2>
            <p className="text-gray-500 text-sm">Verify your identity using cryptographic signatures</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-left text-gray-700 mb-6">
            <p className="font-medium mb-1">Your Identity Details</p>
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">GitHub ID:</span> {githubId}</p>
            <p><span className="font-semibold">Date:</span> {today}</p>
          </div>

          <button
              onClick={handleLogin}
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-3 px-6 rounded-xl text-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            <FaFingerprint className="w-5 h-5" />
            Login with your ID
          </button>
        </div>
      </main>
  );
}
