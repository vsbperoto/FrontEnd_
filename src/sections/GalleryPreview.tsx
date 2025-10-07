import React from 'react';
import GallerySection from '../components/GallerySection';

export default function GalleryPreview() {
  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Галерия</h2>
        <GallerySection />
      </div>
    </section>
  );
}