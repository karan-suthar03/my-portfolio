import { profile } from "./data.js";
import { Education, Hackathons, Skills } from "./components/Background.jsx";
import Experience from "./components/Experience.jsx";
import Featured from "./components/Featured.jsx";
import Header from "./components/Header.jsx";
import MoreProjects from "./components/MoreProjects.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-100 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24 flex flex-col gap-20">
        <Header />
        <Experience />
        <Featured />
        <MoreProjects />
        <Hackathons />
        <Skills />
        <Education />
        <footer className="pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap justify-between gap-4 text-sm text-neutral-400 dark:text-neutral-500">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="mailto:karan.suthar.lakha@gmail.com" className="hover:text-current">
            karan.suthar.lakha@gmail.com
          </a>
        </footer>
      </main>
    </div>
  );
}
