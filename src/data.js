import { MEDIA } from "./media.js";
import videogammetryPoster from "./assets/projects/videogammetry-dense-poster.jpg";
import motionAmplification from "./assets/projects/motion-amplification.gif";
import soOptimizer from "./assets/projects/so-optimizer.png";
import particlesPoster from "./assets/projects/particles-poster.jpg";
import tileViewerPoster from "./assets/projects/tile-viewer-poster.jpg";

export const profile = {
  name: "Karan Suthar",
  role: "Software Engineer · Data Engineer",
  location: "Pune, India",
  about:
    "I build data platforms and backend systems at Synthesys Solutions and Brilliqs, and in my own time I write performance-heavy software from scratch: computer vision pipelines, GPU simulations, renderers and native editors. I like understanding a system down to the metal before reaching for a library.",
  links: [
    { label: "GitHub", href: "https://github.com/karan-suthar03" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karan-suthar-0a35b4265" },
    { label: "Email", href: "mailto:karan.suthar.lakha@gmail.com" },
  ],
};

export const experience = [
  {
    when: "Sep 2026 – Now",
    title: "Data Engineer",
    org: "Brilliqs",
    stack: "Snowflake · SQL · Python · pandas · AWS",
  },
  {
    when: "Jul 2026 – Now",
    title: "Software Engineer",
    org: "Synthesys Solutions",
    stack:
      "Go · Python · FastAPI · TypeScript · React · Node.js · Express · PostgreSQL · Prisma · Docker · OpenCV · ONNX · Azure OCR · Android",
  },
  {
    when: "Apr – Jun 2026",
    title: "Software Engineer Intern",
    org: "Synthesys Solutions",
  },
];

export const featured = [
  {
    when: "Oct 2026",
    title: "Videogammetry",
    tagline: "Video in, 3D point cloud out, written from scratch in C++.",
    video: `${MEDIA}/projects/videogammetry-dense-loop.mp4`,
    image: videogammetryPoster,
    imageAlt: "Live viewer filling in a dense point cloud of a statue, with each depth map in the corner",
    dark: true,
    tech: ["C++20", "ORB features, PnP, bundle adjustment", "Vulkan compute (optional GPU)", "FFmpeg · Win32 · Android"],
    stats: ["129 fps on a 708-frame video", "0 lost frames", "Camera path within 0.05% of COLMAP"],
    repo: "https://github.com/karan-suthar03/videogammetry",
    writeup: "/writing/videogammetry/",
    description:
      "A structure-from-motion pipeline that recovers the camera path and a coloured point cloud from ordinary video. Feature detection, two-view initialisation, incremental pose estimation and bundle adjustment are my own code; COLMAP and ORB-SLAM3 serve only as benchmarks. Bundle adjustment runs on its own mapping thread, and a live viewer draws the map as the video plays. Once the video ends, a GPU PatchMatch stage computes a depth map for every keyframe and fuses them into a dense cloud.",
  },
  {
    when: "Feb 2026",
    title: "Video Motion Amplification Studio",
    tagline: "Makes invisible machine vibrations visible.",
    image: motionAmplification,
    imageAlt: "Amplified motion in a video of machinery",
    tech: ["Python", "PySide6 + PyQtGraph", "NumPy + SciPy (FFT, band-pass)", "OpenCV"],
    repo: "https://github.com/karan-suthar03/motion-amplification",
    description:
      "An interactive desktop tool that magnifies subtle motion in video with Eulerian-style signal processing, for spotting faults and micro-vibrations in machinery. Pixel-level exploration, live FFT inspection, tunable frequency bands and a threaded render pipeline that exports amplified MP4.",
  },
  {
    when: "Feb 2026",
    title: "Passwordless Risk Engine",
    tagline: "Passkey login with device-aware risk scoring. Built in 24 hours.",
    tech: ["Node.js + Express", "WebAuthn / passkeys", "Browser + backend npm SDKs", "Device fingerprinting"],
    repo: "https://github.com/karan-suthar03/password-less-authentication-gitIgnore",
    description:
      "Passwordless authentication with trust decisions based on the device. Two reusable npm SDKs (browser and backend), risk-assessment endpoints, and approval-based enrolment of new devices using platform, timezone, language and touch capability. Sign-in uses WebAuthn, so Windows Hello, Touch ID and Face ID do the work.",
  },
  {
    when: "Jan 2026",
    title: "Manufacturing SO Optimizer",
    tagline: "30–60× faster sales-order analysis for two manufacturing departments.",
    image: soOptimizer,
    imageAlt: "SO Optimizer desktop app",
    tech: ["Python + Tkinter", "pandas + OpenPyXL", "CSV/XLSX ingestion", "PyInstaller EXE"],
    stats: ["File load: 60–120 s → 1–2 s", "Search/compare: 20–30 s → under 1 s"],
    description:
      "A desktop app that replaced manual spreadsheet work in two Excel-heavy departments. Rolled out to both as a production Windows EXE. Confidential, so no public repository.",
  },
  {
    when: "Jan 2026",
    title: "Native Windows Text Editor",
    tagline: "A text editor with no GUI framework, straight on Win32.",
    image: `${MEDIA}/projects/text-editor.gif`,
    imageAlt: "Text editor running on Windows",
    tech: ["C++17", "Win32 API", "Gap buffer", "GDI rendering"],
    repo: "https://github.com/karan-suthar03/textEditor",
    description:
      "Built from raw Windows messages up. A gap buffer gives O(1) amortised local inserts and deletes, and a custom GDI renderer handles line tracking and viewport scrolling.",
  },
  {
    when: "Oct 2025",
    title: "1M+ Particle Simulation",
    tagline: "Over a million particles, simulated and drawn on the GPU in real time.",
    video: `${MEDIA}/projects/particles.mp4`,
    image: particlesPoster,
    imageAlt: "Particles forming the word KARAN",
    dark: true,
    tech: ["WebGL2", "GLSL compute-style shaders", "JavaScript"],
    repo: "https://github.com/karan-suthar03/particle-simulation",
    demo: "https://karan-suthar03.github.io/particle-simulation/",
    description:
      "Physics and rendering both run in shaders, so the CPU never touches individual particles. Particles flock into any text you type, and the particle count can be changed live, up past a million.",
  },
  {
    when: "Jul 2025",
    title: "7 GB Image Viewer",
    tagline: "Google-Maps-style zooming into a 7 GB image, at zero hosting cost.",
    video: `${MEDIA}/projects/tile-viewer.mp4`,
    image: tileViewerPoster,
    imageAlt: "Zooming into a giant photo mosaic",
    tech: ["JavaScript + p5.js", "Python tiling pipeline", "Cloudflare R2 + CDN"],
    repo: "https://github.com/karan-suthar03/tilemap-page",
    demo: "https://karan-suthar03.github.io/tilemap-page/",
    description:
      "A level-of-detail viewer for a 7 GB photo mosaic. A Python pipeline cuts the image into tile pyramids, Cloudflare R2 and its CDN serve them for free, and the viewer streams only the tiles on screen at the current zoom level, with a minimap to keep your place.",
  },
];

export const moreProjects = [
  { when: "Apr 2026", title: "Chess Engine", text: "Move generation, evaluation and search, written to learn systems programming in Rust.", tech: "Rust", repo: "https://github.com/karan-suthar03/chess-rust" },
  { when: "Mar 2026", title: "J-1 POS System", text: "Cross-platform café POS with admin and counter apps, Bluetooth receipt printing, offline-first sync.", tech: "Java · Spring Boot · React", repo: "https://github.com/karan-suthar03/pos-system" },
  { when: "Sep 2025", title: "SIH RAG Engine", text: "Led the team building ingestion, embeddings, vector search and a contextual answer pipeline.", tech: "Python · FastAPI · Qdrant" },
  { when: "Sep 2025", title: "OpenGL Ray Tracer", text: "GPU ray tracing with compute shaders, reflections and physically inspired lighting.", tech: "C++ · OpenGL · GLSL", repo: "https://github.com/karan-suthar03/ray-tracing-on-gpu" },
  { when: "Aug 2025", title: "Serverless Chat", text: "Real-time chat with no servers to run: Lambda for compute, API Gateway for routing, S3 for hosting.", tech: "AWS Lambda · API Gateway · S3", repo: "https://github.com/karan-suthar03/serverless-chat-app" },
  { when: "Jul 2025", title: "2 Bandhu Chai", text: "Production website with SEO, accessibility and fast loads from Cloudflare's CDN.", tech: "HTML · CSS · JS · Cloudflare", repo: "https://github.com/karan-suthar03/2-bandhu-chai" },
  { when: "2024", title: "Gyroscope Steering for GTA V", text: "Phone gyroscope mapped to in-game steering over Wi-Fi.", tech: "Python · Java · PyQt5" },
  { when: "Mar 2024", title: "Neural Network Library", text: "Modular neural networks with custom layers and activations, no ML framework.", tech: "JavaScript", repo: "https://github.com/karan-suthar03/neural-network-from-scratch" },
];

export const hackathons = [
  { name: "Navonmesh Hackathon", role: "Team lead", result: "19th of 500+ teams" },
  { name: "Smart India Hackathon", role: "Team lead", result: "RAG system for real-world use" },
  { name: "ISRO Hackathon", role: "Team lead", result: "Space-tech prototyping" },
];

export const skills = [
  { label: "Languages", value: "C++, Python, Go, TypeScript, JavaScript, Java, Rust, SQL" },
  { label: "Backend", value: "Node.js, Express, FastAPI, Spring Boot, PostgreSQL, Prisma, MongoDB, REST" },
  { label: "Data & AI", value: "Snowflake, pandas, NumPy, OpenCV, ONNX, RAG, Qdrant" },
  { label: "Graphics", value: "OpenGL, GLSL, WebGL, Vulkan compute, ray tracing" },
  { label: "Cloud", value: "AWS (Lambda, S3, API Gateway, EC2), Cloudflare (R2, Pages), Docker" },
  { label: "Frontend", value: "React, TailwindCSS" },
];

export const education = [
  { when: "2025 – Now", degree: "Master of Computer Applications (MCA)", school: "MES' IMCC, Savitribai Phule Pune University" },
  { when: "2021 – 2025", degree: "Bachelor of Computer Applications (BBA-CA)", school: "Savitribai Phule Pune University · CGPA 8.4" },
];
