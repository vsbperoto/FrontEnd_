import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowUp,
  Calendar,
  Heart,
  Image as ImageIcon,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "../contexts/LanguageContext";
import {
  getCloudinaryThumbnail,
  getCloudinaryFullSize,
} from "../utils/cloudinary";
import { supabase } from "../lib/supabase";
import type { ClientGallery } from "../types";

const LOADING_SKELETON_KEYS = Array.from(
  { length: 8 },
  (_, index) => `skeleton-${index}`,
);

export default function GalleryViewer() {
  const navigate = useNavigate();
  const { galleryId } = useParams();
  const { language } = useLanguage();
  const locale = language === "bg" ? "bg-BG" : "en-US";

  const [gallery, setGallery] = useState<ClientGallery | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const loadGalleryData = useCallback(async () => {
    if (!galleryId) return;

    try {
      console.log("Loading gallery data for ID:", galleryId);

      const { data: galleryData, error: galleryError } = await supabase
        .from("client_galleries")
        .select("*")
        .eq("id", galleryId)
        .single();

      if (galleryError) {
        console.error("Error loading gallery:", galleryError);
        navigate("/client-gallery");
        return;
      }

      console.log("Gallery loaded:", galleryData);
      setGallery(galleryData as ClientGallery);

      const sessionData = sessionStorage.getItem("client_gallery_session");
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const { data: favoritesData } = await supabase
          .from("client_gallery_favorites")
          .select("image_public_id")
          .eq("gallery_id", galleryId)
          .eq("client_email", session.client_email);

        if (favoritesData) {
          const favIds = new Set(
            (favoritesData as { image_public_id: string }[]).map(
              (favorite) => favorite.image_public_id,
            ),
          );
          setFavorites(favIds);
          console.log("Favorites loaded:", favIds.size);
        }
      }
    } catch (err) {
      console.error("Error in loadGalleryData:", err);
    } finally {
      setLoading(false);
    }
  }, [galleryId, navigate]);

  useEffect(() => {
    // Check session
    const sessionData = sessionStorage.getItem("client_gallery_session");
    if (!sessionData || !galleryId) {
      navigate("/client-gallery");
      return;
    }

    const session = JSON.parse(sessionData);
    if (session.gallery_id !== galleryId) {
      navigate("/client-gallery");
      return;
    }

    loadGalleryData();
  }, [galleryId, loadGalleryData, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatCollectionLabel = useCallback((value: string) => {
    return value
      .split(/[-_/]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, []);

  const extractCollection = useCallback(
    (imageId: string) => {
      const segments = imageId.split("/");

      if (segments.length <= 1) {
        return { value: "highlights", label: "Highlights" };
      }

      const folder = segments.slice(0, -1).pop() ?? "highlights";
      const normalized = folder.toLowerCase();

      return {
        value: normalized,
        label: formatCollectionLabel(folder),
      };
    },
    [formatCollectionLabel],
  );

  async function handleToggleFavorite(imageId: string, e: React.MouseEvent) {
    e.stopPropagation();

    const sessionData = sessionStorage.getItem("client_gallery_session");
    if (!sessionData || !gallery) return;

    const session = JSON.parse(sessionData);
    const isFavorite = favorites.has(imageId);

    try {
      if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from("client_gallery_favorites")
          .delete()
          .eq("gallery_id", gallery.id)
          .eq("client_email", session.client_email)
          .eq("image_public_id", imageId);

        if (!error) {
          const newFavorites = new Set(favorites);
          newFavorites.delete(imageId);
          setFavorites(newFavorites);
        }
      } else {
        // Add favorite
        const { error } = await supabase
          .from("client_gallery_favorites")
          .insert({
            gallery_id: gallery.id,
            client_email: session.client_email,
            image_public_id: imageId,
          });

        if (!error) {
          const newFavorites = new Set(favorites);
          newFavorites.add(imageId);
          setFavorites(newFavorites);
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("client_gallery_session");
    navigate("/client-gallery");
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
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#fdf8f3,_#f1e4d3)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#b9cbbf]/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#f0c7a5]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#7c9885]/70">
              Evermore Client Gallery
            </p>
            <h1
              className="mt-4 text-3xl font-light text-[#2c3831] sm:text-4xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Подготвяме вашите спомени
            </h1>
            <p className="mt-2 text-base text-[#2c3831]/70">
              Миговете от вашия ден оживяват след секунди...
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {LOADING_SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm"
              >
                <div className="h-32 w-full animate-pulse rounded-xl bg-gradient-to-br from-[#f2ede5] via-[#efe5d7] to-[#f7efe3]" />
                <div className="mt-4 h-2 w-3/4 animate-pulse rounded-full bg-[#d9cfc1]" />
                <div className="mt-2 h-2 w-1/2 animate-pulse rounded-full bg-[#e7dbcc]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return null;
  }

  const daysUntilExpiration = getDaysUntilExpiration();
  const showExpirationWarning =
    daysUntilExpiration !== null &&
    daysUntilExpiration <= 7 &&
    daysUntilExpiration > 0;
  const displayImages = gallery.images || [];
  const collectionMap = new Map<string, string>();

  displayImages.forEach((imageId) => {
    const { value, label } = extractCollection(imageId);
    if (!collectionMap.has(value)) {
      collectionMap.set(value, label);
    }
  });

  const collections = Array.from(collectionMap.entries()).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const filteredByCollection =
    activeCollection === "all"
      ? displayImages
      : displayImages.filter(
          (imageId) => extractCollection(imageId).value === activeCollection,
        );

  const favoritesFiltered = showFavoritesOnly
    ? filteredByCollection.filter((imageId) => favorites.has(imageId))
    : filteredByCollection;

  const processedImages = [...favoritesFiltered].sort((a, b) =>
    sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a),
  );

  const lightboxSlides = processedImages.map((img) => ({
    src: getCloudinaryFullSize(img),
    alt: "",
  }));

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#faf4ed,_#f2e3d3)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-56 w-56 -translate-x-1/2 rounded-full bg-[#d7c2b3]/50 blur-3xl" />
        <div className="absolute top-20 right-4 h-40 w-40 rounded-full bg-[#bcd0c1]/40 blur-2xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-[#f8d7bd]/30 blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[#7c9885]">
                Private Memories
              </p>
              <h1
                className="text-3xl font-light text-[#2c3831] sm:text-4xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {gallery.bride_name && gallery.groom_name
                  ? `${gallery.bride_name} & ${gallery.groom_name}`
                  : gallery.client_name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#2c3831]/70">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
                  <ImageIcon className="h-4 w-4" />
                  {displayImages.length} снимки
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
                  <Heart className="h-4 w-4" />
                  {favorites.size} любими
                </span>
                {gallery.expiration_date && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
                    <Calendar className="h-4 w-4" />
                    Изтича на{" "}
                    {new Date(gallery.expiration_date).toLocaleDateString(
                      locale,
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7c9885]/40 ${
                  showFavoritesOnly
                    ? "bg-[#7c9885] text-white"
                    : "bg-white/80 text-[#2c3831] hover:bg-white focus:ring-offset-2"
                }`}
              >
                <Heart
                  className={`h-4 w-4 transition-transform ${showFavoritesOnly ? "scale-110" : "group-hover:scale-110"}`}
                />
                {showFavoritesOnly ? "Всички снимки" : "Само любими"}
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white/70 px-4 py-2 text-sm font-medium text-[#2c3831] shadow-sm transition hover:border-red-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <LogOut className="w-4 h-4" />
                Изход
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2c3831]/90 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/90">
                Curated Collection
              </div>
              {gallery.wedding_date && (
                <p className="text-sm text-[#2c3831]/70">
                  {new Date(gallery.wedding_date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#2c3831]/70">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1">
                <SlidersHorizontal className="h-4 w-4" />
                {processedImages.length} избрани кадъра
              </div>
              {activeCollection !== "all" && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[#7c9885]">
                  Филтър: {formatCollectionLabel(activeCollection)}
                </div>
              )}
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
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur">
            <p
              className="text-lg leading-relaxed text-[#2c3831]/80"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {gallery.welcome_message}
            </p>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-lg lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveCollection("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#7c9885]/40 ${
                activeCollection === "all"
                  ? "bg-[#7c9885] text-white shadow"
                  : "bg-white/80 text-[#2c3831] hover:bg-white"
              }`}
            >
              Всички серии
            </button>

            {collections.map((collection) => (
              <button
                key={collection.value}
                type="button"
                onClick={() => setActiveCollection(collection.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#7c9885]/40 ${
                  activeCollection === collection.value
                    ? "bg-[#7c9885] text-white shadow"
                    : "bg-white/80 text-[#2c3831] hover:bg-white"
                }`}
              >
                {collection.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#2c3831]/60">Подредба</span>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#2c3831] shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c9885]/40"
            >
              {sortOrder === "asc" ? "От най-стари" : "От най-нови"}
            </button>
          </div>
        </div>

        {processedImages.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-[#2c3831]/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#2c3831] mb-2">
              {showFavoritesOnly
                ? "Няма маркирани любими"
                : "Галерията все още се подготвя"}
            </h3>
            <p className="text-[#2c3831]/60">
              {showFavoritesOnly
                ? "Натиснете сърцето на снимка, за да я добавите"
                : "Моля, върнете се по-късно"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {processedImages.map((imageId, index) => (
              <div
                key={imageId}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={getCloudinaryThumbnail(imageId)}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-4 transition-all duration-500 group-hover:translate-y-0">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                      #{index + 1}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                      {extractCollection(imageId).label}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleToggleFavorite(imageId, e)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-[#2c3831] shadow-sm transition hover:bg-white"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(imageId)
                        ? "fill-red-500 text-red-500"
                        : "text-[#2c3831]"
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

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#2c3831] text-white shadow-xl transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7c9885]/60"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
