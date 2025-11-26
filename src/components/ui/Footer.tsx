import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <footer style={{ backgroundColor: '#202020' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              {t.footer.copyright}
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link 
              to="/cookies" 
              className="text-gray-400 hover:text-amber-600 transition-colors text-sm"
            >
              {t.footer.cookies}
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-amber-600 transition-colors text-sm"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
