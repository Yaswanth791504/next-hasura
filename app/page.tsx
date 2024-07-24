import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link
        href="/todos"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400"
      >
        Go To Todos
      </Link>
    </main>
  );
}
