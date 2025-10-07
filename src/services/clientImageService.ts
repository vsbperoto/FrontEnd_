import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ClientImage } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

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

export interface CreateImageData {
  gallery_id: string;
  image_url: string;
  thumbnail_url?: string;
  title?: string;
  order_index: number;
}

export async function createImage(imageData: CreateImageData): Promise<{ success: boolean; image?: ClientImage; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/client_images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gallery_id: imageData.gallery_id,
        image_url: imageData.image_url,
        thumbnail_url: imageData.thumbnail_url || null,
        title: imageData.title || null,
        order_index: imageData.order_index
      })
    });
    if (!res.ok) return { success: false, error: 'Failed to create image' };
    const data = await res.json();
    return { success: true, image: data as ClientImage };
  } catch (err) {
    console.error('Unexpected error creating image:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function createMultipleImages(images: CreateImageData[]): Promise<{ success: boolean; images?: ClientImage[]; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/client_images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(images.map(img => ({
        gallery_id: img.gallery_id,
        image_url: img.image_url,
        thumbnail_url: img.thumbnail_url || null,
        title: img.title || null,
        order_index: img.order_index
      })))
    });
    if (!res.ok) return { success: false, error: 'Failed to create images' };
    const data = await res.json();
    return { success: true, images: data as ClientImage[] };
  } catch (err) {
    console.error('Unexpected error creating multiple images:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function updateImage(imageId: string, updates: Partial<ClientImage>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/client_images/${encodeURIComponent(imageId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return { success: false, error: 'Failed to update image' };
    return { success: true };
  } catch (err) {
    console.error('Unexpected error updating image:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deleteImage(imageId: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/client_images/${encodeURIComponent(imageId)}`, { method: 'DELETE' });
    if (!res.ok) return { success: false, error: 'Failed to delete image' };
    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting image:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function reorderImages(imageIds: string[]): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/client_images/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: imageIds.map((id, index) => ({ id, order_index: index })) })
    });
    if (!res.ok) return { success: false, error: 'Failed to reorder images' };
    return { success: true };
  } catch (err) {
    console.error('Unexpected error reordering images:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getImage(imageId: string): Promise<ClientImage | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('client_images')
      .select('*')
      .eq('id', imageId)
      .maybeSingle();

    if (error || !data) {
      console.error('Error fetching image:', error);
      return null;
    }

    return data as ClientImage;
  } catch (err) {
    console.error('Unexpected error fetching image:', err);
    return null;
  }
}
