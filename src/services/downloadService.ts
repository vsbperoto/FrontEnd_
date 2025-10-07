import JSZip from 'jszip';
import { trackDownload } from './clientGalleryService';
import { getCloudinaryOriginal } from '../utils/cloudinary';
import type { ClientImage, DownloadRecord } from '../types';

export interface DownloadProgress {
  current: number;
  total: number;
  percentage: number;
  status: 'downloading' | 'processing' | 'complete' | 'error';
  message: string;
}

export type ProgressCallback = (progress: DownloadProgress) => void;

export async function downloadSingleImage(
  imageUrl: string,
  filename: string
): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to download image');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
}

export async function downloadImagesAsZip(
  images: ClientImage[],
  zipFilename: string,
  onProgress?: ProgressCallback
): Promise<boolean> {
  if (images.length === 0) {
    return false;
  }

  try {
    const zip = new JSZip();
    const total = images.length;

    onProgress?.({
      current: 0,
      total,
      percentage: 0,
      status: 'downloading',
      message: 'Starting download...'
    });

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageUrl = getCloudinaryOriginal(image.image_url);

      onProgress?.({
        current: i + 1,
        total,
        percentage: Math.floor(((i + 1) / total) * 100),
        status: 'downloading',
        message: `Downloading image ${i + 1} of ${total}...`
      });

      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error(`Failed to fetch image ${i + 1}: ${imageUrl}`);
          continue;
        }

        const blob = await response.blob();
        const extension = getImageExtension(imageUrl);
        const filename = `${String(i + 1).padStart(4, '0')}_${image.title || 'image'}${extension}`;

        zip.file(filename, blob);
      } catch (error) {
        console.error(`Error downloading image ${i + 1}:`, error);
      }
    }

    onProgress?.({
      current: total,
      total,
      percentage: 100,
      status: 'processing',
      message: 'Creating ZIP file...'
    });

    const zipBlob = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6
        }
      },
      (metadata) => {
        onProgress?.({
          current: total,
          total,
          percentage: Math.floor(metadata.percent),
          status: 'processing',
          message: `Creating ZIP file... ${Math.floor(metadata.percent)}%`
        });
      }
    );

    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    onProgress?.({
      current: total,
      total,
      percentage: 100,
      status: 'complete',
      message: 'Download complete!'
    });

    return true;
  } catch (error) {
    console.error('Error creating ZIP file:', error);

    onProgress?.({
      current: 0,
      total: images.length,
      percentage: 0,
      status: 'error',
      message: 'Download failed. Please try again.'
    });

    return false;
  }
}

export async function downloadAllImages(
  galleryId: string,
  clientEmail: string,
  images: ClientImage[],
  galleryName: string,
  onProgress?: ProgressCallback
): Promise<boolean> {
  const success = await downloadImagesAsZip(
    images,
    `${sanitizeFilename(galleryName)}-wedding-photos.zip`,
    onProgress
  );

  if (success) {
    const record: DownloadRecord = {
      gallery_id: galleryId,
      client_email: clientEmail,
      download_type: 'zip_all',
      image_count: images.length,
      downloaded_at: new Date().toISOString()
    };
    await trackDownload(record);
  }

  return success;
}

export async function downloadFavoriteImages(
  galleryId: string,
  clientEmail: string,
  images: ClientImage[],
  favoriteIds: Set<string>,
  galleryName: string,
  onProgress?: ProgressCallback
): Promise<boolean> {
  const favoriteImages = images.filter(img => favoriteIds.has(img.id));

  if (favoriteImages.length === 0) {
    return false;
  }

  const success = await downloadImagesAsZip(
    favoriteImages,
    `${sanitizeFilename(galleryName)}-favorites.zip`,
    onProgress
  );

  if (success) {
    const record: DownloadRecord = {
      gallery_id: galleryId,
      client_email: clientEmail,
      download_type: 'zip_favorites',
      image_count: favoriteImages.length,
      downloaded_at: new Date().toISOString()
    };
    await trackDownload(record);
  }

  return success;
}

export async function trackSingleImageDownload(
  galleryId: string,
  clientEmail: string
): Promise<void> {
  const record: DownloadRecord = {
    gallery_id: galleryId,
    client_email: clientEmail,
    download_type: 'single',
    image_count: 1,
    downloaded_at: new Date().toISOString()
  };
  await trackDownload(record);
}

export function estimateDownloadSize(imageCount: number): string {
  const averageSizePerImage = 5 * 1024 * 1024;
  const totalBytes = imageCount * averageSizePerImage;

  if (totalBytes < 1024 * 1024) {
    return `${Math.round(totalBytes / 1024)} KB`;
  } else if (totalBytes < 1024 * 1024 * 1024) {
    return `${Math.round(totalBytes / (1024 * 1024))} MB`;
  } else {
    return `${(totalBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}

function getImageExtension(url: string): string {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i);
  return match ? `.${match[1].toLowerCase()}` : '.jpg';
}

function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}