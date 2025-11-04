import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function SubjectInput({ onGenerate }) {
  const [text, setText] = useState('Operating Systems, Computer Networks, Database Systems, Data Structures, Artificial Intelligence');

  return (
    <section className="max-w-6xl mx-auto -mt-16 md:-mt-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste syllabus or list subjects, separated by commas"
            className="flex-1 min-h-[120px] md:min-h-[100px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/60 p-4 text-slate-800"
          />
          <div className="flex md:flex-col gap-3">
            <button
              onClick={() => onGenerate(text)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <Sparkles size={18} />
              Generate Graph
            </button>
            <button
              onClick={() => setText('Operating Systems, Computer Networks, Database Systems, Data Structures, Artificial Intelligence')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-xl transition-colors"
            >
              Sample Input
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Tip: You can paste an entire syllabus. The assistant will extract topics, link concepts, and suggest a learning path.
        </p>
      </div>
    </section>
  );
}
