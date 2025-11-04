import { useEffect, useState } from 'react';

function generateSummary(topic) {
  const t = topic.toLowerCase();
  if (t.includes('deadlock')) {
    return {
      summary:
        'A deadlock occurs when processes hold resources while waiting for others, creating a circular wait so none can proceed. It requires mutual exclusion, hold-and-wait, no preemption, and circular wait. Avoidance uses Bankers Algorithm to ensure safe states.',
      example: 'Example: Two processes each hold one mutex and wait to acquire the other; both block forever.',
      related: 'Resource Allocation Graph',
      interview: "Explain Banker's Algorithm and safe vs. unsafe states.",
    };
  }
  if (t.includes('thread')) {
    return {
      summary:
        'Threads are lightweight execution units within a process sharing memory and resources. They enable concurrency and can improve responsiveness on multicore systems. Synchronization mechanisms are required to protect shared data.',
      example:
        'Example (pseudocode): spawn 4 worker threads that process items from a shared queue guarded by a mutex.',
      related: 'Synchronization',
      interview: 'What issues can occur with shared-memory threads and how do you prevent race conditions?',
    };
  }
  if (t.includes('normalization')) {
    return {
      summary:
        'Normalization organizes database tables to reduce redundancy and improve integrity. Normal forms (1NF to BCNF) set constraints on attributes and dependencies.',
      example: 'Example: Split a customer-order table into Customers and Orders by functional dependencies.',
      related: 'Functional Dependencies',
      interview: 'Differentiate 3NF and BCNF with an example.',
    };
  }
  if (t.includes('queue')) {
    return {
      summary:
        'A queue is a FIFO data structure supporting enqueue and dequeue. Variants like priority queues and circular queues optimize for different use cases.',
      example: 'Example (JS): const q = []; q.push(x); const y = q.shift();',
      related: 'Stacks',
      interview: 'How would you implement a queue using two stacks?',
    };
  }
  return {
    summary:
      `${topic} is a core concept in computer science. Learn the definition, key operations, common pitfalls, and where it fits within the broader system design landscape.`,
    example: 'Example: Consider a minimal, real-world use-case and trace the data flow across components.',
    related: 'Foundational Concepts',
    interview: `Give a concise explanation of ${topic} and one trade-off involved.`,
  };
}

export default function TopicDetail({ topic }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!topic) return setInfo(null);
    // Simulate an AI summary locally for demo; replace with backend call later
    const data = generateSummary(topic);
    setInfo(data);
  }, [topic]);

  if (!topic) {
    return (
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6 text-center text-neutral-400">
          Click a node in the graph to view details here.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-neutral-100">{topic}</h3>
            <p className="mt-3 text-neutral-200/90 leading-relaxed">{info?.summary}</p>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4 md:gap-5">
          <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-neutral-200 mb-1">Example</h4>
            <p className="text-sm text-neutral-300">{info?.example}</p>
          </div>
          <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-neutral-200 mb-1">Related Concept</h4>
            <p className="text-sm text-neutral-300">{info?.related}</p>
          </div>
          <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-neutral-200 mb-1">Interview Question</h4>
            <p className="text-sm text-neutral-300">{info?.interview}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
