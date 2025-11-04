import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-slate-950">
      {/* Spline scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/UiMDkOJtlS5O5Vaz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* soft multi-stop gradient veil that doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950"></div>
      {/* side vignettes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-950/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-950/70 to-transparent" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex items-center">
        <div className="max-w-3xl backdrop-blur-sm bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="inline-flex items-center gap-2 text-cyan-300/90 text-sm font-medium bg-cyan-400/10 border border-cyan-500/30 rounded-full px-3 py-1 mb-4">
            <Rocket className="h-4 w-4" />
            <span>CS Assistant</span>
            <span className="ml-2 hidden sm:inline text-slate-400">Technology • Futuristic • Cosmic</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Visualize knowledge. Learn faster.
          </h1>
          <p className="mt-3 md:mt-4 text-slate-300 max-w-xl">
            An AI-powered study companion that turns any computer science topic into an immersive concept graph with curated resources.
          </p>
        </div>
      </div>

      {/* bottom fade so following content starts cleanly below */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-950" />
    </section>
  );
}
