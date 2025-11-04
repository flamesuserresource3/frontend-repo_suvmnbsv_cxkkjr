import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function SubjectInput({ onGenerate }) {
  const [text, setText] = useState('Operating Systems, Computer Networks, Database Systems, Data Structures, Artificial Intelligence');

  return (
    <section className="max-w-6xl mx-auto px-6 mt-6 md:mt-10 relative z-20">
      <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste syllabus or list subjects, separated by commas"
            className="flex-1 min-h-[140px] md:min-h-[120px] rounded-xl bg-neutral-950 text-neutral-100 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 p-5 placeholder:text-neutral-500"
          />
          <div className="flex md:flex-col gap-3 md:gap-4">
            <button
              onClick={() => onGenerate(text)}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-xl transition-colors"
            >
              <Sparkles size={18} />
              Generate Graph
            </button>
            <button
              onClick={() => setText('Operating Systems, Computer Networks, Database Systems, Data Structures, Artificial Intelligence')}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-medium px-6 py-3.5 rounded-xl transition-colors border border-neutral-700"
            >
              Sample Input
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-400">
          Tip: You can paste an entire syllabus. The assistant will extract topics, link concepts, and suggest a learning path.
        </p>
      </div>
    </section>
  );
}
