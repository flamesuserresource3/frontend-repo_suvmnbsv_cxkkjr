import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import SubjectInput from './components/SubjectInput.jsx';
import ConceptGraph from './components/ConceptGraph.jsx';
import TopicDetail from './components/TopicDetail.jsx';

export default function App() {
  const [subject, setSubject] = useState('');
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [selected, setSelected] = useState(null);

  const handleSample = () => {
    const sample = 'Data structures and algorithms: graphs, trees, dynamic programming, sorting, hash tables, and complexity';
    setSubject(sample);
  };

  const handleGenerate = () => {
    const topics = extractTopics(subject);
    const { nodes, links } = buildGraph(topics);
    setGraph({ nodes, links });
    setSelected(nodes[0] || null);
  };

  const sidebarTitle = useMemo(() => (selected ? selected.label : 'Topic'), [selected]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeroSection />
      <SubjectInput
        value={subject}
        onChange={setSubject}
        onGenerate={handleGenerate}
        onSample={handleSample}
      />

      <main className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          {graph.nodes.length ? (
            <ConceptGraph nodes={graph.nodes} links={graph.links} onSelect={setSelected} />
          ) : (
            <div className="h-[520px] flex items-center justify-center text-slate-400">Enter a subject and generate a graph.</div>
          )}
        </section>
        <aside className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <h2 className="font-semibold text-slate-200 mb-2">Learning Path</h2>
            <ol className="list-decimal pl-5 space-y-1 text-slate-300">
              {computeLearningPath(graph).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <TopicDetail topic={selected} />
        </aside>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500">
        Built for students. Stay curious.
      </footer>
    </div>
  );
}

// --- Helpers ---
function extractTopics(input) {
  const base = [
    'Data Structures',
    'Algorithms',
    'Graphs',
    'Trees',
    'Dynamic Programming',
    'Sorting',
    'Hash Tables',
    'Complexity',
  ];

  const found = new Set();
  const lower = input.toLowerCase();
  base.forEach((b) => {
    if (lower.includes(b.toLowerCase())) found.add(b);
  });

  const topics = Array.from(found);
  if (!topics.length) return base.slice(0, 6); // a gentle default set
  return topics;
}

function buildGraph(topicLabels) {
  if (!topicLabels.length) return { nodes: [], links: [] };
  const nodes = topicLabels.map((label, i) => ({ id: `n${i}`, label, type: i === 0 ? 'core' : 'topic' }));

  // connect core to others and add a few cross-links
  const links = [];
  for (let i = 1; i < nodes.length; i++) {
    links.push({ source: nodes[0].id, target: nodes[i].id });
  }
  for (let i = 1; i < nodes.length - 1; i++) {
    if (i % 2 === 1) links.push({ source: nodes[i].id, target: nodes[i + 1].id });
  }
  return { nodes, links };
}

function computeLearningPath(graph) {
  if (!graph.nodes?.length) return [];
  const core = graph.nodes[0]?.label || 'Core';
  const rest = graph.nodes.slice(1).map((n) => n.label);
  return [
    `Start with core concepts in ${core}`,
    ...rest.map((t) => `Study ${t} with hands-on examples`),
    'Practice mixed problems and review complexity trade-offs',
  ];
}
