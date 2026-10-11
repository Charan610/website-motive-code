import { NotFoundPage } from './pages/NotFoundPage';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import './styles/components.css';
import './styles/workspace.css';
import './styles/studio.css';
import './styles/roadmap.css';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ProgressDashboardModal } from './components/ui/ProgressDashboardModal';
import { LearningResourcePage } from './pages/LearningResourcePage';
import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ReelsPage } from './pages/ReelsPage';
import { ReelDetailPage } from './pages/ReelDetailPage';
import { PromptsPage } from './pages/PromptsPage';
import { ToolsPage } from './pages/ToolsPage';
import { PlaybooksPage } from './pages/PlaybooksPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top helper when switching routes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) { document.getElementById(hash.slice(1))?.scrollIntoView(); }
    else { window.scrollTo(0, 0); }
  }, [pathname, hash]);

  return null;
}

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollToTop />
        <div className="app-root">
          <Navbar
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenProgress={() => setIsProgressOpen(true)}
          />

          <main className="site-main" id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/roadmap/*" element={<RoadmapPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/reels/reel-02-ai-usage" element={<LearningResourcePage />} />
              <Route path="/reels/reel-02" element={<LearningResourcePage />} />
              <Route path="/reels/:slug" element={<ReelDetailPage />} />
              <Route path="/prompts" element={<PromptsPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/playbooks" element={<PlaybooksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Modals */}
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />

          <ProgressDashboardModal
            isOpen={isProgressOpen}
            onClose={() => setIsProgressOpen(false)}
          />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
