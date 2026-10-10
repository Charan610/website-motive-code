import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import './styles/components.css';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ReelsPage } from './pages/ReelsPage';
import { ReelDetailPage } from './pages/ReelDetailPage';
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
  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollToTop />
        <div className="app-root">
          <Navbar />
          <main className="site-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/reels/:slug" element={<ReelDetailPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/playbooks" element={<PlaybooksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
