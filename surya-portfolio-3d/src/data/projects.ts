import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    slug: 'weather-report',
    index: '01',
    name: 'Weather Report Application',
    tag: 'Web App',
    description:
      'Real-time weather tracking application with location-based forecasts, interactive maps, and 7-day predictions.',
    problem: 'People needed a fast, clean way to check hyper-local weather without wading through ad-heavy sites.',
    approach:
      'Built a lightweight React front end that queries the OpenWeatherMap API, cached responses client-side, and rendered forecasts with Chart.js for quick visual scanning.',
    outcome: 'A snappy, distraction-free forecast tool with a 7-day outlook and location search.',
    stack: ['React', 'OpenWeather API', 'Tailwind', 'Chart.js'],
    link: 'https://surya20062425.github.io/weather-app/',
  },
  {
    slug: 'spotify-clone',
    index: '02',
    name: 'Spotify Clone',
    tag: 'Music',
    description:
      'Feature-rich music streaming interface with playlist management, playback controls, and Spotify-matching UI.',
    problem: 'Wanted to prove I could reproduce a best-in-class media UI, including its playback state machine.',
    approach:
      'Used the Web Audio API for playback control, React context for global player state, and MongoDB to persist playlists.',
    outcome: 'A pixel-accurate clone with working playlists, queueing, and responsive playback controls.',
    stack: ['React', 'Node.js', 'MongoDB', 'Web Audio API'],
    link: 'https://surya20062425.github.io/spotify_clone/',
  },
  {
    slug: 'resume-builder',
    index: '03',
    name: 'Resume Builder',
    tag: 'Production',
    description:
      'Dynamic resume generator with customizable templates, live preview, and PDF export.',
    problem: 'Most resume builders lock good templates behind a paywall or export badly formatted PDFs.',
    approach:
      'Built a live-preview editor in React, generated print-accurate PDFs with jsPDF, and persisted drafts in local storage.',
    outcome: 'A free, template-based resume tool that exports clean, ATS-friendly PDFs.',
    stack: ['React', 'jsPDF', 'LocalStorage', 'CSS Grid'],
    link: 'https://surya20062425.github.io/resume_builder/',
  },
  {
    slug: 'ecommerce',
    index: '04',
    name: 'Ecommerce Website',
    tag: 'Full Stack',
    description:
      'A fully functional online store with product catalog, cart, checkout flow, and order management.',
    problem: 'Needed a full-stack reference build covering catalog, cart persistence, and order state.',
    approach:
      'Node/Express REST API backed by MongoDB, with a React storefront handling cart state and a simulated checkout flow.',
    outcome: 'An end-to-end shopping flow from browsing to order confirmation.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://surya20062425.github.io/Ecomerce/',
  },
  {
    slug: 'work-tracker',
    index: '05',
    name: 'Work Tracker',
    tag: 'Full Stack',
    description:
      'Time tracking application with task management, timer functionality, and productivity analytics.',
    problem: 'Wanted a minimal timer/task tool without the bloat of full project-management suites.',
    approach:
      'Express API for tasks and time entries, with a React dashboard aggregating daily/weekly time spent per task.',
    outcome: 'A lightweight tracker that logs focused work sessions and visualizes where time actually goes.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://surya20062425.github.io/work_tracker/',
  },
  {
    slug: 'qr-generator',
    index: '06',
    name: 'QR Generator',
    tag: 'Tool',
    description:
      'A clean QR code generator that creates scannable codes from text or URLs with customizable styles and colors.',
    problem: 'Most free QR generators are cluttered with ads or watermark the output.',
    approach: 'A single-page Streamlit tool using the qrcode and Pillow libraries for instant, downloadable PNGs.',
    outcome: 'A no-friction QR generator with live preview and instant PNG download.',
    stack: ['Streamlit', 'Python', 'qrcode', 'Pillow'],
    link: 'https://surya20062425.github.io/qr-generator/',
  },
];
