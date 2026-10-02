import { useState } from 'react';
import { SiteStateProvider } from './hooks/useSiteState.jsx';
import { useHashScroll } from './hooks/useHashScroll.js';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Contact from './sections/Contact.jsx';

function AppContent() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Runs after every section below has mounted and registered its
  // ScrollTrigger (see hooks/useHashScroll.js for why this is needed
  // at all in a client-rendered SPA).
  useHashScroll();

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      <Navbar loaderComplete={loaderComplete} />
      <CommandPalette />

      <main id="main-content">
        <Hero loaderComplete={loaderComplete} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SiteStateProvider>
      <AppContent />
    </SiteStateProvider>
  );
}
