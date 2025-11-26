import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Noviembre 2025',
      sections: [
        {
          title: 'Información que recopilamos',
          content: 'En PASSATGE Bar Gastronómico NO recopilamos información personal a través de nuestro sitio web. No utilizamos formularios de contacto, no solicitamos datos personales, ni realizamos seguimiento de usuarios.'
        },
        {
          title: 'Uso de la información',
          content: 'Al no recopilar información personal, no procesamos, almacenamos ni compartimos ningún dato personal de nuestros visitantes.'
        },
        {
          title: 'Cookies y tecnologías de seguimiento',
          content: 'Solo utilizamos cookies técnicas esenciales para el funcionamiento básico del sitio web (como preferencias de idioma). No utilizamos cookies de seguimiento, análisis o publicitarias.'
        },
        {
          title: 'Contacto directo',
          content: 'Si decides contactarnos directamente por teléfono, email o WhatsApp, cualquier información que compartas será utilizada únicamente para responder a tu consulta o reserva.'
        },
        {
          title: 'Enlaces externos',
          content: 'Nuestro sitio puede contener enlaces a plataformas externas como Google Maps, WhatsApp o redes sociales. Estas plataformas tienen sus propias políticas de privacidad.'
        },
        {
          title: 'Derechos de los usuarios',
          content: 'Dado que no recopilamos información personal, no hay datos que consultar, modificar o eliminar. Si tienes cualquier pregunta sobre privacidad, puedes contactarnos directamente.'
        },
        {
          title: 'Cambios en esta política',
          content: 'Cualquier cambio en esta política de privacidad será publicado en esta página. Te recomendamos revisarla periódicamente.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: November 2025',
      sections: [
        {
          title: 'Information we collect',
          content: 'At PASSATGE Bar Gastronómico we DO NOT collect personal information through our website. We do not use contact forms, we do not request personal data, nor do we track users.'
        },
        {
          title: 'Use of information',
          content: 'By not collecting personal information, we do not process, store or share any personal data from our visitors.'
        },
        {
          title: 'Cookies and tracking technologies',
          content: 'We only use essential technical cookies for basic website functionality (such as language preferences). We do not use tracking, analytics or advertising cookies.'
        },
        {
          title: 'Direct contact',
          content: 'If you choose to contact us directly by phone, email or WhatsApp, any information you share will be used solely to respond to your inquiry or reservation.'
        },
        {
          title: 'External links',
          content: 'Our site may contain links to external platforms such as Google Maps, WhatsApp or social networks. These platforms have their own privacy policies.'
        },
        {
          title: 'User rights',
          content: 'Since we do not collect personal information, there is no data to consult, modify or delete. If you have any privacy questions, you can contact us directly.'
        },
        {
          title: 'Changes to this policy',
          content: 'Any changes to this privacy policy will be posted on this page. We recommend that you review it periodically.'
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
              <div className="text-gray-300 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 p-6 rounded-lg border border-gray-700" style={{ backgroundColor: '#2a2a2a' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
          <p className="text-gray-300 mb-4">
            Para cualquier consulta relacionada con la privacidad, puedes contactarnos:
          </p>
          <div className="space-y-2 text-gray-300">
            <p><strong>Email:</strong> <span className="text-amber-600">info@passatgebar.com</span></p>
            <p><strong>Teléfono:</strong> <span className="text-amber-600">+34 96 683 6875</span></p>
            <p><strong>Dirección:</strong> C. Malaga, 03005 Alicante (San Blas)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
