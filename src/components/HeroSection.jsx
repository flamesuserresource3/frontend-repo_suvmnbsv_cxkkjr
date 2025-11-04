import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-[#0b0f1a] text-white rounded-b-3xl shadow-xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0b0f1a] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4 backdrop-blur">
          <Rocket size={16} />
          <span className="text-xs tracking-wide uppercase">CS Assistant</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Visualize, Connect, and Master Computer Science
        </h1>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-white/80 max-w-2xl">
          Paste your syllabus or list your subjects. We extract key topics, map relationships, and build an interactive knowledge graph for smarter revision.
        </p>
      </div>
    </section>
  );
}
