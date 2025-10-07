import React from 'react';
import HeroSection from '../sections/HeroSection';
import PricingSection from '../sections/PricingSection';
import GalleryPreview from '../sections/GalleryPreview';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}