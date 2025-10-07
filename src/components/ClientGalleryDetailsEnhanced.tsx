import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Facebook,
  Grid2X2,
  Grip,
  Heart,
  Instagram,
  Link as LinkIcon,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import type { ClientGallery } from "../types";
import { supabase } from "../lib/supabase";
import { cloudinaryService } from "../services/cloudinaryService";
import {
  getCloudinaryFullSize,
  getCloudinaryOriginal,
  getCloudinaryPreview,
} from "../utils/cloudinary";

interface ClientGalleryDetailsEnhancedProps {
  gallery: ClientGallery;
  onBack?: () => void;
  onUpdate?: () => void;
}

type ViewMode = "grid" | "masonry";

type ShareOptionKey = "instagram" | "facebook" | "copy";

const shareOptionOrder: ShareOptionKey[] = ["instagram", "facebook", "copy"];

const floatingAccents: {
  id: string;
  className: string;
  animation: {
    initial: { opacity: number; scale: number };
    animate: { opacity: number; scale: number; y: number[] };
    transition: {
      duration: number;
      repeat: number;
      repeatType: "mirror";
      delay?: number;
    };
  };
}[] = [
  {
    id: "sunrise",
    className:
      "left-[-10%] top-[-12%] h-72 w-72 bg-[radial-gradient(circle_at_center,_rgba(239,212,190,0.55)_0%,_rgba(239,212,190,0)_70%)]",
    animation: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1, y: [0, 14, 0] },
      transition: { duration: 14, repeat: Infinity, repeatType: "mirror" },
    },
  },
  {
    id: "terracotta",
    className:
      "right-[-14%] top-[8%] h-60 w-60 bg-[radial-gradient(circle_at_center,_rgba(214,153,115,0.45)_0%,_rgba(214,153,115,0)_70%)]",
    animation: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1, y: [0, -18, 0] },
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: "mirror",
        delay: 2,
      },
    },
  },
  {
    id: "blush",
    className:
      "bottom-[-18%] left-[12%] h-80 w-80 bg-[radial-gradient(circle_at_center,_rgba(240,217,202,0.55)_0%,_rgba(240,217,202,0)_70%)]",
    animation: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1, y: [0, 20, 0] },
      transition: {
        duration: 16,
        repeat: Infinity,
        repeatType: "mirror",
        delay: 1.2,
      },
    },
  },
];

const tooltipBaseClasses =
  "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f7ede2] px-3 py-1 text-xs font-medium text-[#71513d] shadow-lg shadow-[#d9c3b0]/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100";

const ClientGalleryDetailsEnhanced: React.FC<
  ClientGalleryDetailsEnhancedProps
> = ({ gallery, onBack }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [shareTarget, setShareTarget] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const session = useMemo(() => {
    const raw = sessionStorage.getItem("client_gallery_session");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { gallery_id: string; client_email: string };
    } catch (error) {
      console.warn("[ClientGallery] Failed to parse session", error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadFavorites() {
      if (!session?.client_email || !gallery?.id) {
        setLoadingFavorites(false);
        return;
      }

      const { data, error } = await supabase
        .from("client_gallery_favorites")
        .select("image_public_id")
        .eq("gallery_id", gallery.id)
        .eq("client_email", session.client_email);

      if (!isMounted) return;

      if (error) {
        console.error("[ClientGallery] Failed to load favorites", error);
      }

      const initialFavorites = new Set<string>(
        (data || []).map((fav) => fav.image_public_id),
      );
      setFavorites(initialFavorites);
      setLoadingFavorites(false);
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [gallery.id, session?.client_email]);

  const images = useMemo(() => gallery.images || [], [gallery.images]);

  const filteredImages = useMemo(() => {
    if (!showFavoritesOnly) {
      return images;
    }

    return images.filter((imageId) => favorites.has(imageId));
  }, [favorites, images, showFavoritesOnly]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (filteredImages.length === 0) {
      setLightboxIndex(null);
      return;
    }

    if (lightboxIndex >= filteredImages.length) {
      setLightboxIndex(filteredImages.length - 1);
    }
  }, [filteredImages, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          const nextIndex = current + 1;
          return nextIndex >= filteredImages.length ? 0 : nextIndex;
        });
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          const previousIndex = current - 1;
          return previousIndex < 0 ? filteredImages.length - 1 : previousIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [filteredImages.length, lightboxIndex]);

  useEffect(() => {
    if (!shareTarget) return;
    const closeShareOnOutside = () => setShareTarget(null);
    window.addEventListener("scroll", closeShareOnOutside, { passive: true });
    return () => {
      window.removeEventListener("scroll", closeShareOnOutside);
    };
  }, [shareTarget]);

  const toggleFavorite = useCallback(
    async (imageId: string) => {
      if (!session?.client_email || !gallery?.id) {
        return;
      }

      const isFavorite = favorites.has(imageId);

      try {
        if (isFavorite) {
          const { error } = await supabase
            .from("client_gallery_favorites")
            .delete()
            .eq("gallery_id", gallery.id)
            .eq("client_email", session.client_email)
            .eq("image_public_id", imageId);

          if (!error) {
            setFavorites((prev) => {
              const updated = new Set(prev);
              updated.delete(imageId);
              return updated;
            });
          }
        } else {
          const { error } = await supabase
            .from("client_gallery_favorites")
            .insert({
              gallery_id: gallery.id,
              client_email: session.client_email,
              image_public_id: imageId,
            });

          if (!error) {
            setFavorites((prev) => {
              const updated = new Set(prev);
              updated.add(imageId);
              return updated;
            });
          }
        }
      } catch (error) {
        console.error("[ClientGallery] Failed to toggle favorite", error);
      }
    },
    [favorites, gallery.id, session?.client_email],
  );

  const handleDownload = useCallback((imageId: string) => {
    const url = getCloudinaryFullSize(imageId);
    if (!url) return;

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${imageId.split("/").pop() || "gallery-image"}.jpg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, []);

  const handleShare = useCallback((imageId: string) => {
    setCopiedShare(false);
    setShareTarget((current) => (current === imageId ? null : imageId));
  }, []);

  const handleShareOption = useCallback(
    async (imageId: string, option: ShareOptionKey) => {
      const url = getCloudinaryOriginal(imageId);
      if (!url) return;

      if (option === "copy") {
        try {
          await navigator.clipboard.writeText(url);
          setCopiedShare(true);
        } catch (error) {
          console.error("[ClientGallery] Failed to copy link", error);
        }
        return;
      }

      if (option === "facebook") {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank", "noopener");
        return;
      }

      if (option === "instagram") {
        const shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank", "noopener");
      }
    },
    [],
  );

  const lightboxImageId =
    lightboxIndex === null ? null : filteredImages[lightboxIndex];

  const shareButtons: Record<
    ShareOptionKey,
    { label: string; icon: React.ReactNode }
  > = {
    instagram: {
      label: "Share to Instagram",
      icon: <Instagram className="h-4 w-4" />,
    },
    facebook: {
      label: "Share to Facebook",
      icon: <Facebook className="h-4 w-4" />,
    },
    copy: {
      label: copiedShare ? "Link copied!" : "Copy link",
      icon: <LinkIcon className="h-4 w-4" />,
    },
  };

  return (
    <div className="relative min-h-screen bg-[#f9f4ef] text-[#5f4636]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#fefaf4_0%,_#f1e4d6_50%,_#e7d4c0_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-[0.08]" />
      <FloatingAccents />

      <div className="relative z-10">
        <header className="border-b border-[#d8c4b4]/60 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Go back to galleries"
                  className="group rounded-full bg-[#f2e3d6] p-3 text-[#7c5a45] shadow-md shadow-[#d9c3b0]/50 transition hover:bg-[#eed4c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f4ef]"
                >
                  <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
                </button>
              )}
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#b08a6b]">
                  Client Gallery
                </p>
                <h1
                  className="mt-2 text-3xl font-semibold text-[#5f4636] sm:text-4xl"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {gallery.bride_name && gallery.groom_name
                    ? `${gallery.bride_name} & ${gallery.groom_name}`
                    : gallery.client_name || "Wedding Moments"}
                </h1>
                {gallery.wedding_date && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#7b5b4b]">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(gallery.wedding_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 text-sm text-[#71513d] shadow-lg shadow-[#d9c3b0]/40">
                <Sparkles className="h-4 w-4 text-[#b98560]" />
                <span>
                  {favorites.size}{" "}
                  {favorites.size === 1 ? "favorite" : "favorites"} ·{" "}
                  {images.length}{" "}
                  {images.length === 1 ? "photograph" : "photographs"}
                </span>
              </div>

              {gallery.welcome_message && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md rounded-[1.75rem] bg-gradient-to-br from-white/90 to-[#f7e8dc]/80 p-5 text-sm text-[#6f5646] shadow-xl shadow-[#d9c3b0]/40"
                >
                  <p
                    className="leading-relaxed"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {gallery.welcome_message}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <AnimatePresence>
            {showFavoritesOnly && (
              <motion.div
                key="favorites-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 flex items-center gap-3 rounded-[1.5rem] bg-[#f4e3d6] px-5 py-3 text-[#6d4f3f] shadow-lg shadow-[#d9c3b0]/30"
              >
                <Heart className="h-4 w-4 fill-[#d27a6c] text-[#d27a6c]" />
                <span>Showing only the moments you adored.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {loadingFavorites ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#f3e3d6] via-[#f7ede2] to-[#edd8c2] shadow-lg shadow-[#d9c3b0]/40"
                >
                  <div className="h-full w-full animate-pulse bg-[radial-gradient(circle_at_top,_#fdf6ee_0%,_#f0dfcc_50%,_#e4cdb6_100%)]" />
                </div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[2rem] bg-white/80 px-10 py-20 text-center shadow-xl shadow-[#d9c3b0]/40">
              <div className="relative mb-6 h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-[#f0dece]/80" />
                <svg
                  viewBox="0 0 120 120"
                  className="relative h-24 w-24 fill-none text-[#d1a082]"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    stroke="currentColor"
                    strokeDasharray="6 10"
                    strokeWidth="2"
                  />
                  <path
                    d="M35 70 C45 50, 75 50, 85 70"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="48" cy="52" r="3" fill="currentColor" />
                  <circle cx="72" cy="52" r="3" fill="currentColor" />
                </svg>
              </div>
              <h2
                className="text-2xl font-semibold text-[#6a4c3c]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {showFavoritesOnly
                  ? "Your heart is still choosing."
                  : "The gallery is almost ready."}
              </h2>
              <p className="mt-3 max-w-md text-sm text-[#7d5d4b]">
                {showFavoritesOnly
                  ? "Tap the hearts to add favorites and weave your collection of cherished memories."
                  : "Return soon to explore every handcrafted moment from this love story."}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
              }
            >
              {filteredImages.map((imageId, index) => (
                <motion.div
                  key={imageId}
                  layout
                  className={
                    viewMode === "masonry"
                      ? "mb-6 break-inside-avoid"
                      : "aspect-[3/4] overflow-hidden rounded-[1.75rem]"
                  }
                >
                  <ImageCard
                    imageId={imageId}
                    allowDownload={gallery.allow_downloads}
                    isFavorite={favorites.has(imageId)}
                    onOpen={() => setLightboxIndex(index)}
                    onToggleFavorite={() => toggleFavorite(imageId)}
                    onDownload={() => handleDownload(imageId)}
                    onShare={() => handleShare(imageId)}
                    showShare={shareTarget === imageId}
                    viewMode={viewMode}
                    shareButtons={shareButtons}
                    onShareOption={(option) =>
                      handleShareOption(imageId, option)
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {lightboxImageId && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f140d]/70 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-8 top-8 rounded-full bg-white/80 p-3 text-[#6d4f3f] shadow-lg shadow-black/20 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
              aria-label="Close viewer"
              title="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current === 0
                    ? filteredImages.length - 1
                    : current - 1;
                })
              }
              className="absolute left-6 rounded-full bg-white/70 p-3 text-[#6d4f3f] shadow-lg shadow-black/20 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
              aria-label="Previous image"
              title="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current >= filteredImages.length - 1 ? 0 : current + 1;
                })
              }
              className="absolute right-6 rounded-full bg-white/70 p-3 text-[#6d4f3f] shadow-lg shadow-black/20 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
              aria-label="Next image"
              title="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={lightboxImageId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              src={getCloudinaryPreview(lightboxImageId)}
              alt="Highlighted gallery photograph"
              className="max-h-[80vh] max-w-[80vw] rounded-[2rem] object-cover shadow-2xl shadow-black/50"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-10 flex items-center gap-3 rounded-full bg-white/80 px-6 py-3 text-sm text-[#6b4f3f] shadow-xl shadow-black/20"
            >
              {gallery.allow_downloads && (
                <button
                  type="button"
                  onClick={() =>
                    lightboxImageId && handleDownload(lightboxImageId)
                  }
                  className="flex items-center gap-2 rounded-full bg-[#f2e3d6] px-3 py-2 transition hover:bg-[#eed4c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
                  aria-label="Download this photo"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              )}
              <button
                type="button"
                onClick={() => lightboxImageId && handleShare(lightboxImageId)}
                className="flex items-center gap-2 rounded-full bg-[#f2e3d6] px-3 py-2 transition hover:bg-[#eed4c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
                aria-label="Share this photo"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite" role="status">
        {copiedShare ? "Photo link copied to clipboard" : ""}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
      >
        <FloatingActionButton
          icon={<ArrowUp className="h-4 w-4" />}
          label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <FloatingActionButton
          active={showFavoritesOnly}
          icon={
            <Heart
              className={`h-4 w-4 ${showFavoritesOnly ? "fill-[#d27a6c] text-[#d27a6c]" : ""}`}
            />
          }
          label={showFavoritesOnly ? "Show all moments" : "Show favorites"}
          onClick={() => setShowFavoritesOnly((previous) => !previous)}
        />
        <FloatingActionButton
          icon={
            viewMode === "grid" ? (
              <Grip className="h-4 w-4" />
            ) : (
              <Grid2X2 className="h-4 w-4" />
            )
          }
          label={viewMode === "grid" ? "Masonry view" : "Grid view"}
          onClick={() =>
            setViewMode((previous) =>
              previous === "grid" ? "masonry" : "grid",
            )
          }
        />
      </motion.div>
    </div>
  );
};

interface ImageCardProps {
  imageId: string;
  isFavorite: boolean;
  allowDownload: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
  onDownload: () => void;
  onShare: () => void;
  showShare: boolean;
  viewMode: ViewMode;
  shareButtons: Record<
    ShareOptionKey,
    { label: string; icon: React.ReactNode }
  >;
  onShareOption: (option: ShareOptionKey) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageId,
  isFavorite,
  allowDownload,
  onOpen,
  onToggleFavorite,
  onDownload,
  onShare,
  showShare,
  viewMode,
  shareButtons,
  onShareOption,
}) => {
  const [loaded, setLoaded] = useState(false);
  const sharePanelId = useMemo(
    () => `share-menu-${imageId.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    [imageId],
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] bg-[#f7ece2]/60 shadow-xl shadow-[#d9c3b0]/40 transition ${
        viewMode === "grid" ? "h-full" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d29b7a]"
        aria-label="Open photo in lightbox"
      >
        <AnimatePresence>{!loaded && <ShimmerOverlay />}</AnimatePresence>
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={cloudinaryService.getOptimizedUrl(imageId, {
            width: 900,
            quality: "auto",
            crop: "fill",
          })}
          alt="Client gallery photograph"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
            viewMode === "grid" ? "aspect-[3/4]" : ""
          }`}
        />
      </button>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2e1c13]/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? "Remove from favorites" : "Save to favorites"
          }
          whileTap={{ scale: 0.9 }}
          animate={
            isFavorite
              ? { scale: [1, 1.2, 1], transition: { duration: 0.4 } }
              : { scale: 1 }
          }
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#6d4f3f] shadow-lg shadow-[#d9c3b0]/50 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a] focus-visible:ring-offset-2"
        >
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-full bg-[#f7ede2] px-3 py-1 text-xs font-medium text-[#71513d] opacity-0 shadow-lg shadow-[#d9c3b0]/40 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            {isFavorite ? "Remove favorite" : "Save to favorites"}
          </span>
          <Heart
            className={`h-5 w-5 transition ${isFavorite ? "fill-[#d27a6c] text-[#d27a6c]" : ""}`}
          />
        </motion.button>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {allowDownload && (
          <div className="group relative">
            <span className={tooltipBaseClasses}>Download photo</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDownload();
              }}
              aria-label="Download photo"
              title="Download photo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#6d4f3f] shadow-lg shadow-[#d9c3b0]/50 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a] focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="group relative">
          <span className={tooltipBaseClasses}>
            {showShare ? "Close share options" : "Share"}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onShare();
            }}
            aria-haspopup="menu"
            aria-expanded={showShare}
            aria-controls={showShare ? sharePanelId : undefined}
            aria-label={
              showShare ? "Close share options" : "Open share options"
            }
            title="Share this photo"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#6d4f3f] shadow-lg shadow-[#d9c3b0]/50 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a] focus-visible:ring-offset-2"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            id={sharePanelId}
            role="menu"
            className="absolute bottom-20 right-4 z-20 w-52 rounded-2xl bg-white/95 p-3 text-sm text-[#6d4f3f] shadow-2xl shadow-[#b99273]/40"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="px-2 pb-2 text-xs uppercase tracking-[0.2em] text-[#ba8e6d]">
              Share
            </p>
            <div className="flex flex-col gap-2">
              {shareOptionOrder.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onShareOption(option);
                  }}
                  role="menuitem"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#f6e8dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2e3d6] text-[#7d5b46]">
                    {shareButtons[option].icon}
                  </span>
                  <span className="text-xs font-medium tracking-wide text-[#6d4f3f]">
                    {shareButtons[option].label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShimmerOverlay: React.FC = () => (
  <motion.div
    key="shimmer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 animate-[pulse_1.8s_ease-in-out_infinite] bg-gradient-to-br from-[#f3e2d6] via-[#f7ede2] to-[#edd8c2]"
  />
);

const FloatingAccents: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {floatingAccents.map(({ id, className, animation }) => (
      <motion.span
        key={id}
        initial={animation.initial}
        animate={animation.animate}
        transition={animation.transition}
        aria-hidden="true"
        className={`absolute rounded-full blur-3xl ${className}`}
      />
    ))}
  </div>
);

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  active,
}) => (
  <div className="group relative">
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={typeof active === "boolean" ? active : undefined}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#e7d4c3] bg-white/90 text-[#6d4f3f] shadow-xl shadow-[#d9c3b0]/40 transition hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d29b7a] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        active ? "ring-2 ring-[#d29b7a]/80" : ""
      }`}
    >
      {icon}
    </button>
    <span className="pointer-events-none absolute right-[110%] top-1/2 -translate-y-1/2 rounded-full bg-[#f7ede2] px-3 py-1 text-xs font-medium text-[#6d4f3f] opacity-0 shadow-lg shadow-[#d9c3b0]/40 transition group-hover:opacity-100 group-focus-visible:opacity-100">
      {label}
    </span>
  </div>
);

export default ClientGalleryDetailsEnhanced;
