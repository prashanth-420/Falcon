#!/usr/bin/env node
/**
 * FALCON Framework - Automated Project & ZIP Creator (Node.js version)
 * --------------------------------------------------------------------
 * Generates the full 'falcon-framework' directory and archives it into
 * 'falcon-framework.zip' using only built-in Node.js modules (no npm install needed).
 *
 * Usage in terminal:
 *   node build_falcon_project.js
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PROJECT_DIR = 'falcon-framework';

// 1. package.json
const PACKAGE_JSON = `{
  "name": "falcon-framework",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.6"
  }
}
`;

// 2. vite.config.js
const VITE_CONFIG_JS = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;

// 3. tailwind.config.js
const TAILWIND_CONFIG_JS = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

// 4. postcss.config.js
const POSTCSS_CONFIG_JS = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

// 5. .gitignore
const GITIGNORE = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

node_modules
dist
dist-ssr
*.local

.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
`;

// 6. index.html
const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FALCON — Real-Time Availability & Failure Propagation Framework</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

// 7. public/favicon.svg
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
</svg>
`;

// 8. src/index.css
const INDEX_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    margin: 0;
    padding: 0;
    background-color: #000000;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
`;

// 9. src/main.jsx
const MAIN_JSX = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

// 10. README.md
const README_MD = `# FALCON Real-Time Framework Demo

FALCON: Failure Analysis through Linked Cascading Observation Networks
Developed with React, Vite, Tailwind CSS, and Lucide Icons.

## Quick Start
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
\`\`\`

Visit \`http://localhost:5173\` in your browser.
`;

// 11. src/App.jsx
const APP_JSX = `import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  Sliders, 
  Smartphone, 
  Share2, 
  BarChart3, 
  ShieldAlert, 
  Clock, 
  Zap, 
  Database, 
  ArrowRight, 
  Terminal, 
  SlidersHorizontal,
  ChevronRight, 
  Layers, 
  Monitor,
  Apple,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';

const FAILURE_TYPES = [
  'Crash',
  'ANR',
  'DataLoss',
  'AuthFailure',
  'NetworkFailure',
  'NotificationFailure',
  'UIFailure'
];

const SEVERITY = {
  Crash: 1.00,
  DataLoss: 1.00,
  ANR: 0.75,
  AuthFailure: 0.75,
  NetworkFailure: 0.50,
  UIFailure: 0.50,
  NotificationFailure: 0.25,
};

const FAILURE_THEME_APPLE = {
  Crash: {
    color: '#FF453A',
    glow: 'rgba(255, 69, 58, 0.25)',
    bg: 'rgba(255, 69, 58, 0.12)',
    border: 'rgba(255, 69, 58, 0.35)',
    badge: 'text-[#FF453A] bg-[#FF453A]/12 border-[#FF453A]/30',
  },
  DataLoss: {
    color: '#FF9F0A',
    glow: 'rgba(255, 159, 10, 0.25)',
    bg: 'rgba(255, 159, 10, 0.12)',
    border: 'rgba(255, 159, 10, 0.35)',
    badge: 'text-[#FF9F0A] bg-[#FF9F0A]/12 border-[#FF9F0A]/30',
  },
  ANR: {
    color: '#FFD60A',
    glow: 'rgba(255, 214, 10, 0.25)',
    bg: 'rgba(255, 214, 10, 0.12)',
    border: 'rgba(255, 214, 10, 0.35)',
    badge: 'text-[#FFD60A] bg-[#FFD60A]/12 border-[#FFD60A]/30',
  },
  AuthFailure: {
    color: '#BF5AF2',
    glow: 'rgba(191, 90, 242, 0.25)',
    bg: 'rgba(191, 90, 242, 0.12)',
    border: 'rgba(191, 90, 242, 0.35)',
    badge: 'text-[#BF5AF2] bg-[#BF5AF2]/12 border-[#BF5AF2]/30',
  },
  NetworkFailure: {
    color: '#0A84FF',
    glow: 'rgba(10, 132, 255, 0.25)',
    bg: 'rgba(10, 132, 255, 0.12)',
    border: 'rgba(10, 132, 255, 0.35)',
    badge: 'text-[#0A84FF] bg-[#0A84FF]/12 border-[#0A84FF]/30',
  },
  UIFailure: {
    color: '#8E8E93',
    glow: 'rgba(142, 142, 147, 0.25)',
    bg: 'rgba(142, 142, 147, 0.12)',
    border: 'rgba(142, 142, 147, 0.35)',
    badge: 'text-[#D1D1D6] bg-[#8E8E93]/15 border-[#8E8E93]/35',
  },
  NotificationFailure: {
    color: '#64D2FF',
    glow: 'rgba(100, 210, 255, 0.25)',
    bg: 'rgba(100, 210, 255, 0.12)',
    border: 'rgba(100, 210, 255, 0.35)',
    badge: 'text-[#64D2FF] bg-[#64D2FF]/12 border-[#64D2FF]/30',
  },
};

const FAILURE_THEME_FLUENT = {
  Crash: {
    color: '#F1707B',
    glow: 'rgba(241, 112, 123, 0.25)',
    bg: 'rgba(241, 112, 123, 0.12)',
    border: 'rgba(241, 112, 123, 0.35)',
    badge: 'text-[#F1707B] bg-[#F1707B]/12 border-[#F1707B]/30',
  },
  DataLoss: {
    color: '#FCE100',
    glow: 'rgba(252, 225, 0, 0.25)',
    bg: 'rgba(252, 225, 0, 0.12)',
    border: 'rgba(252, 225, 0, 0.35)',
    badge: 'text-[#FCE100] bg-[#FCE100]/12 border-[#FCE100]/30',
  },
  ANR: {
    color: '#FAA06B',
    glow: 'rgba(250, 160, 107, 0.25)',
    bg: 'rgba(250, 160, 107, 0.12)',
    border: 'rgba(250, 160, 107, 0.35)',
    badge: 'text-[#FAA06B] bg-[#FAA06B]/12 border-[#FAA06B]/30',
  },
  AuthFailure: {
    color: '#B4A0FF',
    glow: 'rgba(180, 160, 255, 0.25)',
    bg: 'rgba(180, 160, 255, 0.12)',
    border: 'rgba(180, 160, 255, 0.35)',
    badge: 'text-[#B4A0FF] bg-[#B4A0FF]/12 border-[#B4A0FF]/30',
  },
  NetworkFailure: {
    color: '#2899F5',
    glow: 'rgba(40, 153, 245, 0.25)',
    bg: 'rgba(40, 153, 245, 0.12)',
    border: 'rgba(40, 153, 245, 0.35)',
    badge: 'text-[#2899F5] bg-[#2899F5]/12 border-[#2899F5]/30',
  },
  UIFailure: {
    color: '#97979B',
    glow: 'rgba(151, 151, 155, 0.25)',
    bg: 'rgba(151, 151, 155, 0.12)',
    border: 'rgba(151, 151, 155, 0.35)',
    badge: 'text-[#CCCCCC] bg-[#97979B]/15 border-[#97979B]/35',
  },
  NotificationFailure: {
    color: '#54EBE6',
    glow: 'rgba(84, 235, 230, 0.25)',
    bg: 'rgba(84, 235, 230, 0.12)',
    border: 'rgba(84, 235, 230, 0.35)',
    badge: 'text-[#54EBE6] bg-[#54EBE6]/12 border-[#54EBE6]/30',
  },
};

const SIGNAL_PHRASES = {
  Crash: ['crash', 'crashes', 'force close', 'shuts down', 'app died', 'shut down'],
  ANR: ['freeze', 'freezes', 'hang', 'hangs', 'not responding', 'stuck', 'unresponsive', 'lag'],
  DataLoss: ['lost data', 'progress deleted', 'reset', 'data gone', 'wiped', 'deleted my', 'lost all'],
  AuthFailure: ["can't log in", 'logging out', 'login failed', 'sign in error', 'authentication', 'logged out', 'cant login', 'invalid credentials'],
  NetworkFailure: ["won't load", 'connection error', 'no internet', 'timeout', 'offline', 'network', 'server error', 'disconnected'],
  NotificationFailure: ['no alerts', 'notifications broken', 'not notified', 'push broken', 'no notification', 'alert not working'],
  UIFailure: ['blank screen', 'buttons unresponsive', 'black screen', 'display bug', 'glitch', 'overlapping', 'ui bug', 'white screen'],
};

const ARI_WEIGHTS = { alpha: 0.30, beta: 0.25, gamma: 0.25, delta: 0.20 };

const APP_REGISTRY = {
  Finance: { label: 'Robinhood', pkg: 'com.robinhood.android', category: 'Finance', icon: '🏦', dominantChain: 'AuthFailure → Crash → DataLoss' },
  Social: { label: 'Instagram', pkg: 'com.instagram.android', category: 'Social', icon: '📸', dominantChain: 'NetworkFailure → ANR → NotificationFailure' },
  Productivity: { label: 'MS Launcher', pkg: 'com.microsoft.launcher', category: 'Productivity', icon: '💼', dominantChain: 'UIFailure → DataLoss' },
  Health: { label: 'MyFitnessPal', pkg: 'com.myfitnesspal.android', category: 'Health', icon: '🏃', dominantChain: 'UIFailure → Crash' },
  Gaming: { label: 'Clash of Clans', pkg: 'com.supercell.clashofclans', category: 'Gaming', icon: '⚔️', dominantChain: 'UIFailure → Crash → ANR' }
};

const PRESET_REVIEWS = [
  { text: "App crashes every time after MFA authentication, and my transaction data was completely wiped!", rating: 1 },
  { text: "Timeout connection error causes screen to freeze and hang indefinitely. Push alerts are broken.", rating: 1 },
  { text: "Login failed three times then app force closed with a black screen. Unacceptable defect!", rating: 1 },
  { text: "Cloud sync failed, and all my daily progress was lost and reset to zero.", rating: 2 },
  { text: "Buttons are completely unresponsive, white blank screen every time I open dashboard.", rating: 2 },
  { text: "Seamless release. High speed data sync, zero network lag and very reliable UI.", rating: 5 }
];

const WINDOW_PROFILES = {
  Finance: [
    { fd: 0.28, fs: 0.43, fr: 0.85, ui: 0.12 },
    { fd: 0.28, fs: 0.43, fr: 0.88, ui: 0.10 },
    { fd: 0.43, fs: 0.57, fr: 0.70, ui: 0.28 },
    { fd: 0.71, fs: 0.86, fr: 0.35, ui: 0.74 },
    { fd: 0.86, fs: 0.86, fr: 0.20, ui: 0.88 },
    { fd: 0.57, fs: 0.71, fr: 0.45, ui: 0.56 },
    { fd: 0.43, fs: 0.57, fr: 0.65, ui: 0.38 },
    { fd: 0.28, fs: 0.43, fr: 0.78, ui: 0.22 },
    { fd: 0.28, fs: 0.28, fr: 0.82, ui: 0.18 },
    { fd: 0.14, fs: 0.28, fr: 0.89, ui: 0.11 },
    { fd: 0.14, fs: 0.14, fr: 0.94, ui: 0.08 },
    { fd: 0.00, fs: 0.00, fr: 0.98, ui: 0.04 },
  ],
  Social: [
    { fd: 0.14, fs: 0.28, fr: 0.90, ui: 0.08 },
    { fd: 0.28, fs: 0.43, fr: 0.82, ui: 0.15 },
    { fd: 0.57, fs: 0.71, fr: 0.40, ui: 0.65 },
    { fd: 0.71, fs: 0.86, fr: 0.25, ui: 0.82 },
    { fd: 0.57, fs: 0.71, fr: 0.50, ui: 0.48 },
    { fd: 0.43, fs: 0.43, fr: 0.68, ui: 0.32 },
    { fd: 0.28, fs: 0.43, fr: 0.75, ui: 0.24 },
    { fd: 0.28, fs: 0.28, fr: 0.84, ui: 0.16 },
    { fd: 0.14, fs: 0.28, fr: 0.89, ui: 0.11 },
    { fd: 0.14, fs: 0.14, fr: 0.93, ui: 0.07 },
    { fd: 0.14, fs: 0.14, fr: 0.95, ui: 0.05 },
    { fd: 0.00, fs: 0.00, fr: 0.99, ui: 0.02 },
  ],
  Productivity: [
    { fd: 0.28, fs: 0.28, fr: 0.85, ui: 0.14 },
    { fd: 0.43, fs: 0.57, fr: 0.55, ui: 0.42 },
    { fd: 0.71, fs: 0.71, fr: 0.30, ui: 0.78 },
    { fd: 0.57, fs: 0.57, fr: 0.50, ui: 0.50 },
    { fd: 0.43, fs: 0.43, fr: 0.70, ui: 0.31 },
    { fd: 0.28, fs: 0.28, fr: 0.80, ui: 0.20 },
    { fd: 0.14, fs: 0.28, fr: 0.88, ui: 0.12 },
    { fd: 0.14, fs: 0.14, fr: 0.92, ui: 0.08 },
    { fd: 0.14, fs: 0.14, fr: 0.94, ui: 0.06 },
    { fd: 0.00, fs: 0.14, fr: 0.96, ui: 0.05 },
    { fd: 0.00, fs: 0.00, fr: 0.98, ui: 0.03 },
    { fd: 0.00, fs: 0.00, fr: 0.99, ui: 0.02 },
  ],
  Health: [
    { fd: 0.14, fs: 0.14, fr: 0.92, ui: 0.09 },
    { fd: 0.28, fs: 0.28, fr: 0.85, ui: 0.18 },
    { fd: 0.43, fs: 0.43, fr: 0.65, ui: 0.39 },
    { fd: 0.57, fs: 0.71, fr: 0.38, ui: 0.71 },
    { fd: 0.57, fs: 0.57, fr: 0.52, ui: 0.49 },
    { fd: 0.43, fs: 0.43, fr: 0.72, ui: 0.28 },
    { fd: 0.28, fs: 0.28, fr: 0.81, ui: 0.19 },
    { fd: 0.14, fs: 0.28, fr: 0.88, ui: 0.13 },
    { fd: 0.14, fs: 0.14, fr: 0.93, ui: 0.08 },
    { fd: 0.00, fs: 0.14, fr: 0.95, ui: 0.06 },
    { fd: 0.00, fs: 0.00, fr: 0.98, ui: 0.03 },
    { fd: 0.00, fs: 0.00, fr: 0.99, ui: 0.02 },
  ],
  Gaming: [
    { fd: 0.28, fs: 0.43, fr: 0.82, ui: 0.18 },
    { fd: 0.57, fs: 0.71, fr: 0.42, ui: 0.62 },
    { fd: 0.86, fs: 0.86, fr: 0.22, ui: 0.85 },
    { fd: 0.71, fs: 0.71, fr: 0.38, ui: 0.67 },
    { fd: 0.57, fs: 0.57, fr: 0.58, ui: 0.44 },
    { fd: 0.43, fs: 0.43, fr: 0.71, ui: 0.30 },
    { fd: 0.28, fs: 0.28, fr: 0.83, ui: 0.17 },
    { fd: 0.14, fs: 0.28, fr: 0.89, ui: 0.12 },
    { fd: 0.14, fs: 0.14, fr: 0.94, ui: 0.07 },
    { fd: 0.00, fs: 0.14, fr: 0.96, ui: 0.05 },
    { fd: 0.00, fs: 0.00, fr: 0.98, ui: 0.03 },
    { fd: 0.00, fs: 0.00, fr: 0.99, ui: 0.02 },
  ]
};

export default function App() {
  const [designStyle, setDesignStyle] = useState('apple');
  const [activeCategory, setActiveCategory] = useState('Finance');
  const [activeWindow, setActiveWindow] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputReview, setInputReview] = useState('');
  const [inputRating, setInputRating] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const [liveReviews, setLiveReviews] = useState([
    {
      id: 'rev-01',
      text: "App keeps crashing whenever I try to log in, and all my account data was wiped!",
      rating: 1,
      detectedFailures: ['Crash', 'AuthFailure', 'DataLoss'],
      severityScore: 1.0,
      timestamp: '10:28:44'
    },
    {
      id: 'rev-02',
      text: "Network connection error caused constant freeze and lag then force closed.",
      rating: 1,
      detectedFailures: ['NetworkFailure', 'ANR', 'Crash'],
      severityScore: 1.0,
      timestamp: '10:25:12'
    },
    {
      id: 'rev-03',
      text: "Buttons are completely unresponsive, blank white screen every time I tap trade.",
      rating: 2,
      detectedFailures: ['UIFailure'],
      severityScore: 0.6,
      timestamp: '10:21:05'
    }
  ]);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const isApple = designStyle === 'apple';
  const failureTheme = isApple ? FAILURE_THEME_APPLE : FAILURE_THEME_FLUENT;

  const surfaceClasses = useMemo(() => {
    if (isApple) {
      return {
        pageBg: 'bg-[#000000] text-[#FFFFFF]',
        headerBg: 'bg-[#1C1C1E]/80 backdrop-blur-2xl border-[#38383A]',
        cardBg: 'bg-[#1C1C1E] border-[#2C2C2E]',
        subCardBg: 'bg-[#2C2C2E]/60 border-[#38383A]',
        inputBg: 'bg-[#000000]/60 border-[#38383A] text-white placeholder-[#8E8E93]',
        pillActive: 'bg-[#0A84FF] text-white shadow-sm',
        pillInactive: 'text-[#8E8E93] hover:text-white hover:bg-[#2C2C2E]',
        accentText: 'text-[#0A84FF]',
        accentBg: 'bg-[#0A84FF]',
        accentBorder: 'border-[#0A84FF]',
        secondaryText: 'text-[#8E8E93]',
        tertiaryText: 'text-[#636366]',
        canvasBg: '#0C0C0E',
        canvasNodeCore: '#1C1C1E',
        fontFamily: 'font-sans'
      };
    } else {
      return {
        pageBg: 'bg-[#0F0F10] text-[#F3F3F3]',
        headerBg: 'bg-[#18181A]/90 backdrop-blur-xl border-[#2E2E32]',
        cardBg: 'bg-[#1F1F22] border-[#2D2D31]',
        subCardBg: 'bg-[#141416] border-[#29292D]',
        inputBg: 'bg-[#141416] border-[#38383E] text-[#F3F3F3] placeholder-[#85858A]',
        pillActive: 'bg-[#0078D4] text-white shadow-sm',
        pillInactive: 'text-[#9E9EA4] hover:text-[#FFFFFF] hover:bg-[#29292D]',
        accentText: 'text-[#2899F5]',
        accentBg: 'bg-[#0078D4]',
        accentBorder: 'border-[#0078D4]',
        secondaryText: 'text-[#9E9EA4]',
        tertiaryText: 'text-[#6A6A70]',
        canvasBg: '#131316',
        canvasNodeCore: '#1F1F22',
        fontFamily: 'font-sans'
      };
    }
  }, [isApple]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveWindow((prev) => (prev >= 11 ? 0 : prev + 1));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const extractFailures = useCallback((text, rating) => {
    const lower = text.toLowerCase();
    const detected = [];
    FAILURE_TYPES.forEach((ft) => {
      const phrases = SIGNAL_PHRASES[ft];
      if (phrases.some((p) => lower.includes(p))) {
        detected.push(ft);
      }
    });

    let sev = 0.0;
    if (detected.length > 0) {
      const baseMax = Math.max(...detected.map((f) => SEVERITY[f]));
      const mult = rating === 1 ? 1.5 : (rating === 2 ? 1.2 : 1.0);
      sev = Math.min(1.0, Number((baseMax * mult).toFixed(2)));
    }

    return { detected, severity: sev };
  }, []);

  const handleIngestReview = (e) => {
    if (e) e.preventDefault();
    if (!inputReview.trim()) return;

    const { detected, severity } = extractFailures(inputReview, inputRating);
    const now = new Date();
    const timeStr = \`\${String(now.getHours()).padStart(2, '0')}:\${String(now.getMinutes()).padStart(2, '0')}:\${String(now.getSeconds()).padStart(2, '0')}\`;

    const newRev = {
      id: \`rev-\${Date.now()}\`,
      text: inputReview,
      rating: inputRating,
      detectedFailures: detected.length > 0 ? detected : ['UIFailure'],
      severityScore: severity || 0.5,
      timestamp: timeStr
    };

    setLiveReviews((prev) => [newRev, ...prev.slice(0, 19)]);
    setInputReview('');
  };

  const metrics = useMemo(() => {
    const profile = WINDOW_PROFILES[activeCategory][activeWindow];
    const { fd, fs, fr, ui } = profile;
    const { alpha, beta, gamma, delta } = ARI_WEIGHTS;

    const ari = Math.max(0, Math.min(1, 1 - (alpha * fd + beta * fs + gamma * (1 - fr) + delta * ui)));
    
    let status = 'Resilient';
    let gate = 'PASS';
    let badgeColor = isApple 
      ? 'text-[#30D158] bg-[#30D158]/12 border-[#30D158]/35' 
      : 'text-[#57D9A3] bg-[#57D9A3]/12 border-[#57D9A3]/35';
    let gaugeColor = isApple ? '#30D158' : '#107C41';

    if (ari < 0.50) {
      status = 'Critical Failure';
      gate = 'BLOCK';
      badgeColor = isApple 
        ? 'text-[#FF453A] bg-[#FF453A]/15 border-[#FF453A]/35' 
        : 'text-[#F1707B] bg-[#F1707B]/15 border-[#F1707B]/35';
      gaugeColor = isApple ? '#FF453A' : '#D13438';
    } else if (ari < 0.70) {
      status = 'Severe Risk';
      gate = 'BLOCK';
      badgeColor = isApple 
        ? 'text-[#FF9F0A] bg-[#FF9F0A]/15 border-[#FF9F0A]/35' 
        : 'text-[#FAA06B] bg-[#FAA06B]/15 border-[#FAA06B]/35';
      gaugeColor = isApple ? '#FF9F0A' : '#CA5010';
    } else if (ari < 0.85) {
      status = 'Degraded';
      gate = 'WARN';
      badgeColor = isApple 
        ? 'text-[#FFD60A] bg-[#FFD60A]/15 border-[#FFD60A]/35' 
        : 'text-[#FCE100] bg-[#FCE100]/15 border-[#FCE100]/35';
      gaugeColor = isApple ? '#FFD60A' : '#C19C00';
    } else if (ari < 0.95) {
      status = 'Stable';
      gate = 'PASS';
      badgeColor = isApple 
        ? 'text-[#0A84FF] bg-[#0A84FF]/15 border-[#0A84FF]/35' 
        : 'text-[#2899F5] bg-[#2899F5]/15 border-[#2899F5]/35';
      gaugeColor = isApple ? '#0A84FF' : '#0078D4';
    }

    const cfs = (0.965 + (ari * 0.0345)).toFixed(4);

    return {
      fd,
      fs,
      fr,
      ui,
      ari: Number(ari.toFixed(3)),
      status,
      gate,
      badgeColor,
      gaugeColor,
      cfs
    };
  }, [activeCategory, activeWindow, isApple]);

  const graphData = useMemo(() => {
    const failureIntensity = (1 - metrics.ari);
    
    const edges = [
      { from: 'AuthFailure', to: 'Crash', weight: 0.72 + (failureIntensity * 0.24) },
      { from: 'Crash', to: 'DataLoss', weight: 0.80 + (failureIntensity * 0.18) },
      { from: 'NetworkFailure', to: 'ANR', weight: 0.65 + (failureIntensity * 0.25) },
      { from: 'ANR', to: 'NotificationFailure', weight: 0.50 + (failureIntensity * 0.28) },
      { from: 'DataLoss', to: 'UIFailure', weight: 0.75 + (failureIntensity * 0.22) },
      { from: 'UIFailure', to: 'Crash', weight: 0.60 + (failureIntensity * 0.25) }
    ];

    const table = FAILURE_TYPES.map((ft) => {
      const sev = SEVERITY[ft];
      const propScore = Number(((sev * 0.55) + (failureIntensity * 0.45)).toFixed(3));
      const betweenness = (ft === 'Crash' || ft === 'ANR') ? 0.38 : (ft === 'DataLoss' ? 0.31 : 0.14);
      const maxDepth = (ft === 'AuthFailure' || ft === 'NetworkFailure') ? 3 : (ft === 'Crash' ? 2 : 1);
      const spread = Number(((maxDepth / 4) * (0.45 + failureIntensity * 0.55)).toFixed(3));
      
      const criticality = Number((0.35 * propScore + 0.30 * betweenness + 0.20 * (maxDepth / 7) + 0.15 * spread).toFixed(3));

      return {
        type: ft,
        severity: sev,
        propScore,
        betweenness,
        maxDepth,
        spread,
        criticality
      };
    }).sort((a, b) => b.criticality - a.criticality);

    const dominantChains = [
      {
        nodes: ['AuthFailure', 'Crash', 'DataLoss'],
        frequency: '43.8%',
        domain: 'Finance',
        leadDays: '14-day early warning',
      },
      {
        nodes: ['NetworkFailure', 'ANR', 'NotificationFailure'],
        frequency: '21.7%',
        domain: 'Social',
        leadDays: '3-hop propagation',
      },
      {
        nodes: ['DataLoss', 'UIFailure'],
        frequency: '16.5%',
        domain: 'Productivity',
        leadDays: 'Write-block cascade',
      }
    ];

    return { edges, table, dominantChains };
  }, [metrics.ari]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let pulseOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36;

      const nodePositions = {};
      FAILURE_TYPES.forEach((ft, i) => {
        const angle = (i / FAILURE_TYPES.length) * 2 * Math.PI - Math.PI / 2;
        nodePositions[ft] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          type: ft
        };
      });

      pulseOffset = (pulseOffset + 0.012) % 1;

      graphData.edges.forEach((edge) => {
        const start = nodePositions[edge.from];
        const end = nodePositions[edge.to];
        if (!start || !end) return;

        const isRelated = selectedNode === edge.from || selectedNode === edge.to || hoveredNode === edge.from || hoveredNode === edge.to;

        const midX = (start.x + end.x) / 2 + (centerY - start.y) * 0.16;
        const midY = (start.y + end.y) / 2 + (start.x - centerX) * 0.16;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(midX, midY, end.x, end.y);
        ctx.strokeStyle = isRelated 
          ? (isApple ? '#0A84FF' : '#2899F5') 
          : (edge.weight > 0.75 
              ? (isApple ? 'rgba(255, 69, 58, 0.45)' : 'rgba(241, 112, 123, 0.45)') 
              : 'rgba(142, 142, 147, 0.28)');
        ctx.lineWidth = isRelated ? 2.5 : Math.max(1.2, edge.weight * 2.8);
        ctx.stroke();

        const tArrow = 0.82;
        const arrowX = (1 - tArrow) * (1 - tArrow) * start.x + 2 * (1 - tArrow) * tArrow * midX + tArrow * tArrow * end.x;
        const arrowY = (1 - tArrow) * (1 - tArrow) * start.y + 2 * (1 - tArrow) * tArrow * midY + tArrow * tArrow * end.y;
        const tangentX = 2 * (1 - tArrow) * (midX - start.x) + 2 * tArrow * (end.x - midX);
        const tangentY = 2 * (1 - tArrow) * (midY - start.y) + 2 * tArrow * (end.y - midY);
        const arrowAngle = Math.atan2(tangentY, tangentX);

        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(arrowAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-7, -3.5);
        ctx.lineTo(-7, 3.5);
        ctx.closePath();
        ctx.fillStyle = isRelated ? (isApple ? '#0A84FF' : '#2899F5') : (edge.weight > 0.75 ? (isApple ? '#FF453A' : '#F1707B') : 'rgba(142, 142, 147, 0.6)');
        ctx.fill();
        ctx.restore();

        const pT = (pulseOffset + edge.weight * 0.3) % 1;
        const pulseX = (1 - pT) * (1 - pT) * start.x + 2 * (1 - pT) * pT * midX + pT * pT * end.x;
        const pulseY = (1 - pT) * (1 - pT) * start.y + 2 * (1 - pT) * pT * midY + pT * pT * end.y;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, isRelated ? 3 : 2, 0, 2 * Math.PI);
        ctx.fillStyle = isRelated ? '#FFFFFF' : (isApple ? '#0A84FF' : '#2899F5');
        ctx.fill();
      });

      FAILURE_TYPES.forEach((ft) => {
        const pos = nodePositions[ft];
        const isSelected = selectedNode === ft;
        const isHovered = hoveredNode === ft;
        const theme = failureTheme[ft];
        const sev = SEVERITY[ft];
        const baseRadius = 18 + sev * 9;

        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, baseRadius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = isSelected 
            ? (isApple ? 'rgba(10, 132, 255, 0.35)' : 'rgba(40, 153, 245, 0.35)') 
            : theme.glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, baseRadius, 0, 2 * Math.PI);
        ctx.fillStyle = surfaceClasses.canvasNodeCore;
        ctx.fill();

        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.strokeStyle = isSelected ? (isApple ? '#0A84FF' : '#2899F5') : theme.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, baseRadius - 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = theme.bg;
        ctx.fill();

        ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ft.replace('Failure', ''), pos.x, pos.y - 3);

        ctx.font = '500 9px monospace';
        ctx.fillStyle = theme.color;
        ctx.fillText(\`S:\${sev.toFixed(2)}\`, pos.x, pos.y + 9);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [graphData, selectedNode, hoveredNode, failureTheme, isApple, surfaceClasses]);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const radius = Math.min(canvas.width, canvas.height) * 0.36;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let found = null;
    FAILURE_TYPES.forEach((ft, idx) => {
      const angle = (idx / FAILURE_TYPES.length) * 2 * Math.PI - Math.PI / 2;
      const nx = centerX + radius * Math.cos(angle);
      const ny = centerY + radius * Math.sin(angle);
      if (Math.hypot(x - nx, y - ny) <= 32) {
        found = ft;
      }
    });

    setHoveredNode(found);
  };

  const handleCanvasClick = () => {
    if (hoveredNode) {
      setSelectedNode((prev) => (prev === hoveredNode ? null : hoveredNode));
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <div className={\`min-h-screen \${surfaceClasses.pageBg} flex flex-col font-sans transition-colors duration-200 antialiased selection:bg-[#0A84FF]/30 selection:text-white\`}>
      <header className={\`border-b \${surfaceClasses.headerBg} sticky top-0 z-40 px-5 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4 transition-colors\`}>
        <div className="flex items-center gap-3">
          <div className={\`w-8 h-8 rounded-lg flex items-center justify-center border transition-all \${
            isApple 
              ? 'bg-[#1C1C1E] border-[#38383A] text-[#0A84FF] shadow-sm' 
              : 'bg-[#1F1F22] border-[#2D2D31] text-[#2899F5]'
          }\`}>
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm lg:text-base tracking-tight text-white flex items-center gap-2">
                FALCON
                <span className={\`text-[10px] font-mono px-2 py-0.5 rounded font-medium border \${
                  isApple 
                    ? 'bg-[#2C2C2E] text-[#0A84FF] border-[#38383A]' 
                    : 'bg-[#141416] text-[#2899F5] border-[#2D2D31]'
                }\`}>
                  T-GAT • ARI
                </span>
              </span>
            </div>
            <p className={\`text-[11px] \${surfaceClasses.secondaryText} font-normal hidden sm:block\`}>
              Failure Analysis through Linked Cascading Observation Networks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={\`flex items-center rounded-lg p-0.5 border \${surfaceClasses.subCardBg}\`}>
            <button
              onClick={() => setDesignStyle('apple')}
              className={\`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all \${
                isApple 
                  ? 'bg-[#2C2C2E] text-white shadow-sm border border-[#3A3A3C]' 
                  : \`\${surfaceClasses.secondaryText} hover:text-white\`
              }\`}
              title="Apple Human Interface Guidelines (macOS / iOS Dark Mode)"
            >
              <Apple className="w-3.5 h-3.5 text-[#0A84FF]" />
              <span>Apple HIG</span>
            </button>
            <button
              onClick={() => setDesignStyle('microsoft')}
              className={\`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all \${
                !isApple 
                  ? 'bg-[#0078D4] text-white shadow-sm' 
                  : \`\${surfaceClasses.secondaryText} hover:text-white\`
              }\`}
              title="Microsoft Fluent 2 (Windows 11 Dark Mode)"
            >
              <Monitor className="w-3.5 h-3.5 text-white" />
              <span>MS Fluent</span>
            </button>
          </div>

          <div className={\`flex items-center rounded-lg p-0.5 border \${surfaceClasses.subCardBg} text-xs\`}>
            <span className={\`\${surfaceClasses.secondaryText} px-2 flex items-center gap-1 font-medium border-r border-[#38383A]\`}>
              <Smartphone className={\`w-3.5 h-3.5 \${surfaceClasses.accentText}\`} />
              App:
            </span>
            <div className="flex items-center gap-0.5 pl-1">
              {Object.keys(APP_REGISTRY).map((cat) => {
                const app = APP_REGISTRY[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedNode(null);
                    }}
                    className={\`px-2 py-1 rounded-md transition-all font-medium flex items-center gap-1 text-[11px] \${
                      isActive
                        ? surfaceClasses.pillActive
                        : surfaceClasses.pillInactive
                    }\`}
                  >
                    <span>{app.icon}</span>
                    <span>{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={\`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs \${surfaceClasses.subCardBg}\`}>
            <span className="relative flex h-2 w-2">
              <span className={\`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${isApple ? 'bg-[#30D158]' : 'bg-[#57D9A3]'}\`}></span>
              <span className={\`relative inline-flex rounded-full h-2 w-2 \${isApple ? 'bg-[#30D158]' : 'bg-[#107C41]'}\`}></span>
            </span>
            <span className="font-mono text-[11px]">1,796 Reviews</span>
          </div>

          <button
            onClick={() => setShowConfigModal(true)}
            className={\`p-1.5 rounded-lg border transition \${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText} hover:text-white\`}
            title="Formula Weight Calibration"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </header>

      <section className={\`border-b \${surfaceClasses.headerBg} px-5 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-4 transition-colors\`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={\`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all \${
                isPlaying 
                  ? 'bg-[#FF453A] text-white shadow-sm' 
                  : \`\${surfaceClasses.pillActive}\`
              }\`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause' : 'Auto Play'}
            </button>
            <button
              onClick={() => {
                setActiveWindow(0);
                setIsPlaying(false);
              }}
              className={\`p-1.5 rounded-md border \${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText} hover:text-white transition\`}
              title="Reset Timeline to W0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <div className="flex items-center gap-1">
            {[...Array(12)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveWindow(idx);
                  setIsPlaying(false);
                }}
                className={\`px-2 py-0.5 rounded text-[11px] font-mono transition-all \${
                  activeWindow === idx
                    ? \`\${surfaceClasses.pillActive} font-semibold\`
                    : \`\${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText} hover:text-white border border-white/5\`
                }\`}
              >
                W{idx}
              </button>
            ))}
          </div>
        </div>

        <div className={\`flex items-center gap-4 text-xs font-mono \${surfaceClasses.secondaryText}\`}>
          <div>
            Span: <span className="text-white font-medium">T+{activeWindow * 18}d</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div>
            Cascade Chain: <span className={\`\${surfaceClasses.accentText} font-medium\`}>\${APP_REGISTRY[activeCategory].dominantChain}</span>
          </div>
        </div>
      </section>

      <main className="flex-1 p-5 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[1880px] w-full mx-auto">
        <section className="lg:col-span-4 flex flex-col gap-5">
          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-3.5 \${surfaceClasses.cardBg} transition-all\`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className={\`w-4 h-4 \${surfaceClasses.accentText}\`} />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                  Review Ingestion & NLP Extractor
                </h2>
              </div>
              <span className={\`text-[10px] font-mono px-2 py-0.5 rounded border \${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText}\`}>
                Stage 1 & 2
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className={surfaceClasses.secondaryText}>Benchmark Presets:</span>
                <span className={\`\${surfaceClasses.accentText} text-[10px] cursor-pointer hover:underline font-medium\`}>Click to Test</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_REVIEWS.slice(0, 4).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputReview(p.text);
                      setInputRating(p.rating);
                    }}
                    className={\`p-2 text-left rounded-xl border text-[11px] truncate transition-all \${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText} hover:text-white hover:border-white/20\`
                    }
                    title={p.text}
                  >
                    Preset {i + 1}: {p.text.slice(0, 26)}...
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleIngestReview} className="flex flex-col gap-2.5">
              <textarea
                value={inputReview}
                onChange={(e) => setInputReview(e.target.value)}
                placeholder="Paste mobile review text... e.g. 'App keeps crashing upon sign in and my account balance was wiped!'"
                rows={3}
                className={\`w-full rounded-xl p-2.5 text-xs transition-all resize-none border focus:outline-none focus:ring-1 \${
                  isApple 
                    ? 'focus:border-[#0A84FF] focus:ring-[#0A84FF]' 
                    : 'focus:border-[#0078D4] focus:ring-[#0078D4]'
                } \${surfaceClasses.inputBg}\`}
              />

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={\`text-[11px] \${surfaceClasses.secondaryText}\`}>Rating:</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setInputRating(star)}
                        className={\`w-5 h-5 rounded text-[11px] font-medium transition \${
                          inputRating >= star
                            ? (isApple ? 'bg-[#FFD60A] text-black font-semibold' : 'bg-[#FCE100] text-black font-semibold')
                            : \`\${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText}\`
                        }\`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputReview.trim()}
                  className={\`px-3 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed \${surfaceClasses.pillActive}\`}
                >
                  <Send className="w-3 h-3 text-white" />
                  Extract
                </button>
              </div>
            </form>

            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-medium text-white">
                  Extracted Stream ({liveReviews.length})
                </span>
                <span className={\`font-mono text-[10px] \${surfaceClasses.tertiaryText}\`}>TF-IDF • LogReg</span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {liveReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={\`p-2.5 rounded-xl border flex flex-col gap-1.5 transition \${surfaceClasses.subCardBg} hover:border-white/20\`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={\`font-medium \${isApple ? 'text-[#FFD60A]' : 'text-[#FCE100]'}\`}>
                        {'★'.repeat(rev.rating)}
                        <span className="text-white/20">{'★'.repeat(5 - rev.rating)}</span>
                      </span>
                      <span className={\`font-mono text-[10px] \${surfaceClasses.tertiaryText}\`}>\${rev.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed">
                      "{rev.text}"
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-1 pt-1">
                      <div className="flex items-center gap-1 flex-wrap">
                        {rev.detectedFailures.map((ft) => {
                          const theme = failureTheme[ft] || { badge: 'text-gray-300 bg-gray-800 border-gray-700' };
                          return (
                            <span
                              key={ft}
                              className={\`px-1.5 py-0.5 rounded-md text-[10px] font-mono border font-medium \${theme.badge}\`}
                            >
                              {ft}
                            </span>
                          );
                        })}
                      </div>
                      <span className={\`text-[10px] font-mono \${surfaceClasses.secondaryText}\`}>
                        Severity: <span className={\`\${isApple ? 'text-[#FF453A]' : 'text-[#F1707B]'} font-semibold\`}>\${rev.severityScore}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-2.5 \${surfaceClasses.cardBg}\`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Failure Taxonomy (Table 1)
              </span>
              <span className={\`text-[11px] font-mono \${surfaceClasses.secondaryText}\`}>|F| = 7</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {FAILURE_TYPES.map((ft) => {
                const theme = failureTheme[ft];
                const isSelected = selectedNode === ft;
                return (
                  <div
                    key={ft}
                    onClick={() => setSelectedNode(isSelected ? null : ft)}
                    className={\`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition \${
                      isSelected
                        ? \`\${surfaceClasses.pillActive} font-semibold\`
                        : \`\${surfaceClasses.subCardBg} text-white/90 hover:border-white/20\`
                    }\`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isSelected ? '#FFFFFF' : theme.color }}
                      />
                      <span className="truncate font-medium text-[11px]">{ft}</span>
                    </div>
                    <span className={\`text-[11px] font-mono font-medium ml-1 \${isSelected ? 'text-white' : surfaceClasses.secondaryText}\`}>
                      {SEVERITY[ft]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 flex flex-col gap-5">
          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-3 flex-1 \${surfaceClasses.cardBg}\`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Share2 className={\`w-4 h-4 \${surfaceClasses.accentText}\`} />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                  Failure Dependency Network (FDN) & T-GAT
                </h2>
              </div>

              {selectedNode ? (
                <div className={\`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] \${surfaceClasses.subCardBg} \${surfaceClasses.accentText}\`}>
                  <span>Focus: <strong>{selectedNode}</strong></span>
                  <button onClick={() => setSelectedNode(null)} className="hover:text-white">×</button>
                </div>
              ) : (
                <span className={\`text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>Click node to inspect</span>
              )}
            </div>

            <div 
              className="relative rounded-xl border p-1 flex items-center justify-center overflow-hidden min-h-[390px]"
              style={{ backgroundColor: surfaceClasses.canvasBg, borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <canvas
                ref={canvasRef}
                width={520}
                height={380}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
                className="cursor-pointer max-w-full h-auto"
              />

              <div className={\`absolute bottom-2.5 left-2.5 backdrop-blur-xl border rounded-lg p-2 text-[10px] space-y-1 pointer-events-none \${surfaceClasses.subCardBg} \${surfaceClasses.secondaryText}\`}>
                <div className="flex items-center gap-1.5">
                  <span className={\`w-2.5 h-0.5 inline-block \${isApple ? 'bg-[#FF453A]' : 'bg-[#F1707B]'}\`}></span>
                  <span>High Precedence Weight (&gt;0.75)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={\`w-2 h-2 rounded-full inline-block \${isApple ? 'bg-[#0A84FF]' : 'bg-[#2899F5]'}\`}></span>
                  <span>Temporal Attention Propagation Pulse</span>
                </div>
              </div>
            </div>

            <div className={\`rounded-xl p-3 border flex flex-col gap-2 \${surfaceClasses.subCardBg}\`}>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Clock className={\`w-3.5 h-3.5 \${surfaceClasses.accentText}\`} />
                  <span className="font-medium text-white">
                    Observation Window {activeWindow}:
                  </span>
                  <span className={\`font-mono text-[11px] \${surfaceClasses.accentText}\`}>
                    Day {activeWindow * 18} – {(activeWindow + 1) * 18}
                  </span>
                </div>
                <span className={\`font-mono text-[10px] font-semibold \${activeWindow === 3 || activeWindow === 4 ? (isApple ? 'text-[#FF9F0A]' : 'text-[#FAA06B]') : surfaceClasses.secondaryText}\`}>
                  {activeWindow === 3 || activeWindow === 4 ? '⚠️ SPIKE INTERVAL' : 'STABLE INTERVAL'}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="11"
                step="1"
                value={activeWindow}
                onChange={(e) => {
                  setActiveWindow(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className={\`w-full cursor-pointer h-1.5 rounded-lg bg-white/10 \${isApple ? 'accent-[#0A84FF]' : 'accent-[#0078D4]'}\`}
              />

              <div className={\`flex justify-between text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>
                <span>W0 (Baseline)</span>
                <span className={isApple ? 'text-[#FFD60A]' : 'text-[#FCE100]'}>W4 (Peak Spike)</span>
                <span>W11 (Recovery)</span>
              </div>
            </div>
          </div>

          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-2.5 \${surfaceClasses.cardBg}\`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BarChart3 className={\`w-4 h-4 \${surfaceClasses.accentText}\`} />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  T-GAT Criticality Rankings (Window {activeWindow})
                </h3>
              </div>
              <span className={\`text-[10px] font-mono \${surfaceClasses.secondaryText}\`}>Crit(f) §IV-D</span>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={\`border-b border-white/10 font-mono text-[10px] uppercase \${surfaceClasses.secondaryText}\`}>
                    <th className="py-1.5 px-2">Node</th>
                    <th className="py-1.5 px-2">Sev</th>
                    <th className="py-1.5 px-2">PropScore</th>
                    <th className="py-1.5 px-2">Depth</th>
                    <th className="py-1.5 px-2">Spread</th>
                    <th className="py-1.5 px-2 text-right">Criticality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  {graphData.table.map((row) => {
                    const isSelected = selectedNode === row.type;
                    const theme = failureTheme[row.type];
                    return (
                      <tr
                        key={row.type}
                        onClick={() => setSelectedNode(row.type)}
                        className={\`hover:bg-white/5 cursor-pointer transition \${
                          isSelected ? \`\${isApple ? 'bg-[#0A84FF]/20 text-white' : 'bg-[#0078D4]/20 text-white'}\` : 'text-white/80'
                        }\`}
                      >
                        <td className="py-2 px-2 font-sans font-medium flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.color }}
                          />
                          {row.type}
                        </td>
                        <td className={\`py-2 px-2 \${surfaceClasses.secondaryText}\`}>\${row.severity.toFixed(2)}</td>
                        <td className={\`py-2 px-2 \${surfaceClasses.secondaryText}\`}>\${row.propScore.toFixed(3)}</td>
                        <td className={\`py-2 px-2 \${surfaceClasses.secondaryText}\`}>\${row.maxDepth}</td>
                        <td className={\`py-2 px-2 \${surfaceClasses.secondaryText}\`}>\${row.spread.toFixed(2)}</td>
                        <td className={\`py-2 px-2 text-right font-semibold \${isApple ? 'text-[#FF453A]' : 'text-[#F1707B]'}\`}>
                          {row.criticality.toFixed(3)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="lg:col-span-3 flex flex-col gap-5">
          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col items-center gap-3.5 text-center \${surfaceClasses.cardBg}\`}>
            <div className="w-full flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                <ShieldAlert className={\`w-4 h-4 \${surfaceClasses.accentText}\`} />
                Resilience Index (ARI)
              </span>
              <span className={\`font-mono text-[11px] \${surfaceClasses.accentText}\`}>Eq. IV-F</span>
            </div>

            <div className="relative w-36 h-36 flex items-center justify-center my-0.5">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="6"
                  stroke="rgba(255, 255, 255, 0.08)"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="6"
                  stroke={metrics.gaugeColor}
                  fill="transparent"
                  strokeDasharray={264}
                  strokeDashoffset={264 * (1 - metrics.ari)}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold tracking-tight font-mono text-white">
                  {metrics.ari.toFixed(3)}
                </span>
                <span className={\`text-[10px] font-mono uppercase tracking-wider \${surfaceClasses.secondaryText} mt-0.5\`}>
                  ARI Score
                </span>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className={\`py-1.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between \${metrics.badgeColor}\`}>
                <span className="flex items-center gap-1.5">
                  {metrics.gate === 'BLOCK' ? (
                    <AlertOctagon className="w-3.5 h-3.5 text-current" />
                  ) : metrics.gate === 'WARN' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-current" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-current" />
                  )}
                  {metrics.status}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-[10px]">
                  CI/CD: {metrics.gate}
                </span>
              </div>

              <div className={\`p-2.5 rounded-xl border text-left text-xs space-y-1 font-mono \${surfaceClasses.subCardBg}\`}>
                <div className={\`flex justify-between \${surfaceClasses.secondaryText} text-[11px]\`}>
                  <span>Crash-Free Proxy (CFS):</span>
                  <span className="text-white font-medium">{metrics.cfs}</span>
                </div>
                <div className={\`flex justify-between \${surfaceClasses.secondaryText} text-[11px]\`}>
                  <span>Pearson Correlation:</span>
                  <span className={\`\${surfaceClasses.accentText} font-medium\`}>r = 0.763</span>
                </div>
              </div>
            </div>
          </div>

          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-2.5 \${surfaceClasses.cardBg}\`}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              ARI Component Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-white/90 mb-1 text-[11px]">
                  <span>Depth [FD(t)]</span>
                  <span className={\`font-mono font-medium \${isApple ? 'text-[#FF453A]' : 'text-[#F1707B]'}\`}>\${metrics.fd.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={\`h-full transition-all duration-500 \${isApple ? 'bg-[#FF453A]' : 'bg-[#F1707B]'}\`}
                    style={{ width: \`\${metrics.fd * 100}%\` }}
                  />
                </div>
                <span className={\`text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>Weight α = 0.30</span>
              </div>

              <div>
                <div className="flex justify-between text-white/90 mb-1 text-[11px]">
                  <span>Spread [FS(t)]</span>
                  <span className={\`font-mono font-medium \${isApple ? 'text-[#FF9F0A]' : 'text-[#FAA06B]'}\`}>\${metrics.fs.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={\`h-full transition-all duration-500 \${isApple ? 'bg-[#FF9F0A]' : 'bg-[#FAA06B]'}\`}
                    style={{ width: \`\${metrics.fs * 100}%\` }}
                  />
                </div>
                <span className={\`text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>Weight β = 0.25</span>
              </div>

              <div>
                <div className="flex justify-between text-white/90 mb-1 text-[11px]">
                  <span>Recovery [FR(t)]</span>
                  <span className={\`font-mono font-medium \${isApple ? 'text-[#30D158]' : 'text-[#57D9A3]'}\`}>\${metrics.fr.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={\`h-full transition-all duration-500 \${isApple ? 'bg-[#30D158]' : 'bg-[#57D9A3]'}\`}
                    style={{ width: \`\${metrics.fr * 100}%\` }}
                  />
                </div>
                <span className={\`text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>Weight γ = 0.25 (1 - FR)</span>
              </div>

              <div>
                <div className="flex justify-between text-white/90 mb-1 text-[11px]">
                  <span>Impact [UI(t)]</span>
                  <span className={\`font-mono font-medium \${isApple ? 'text-[#0A84FF]' : 'text-[#2899F5]'}\`}>\${metrics.ui.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={\`h-full transition-all duration-500 \${isApple ? 'bg-[#0A84FF]' : 'bg-[#2899F5]'}\`}
                    style={{ width: \`\${metrics.ui * 100}%\` }}
                  />
                </div>
                <span className={\`text-[10px] font-mono \${surfaceClasses.tertiaryText}\`}>Weight δ = 0.20</span>
              </div>
            </div>
          </div>

          <div className={\`rounded-2xl p-4 border shadow-xl flex flex-col gap-2.5 \${surfaceClasses.cardBg}\`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Cascading Chains
              </span>
              <span className={\`text-[10px] font-mono \${surfaceClasses.accentText}\`}>89.3% Det.</span>
            </div>

            <div className="space-y-2 text-xs">
              {graphData.dominantChains.map((c, i) => (
                <div
                  key={i}
                  className={\`p-2.5 rounded-xl border flex flex-col gap-1.5 \${surfaceClasses.subCardBg}\`}
                >
                  <div className="flex items-center gap-1 font-medium text-white/90 flex-wrap text-[11px]">
                    {c.nodes.map((step, idx) => {
                      const theme = failureTheme[step];
                      return (
                        <React.Fragment key={idx}>
                          <span
                            className="px-1.5 py-0.5 rounded-md text-[10px] font-mono border"
                            style={{
                              backgroundColor: theme.bg,
                              borderColor: theme.border,
                              color: theme.color
                            }}
                          >
                            {step}
                          </span>
                          {idx < c.nodes.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-white/40" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className={\`flex items-center justify-between text-[10px] pt-0.5 \${surfaceClasses.secondaryText}\`}>
                    <span className={\`font-medium font-mono \${surfaceClasses.accentText}\`}>\${c.frequency}</span>
                    <span className="italic">\${c.leadDays}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showConfigModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className={\`border rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl \${surfaceClasses.cardBg}\`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <Sliders className={\`w-4 h-4 \${surfaceClasses.accentText}\`} />
                FALCON Weight Sensitivity Parameters
              </h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            <p className={\`text-xs leading-relaxed \${surfaceClasses.secondaryText}\`}>
              In IEEE TSE Section IV-F, ARI ablation studies show an AUC-ROC variance of &lt; 0.03 for ±0.10 weight perturbations, ensuring calibration robustness.
            </p>

            <div className={\`space-y-2 text-xs font-mono p-3 rounded-xl border \${surfaceClasses.subCardBg}\`}>
              <div className="flex justify-between text-white/90">
                <span>α (Failure Depth FD):</span>
                <span className={\`font-medium \${isApple ? 'text-[#FF453A]' : 'text-[#F1707B]'}\`}>0.30</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>β (Failure Spread FS):</span>
                <span className={\`font-medium \${isApple ? 'text-[#FF9F0A]' : 'text-[#FAA06B]'}\`}>0.25</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>γ (Recovery Rate FR):</span>
                <span className={\`font-medium \${isApple ? 'text-[#30D158]' : 'text-[#57D9A3]'}\`}>0.25</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>δ (User Impact UI):</span>
                <span className={\`font-medium \${isApple ? 'text-[#0A84FF]' : 'text-[#2899F5]'}\`}>0.20</span>
              </div>
              <div className={\`pt-2 border-t border-white/10 text-[10px] \${surfaceClasses.tertiaryText} font-sans\`}>
                Normalized Sum: α + β + γ + δ = 1.00
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowConfigModal(false)}
                className={\`px-4 py-1.5 rounded-xl font-medium text-xs \${surfaceClasses.pillActive}\`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className={\`border-t \${surfaceClasses.headerBg} px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] \${surfaceClasses.secondaryText}\`}>
        <div className="flex items-center gap-2">
          <Database className={\`w-3.5 h-3.5 \${surfaceClasses.accentText}\`} />
          <span className="text-white">FALCON Real-Time Framework</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Macro-F1: <strong className="text-white">0.847</strong></span>
          <span className="text-white/20">•</span>
          <span>Pearson r: <strong className="text-white">0.763</strong></span>
          <span className="text-white/20">•</span>
          <span>Cascade Detection: <strong className="text-white">89.3%</strong></span>
          <span className="text-white/20">•</span>
          <span>Early Warning: <strong className={surfaceClasses.accentText}>14 Days</strong></span>
        </div>
      </footer>
    </div>
  );
}
`;

const FILES = {
  [path.join(PROJECT_DIR, 'package.json')]: PACKAGE_JSON,
  [path.join(PROJECT_DIR, 'vite.config.js')]: VITE_CONFIG_JS,
  [path.join(PROJECT_DIR, 'tailwind.config.js')]: TAILWIND_CONFIG_JS,
  [path.join(PROJECT_DIR, 'postcss.config.js')]: POSTCSS_CONFIG_JS,
  [path.join(PROJECT_DIR, '.gitignore')]: GITIGNORE,
  [path.join(PROJECT_DIR, 'index.html')]: INDEX_HTML,
  [path.join(PROJECT_DIR, 'README.md')]: README_MD,
  [path.join(PROJECT_DIR, 'public', 'favicon.svg')]: FAVICON_SVG,
  [path.join(PROJECT_DIR, 'src', 'index.css')]: INDEX_CSS,
  [path.join(PROJECT_DIR, 'src', 'main.jsx')]: MAIN_JSX,
  [path.join(PROJECT_DIR, 'src', 'App.jsx')]: APP_JSX,
};

// Pure Node.js standard ZIP binary generator (no external libraries needed)
function createZipFile(sourceDir, zipFilePath) {
  const fileEntries = [];

  function scan(dir) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scan(fullPath);
      } else {
        const relativePath = path.relative('.', fullPath).replace(/\\\\/g, '/');
        const data = fs.readFileSync(fullPath);
        fileEntries.push({ path: relativePath, data });
      }
    }
  }

  scan(sourceDir);

  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  // Standard CRC32 table calculation
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c >>> 0;
  }

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  for (const file of fileEntries) {
    const nameBuf = Buffer.from(file.path, 'utf8');
    const compressed = zlib.deflateRawSync(file.data);
    const uncompressedSize = file.data.length;
    const compressedSize = compressed.length;
    const fileCrc = crc32(file.data);

    // Local file header (30 bytes + filename + compressed data)
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4);         // version needed
    localHeader.writeUInt16LE(0, 6);          // general purpose flag
    localHeader.writeUInt16LE(8, 8);          // compression method (deflate)
    localHeader.writeUInt16LE(0, 10);         // time
    localHeader.writeUInt16LE(0, 12);         // date
    localHeader.writeUInt32LE(fileCrc, 14);   // crc32
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);         // extra field len

    localHeaders.push(localHeader, nameBuf, compressed);

    // Central directory header (46 bytes + filename)
    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0); // signature
    centralHeader.writeUInt16LE(20, 4);          // version made by
    centralHeader.writeUInt16LE(20, 6);          // version needed
    centralHeader.writeUInt16LE(0, 8);           // flag
    centralHeader.writeUInt16LE(8, 10);          // method
    centralHeader.writeUInt16LE(0, 12);          // time
    centralHeader.writeUInt16LE(0, 14);          // date
    centralHeader.writeUInt32LE(fileCrc, 16);
    centralHeader.writeUInt32LE(compressedSize, 20);
    centralHeader.writeUInt32LE(uncompressedSize, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);          // extra field len
    centralHeader.writeUInt16LE(0, 32);          // file comment len
    centralHeader.writeUInt16LE(0, 34);          // disk start
    centralHeader.writeUInt16LE(0, 36);          // internal attrs
    centralHeader.writeUInt32LE(0, 38);          // external attrs
    centralHeader.writeUInt32LE(offset, 42);     // local header offset

    centralHeaders.push(centralHeader, nameBuf);
    offset += localHeader.length + nameBuf.length + compressed.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const b of centralHeaders) centralDirSize += b.length;

  // End of central directory record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);                       // disk number
  eocd.writeUInt16LE(0, 6);                       // disk with start of CD
  eocd.writeUInt16LE(fileEntries.length, 8);      // entries on this disk
  eocd.writeUInt16LE(fileEntries.length, 10);     // total entries
  eocd.writeUInt32LE(centralDirSize, 12);         // size of CD
  eocd.writeUInt32LE(centralDirOffset, 16);       // offset of CD
  eocd.writeUInt16LE(0, 20);                      // comment length

  const finalZipBuffer = Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
  fs.writeFileSync(zipFilePath, finalZipBuffer);
}

function main() {
  console.log('==================================================');
  console.log(" Building 'falcon-framework' & 'falcon-framework.zip'");
  console.log('==================================================');

  // 1. Create Directories and Write Files
  for (const [filePath, content] of Object.entries(FILES)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(` [OK] Created: ${filePath}`);
  }

  // 2. Package into zip file
  const zipFilename = 'falcon-framework.zip';
  createZipFile(PROJECT_DIR, zipFilename);

  console.log('--------------------------------------------------');
  console.log(` SUCCESS! '${zipFilename}' created successfully.`);
  console.log(' Run these commands now to launch the app:');
  console.log('   cd falcon-framework');
  console.log('   npm install');
  console.log('   npm run dev');
  console.log('==================================================');
}

main();