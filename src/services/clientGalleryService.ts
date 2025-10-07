import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ClientGallery, ClientImage, GallerySession, GalleryAnalytics, DownloadRecord } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const SESSION_STORAGE_KEY = 'client_gallery_session';
const RATE_LIMIT_KEY = 'gallery_auth_attempts';
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_DURATION = 15 * 60 * 1000;

interface RateLimitData {
  attempts: number;
  blockedUntil?: number;
}

export async function authenticateClient({
  email,
  slug,
  code,
}: {
  email?: string;
  slug?: string;
  code: string;
}): Promise<{ success: boolean; gallery?: ClientGallery; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  if (!email && !slug) {
    return { success: false, error: 'Either email or slug must be provided' };
  }

  if (!checkRateLimit()) {
    const blockedUntil = getRateLimitData().blockedUntil;
    const remainingMinutes = blockedUntil
      ? Math.ceil((blockedUntil - Date.now()) / 60000)
      : 0;
    return {
      success: false,
      error: `Too many failed attempts. Try again in ${remainingMinutes} minutes.`
    };
  }

  try {
    let query = supabase
      .from('client_galleries')
      .select('*')
      .eq('access_code', code.toUpperCase().trim())
      .eq('status', 'active');

    if (email) {
      query = query.eq('client_email', email.toLowerCase().trim());
    } else if (slug) {
      query = query.eq('gallery_slug', slug);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Authentication error:', error);
      trackFailedAttempt();
      return { success: false, error: 'Authentication failed' };
    }

    if (!data) {
      trackFailedAttempt();
      return { success: false, error: 'Invalid credentials' };
    }

    const gallery = data as ClientGallery;

    if (gallery.expiration_date && new Date(gallery.expiration_date) < new Date()) {
      return { success: false, error: 'Gallery has expired' };
    }

  resetAttempts();
  await trackGalleryView(gallery.id);
    createSession(gallery, code);

    return { success: true, gallery };
  } catch (err) {
    console.error('Unexpected authentication error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Backward compatibility wrappers
export async function authenticateBySlugAndCode(
  slug: string,
  code: string
): Promise<{ success: boolean; gallery?: ClientGallery; error?: string }> {
  return authenticateClient({ slug, code });
}

export async function authenticateByEmailAndCode(
  email: string,
  code: string
): Promise<{ success: boolean; gallery?: ClientGallery; error?: string }> {
  return authenticateClient({ email, code });
}

export async function getGalleryBySlug(slug: string): Promise<ClientGallery | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('client_galleries')
      .select('*')
      .eq('gallery_slug', slug)
      .eq('status', 'active')
      .maybeSingle();

    if (error || !data) return null;
    return data as ClientGallery;
  } catch (err) {
    console.error('Error fetching gallery by slug:', err);
    return null;
  }
}

export async function getGalleryImages(galleryId: string): Promise<ClientImage[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('client_images')
      .select('*')
      .eq('gallery_id', galleryId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }

    return (data || []) as ClientImage[];
  } catch (err) {
    console.error('Unexpected error fetching images:', err);
    return [];
  }
}

export function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateClientName(brideName: string, groomName: string): string {
  return `${brideName} & ${groomName}`;
}

export async function getFavorites(galleryId: string, clientEmail: string): Promise<string[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('client_gallery_favorites')
      .select('image_public_id')
      .eq('gallery_id', galleryId)
      .eq('client_email', clientEmail);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    const favorites = (data as { image_public_id: string }[] | null) ?? [];
    return favorites.map((favorite) => favorite.image_public_id);
  } catch (err) {
    console.error('Unexpected error fetching favorites:', err);
    return [];
  }
}

export async function toggleFavorite(
  galleryId: string,
  clientEmail: string,
  imageId: string,
  isFavorite: boolean
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  try {
    // Route through backend client endpoints to keep service role key server-side
    if (isFavorite) {
      const res = await fetch(`${API_BASE_URL}/api/client/favorites/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery_id: galleryId, client_email: clientEmail, image_id: imageId })
      });
      if (!res.ok) {
        console.error('Error removing favorite (server):', await res.text());
        return false;
      }
    } else {
      const res = await fetch(`${API_BASE_URL}/api/client/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery_id: galleryId, client_email: clientEmail, image_id: imageId })
      });
      if (!res.ok) {
        console.error('Error adding favorite (server):', await res.text());
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error('Unexpected error toggling favorite:', err);
    return false;
  }
}

async function trackGalleryView(galleryId: string): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    // Route view increments through backend to use service role safely
    await fetch(`${API_BASE_URL}/api/client/galleries/${encodeURIComponent(galleryId)}/increment_view`, {
      method: 'POST'
    });
  } catch (err) {
    console.error('Error tracking gallery view:', err);
  }
}

export async function trackDownload(record: DownloadRecord): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    await fetch(`${API_BASE_URL}/api/client/downloads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
  } catch (err) {
    console.error('Error tracking download:', err);
  }
}

export async function createAnalyticsSession(
  galleryId: string,
  clientEmail: string
): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const payload = {
      gallery_id: galleryId,
      client_email: clientEmail,
      session_start: new Date().toISOString(),
      user_agent: navigator.userAgent,
      images_viewed: 0
    };
    const res = await fetch(`${API_BASE_URL}/api/client/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error('Error creating analytics session (server):', await res.text());
      return null;
    }
    const data = await res.json();
    return data.id;
  } catch (err) {
    console.error('Unexpected error creating analytics session:', err);
    return null;
  }
}

export async function updateAnalyticsSession(
  sessionId: string,
  updates: Partial<GalleryAnalytics>
): Promise<void> {
  if (!isSupabaseConfigured || !sessionId) return;

  try {
    await fetch(`${API_BASE_URL}/api/client/analytics/${encodeURIComponent(sessionId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch (err) {
    console.error('Error updating analytics session:', err);
  }
}

export function createSession(gallery: ClientGallery, code: string): void {
  const session: GallerySession = {
    gallery_id: gallery.id,
    gallery_slug: gallery.gallery_slug,
    client_email: gallery.client_email,
    code: code.toUpperCase().trim(),
    accessed_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  };

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): GallerySession | null {
  try {
    const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionData) return null;

    const session: GallerySession = JSON.parse(sessionData);

    if (new Date(session.expires_at) < new Date()) {
      clearSession();
      return null;
    }

    return session;
  } catch (err) {
    console.error('Error reading session:', err);
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export function isGalleryExpired(gallery: ClientGallery): boolean {
  if (!gallery.expiration_date) return false;
  return new Date(gallery.expiration_date) < new Date();
}

export function getDaysUntilExpiration(gallery: ClientGallery): number | null {
  if (!gallery.expiration_date) return null;

  const expirationDate = new Date(gallery.expiration_date);
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

function trackFailedAttempt(): void {
  const data = getRateLimitData();
  data.attempts += 1;

  if (data.attempts >= MAX_ATTEMPTS) {
    data.blockedUntil = Date.now() + RATE_LIMIT_DURATION;
  }

  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
}

function checkRateLimit(): boolean {
  const data = getRateLimitData();

  if (data.blockedUntil && data.blockedUntil > Date.now()) {
    return false;
  }

  if (data.blockedUntil && data.blockedUntil <= Date.now()) {
    resetAttempts();
  }

  return data.attempts < MAX_ATTEMPTS;
}

function getRateLimitData(): RateLimitData {
  try {
    const data = localStorage.getItem(RATE_LIMIT_KEY);
    if (!data) return { attempts: 0 };
    return JSON.parse(data);
  } catch {
    return { attempts: 0 };
  }
}

function resetAttempts(): void {
  localStorage.removeItem(RATE_LIMIT_KEY);
}

export function getRemainingAttempts(): number {
  const data = getRateLimitData();
  return Math.max(0, MAX_ATTEMPTS - data.attempts);
}


export async function createClientGallery(
  gallery: Omit<ClientGallery, 'id' | 'created_at' | 'updated_at' | 'access_code'>
): Promise<ClientGallery> {
  const res = await fetch(`${API_BASE_URL}/api/admin/client_galleries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gallery)
  });
  if (!res.ok) throw new Error('Failed to create client gallery');
  return res.json();
}

export async function updateClientGallery(
  id: string,
  updates: Partial<ClientGallery>
): Promise<ClientGallery> {
  const res = await fetch(`${API_BASE_URL}/api/admin/client_galleries/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update client gallery');
  return res.json();
}

export async function deleteClientGallery(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/admin/client_galleries/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete client gallery');
}
