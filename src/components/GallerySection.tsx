import { useEffect, useState, useMemo } from 'react';
import { getGalleries } from '../services/galleryService';
import { isSupabaseConfigured } from '../lib/supabase';
import { getCloudinaryUrl, getCloudinaryFullSize } from '../utils/cloudinary';
import type { Gallery } from '../types';

export default function GallerySection() {
  console.log('GallerySection v2.0.0 - Build:', Date.now());
  
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Lightbox state
  const [active, setActive] = useState<{
    gallery?: Gallery;
    index: number;
    open: boolean;
  }>({ gallery: undefined, index: 0, open: false });

  useEffect(() => {
    let mounted = true;
    
    (async () => {
      try {
        console.log('🎨 [GallerySection] Starting gallery fetch...');
        console.log('🎨 [GallerySection] isSupabaseConfigured:', isSupabaseConfigured);
        
        const data = await getGalleries();
        
        console.log('🎨 [GallerySection] Raw data received:', {
          count: data?.length ?? 0,
          data: data,
          firstItem: data?.[0]
        });
        
        if (mounted) {
          setGalleries(data);
          console.log('🎨 [GallerySection] State updated with galleries:', data.length);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error loading galleries';
        const stack = error instanceof Error ? error.stack : undefined;
        console.error('❌ [GallerySection] Error:', error);
        console.error('❌ [GallerySection] Error details:', {
          message,
          stack
        });
        if (mounted) setErr(message);
      } finally {
        if (mounted) {
          setLoading(false);
          console.log('🎨 [GallerySection] Loading finished. Final state:', {
            loading: false
          });
        }
      }
    })();
    
    return () => { 
      mounted = false; 
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!active.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active.open]);

  const openGallery = (g: Gallery, startIndex = 0) => {
    if (!g.images || g.images.length === 0) {
      console.warn('[GallerySection] Cannot open gallery - no images:', g.title);
      return;
    }
    setActive({ gallery: g, index: startIndex, open: true });
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeGallery = () => {
    setActive({ gallery: undefined, index: 0, open: false });
    document.body.style.overflow = ''; // Restore scroll
  };

  const prev = () =>
    setActive(state => {
      if (!state.gallery) return state;
      const len = state.gallery.images.length;
      return { ...state, index: (state.index - 1 + len) % len };
    });

  const next = () =>
    setActive(state => {
      if (!state.gallery) return state;
      const len = state.gallery.images.length;
      return { ...state, index: (state.index + 1) % len };
    });

  const slides = useMemo(() => {
    if (!active.gallery) return [];
    return active.gallery.images.map(id => getCloudinaryFullSize(id));
  }, [active.gallery]);

  // Add rendering state logging
  console.log('🎨 [GallerySection] RENDER STATE:', {
    loading,
    error: err,
    galleriesCount: galleries.length,
    isSupabaseConfigured,
    galleries: galleries.map(g => ({ id: g.id, title: g.title, hasCover: !!g.cover_image }))
  });

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="aspect-[3/4] rounded-2xl bg-gray-200 animate-pulse" 
          />
        ))}
      </div>
    );
  }

  // Error state
  if (err) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">⚠️ {err}</div>
        <div className="text-sm text-gray-500">
          {!isSupabaseConfigured && 'Supabase не е конфигуриран'}
        </div>
      </div>
    );
  }

  // Empty state
  if (galleries.length === 0) {
    return (
      <div className="text-center py-12 text-[#2c3831]/70">
        {isSupabaseConfigured 
          ? 'Няма добавени галерии все още.' 
          : 'Галериите ще се зареждат след конфигуриране на базата данни.'}
      </div>
    );
  }

  return (
    <>
      {/* Grid of cover cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {galleries.map((g) => {
          const cover = g.cover_image
            ? getCloudinaryUrl(g.cover_image, { width: 800, height: 1000, crop: 'fill', quality: 'auto' })
            : '';

          return (
            <button
              key={g.id}
              onClick={() => openGallery(g, 0)}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#faf8f3] border border-[#e5d5c8] shadow hover:shadow-xl transition-all duration-300"
              aria-label={`Отвори галерия ${g.title}`}
            >
              {cover ? (
                <img
                  src={cover}
                  alt={g.title ?? 'Галерия'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#2c3831]/50">
                  Без корица
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                <div className="text-white text-sm font-semibold truncate">
                  {g.title}
                </div>
                {g.subtitle && (
                  <div className="text-white/80 text-xs truncate">
                    {g.subtitle}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {active.open && active.gallery && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeGallery}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition z-10"
            onClick={closeGallery}
            aria-label="Затвори"
          >
            ✕
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 md:left-8 text-white/80 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition z-10"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предишна"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={slides[active.index]}
            alt={`${active.gallery.title} - ${active.index + 1}`}
            className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            decoding="async"
          />

          {/* Next button */}
          <button
            className="absolute right-4 md:right-8 text-white/80 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition z-10"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следваща"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm">
            {active.gallery.title} · {active.index + 1} / {slides.length}
          </div>
        </div>
      )}
    </>
  );
}