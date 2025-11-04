import { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import SubjectInput from './components/SubjectInput.jsx';
import ConceptGraph from './components/ConceptGraph.jsx';
import TopicDetail from './components/TopicDetail.jsx';

function extractTopics(input) {
  // Basic, client-side extraction for demo mode; replace with backend AI later
  const text = (input || '').trim();
  const subjects = text
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const seed = {
    'operating systems': {
      topics: ['Processes', 'Threads', 'CPU Scheduling', 'Deadlocks', 'Memory Management', 'Synchronization'],
      edges: [
        ['Threads', 'Synchronization'],
        ['Deadlocks', 'Resource Allocation'],
        ['Threads', 'CPU Scheduling'],
      ],
    },
    'computer networks': {
      topics: ['OSI Model', 'TCP/UDP', 'Sockets', 'Routing', 'DNS', 'Congestion Control'],
      edges: [
        ['Sockets', 'TCP/UDP'],
        ['TCP/UDP', 'Congestion Control'],
      ],
    },
    'database systems': {
      topics: ['ER Modeling', 'Normalization', 'Transactions', 'Indexing', 'SQL', 'Concurrency Control'],
      edges: [
        ['Normalization', 'ER Modeling'],
        ['Transactions', 'Concurrency Control'],
        ['Transactions', 'Recovery'],
      ],
    },
    'data structures': {
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Heaps', 'Hashing'],
      edges: [
        ['Queues', 'Buffers'],
        ['Graphs', 'Shortest Path'],
      ],
    },
    'artificial intelligence': {
      topics: ['Search', 'Heuristics', 'Adversarial Search', 'Probability', 'Bayesian Networks', 'ML Basics'],
      edges: [
        ['Heuristics', 'Search'],
        ['ML Basics', 'Probability'],
      ],
    },
  };

  const subjectKeys = Object.keys(seed);
  let topics = new Set();
  let edges = [];

  const inputLower = text.toLowerCase();
  subjectKeys.forEach((k) => {
    if (inputLower.includes(k) || subjects.some((s) => s.toLowerCase().includes(k))) {
      seed[k].topics.forEach((t) => topics.add(t));
      edges = edges.concat(seed[k].edges);
    }
  });

  if (topics.size === 0) {
    // fallback: parse capitalized words as topics
    const matches = text.match(/[A-Z][A-Za-z ]{2,}/g) || [];
    matches.slice(0, 10).forEach((m) => topics.add(m.trim()));
  }

  // Cross-subject illustrative links
  if (topics.has('Threads') && topics.has('Sockets')) edges.push(['Threads', 'Sockets']);
  if (topics.has('Queues') && topics.has('Deadlocks')) edges.push(['Queues', 'Deadlocks']);
  if (topics.has('Normalization') && topics.has('Indexing')) edges.push(['Normalization', 'Indexing']);

  // Normalize to node/edge objects
  const nodeArr = Array.from(topics).map((t) => ({ id: t, label: t }));
  const edgeArr = edges
    .filter(([a, b]) => a && b && a !== b)
    .map(([a, b]) => ({ from: a, to: b }));

  return { nodes: nodeArr, edges: edgeArr };
}

function computeLearningPath(graph) {
  // Simple heuristic: degree-based ordering (lower degree first as prerequisite-like)
  const deg = new Map();
  graph.nodes.forEach((n) => deg.set(n.id, 0));
  graph.edges.forEach((e) => {
    deg.set(e.from, (deg.get(e.from) || 0) + 1);
    deg.set(e.to, (deg.get(e.to) || 0) + 1);
  });
  return [...graph.nodes]
    .sort((a, b) => (deg.get(a.id) || 0) - (deg.get(b.id) || 0) || a.label.localeCompare(b.label))
    .map((n, i) => `${i + 1}. ${n.label}`);
}

export default function App() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [selected, setSelected] = useState(null);

  const path = useMemo(() => computeLearningPath(graph), [graph]);

  const handleGenerate = (text) => {
    const g = extractTopics(text);
    setGraph(g);
    setSelected(g.nodes[0]?.id || null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <SubjectInput onGenerate={handleGenerate} />

      <div className="max-w-6xl mx-auto px-4 mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConceptGraph data={graph} selected={selected} onSelect={setSelected} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Suggested Learning Path</h3>
            {path.length > 0 ? (
              <ol className="list-decimal list-inside text-slate-700 space-y-1">
                {path.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            ) : (
              <p className="text-slate-500">Enter subjects to see a recommended order.</p>
            )}
          </div>
          <TopicDetail topic={selected} />
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-500">
        <p>
          CS Assistant is an educational helper. For deeper explanations and quizzes, integrate with a backend AI model.
        </p>
      </footer>
    </div>
  );
}
