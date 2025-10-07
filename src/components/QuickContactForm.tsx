import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { submitContact } from '../services/contactService';

export default function QuickContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { language, translations } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-700">{translations[language].quickContactForm.successMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700">{translations[language].quickContactForm.errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="qc-name" className="block text-sm font-medium text-[#2c3831] mb-2">
            {translations[language].quickContactForm.name}
          </label>
          <input
            id="qc-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#e5d4c1] rounded-lg bg-[#faf8f3] focus:ring-2 focus:ring-[#7c9885] focus:border-transparent transition text-sm sm:text-base min-h-[48px] touch-manipulation"
            placeholder={translations[language].quickContactForm.namePlaceholder}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="qc-email" className="block text-sm font-medium text-[#2c3831] mb-2">
            {translations[language].quickContactForm.email}
          </label>
          <input
            id="qc-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#e5d4c1] rounded-lg bg-[#faf8f3] focus:ring-2 focus:ring-[#7c9885] focus:border-transparent transition text-sm sm:text-base min-h-[48px] touch-manipulation"
            placeholder={translations[language].quickContactForm.emailPlaceholder}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="qc-phone" className="block text-sm font-medium text-[#2c3831] mb-2">
            {translations[language].quickContactForm.phone}
          </label>
          <input
            id="qc-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#e5d4c1] rounded-lg bg-[#faf8f3] focus:ring-2 focus:ring-[#7c9885] focus:border-transparent transition text-sm sm:text-base min-h-[48px] touch-manipulation"
            placeholder={translations[language].quickContactForm.phonePlaceholder}
            autoComplete="tel"
          />
        </div>

        <div>
          <label htmlFor="qc-message" className="block text-sm font-medium text-[#2c3831] mb-2">
            {translations[language].quickContactForm.message}
          </label>
          <textarea
            id="qc-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-[#e5d4c1] rounded-lg bg-[#faf8f3] focus:ring-2 focus:ring-[#7c9885] focus:border-transparent transition resize-none text-sm sm:text-base min-h-[120px] touch-manipulation"
            placeholder={translations[language].quickContactForm.messagePlaceholder}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#7c9885] text-white py-3 px-6 rounded-lg hover:bg-[#6a8470] hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 font-medium text-sm sm:text-base min-h-[48px] touch-manipulation"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{translations[language].quickContactForm.submit}</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}