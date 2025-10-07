export interface Gallery {
  id: string;
  title: string;
  subtitle?: string;
  event_date: string;
  cover_image: string;
  images: string[];
  created_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
}

export interface ClientGallery {
  id: string;
  created_at: string;
  updated_at: string;
  client_email: string;
  client_name: string | null;
  bride_name: string;
  groom_name: string;
  wedding_date: string | null;
  gallery_slug: string;
  access_code: string;
  cover_image: string | null;
  images: string[];
  expiration_date: string;
  status: 'active' | 'expired' | 'archived' | 'draft';
  last_accessed_at: string | null;
  view_count: number;
  allow_downloads: boolean;
  welcome_message: string | null;
  admin_notes: string | null;
}

export interface ClientImage {
  id: string;
  gallery_id: string;
  image_url: string;
  thumbnail_url: string | null;
  title: string | null;
  order_index: number;
  created_at: string;
}

export interface GallerySession {
  gallery_id: string;
  gallery_slug?: string;
  client_email: string;
  code: string;
  accessed_at: string;
  expires_at: string;
}

export interface GalleryAnalytics {
  id?: string;
  gallery_id: string;
  client_email: string;
  session_start: string;
  session_end?: string;
  session_duration_seconds?: number;
  ip_address?: string;
  user_agent?: string;
  images_viewed: number;
}

export interface DownloadRecord {
  gallery_id: string;
  client_email: string;
  download_type: 'single' | 'zip_all' | 'zip_favorites';
  image_count: number;
  downloaded_at: string;
  ip_address?: string;
}

export interface GalleryFavorite {
  id: string;
  gallery_id: string;
  client_email: string;
  image_public_id: string;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'venue' | 'florist' | 'planner' | 'caterer' | 'decorator' | 'music' | 'other';
  description: string | null;
  logo_url: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PartnershipInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string;
  company_category: string | null;
  website: string | null;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string | null;
  created_at: string;
}