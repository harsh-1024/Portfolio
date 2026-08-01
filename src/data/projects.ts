// src/data/projects.ts

import { Project, ProjectCategory } from '@/types';

export const projects: Project[] = [
  {
    id: 'neural-shield',
    title: 'NeuralShield',
    description: 'AI-powered real-time threat detection system processing 10M+ events/day with sub-50ms latency.',
    longDescription: `NeuralShield is a production-grade threat detection platform that combines transformer-based anomaly detection with traditional signature matching. The system ingests network telemetry, endpoint logs, and cloud audit trails, processing them through an ensemble of models to identify both known and novel attack patterns.

Key innovations include a custom attention mechanism optimized for sequential log data, an active learning loop that reduces false positives by 73%, and a model serving architecture built on Triton Inference Server with ONNX-optimized models achieving 99.9th percentile latency under 50ms.`,
    thumbnail: '/images/projects/neural-shield.jpg',
    images: [
      '/images/projects/neural-shield-1.jpg',
      '/images/projects/neural-shield-2.jpg',
      '/images/projects/neural-shield-3.jpg',
    ],
    techStack: ['Python', 'PyTorch', 'Triton', 'Kafka', 'Redis', 'PostgreSQL', 'Kubernetes', 'Go', 'React', 'TypeScript'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/alexchen/neural-shield',
    liveUrl: 'https://neural-shield.demo.com',
    featured: true,
    status: 'completed',
    startDate: '2023-01',
    endDate: '2023-12',
    highlights: [
      'Processes 10M+ events/day with 99.9% uptime',
      'Sub-50ms p99 inference latency',
      '73% reduction in false positives via active learning',
      'Deployed across 3 cloud regions with auto-scaling',
    ],
    challenges: [
      'Balancing detection accuracy with inference latency requirements',
      'Handling concept drift in evolving threat landscapes',
      'Scaling model serving to handle traffic spikes',
    ],
    solutions: [
      'Ensemble of lightweight transformers + gradient boosted trees',
      'Continuous retraining pipeline with drift detection',
      'Triton + ONNX + K8s HPA with custom metrics',
    ],
  },
  {
    id: 'codeguard-ai',
    title: 'CodeGuard AI',
    description: 'Automated code review agent that catches security vulnerabilities and logic errors before merge.',
    longDescription: `CodeGuard AI is an LLM-powered code review assistant that integrates directly into GitHub/GitLab PR workflows. It uses a fine-tuned CodeLlama model augmented with a retrieval-augmented generation (RAG) system containing 500K+ vulnerability patterns and secure coding guidelines.

The system performs semantic analysis beyond static analysis tools, understanding control flow, data dependencies, and business logic to identify issues like authorization bypasses, injection vulnerabilities, and race conditions that traditional SAST tools miss.`,
    thumbnail: '/images/projects/codeguard-ai.jpg',
    images: [
      '/images/projects/codeguard-1.jpg',
      '/images/projects/codeguard-2.jpg',
    ],
    techStack: ['Python', 'Go', 'CodeLlama', 'LangChain', 'Weaviate', 'GitHub API', 'React', 'TypeScript'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/alexchen/codeguard-ai',
    liveUrl: 'https://codeguard.demo.com',
    featured: true,
    status: 'completed',
    startDate: '2023-06',
    endDate: '2024-03',
    highlights: [
      'Detected 200+ vulnerabilities missed by SAST in beta',
      '92% precision on security findings',
      'Integrated with 50+ repositories',
      'Reduced review time by 40%',
    ],
    challenges: [
      'Hallucination reduction in security-critical context',
      'Context window limitations for large PRs',
      'Latency requirements for PR workflow integration',
    ],
    solutions: [
      'RAG with verified vulnerability database + few-shot prompting',
      'Hierarchical chunking + sliding window for large files',
      'Async processing with webhook callbacks',
    ],
  },
  {
    id: 'dataflow-platform',
    title: 'DataFlow Platform',
    description: 'Real-time data streaming platform processing 500K events/sec with exactly-once semantics.',
    longDescription: `DataFlow is a unified streaming platform built on Apache Flink and Kafka, providing exactly-once processing guarantees, schema evolution, and a declarative SQL-like interface for stream transformations. It powers real-time analytics, feature stores for ML, and event-driven microservices across the organization.

The platform includes a custom schema registry with Avro/Protobuf support, a Flink SQL compiler with optimization rules, and a multi-tenant resource management system with fair scheduling.`,
    thumbnail: '/images/projects/dataflow.jpg',
    images: [
      '/images/projects/dataflow-1.jpg',
      '/images/projects/dataflow-2.jpg',
    ],
    techStack: ['Java', 'Flink', 'Kafka', 'Scala', 'Kubernetes', 'Prometheus', 'Grafana', 'PostgreSQL'],
    category: 'backend',
    githubUrl: 'https://github.com/alexchen/dataflow-platform',
    featured: true,
    status: 'in-progress',
    startDate: '2022-09',
    highlights: [
      '500K events/sec with exactly-once guarantees',
      'Sub-second end-to-end latency',
      'Multi-tenant with resource isolation',
      'Declarative SQL interface for transformations',
    ],
    challenges: [
      'Exactly-once at scale with schema evolution',
      'Backpressure handling during traffic spikes',
      'Multi-tenancy with fair resource sharing',
    ],
    solutions: [
      'Two-phase commit sinks + Kafka transactions',
      'Adaptive watermark alignment + unaligned checkpoints',
      'Hierarchical slot pools + priority-based scheduling',
    ],
  },
  {
    id: 'securenet',
    title: 'SecureNet',
    description: 'Zero-trust network architecture with eBPF-based service mesh providing mTLS, authorization, and observability.',
    longDescription: `SecureNet replaces traditional sidecar-based service meshes with an eBPF-native approach, eliminating the performance overhead of proxy sidecars while providing mutual TLS, fine-grained authorization (OPA-based), and full L7 observability. The system operates at the kernel level, intercepting socket operations to enforce policies without application modifications.

Key components include a userspace control plane for certificate rotation and policy distribution, an eBPF data plane for traffic interception, and a distributed tracing integration compatible with OpenTelemetry.`,
    thumbnail: '/images/projects/securenet.jpg',
    images: [
      '/images/projects/securenet-1.jpg',
      '/images/projects/securenet-2.jpg',
    ],
    techStack: ['Go', 'eBPF', 'Cilium', 'OPA', 'Kubernetes', 'Prometheus', 'Grafana', 'Envoy'],
    category: 'cybersecurity',
    githubUrl: 'https://github.com/alexchen/securenet',
    liveUrl: 'https://securenet.demo.com',
    featured: true,
    status: 'completed',
    startDate: '2022-01',
    endDate: '2022-12',
    highlights: [
      'Zero sidecar overhead — 40% latency reduction',
      '100% mTLS coverage across 200+ services',
      'Sub-millisecond policy enforcement',
      'Full L7 observability without code changes',
    ],
    challenges: [
      'eBPF verifier complexity for L7 parsing',
      'Certificate rotation at scale without downtime',
      'Kernel version compatibility across node pools',
    ],
    solutions: [
      'Bytecode rewriting + CO-RE for portability',
      'SPIFFE/SPIRE integration with workload attestation',
      'Feature detection + graceful degradation',
    ],
  },
  {
    id: 'ml-observability',
    title: 'ML Observability Platform',
    description: 'End-to-end ML model monitoring with drift detection, performance tracking, and automated alerting.',
    longDescription: `A comprehensive observability platform for production ML systems, tracking data drift, concept drift, prediction latency, throughput, and business metrics. Features statistical drift detectors (PSI, KS-test, MMD), custom metric builders, and integration with MLflow, Kubeflow, and custom training pipelines.

The platform includes a feature store monitoring module, an automated retraining trigger system, and a model comparison dashboard for A/B testing and champion/challenger evaluation.`,
    thumbnail: '/images/projects/ml-observability.jpg',
    images: [
      '/images/projects/ml-obs-1.jpg',
      '/images/projects/ml-obs-2.jpg',
    ],
    techStack: ['Python', 'React', 'TypeScript', 'ClickHouse', 'Grafana', 'Prometheus', 'MLflow', 'Kubernetes'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/alexchen/ml-observability',
    liveUrl: 'https://ml-obs.demo.com',
    featured: true,
    status: 'completed',
    startDate: '2023-03',
    endDate: '2023-11',
    highlights: [
      'Monitors 50+ production models',
      'Detected 12 drift incidents before business impact',
      'Automated retraining reduced stale models by 80%',
      'Sub-minute alert latency for critical drifts',
    ],
    challenges: [
      'High-cardinality metric storage at scale',
      'Statistical test selection for different data types',
      'Low-latency alerting on streaming predictions',
    ],
    solutions: [
      'ClickHouse with materialized views for pre-aggregation',
      'Adaptive test selection based on data distribution',
      'Flink-based streaming evaluation with Kafka alerts',
    ],
  },
  {
    id: 'crypto-audit-toolkit',
    title: 'CryptoAudit Toolkit',
    description: 'Automated cryptographic vulnerability scanner for blockchain smart contracts and TLS implementations.',
    longDescription: `CryptoAudit is a static analysis toolkit focused on cryptographic implementations, detecting issues like weak random number generation, improper key derivation, side-channel vulnerabilities, and protocol logic errors. It combines abstract interpretation with symbolic execution to analyze both Solidity smart contracts and C/Rust/TLS library code.

The toolkit includes 200+ detection rules covering NIST recommendations, common crypto pitfalls, and known vulnerability patterns from CVEs. It integrates with CI/CD pipelines and provides SARIF output for code review platforms.`,
    thumbnail: '/images/projects/crypto-audit.jpg',
    images: [
      '/images/projects/crypto-1.jpg',
      '/images/projects/crypto-2.jpg',
    ],
    techStack: ['Rust', 'Python', 'Solidity', 'Slither', 'Crytic', 'LLVM', 'Z3', 'GitHub Actions'],
    category: 'cybersecurity',
    githubUrl: 'https://github.com/alexchen/crypto-audit-toolkit',
    featured: false,
    status: 'completed',
    startDate: '2021-06',
    endDate: '2022-03',
    highlights: [
      'Found 15+ critical vulns in top 100 DeFi protocols',
      '200+ detection rules across 8 categories',
      'CI/CD integration with SARIF output',
      'Supports Solidity, Rust, C/C++, Go',
    ],
    challenges: [
      'Modeling cryptographic primitives symbolically',
      'Path explosion in symbolic execution',
      'False positive reduction for complex protocols',
    ],
    solutions: [
      'Custom SMT encodings for ECDSA, RSA, AES',
      'Bounded model checking + interpolation',
      'Machine learning classifier for finding prioritization',
    ],
  },
  {
    id: 'edge-ml-runtime',
    title: 'EdgeML Runtime',
    description: 'WebAssembly-based ML inference runtime for edge devices and browsers with SIMD acceleration.',
    longDescription: `EdgeML Runtime brings TensorFlow Lite and ONNX models to WebAssembly with near-native performance through SIMD intrinsics and WebGPU compute shaders. It enables running quantized models (INT8, INT4) directly in browsers, Cloudflare Workers, and embedded devices without server infrastructure.

The runtime includes a model optimizer that applies quantization-aware training, operator fusion, and memory planning. It supports dynamic model loading, streaming inference for large models, and a React hook library for seamless frontend integration.`,
    thumbnail: '/images/projects/edge-ml.jpg',
    images: [
      '/images/projects/edge-1.jpg',
      '/images/projects/edge-2.jpg',
    ],
    techStack: ['Rust', 'WebAssembly', 'WebGPU', 'TypeScript', 'React', 'ONNX', 'TensorFlow Lite', 'wasm-bindgen'],
    category: 'frontend',
    githubUrl: 'https://github.com/alexchen/edgeml-runtime',
    liveUrl: 'https://edgeml.demo.com',
    featured: false,
    status: 'in-progress',
    startDate: '2024-01',
    highlights: [
      '3-5x faster than TF.js for quantized models',
      'Runs in browsers, Workers, and embedded',
      'INT8/INT4 quantization with <1% accuracy drop',
      'React hooks for declarative inference',
    ],
  },
  {
    id: 'redteam-automation',
    title: 'RedTeam Automation Framework',
    description: 'Automated adversary emulation platform simulating APT tactics for continuous security validation.',
    longDescription: `A purple teaming platform that automates MITRE ATT&CK technique execution against target environments, providing continuous validation of detection and prevention controls. The framework includes 150+ atomic tests, a campaign orchestrator for multi-stage attacks, and integration with SIEM/SOAR for automated response validation.

Key features include a YAML-based campaign definition language, a safety controller with blast radius limiting, and a results correlation engine that maps test outcomes to detection gaps and MITRE coverage.`,
    thumbnail: '/images/projects/redteam.jpg',
    images: [
      '/images/projects/redteam-1.jpg',
      '/images/projects/redteam-2.jpg',
    ],
    techStack: ['Go', 'Python', 'PowerShell', 'MITRE ATT&CK', 'Elastic Stack', 'Kubernetes', 'GraphQL'],
    category: 'cybersecurity',
    githubUrl: 'https://github.com/alexchen/redteam-automation',
    featured: false,
    status: 'completed',
    startDate: '2021-01',
    endDate: '2021-12',
    highlights: [
      '150+ atomic tests covering 14 tactics',
      'Campaign orchestrator for multi-stage attacks',
      'SIEM/SOAR integration for response validation',
      'MITRE coverage heatmap reporting',
    ],
  },
  {
    id: 'distributed-config',
    title: 'Distributed Config Manager',
    description: 'GitOps-native configuration management with real-time propagation, validation, and rollback.',
    longDescription: `A configuration management system built on GitOps principles, providing real-time config propagation to applications via a lightweight agent. Features schema validation (JSON Schema, CUE), gradual rollout with canary analysis, instant rollback, and audit logging.

The system uses a CRDT-based conflict resolution for multi-cluster deployments, a WebSocket-based push mechanism for sub-second propagation, and integrates with Kubernetes operators, Consul, and etcd.`,
    thumbnail: '/images/projects/distributed-config.jpg',
    images: [
      '/images/projects/config-1.jpg',
      '/images/projects/config-2.jpg',
    ],
    techStack: ['Go', 'Rust', 'Kubernetes', 'CRDT', 'WebSocket', 'CUE', 'gRPC', 'Prometheus'],
    category: 'devops',
    githubUrl: 'https://github.com/alexchen/distributed-config',
    featured: false,
    status: 'completed',
    startDate: '2020-06',
    endDate: '2021-06',
    highlights: [
      'Sub-second config propagation to 10K+ pods',
      'Schema validation prevents 95% of config errors',
      'Canary analysis with automated rollback',
      'Multi-cluster with CRDT conflict resolution',
    ],
  },
  {
    id: 'quantum-ml-research',
    title: 'Quantum-Enhanced ML Research',
    description: 'Exploring variational quantum circuits for kernel methods and feature maps in supervised learning.',
    longDescription: `Research project investigating quantum kernel methods for classification tasks where classical kernels struggle. Implemented variational quantum circuits as feature maps using PennyLane and Qiskit, benchmarked against classical RBF and polynomial kernels on UCI datasets and synthetic high-dimensional data.

Results show quantum kernels can provide advantage on specific problem structures (periodic, symmetric) but face barren plateau challenges. Published at NeurIPS 2023 workshop on Quantum Machine Learning.`,
    thumbnail: '/images/projects/quantum-ml.jpg',
    images: [
      '/images/projects/quantum-1.jpg',
    ],
    techStack: ['Python', 'PennyLane', 'Qiskit', 'PyTorch', 'JAX', 'IBM Quantum', 'NumPy', 'SciPy'],
    category: 'research',
    githubUrl: 'https://github.com/alexchen/quantum-ml-research',
    featured: false,
    status: 'completed',
    startDate: '2022-06',
    endDate: '2023-03',
    highlights: [
      'Published at NeurIPS 2023 QML Workshop',
      'Quantum kernel advantage on structured problems',
      'Barren plateau mitigation strategies explored',
      'Open-source benchmark suite released',
    ],
  },
  {
    id: 'opensource-contributions',
    title: 'Open Source Contributions',
    description: 'Major contributor to PyTorch, Hugging Face Transformers, and Kubernetes SIG-Auth.',
    longDescription: `Active open source contributor with 200+ merged PRs across major projects. Key contributions include PyTorch distributed training optimizations (FSDP improvements), Hugging Face PEFT library LoRA/QLoRA enhancements, and Kubernetes SIG-Auth authentication/authorization features.

Also maintainer of 3 CNCF sandbox projects and regular speaker at KubeCon, PyTorch Conference, and DEF CON.`,
    thumbnail: '/images/projects/opensource.jpg',
    images: [],
    techStack: ['Python', 'Go', 'C++', 'Rust', 'C', 'Git', 'GitHub'],
    category: 'open-source',
    githubUrl: 'https://github.com/alexchen',
    featured: false,
    status: 'completed',
    startDate: '2018-01',
    highlights: [
      '200+ merged PRs to major OSS projects',
      'PyTorch FSDP performance improvements',
      'HF Transformers PEFT LoRA/QLoRA enhancements',
      'Kubernetes SIG-Auth maintainer',
      '3x CNCF project maintainer',
    ],
  },
];