import Intro from "./components/Intro.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <main className="max-w-2xl mx-auto px-6 py-24 flex flex-col gap-20">
        <Intro />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}