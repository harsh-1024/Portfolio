// src/data/skills.ts

import { Skill, SkillCategory } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', level: 95, icon: '⚛️', color: '#61DAFB', description: 'Advanced hooks, performance optimization, SSR/SSG' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 90, icon: '▲', color: '#000000', description: 'App Router, Server Components, Edge Functions' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 95, icon: '🔷', color: '#3178C6', description: 'Advanced types, generics, template literals' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 95, icon: '💨', color: '#06B6D4', description: 'Custom configs, design systems, JIT mode' },
  { id: 'framer', name: 'Framer Motion', category: 'frontend', level: 90, icon: '🎬', color: '#0055FF', description: 'Complex animations, layout animations, shared layout' },
  { id: 'gsap', name: 'GSAP', category: 'frontend', level: 85, icon: '⚡', color: '#88CE02', description: 'ScrollTrigger, morphing, complex timelines' },
  { id: 'threejs', name: 'Three.js / R3F', category: 'frontend', level: 80, icon: '🎮', color: '#000000', description: 'WebGL, shaders, post-processing, React Three Fiber' },
  { id: 'storybook', name: 'Storybook', category: 'frontend', level: 80, icon: '📖', color: '#FF4785', description: 'Component documentation, visual testing, design tokens' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 90, icon: '🟢', color: '#339933', description: 'Event loop, streams, worker threads, native addons' },
  { id: 'python', name: 'Python', category: 'backend', level: 95, icon: '🐍', color: '#3776AB', description: 'Async/await, multiprocessing, C extensions' },
  { id: 'go', name: 'Go', category: 'backend', level: 85, icon: '🐹', color: '#00ADD8', description: 'Goroutines, channels, interfaces, CGO' },
  { id: 'rust', name: 'Rust', category: 'backend', level: 80, icon: '🦀', color: '#DEA584', description: 'Ownership, lifetimes, async, WASM' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 85, icon: '🐘', color: '#336791', description: 'Advanced queries, partitioning, replication' },
  { id: 'redis', name: 'Redis', category: 'backend', level: 90, icon: '🔴', color: '#DC382D', description: 'Pub/Sub, streams, Lua scripting, clustering' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', level: 85, icon: '◇', color: '#E10098', description: 'Schema design, federation, subscriptions, dataloader' },

  // AI/ML
  { id: 'pytorch', name: 'PyTorch', category: 'ai-ml', level: 90, icon: '🔥', color: '#EE4C2C', description: 'Custom modules, distributed training, TorchScript' },
  { id: 'tensorflow', name: 'TensorFlow/Keras', category: 'ai-ml', level: 85, icon: '🧠', color: '#FF6F00', description: 'TFX, TensorRT, TFLite, SavedModel' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai-ml', level: 85, icon: '🤗', color: '#FFD21E', description: 'Transformers, PEFT, Accelerate, Trainer API' },
  { id: 'llama', name: 'LLMs (Llama, GPT)', category: 'ai-ml', level: 80, icon: '🦙', color: '#FF6B35', description: 'Fine-tuning, RAG, quantization, vLLM/TGI serving' },
  { id: 'langchain', name: 'LangChain/LangGraph', category: 'ai-ml', level: 80, icon: '🦜', color: '#1C3C3C', description: 'Agents, chains, memory, tool calling' },
  { id: 'mlops', name: 'MLOps (MLflow, Kubeflow)', category: 'ai-ml', level: 85, icon: '📊', color: '#0194E2', description: 'Experiment tracking, model registry, pipelines' },
  { id: 'onnx', name: 'ONNX / TensorRT', category: 'ai-ml', level: 80, icon: '⚙️', color: '#005FDD', description: 'Model optimization, quantization, inference acceleration' },
  { id: 'pandas', name: 'Pandas / NumPy', category: 'ai-ml', level: 95, icon: '📊', color: '#150458', description: 'Data manipulation, feature engineering, EDA' },
  { id: 'wandb', name: 'Weights & Biases', category: 'ai-ml', level: 85, icon: '📈', color: '#FFBE00', description: 'Experiment tracking, sweeps, artifacts, reports' },

  // Cybersecurity
  { id: 'burp', name: 'Burp Suite', category: 'cybersecurity', level: 90, icon: '🔒', color: '#FF6633', description: 'Pro, extensions, BApps, Turbo Intruder' },
  { id: 'nmap', name: 'Nmap / Masscan', category: 'cybersecurity', level: 85, icon: '🛡️', color: '#00A878', description: 'Scripting engine, service detection, evasion' },
  { id: 'metasploit', name: 'Metasploit', category: 'cybersecurity', level: 80, icon: '💥', color: '#FF0000', description: 'Exploit development, post-exploitation, meterpreter' },
  { id: 'wireshark', name: 'Wireshark', category: 'cybersecurity', level: 85, icon: '📡', color: '#1679A7', description: 'Packet analysis, custom dissectors, Lua scripting' },
  { id: 'ebpf', name: 'eBPF / bpftrace', category: 'cybersecurity', level: 80, icon: '🐝', color: '#3399FF', description: 'Kernel tracing, security monitoring, XDP' },
  { id: 'ghidra', name: 'Ghidra / IDA Pro', category: 'cybersecurity', level: 75, icon: '🔍', color: '#FF9900', description: 'Reverse engineering, decompilation, scripting' },

  // Cloud
  { id: 'aws', name: 'AWS', category: 'cloud', level: 90, icon: '☁️', color: '#FF9900', description: 'Lambda, ECS/EKS, SageMaker, Bedrock, CDK' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', level: 80, icon: '☁️', color: '#4285F4', description: 'Cloud Run, Vertex AI, Cloud Functions, Dataflow' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'cloud', level: 85, icon: '☸️', color: '#326CE5', description: 'Operators, Helm, Kustomize, admission controllers' },
  { id: 'docker', name: 'Docker / Podman', category: 'cloud', level: 95, icon: '🐳', color: '#2496ED', description: 'Multi-stage builds, BuildKit, security scanning' },
  { id: 'terraform', name: 'Terraform', category: 'cloud', level: 85, icon: '📜', color: '#7B42BC', description: 'Modules, state management, providers, testing' },
  { id: 'cloudflare', name: 'Cloudflare Workers', category: 'cloud', level: 80, icon: '🌐', color: '#F38020', description: 'Edge computing, Durable Objects, D1, KV' },

  // Databases
  { id: 'postgres', name: 'PostgreSQL', category: 'databases', level: 85, icon: '🐘', color: '#336791', description: 'Advanced indexing, partitioning, logical replication' },
  { id: 'mongodb', name: 'MongoDB', category: 'databases', level: 80, icon: '🍃', color: '#47A248', description: 'Aggregation pipeline, sharding, transactions' },
  { id: 'redis-db', name: 'Redis', category: 'databases', level: 90, icon: '🔴', color: '#DC382D', description: 'Streams, RedisJSON, RediSearch, clustering' },
  { id: 'clickhouse', name: 'ClickHouse', category: 'databases', level: 75, icon: '🏠', color: '#FCA100', description: 'OLAP, materialized views, MergeTree engines' },
  { id: 'vector-db', name: 'Vector DBs (Pinecone, Weaviate)', category: 'databases', level: 80, icon: '🔍', color: '#8B5CF6', description: 'Embeddings, similarity search, hybrid search' },

  // Languages
  { id: 'python-lang', name: 'Python', category: 'languages', level: 95, icon: '🐍', color: '#3776AB' },
  { id: 'typescript-lang', name: 'TypeScript', category: 'languages', level: 95, icon: '🔷', color: '#3178C6' },
  { id: 'go-lang', name: 'Go', category: 'languages', level: 85, icon: '🐹', color: '#00ADD8' },
  { id: 'rust-lang', name: 'Rust', category: 'languages', level: 80, icon: '🦀', color: '#DEA584' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', level: 95, icon: '💛', color: '#F7DF1E' },
  { id: 'cpp', name: 'C++', category: 'languages', level: 75, icon: '⚙️', color: '#00599C' },
  { id: 'sql', name: 'SQL', category: 'languages', level: 90, icon: '🗃️', color: '#E38C00' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', level: 95, icon: '🌿', color: '#F05032', description: 'Rebase, cherry-pick, bisect, worktrees, hooks' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tools', level: 90, icon: '⚙️', color: '#2088FF', description: 'Workflows, reusable workflows, custom actions' },
  { id: 'jenkins', name: 'Jenkins / GitLab CI', category: 'tools', level: 80, icon: '🔧', color: '#D24939', description: 'Pipelines, shared libraries, declarative syntax' },
  { id: 'linux', name: 'Linux / Bash', category: 'tools', level: 90, icon: '🐧', color: '#FCC624', description: 'System admin, networking, performance tuning' },
  { id: 'vim', name: 'Neovim / VS Code', category: 'tools', level: 90, icon: '⌨️', color: '#57A143', description: 'LSP, treesitter, debugging, custom plugins' },
  { id: 'observability', name: 'Observability (Grafana, Datadog)', category: 'tools', level: 85, icon: '📊', color: '#F46800', description: 'Metrics, logs, traces, alerting, SLOs' },
];