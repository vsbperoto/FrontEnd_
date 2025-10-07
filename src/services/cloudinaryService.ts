import { getCloudinaryUrl, type CloudinaryTransformOptions } from '../utils/cloudinary';

type CloudinaryOptions = {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  format?: string;
};

const DEFAULT_OPTIONS: CloudinaryOptions = {
  width: 300,
  height: 300,
  crop: 'fill',
  quality: 'auto',
  format: 'auto',
};

const getOptimizedUrl = (
  publicId: string,
  options: CloudinaryOptions = {}
): string => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return getCloudinaryUrl(publicId, opts as CloudinaryTransformOptions);
};

export const CloudinaryService = {
  getInstance: () => ({
    getOptimizedUrl,
  }),
};

export const cloudinaryService = CloudinaryService.getInstance();