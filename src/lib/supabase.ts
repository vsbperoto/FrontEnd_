import { supabaseClient, isSupabaseConfigured, getCurrentUser } from './supabaseClient';

export const supabase = supabaseClient;
export { isSupabaseConfigured, getCurrentUser };

// Optional helper
export async function getPublicGalleries() {
  const { data, error } = await supabase
    .from('galleries')
    .select('id, title, subtitle, event_date, cover_image, images')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}