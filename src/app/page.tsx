import BaseComponent from "@/components/BaseComponent/BaseComponent";
import Header from "@/components/Header/Header";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center px-8 sm:px-20 mt-4 w-full mx-auto">
        <Suspense>
          <BaseComponent />
        </Suspense>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100 w-full h-20 mt-6">
        <span>This site was developed by Eliza Paradise.</span>
      </footer>
    </div>
  );
}
