"use client"
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const message  = searchParams.get("message");
  const signature = searchParams.get("signature");

  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
        <h1 className={"text-3xl font-semibold mb-4  text-green-700 "}>
          Original Message </h1>
        <p className={"text-xl px-6 py-4 rounded-2xl shadow-lg text-center text-green-500"}>
         Identity verified successfully!
        </p>
        <h1 className={"text-3xl font-semibold mb-4  text-green-700 mt-7 "}>
          Signed Message</h1>
        <div className="bg-gray-100 p-4 rounded-xl mt-2">{signature}</div>
      </main>
  );
}