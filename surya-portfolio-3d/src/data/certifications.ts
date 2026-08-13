import type { Certification } from '../types';

export const CORE_CERTS: Certification[] = [
  {
    title: 'HackerRank Python (Basic)',
    org: 'HackerRank',
    desc: 'Verified credential demonstrating foundational Python programming proficiency and problem-solving capabilities.',
    id: 'ID: B063ADB8F797',
    link: 'https://www.hackerrank.com/certificates/B063ADB8F797',
  },
  {
    title: 'Google Introduction to Generative AI',
    org: 'Google',
    desc: 'Training on large language models, prompt engineering, and responsible AI development practices.',
    id: 'ID: 21819345',
    link: 'https://www.skills.google/public_profiles/371f7380-3c4e-41b9-95f6-bfb66d1c8f14/badges/21819345',
  },
  {
    title: 'Google Introduction to Responsible AI',
    org: 'Google',
    desc: 'Ethical AI principles, fairness, accountability, and transparency in machine learning systems deployment.',
    id: 'ID: 25141896',
    link: 'https://www.skills.google/public_profiles/371f7380-3c4e-41b9-95f6-bfb66d1c8f14/badges/25141896',
  },
  {
    title: 'IBM Data Fundamentals',
    org: 'IBM SkillsBuild',
    desc: 'Foundational certification covering data concepts, analytics, databases, and visualization.',
    id: 'Issued by IBM SkillsBuild',
    link: 'https://www.credly.com/badges/f2dfd693-fc5d-4b74-b733-3ab30a9e47bc/public_url',
  },
];

export const FORAGE_CERTS: Certification[] = [
  {
    title: 'Deloitte Australia — Data Analytics Job Simulation',
    org: 'Deloitte',
    desc: 'Virtual job simulation in data analytics, developing skills in data interpretation, visualization, and formal business communication.',
    id: 'ID: AapkYSRRo5EwKjgXh',
    link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_694bb99af76d215bcf2d1e1c_1783792752820_completion_certificate.pdf',
  },
  {
    title: 'Tata — GenAI Powered Data Analytics Job Simulation',
    org: 'Tata',
    desc: 'Hands-on experience with generative AI tools for data analytics, including prompt engineering and AI-driven insights.',
    id: 'ID: ZFjP4aRYg3zSzwJgs',
    link: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_694bb99af76d215bcf2d1e1c_1783791658913_completion_certificate.pdf',
  },
  {
    title: 'Forage Academy — Data Labeling Job Simulation',
    org: 'Forage Academy',
    desc: 'Practical training in data labeling, software documentation, and data privacy compliance for ML datasets.',
    id: 'ID: 6a51fd3e6e8414e4b8a67df4',
    link: 'https://www.theforage.com/completion-certificates/HgpPSsyQpzob6HEh9/Fnbjyox4Y4SciuEGF_HgpPSsyQpzob6HEh9_694bb99af76d215bcf2d1e1c_1783760475460_completion_certificate.pdf',
  },
];

export const GDE_BADGE_URL = 'https://developers.google.com/profile/badges/recognitions/learnings';

export const GDE_CATEGORIES = [
  { title: 'Generative AI', desc: 'Gemini, PaLM, LangChain4J, LLM prompt engineering, multimodal AI' },
  { title: 'Vertex AI & MLOps', desc: 'Hyperparameter tuning, distributed training, model deployment' },
  { title: 'Data Engineering', desc: 'BigQuery, PySpark, Dataproc, Dataflow, Apache Spark' },
  { title: 'Pipelines & Orchestration', desc: 'Kubeflow, Airflow, MiniKF, Kale, HP tuning pipelines' },
  { title: 'Google Cloud Platform', desc: 'GKE, Cloud Dataflow, Firebase, Workspace automation' },
  { title: 'Deep Learning & Vision', desc: 'Keras, ConvNets, SqueezeNet, Xception, TPUs' },
  { title: 'Game & App Dev', desc: 'Flutter, Firebase multiplayer, Gemini API integration' },
  { title: 'AI Agents & Forecasting', desc: 'Stateful agents, raw data forecasting, Kaggle' },
  { title: 'Hardware Acceleration', desc: 'NVIDIA NIM deployment, TPU training, distributed setups' },
];
