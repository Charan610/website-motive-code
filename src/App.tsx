import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import './styles/components.css';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ProgressDashboardModal } from './components/ui/ProgressDashboardModal';
import { HomePage } from './pages/HomePage';
import { ReelsPage } from './pages/ReelsPage';
import { ReelDetailPage } from './pages/ReelDetailPage';
import { PromptsPage } from './pages/PromptsPage';
import { ToolsPage } from './pages/ToolsPage';
import { PlaybooksPage } from './pages/PlaybooksPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top helper when switching routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

          <main className="site-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/reels/:slug" element={<ReelDetailPage />} />
              <Route path="/prompts" element={<PromptsPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/playbooks" element={<PlaybooksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
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
