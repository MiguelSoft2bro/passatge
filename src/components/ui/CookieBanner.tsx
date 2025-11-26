import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <p className="text-white text-sm mb-4">
                {t.cookies.bannerText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  {t.cookies.accept}
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2 border-2 border-gray-600 text-gray-400 rounded-full font-semibold hover:bg-gray-600 hover:text-white transition-all duration-300 text-sm"
                >
                  {t.cookies.reject}
                </button>
                <Link
                  to="/cookies"
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors text-sm underline"
                >
                  {t.cookies.learnMore}
                </Link>
              </div>
            </div>
            <button
              onClick={handleReject}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
