import { Suspense, lazy, useCallback, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AvatarProvider } from './context/AvatarContext';
import { CursorProvider } from './context/CursorContext';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import SceneBackground from './components/SceneBackground';
import RouteTransition from './components/RouteTransition';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const Lab = lazy(() => import('./pages/Lab'));
const Contact = lazy(() => import('./pages/Contact'));

function AppShell() {
  const [loading, setLoading] = useState(true);
  const onDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <div className="noise" />
      {loading && <Loader onDone={onDone} />}

      <SceneBackground />
      <CustomCursor />
      <Nav />

      <main className="relative z-[1]">
        <Suspense fallback={null}>
          <RouteTransition>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/contact" element={<Contact />} />
          </RouteTransition>
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <AvatarProvider>
          <AppShell />
        </AvatarProvider>
      </CursorProvider>
    </BrowserRouter>
  );
}
