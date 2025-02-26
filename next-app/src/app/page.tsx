import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-[2rem]">Home Page</h1>
      </main>
    </div>
  );
}
