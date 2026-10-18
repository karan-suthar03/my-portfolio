import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Videogammetry from "./posts/Videogammetry.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-100 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <main className="max-w-2xl mx-auto px-6 py-16 sm:py-20 flex flex-col gap-10">
        <a href="/" className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-current w-fit">
          ← Karan Suthar
        </a>
        <Videogammetry />
        <footer className="pt-8 border-t border-neutral-100 dark:border-neutral-800 text-sm text-neutral-400 dark:text-neutral-500">
          <a href="/" className="hover:text-current">← Back to karansuthar.me</a>
        </footer>
      </main>
    </div>
  </StrictMode>,
);
