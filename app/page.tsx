
import HeroSection from '@/components/ui/hero-section';
import AboutSection from '@/components/ui/about-section';
import GallerySection from '@/components/ui/gallery-section';
import ContactSection from '@/components/ui/contact-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
