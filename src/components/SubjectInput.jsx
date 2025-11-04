import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SubjectInput({ value, onChange, onGenerate, onSample }) {
  return (
    <div className="w-full px-6 -mt-10 md:-mt-14">
      <div className="mx-auto max-w-5xl bg-slate-900/70 border border-slate-700 rounded-xl p-4 md:p-6 shadow-lg">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Describe the CS subject you want to study
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Data structures and algorithms focusing on graphs, trees, dynamic programming, sorting, and complexity"
          className="w-full h-28 md:h-32 resize-y rounded-lg bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 outline-none p-3 md:p-4"
        />
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGenerate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold shadow-md transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Generate Graph
          </button>
          <button
            onClick={onSample}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium border border-slate-700"
          >
            Sample Input
          </button>
        </div>
      </div>
    </div>
  );
}
