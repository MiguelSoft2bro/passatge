
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import MobileMenu from './components/ui/MobileMenu';
import Footer from './components/ui/Footer';
import CookieBanner from './components/ui/CookieBanner';
import Home from './pages/Home';
import Carta from './pages/Carta';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminPage from './pages/AdminPage';
import CookiesPage from './pages/CookiesPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/">
        <div className="gradient-bg min-h-screen">
          <MobileMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/carta/categoria/:categoryId" element={<CategoryPage />} />
            <Route path="/administracion/login" element={<AdminLogin />} />
            <Route path="/administracion" element={<AdminPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
