import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Partner } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function getAllPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true});

    if (error) {
      console.error('Error fetching partners:', error);
      return [];
    }

    return (data || []) as Partner[];
  } catch (err) {
    console.error('Unexpected error fetching partners:', err);
    return [];
  }
}

export async function getFeaturedPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .eq('featured', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching featured partners:', error);
      return [];
    }

    return (data || []) as Partner[];
  } catch (err) {
    console.error('Unexpected error fetching featured partners:', err);
    return [];
  }
}

export async function getPartnersByCategory(category: Partner['category']): Promise<Partner[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching partners by category:', error);
      return [];
    }

    return (data || []) as Partner[];
  } catch (err) {
    console.error('Unexpected error fetching partners by category:', err);
    return [];
  }
}

export interface PartnershipInquiryData {
  name: string;
  email: string;
  phone?: string;
  company_name: string;
  company_category?: string;
  website?: string;
  message: string;
}

export async function submitPartnershipInquiry(
  inquiryData: PartnershipInquiryData
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { error } = await supabase
      .from('partnership_inquiries')
      .insert({
        name: inquiryData.name.trim(),
        email: inquiryData.email.toLowerCase().trim(),
        phone: inquiryData.phone?.trim() || null,
        company_name: inquiryData.company_name.trim(),
        company_category: inquiryData.company_category?.trim() || null,
        website: inquiryData.website?.trim() || null,
        message: inquiryData.message.trim(),
        status: 'pending'
      });

    if (error) {
      console.error('Error submitting partnership inquiry:', error);
      return { success: false, error: 'Failed to submit partnership inquiry' };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting partnership inquiry:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getPartner(partnerId: string): Promise<Partner | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', partnerId)
      .maybeSingle();

    if (error || !data) {
      console.error('Error fetching partner:', error);
      return null;
    }

    return data as Partner;
  } catch (err) {
    console.error('Unexpected error fetching partner:', err);
    return null;
  }
}

export async function createPartner(partnerData: Omit<Partner, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; partner?: Partner; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/partners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerData)
    });
    if (!res.ok) return { success: false, error: 'Failed to create partner' };
    const data = await res.json();
    return { success: true, partner: data as Partner };
  } catch (err) {
    console.error('Unexpected error creating partner:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function updatePartner(partnerId: string, updates: Partial<Partner>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/partners/${encodeURIComponent(partnerId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return { success: false, error: 'Failed to update partner' };
    return { success: true };
  } catch (err) {
    console.error('Unexpected error updating partner:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deletePartner(partnerId: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/partners/${encodeURIComponent(partnerId)}`, { method: 'DELETE' });
    if (!res.ok) return { success: false, error: 'Failed to delete partner' };
    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting partner:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
