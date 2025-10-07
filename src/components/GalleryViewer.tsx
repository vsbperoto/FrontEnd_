import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, Download, LogOut, Calendar, Image as ImageIcon } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getCloudinaryThumbnail, getCloudinaryFullSize } from '../utils/cloudinary';
import { supabase } from '../lib/supabase';
import type { ClientGallery } from '../types';

export default function GalleryViewer() {
  const navigate = useNavigate();
  const { galleryId } = useParams();
  const { language, translations } = useLanguage();
  const t = translations[language];

  const [gallery, setGallery] = useState<ClientGallery | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    // Check session
    const sessionData = sessionStorage.getItem('client_gallery_session');
    if (!sessionData || !galleryId) {
      navigate('/client-gallery');
      return;
    }

    const session = JSON.parse(sessionData);
    if (session.gallery_id !== galleryId) {
      navigate('/client-gallery');
      return;
    }

    loadGalleryData();
  }, [galleryId, navigate]);

  async function loadGalleryData() {
    if (!galleryId) return;

    try {
      console.log('Loading gallery data for ID:', galleryId);

      // Load gallery
      const { data: galleryData, error: galleryError } = await supabase
        .from('client_galleries')
        .select('*')
        .eq('id', galleryId)
        .single();

      if (galleryError) {
        console.error('Error loading gallery:', galleryError);
        navigate('/client-gallery');
        return;
      }

      console.log('Gallery loaded:', galleryData);
      setGallery(galleryData as ClientGallery);

      // Load favorites
      const sessionData = sessionStorage.getItem('client_gallery_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const { data: favoritesData } = await supabase
          .from('client_gallery_favorites')
          .select('image_public_id')
          .eq('gallery_id', galleryId)
          .eq('client_email', session.client_email);

        if (favoritesData) {
          const favIds = new Set(favoritesData.map((f: any) => f.image_public_id));
          setFavorites(favIds);
          console.log('Favorites loaded:', favIds.size);
        }
      }
    } catch (err) {
      console.error('Error in loadGalleryData:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFavorite(imageId: string, e: React.MouseEvent) {
    e.stopPropagation();

    const sessionData = sessionStorage.getItem('client_gallery_session');
    if (!sessionData || !gallery) return;

    const session = JSON.parse(sessionData);
    const isFavorite = favorites.has(imageId);

    try {
      if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from('client_gallery_favorites')
          .delete()
          .eq('gallery_id', gallery.id)
          .eq('client_email', session.client_email)
          .eq('image_public_id', imageId);

        if (!error) {
          const newFavorites = new Set(favorites);
          newFavorites.delete(imageId);
          setFavorites(newFavorites);
        }
      } else {
        // Add favorite
        const { error } = await supabase
          .from('client_gallery_favorites')
          .insert({
            gallery_id: gallery.id,
            client_email: session.client_email,
            image_public_id: imageId
          });

        if (!error) {
          const newFavorites = new Set(favorites);
          newFavorites.add(imageId);
          setFavorites(newFavorites);
        }
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('client_gallery_session');
    navigate('/client-gallery');
  }

  function getDaysUntilExpiration(): number | null {
    if (!gallery?.expiration_date) return null;
    const expirationDate = new Date(gallery.expiration_date);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c9885] mx-auto mb-4"></div>
          <p className="text-[#2c3831]">Зареждане на галерията...</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return null;
  }

  const daysUntilExpiration = getDaysUntilExpiration();
  const showExpirationWarning = daysUntilExpiration !== null && daysUntilExpiration <= 7 && daysUntilExpiration > 0;
  const displayImages = gallery.images || [];
  const filteredImages = showFavoritesOnly 
    ? displayImages.filter(img => favorites.has(img))
    : displayImages;

  const lightboxSlides = filteredImages.map(img => ({
    src: getCloudinaryFullSize(img),
    alt: ''
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#2c3831]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-light text-[#2c3831] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {gallery.bride_name && gallery.groom_name
                  ? `${gallery.bride_name} & ${gallery.groom_name}`
                  : gallery.client_name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#2c3831]/60">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  {displayImages.length} снимки
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {favorites.size} любими
                </span>
                {gallery.expiration_date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Изтича на {new Date(gallery.expiration_date).toLocaleDateString('bg-BG')}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showFavoritesOnly
                    ? 'bg-[#7c9885] text-white'
                    : 'bg-white border border-[#2c3831]/20 text-[#2c3831] hover:border-[#7c9885]'
                }`}
              >
                {showFavoritesOnly ? 'Всички снимки' : 'Само любими'}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-[#2c3831]/20 text-[#2c3831] hover:border-red-400 hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Изход
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expiration Warning */}
      {showExpirationWarning && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="text-sm text-amber-800">
              Галерията изтича след {daysUntilExpiration} дни
            </p>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {gallery.welcome_message && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-[#2c3831]/80 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              {gallery.welcome_message}
            </p>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-[#2c3831]/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#2c3831] mb-2">
              {showFavoritesOnly ? 'Няма маркирани любими' : 'Галерията все още се подготвя'}
            </h3>
            <p className="text-[#2c3831]/60">
              {showFavoritesOnly ? 'Натиснете сърцето на снимка, за да я добавите' : 'Моля, върнете се по-късно'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((imageId, index) => (
              <div
                key={imageId}
                className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={getCloudinaryThumbnail(imageId)}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <button
                  onClick={(e) => handleToggleFavorite(imageId, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all z-10"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(imageId)
                        ? 'fill-red-500 text-red-500'
                        : 'text-[#2c3831]'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[]}
      />
    </div>
  );
}