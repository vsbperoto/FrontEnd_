import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Gallery } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// ✅ Keep only the galleries table check (remove wedding_stories)
supabase.from('galleries').select('count').then(result => {
  console.log('📊 Table check - galleries:', result);
});

// ❌ REMOVED - This was causing the 404 error:
// supabase.from('wedding_stories').select('count').then(result => {
//   console.log('📊 Table check - wedding_stories:', result);
// });

export async function getGalleries(): Promise<Gallery[]> {
  console.log('📡 [GalleryService] Starting fetch...');
  console.log('📡 [GalleryService] isSupabaseConfigured:', isSupabaseConfigured);
  
  if (!isSupabaseConfigured) {
    console.warn("⚠️ [GalleryService] Supabase not configured - returning empty array");
    return [];
  }

  try {
    console.log('📡 [GalleryService] Querying galleries table...');
    
    const { data, error } = await supabase
      .from('galleries')
      .select('id, title, subtitle, event_date, cover_image, images')
      .order('created_at', { ascending: false });

    console.log('📡 [GalleryService] Query result:', {
      hasError: !!error,
      error: error,
      dataCount: data?.length ?? 0,
      data: data
    });

    if (error) {
      console.error('❌ [GalleryService] Supabase error:', error.message, error);
      // Detect Postgres permission error for schema public and surface a
      // clearer developer message so it's easier to diagnose from the UI.
      if ((error as any)?.code === '42501' || (error as any)?.message?.includes('permission denied for schema')) {
        console.error('🔐 [GalleryService] Permission error: your anon role likely lacks schema/table SELECT privileges. See EverMoreBackEnd_/supabase/public_read_policies.sql for guidance.');
      }
      return [];
    }

    const galleries = (data ?? []) as Gallery[];
    console.log('✅ [GalleryService] Returning galleries:', galleries.length);
    return galleries;
  } catch (err) {
    console.error('❌ [GalleryService] Unexpected error:', err);
    return [];
  }
}

export async function createGallery(gallery: Omit<Gallery, 'id' | 'created_at'>): Promise<Gallery> {
  // Call backend admin endpoint. Backend must validate the request (x-admin-token).
  const res = await fetch(`${API_BASE_URL}/api/admin/galleries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gallery)
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error('Admin create failed: ' + JSON.stringify(err));
  }
  
  return res.json();
}

export async function updateGallery(id: string, updates: Partial<Gallery>): Promise<Gallery> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/galleries/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error('Admin update failed: ' + JSON.stringify(err));
    }
    
    return res.json();
  } catch (error: any) {
    if (error.code === 'PGRST116') {
      throw new Error('Gallery not found');
    }
    throw error;
  }
}

export async function deleteGallery(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/admin/galleries/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error('Admin delete failed: ' + JSON.stringify(err));
  }
}