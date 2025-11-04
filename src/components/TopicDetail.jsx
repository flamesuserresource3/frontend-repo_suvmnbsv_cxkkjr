import React, { useEffect, useState } from 'react';

// simple local stub to "summarize" a selected topic and add curated resources
function generateSummary(topic) {
  const name = topic?.label || 'Topic';

  const base = {
    summary: `An overview of ${name}, including key definitions, core ideas, and why it matters in computer science.`,
    example: `Example-driven walkthrough to build intuition for ${name}.`,
    related: ["Algorithms", "Data Structures", "Complexity"],
    interview: [
      `Explain ${name} in your own words and a real-world example.`,
      `What are common pitfalls or edge cases in ${name}?`,
    ],
    resources: [],
  };

  const curated = getCuratedResources(name);
  return { ...base, resources: curated };
}

function getCuratedResources(name) {
  // Map topic names to hand-picked resources (videos and readable guides)
  const lib = {
    "Data Structures": [
      { title: "MIT 6.006: Dynamic Arrays, Linked Lists", url: "https://www.youtube.com/watch?v=ZwZ1ZBzv7EM&list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY", type: "video" },
      { title: "OpenDSA eTextbook", url: "https://opendsa.org/", type: "guide" },
    ],
    "Algorithms": [
      { title: "MIT 6.006 Intro to Algorithms (Playlist)", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp", type: "video" },
      { title: "CLRS Companion (Notes)", url: "https://jeffe.cs.illinois.edu/teaching/algorithms/", type: "guide" },
    ],
    "Graphs": [
      { title: "Graph Algorithms Crash Course", url: "https://www.youtube.com/watch?v=tWVWeAqZ0WU", type: "video" },
      { title: "CP-Algorithms: Graph Theory", url: "https://cp-algorithms.com/graph/", type: "guide" },
    ],
    "Trees": [
      { title: "Binary Trees Explained Visually", url: "https://www.youtube.com/watch?v=oSWTXtMglKE", type: "video" },
      { title: "USF Data Structures: Trees", url: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html", type: "guide" },
    ],
    "Dynamic Programming": [
      { title: "DP for Beginners (freeCodeCamp)", url: "https://www.youtube.com/watch?v=oBt53YbR9Kk", type: "video" },
      { title: "AtCoder Educational DP", url: "https://atcoder.jp/contests/dp/tasks", type: "guide" },
    ],
    "Sorting": [
      { title: "Sorting Algorithms Visually", url: "https://www.youtube.com/watch?v=kPRA0W1kECg", type: "video" },
      { title: "Toptal Guide to Sorting Algorithms", url: "https://www.toptal.com/developers/sorting-algorithms", type: "guide" },
    ],
    "Hash Tables": [
      { title: "Hash Tables (CS50)", url: "https://www.youtube.com/watch?v=shs0KM3wKv8", type: "video" },
      { title: "MDN: Map and Set in JS", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", type: "guide" },
    ],
    "Complexity": [
      { title: "Big-O Notation Explained", url: "https://www.youtube.com/watch?v=__vX2sjlpXU", type: "video" },
      { title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/", type: "guide" },
    ],
    "Operating Systems": [
      { title: "MIT 6.828: Operating System Engineering", url: "https://pdos.csail.mit.edu/6.828/2018/", type: "guide" },
      { title: "CS 162 UC Berkeley (Playlist)", url: "https://www.youtube.com/playlist?list=PLIMsH_z6eqVMZkDp0L_Nl0Hpm2A17y0J1", type: "video" },
    ],
    "Networking": [
      { title: "Computer Networking Full Course", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", type: "video" },
      { title: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/", type: "guide" },
    ],
    "Databases": [
      { title: "CMU Intro to Database Systems (15-445)", url: "https://www.youtube.com/playlist?list=PLSE8ODhjZXjbohkNBWQs_otTrBTrjyohi", type: "video" },
      { title: "Use The Index, Luke!", url: "https://use-the-index-luke.com/", type: "guide" },
    ],
  };

  // Fallback suggestions if the exact name isn't present
  const keys = Object.keys(lib);
  const exact = lib[name];
  if (exact) return exact;

  // heuristic matching
  const lower = name.toLowerCase();
  for (const k of keys) {
    if (lower.includes(k.toLowerCase())) return lib[k];
  }

  return [
    { title: `${name} – Wikipedia Overview`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replaceAll(' ', '_'))}` , type: 'guide' },
    { title: `YouTube: ${name} explained`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' explained')}` , type: 'video' },
  ];
}

export default function TopicDetail({ topic }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!topic) return;
    setDetail(generateSummary(topic));
  }, [topic]);

  if (!topic) {
    return (
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 text-slate-300">
        Select a node to see details and curated resources.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white">{topic.label}</h3>
      {detail && (
        <div className="mt-3 space-y-4 text-slate-300">
          <p className="leading-relaxed">{detail.summary}</p>

          <div>
            <h4 className="text-slate-200 font-semibold mb-2">Example</h4>
            <p className="text-slate-300/90">{detail.example}</p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-2">Related</h4>
            <div className="flex flex-wrap gap-2">
              {detail.related.map((r) => (
                <span key={r} className="px-2 py-1 rounded-md bg-slate-800 text-slate-200 text-xs border border-slate-700">{r}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-2">Interview prompts</h4>
            <ul className="list-disc pl-5 space-y-1">
              {detail.interview.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-2">Curated resources</h4>
            <ul className="space-y-2">
              {detail.resources.map((res, i) => (
                <li key={i} className="group flex items-start gap-3">
                  <span className={`mt-1 inline-flex h-2.5 w-2.5 rounded-full ${res.type === 'video' ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                  <a href={res.url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200 underline decoration-dotted">
                    {res.title}
                  </a>
                  <span className="ml-auto text-xs text-slate-400 uppercase tracking-wide px-2 py-0.5 rounded border border-slate-700 bg-slate-800/60">{res.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
