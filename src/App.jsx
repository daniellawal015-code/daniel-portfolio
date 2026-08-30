import { useState } from 'react';
import { SiteStateProvider } from './hooks/useSiteState.jsx';
import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Contact from './sections/Contact.jsx';

function AppContent() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      <CustomCursor />
      <Navbar loaderComplete={loaderComplete} />

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
