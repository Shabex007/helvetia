import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">ViteApp</span>
          <div className="space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#" className="hover:text-indigo-600 transition">
              Features
            </a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Build faster with{" "}
          <span className="text-indigo-600">React & Tailwind</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          This is a clean, modern sample page layout. It uses utility classes to
          handle layout, typography, and responsive design instantly.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Explore Docs
          </a>
          <a
            href="#"
            className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            Live Demo
          </a>
        </div>
      </header>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Powered by Vite HMR to reflect your code changes in milliseconds.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              🎨
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Easy Styling
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tailwind CSS handles margins, flexbox, and grids without writing
              CSS files.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              📱
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Fully Responsive
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Built to automatically adapt to mobile, tablet, and desktop
              viewports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
