import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Contact } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContact(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { error } = await supabase
      .from('contacts')
      .insert({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone?.trim() || null,
        message: formData.message.trim()
      });

    if (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: 'Failed to submit contact form' };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error submitting contact:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getAllContacts(): Promise<Contact[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/contacts`);
    if (!res.ok) {
      console.error('Error fetching contacts via admin endpoint');
      return [];
    }
    return (await res.json()) as Contact[];
  } catch (err) {
    console.error('Unexpected error fetching contacts:', err);
    return [];
  }
}

export async function deleteContact(contactId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/contacts/${encodeURIComponent(contactId)}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      console.error('Error deleting contact via admin endpoint');
      return false;
    }
    return true;
  } catch (err) {
    console.error('Unexpected error deleting contact:', err);
    return false;
  }
}