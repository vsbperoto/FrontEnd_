import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ClientGalleryAccess() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Query for gallery by email + code OR slug + code
      let query = supabase
        .from('client_galleries')
        .select('*')
        .eq('status', 'active')
        .eq('access_code', accessCode.toUpperCase());

      if (slug) {
        query = query.eq('gallery_slug', slug);
      } else {
        query = query.eq('client_email', email.toLowerCase());
      }

      const { data: gallery, error: queryError } = await query.maybeSingle();

      if (queryError || !gallery) {
        setError('Невалиден имейл или код за достъп');
        setLoading(false);
        return;
      }

      // Check expiration
      if (new Date(gallery.expiration_date) < new Date()) {
        setError('Галерията е изтекла');
        setLoading(false);
        return;
      }

      // Store session
      sessionStorage.setItem('client_gallery_session', JSON.stringify({
        gallery_id: gallery.id,
        client_email: gallery.client_email,
        timestamp: Date.now()
      }));

      // Navigate to gallery viewer
      navigate(`/gallery/${gallery.id}`);
    } catch (err) {
      console.error('Login error:', err);
      setError('Грешка при вход');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-light text-[#2c3831] mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
          Достъп до Вашата Галерия
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!slug && (
            <div>
              <label className="block text-sm font-medium text-[#2c3831] mb-2">
                Имейл адрес
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2c3831]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#2c3831]/20 rounded-lg focus:outline-none focus:border-[#7c9885]"
                  placeholder="your@email.com"
                  required={!slug}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2c3831] mb-2">
              Код за достъп
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2c3831]/40" />
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#2c3831]/20 rounded-lg focus:outline-none focus:border-[#7c9885] uppercase"
                placeholder="ACCESSCODE"
                required
                maxLength={10}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7c9885] text-white rounded-lg font-medium hover:bg-[#6a8573] transition-colors disabled:opacity-50"
          >
            {loading ? 'Влизане...' : 'Вход'}
          </button>
        </form>
      </div>
    </div>
  );
}