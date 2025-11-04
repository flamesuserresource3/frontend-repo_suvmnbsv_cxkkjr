import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[62vh] md:h-[76vh] overflow-hidden bg-neutral-950 text-neutral-100 rounded-b-3xl shadow-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient veil to enhance contrast without blocking interactions */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-6 backdrop-blur">
          <Rocket size={16} />
          <span className="text-xs tracking-wide uppercase">CS Assistant</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Visualize, Connect, and Master Computer Science
        </h1>
        <p className="mt-4 md:mt-6 text-sm md:text-base text-neutral-200/85 max-w-2xl">
          Paste your syllabus or list your subjects. We extract key topics, map relationships, and build an interactive knowledge graph for smarter revision.
        </p>
      </div>
    </section>
  );
}
