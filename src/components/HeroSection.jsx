import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] md:h-[70vh] lg:h-[75vh] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* soft gradient veil that doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 h-full flex items-center">
        <div className="backdrop-blur-sm bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="inline-flex items-center gap-2 text-cyan-300/90 text-sm font-medium bg-cyan-400/10 border border-cyan-500/30 rounded-full px-3 py-1 mb-4">
            <Rocket className="h-4 w-4" />
            <span>CS Assistant</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Visualize knowledge. Learn faster.
          </h1>
          <p className="mt-3 md:mt-4 text-slate-300 max-w-xl">
            An AI-powered study companion that turns any computer science topic into an interactive concept graph with curated resources.
          </p>
        </div>
      </div>
    </section>
  );
}
