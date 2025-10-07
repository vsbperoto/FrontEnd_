export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string;
  crop?: string;
  format?: string;
}

const getCloudName = (): string => {
  return import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'djrsrxkls';
};

export const getCloudinaryUrl = (
  imagePath: string,
  options: CloudinaryTransformOptions = {}
): string => {
  if (!imagePath) {
    if (import.meta.env.DEV) {
      console.warn('[Cloudinary] Missing image path');
    }
    return '';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const cloudName = getCloudName();
  const {
    width = 1200,
    height,
    quality = 'auto',
    crop = 'fill',
    format = 'auto',
  } = options;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    `w_${width}`,
    height ? `h_${height}` : '',
    `c_${crop}`,
  ]
    .filter(Boolean)
    .join(',');

  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  if (cleanPath.includes('image/upload/')) {
    cleanPath = cleanPath.split('image/upload/').pop() || cleanPath;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanPath}`;
};

export const getCloudinaryThumbnail = (imagePath: string): string => {
  return getCloudinaryUrl(imagePath, {
    width: 400,
    quality: 'auto',
    crop: 'fill',
    format: 'auto',
  });
};

export const getCloudinaryPreview = (imagePath: string): string => {
  return getCloudinaryUrl(imagePath, {
    width: 800,
    quality: 'auto',
    crop: 'fill',
    format: 'auto',
  });
};

export const getCloudinaryFullSize = (imagePath: string): string => {
  return getCloudinaryUrl(imagePath, {
    width: 1600,
    quality: 'auto',
    format: 'auto',
  });
};

export const getCloudinaryOriginal = (imagePath: string): string => {
  if (!imagePath) {
    return '';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const cloudName = getCloudName();

  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  if (cleanPath.includes('image/upload/')) {
    cleanPath = cleanPath.split('image/upload/').pop() || cleanPath;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
};