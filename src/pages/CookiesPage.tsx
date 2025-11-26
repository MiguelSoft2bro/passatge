import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CookiesPage() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: 'Política de Cookies',
      lastUpdated: 'Última actualización: Noviembre 2025',
      sections: [
        {
          title: '¿Qué son las cookies?',
          content: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.'
        },
        {
          title: 'Cookies que utilizamos',
          content: 'En PASSATGE utilizamos únicamente cookies técnicas esenciales para el funcionamiento básico del sitio web. Estas cookies son necesarias para:'
        },
        {
          title: 'Cookies técnicas esenciales',
          content: '• Recordar tus preferencias de idioma\n• Mantener la funcionalidad básica del sitio web\n• Garantizar la seguridad de la navegación\n\nEstas cookies no requieren consentimiento ya que son estrictamente necesarias para el funcionamiento del sitio.'
        },
        {
          title: 'Cookies que NO utilizamos',
          content: 'NO utilizamos:\n• Cookies de seguimiento\n• Cookies publicitarias\n• Cookies de análisis de terceros\n• Cookies que recopilen información personal'
        },
        {
          title: 'Gestión de cookies',
          content: 'Puedes configurar tu navegador para rechazar todas las cookies, sin embargo, esto puede afectar al funcionamiento del sitio web. La mayoría de los navegadores permiten gestionar las preferencias de cookies en su configuración.'
        }
      ]
    },
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: November 2025',
      sections: [
        {
          title: 'What are cookies?',
          content: 'Cookies are small text files that are stored on your device when you visit a website. They are used to make websites work more efficiently, as well as to provide information to website owners.'
        },
        {
          title: 'Cookies we use',
          content: 'At PASSATGE we only use essential technical cookies for the basic functioning of the website. These cookies are necessary for:'
        },
        {
          title: 'Essential technical cookies',
          content: '• Remember your language preferences\n• Maintain basic website functionality\n• Ensure browsing security\n\nThese cookies do not require consent as they are strictly necessary for the site to function.'
        },
        {
          title: 'Cookies we do NOT use',
          content: 'We do NOT use:\n• Tracking cookies\n• Advertising cookies\n• Third-party analytics cookies\n• Cookies that collect personal information'
        },
        {
          title: 'Cookie management',
          content: 'You can configure your browser to reject all cookies, however, this may affect the functioning of the website. Most browsers allow you to manage cookie preferences in their settings.'
        }
      ]
    }
  };

  const pageContent = content[language] || content.es;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            {pageContent.title}
          </h1>
          <p className="text-gray-400">
            {pageContent.lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {pageContent.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {section.title}
              </h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 p-6 rounded-lg border border-gray-700" style={{ backgroundColor: '#2a2a2a' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
          <p className="text-gray-300">
            Si tienes cualquier pregunta sobre esta política de cookies, puedes contactarnos en:
          </p>
          <p className="text-amber-600 mt-2">
            info@passatgebar.com
          </p>
        </div>
      </div>
    </div>
  );
}
