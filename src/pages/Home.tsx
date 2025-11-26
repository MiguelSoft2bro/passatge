
import HeroSection from '@/components/ui/HeroSection';
import AboutSection from '@/components/ui/AboutSection';
import FeaturedDishesSection from '@/components/ui/FeaturedDishesSection';
import ReservationSection from '@/components/ui/ReservationSection';
import TeamSection from '@/components/ui/TeamSection';
import TestimonialsSection from '@/components/ui/TestimonialsSection';
import VenueSection from '@/components/ui/VenueSection';
import ContactSection from '@/components/ui/ContactSection';
import FloatingNavigation from '@/components/ui/FloatingNavigation';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <FeaturedDishesSection />
      <ReservationSection />
      <TeamSection />
      <div id="local">
        <VenueSection />
      </div>
      <TestimonialsSection />
      
      <div id="contact">
        <ContactSection />
      </div>
      <FloatingNavigation />
    </div>
  );
}
