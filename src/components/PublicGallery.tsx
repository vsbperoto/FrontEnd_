import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicGallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5E6D3]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C65D00]/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-[#6B5B45] hover:text-[#C65D00] transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад към началото</span>
            </Link>
            
            <h1 className="text-2xl font-light tracking-[0.2em] text-[#8B6F47]">
              ПОРТФОЛИО
            </h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-light mb-6 text-[#6B5B45]">
            Портфолио галерия
          </h2>
          
          <p className="text-[#8B7355] mb-8 leading-relaxed max-w-2xl mx-auto">
            Публичната галерия временно не е достъпна. Тази функционалност ще бъде активирана след настройката на базата данни и качването на снимки.
          </p>
          
          <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5E6D3] rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#6B5B45] mb-4">Планирани функции:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C65D00] rounded-full"></div>
                  <span className="text-[#8B7355]">Категории: Сватби, Детайли, Видео</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C65D00] rounded-full"></div>
                  <span className="text-[#8B7355]">Филтриране по година и стил</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C65D00] rounded-full"></div>
                  <span className="text-[#8B7355]">Lightbox с навигация</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#87A96B] rounded-full"></div>
                  <span className="text-[#8B7355]">Адаптивен дизайн</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#87A96B] rounded-full"></div>
                  <span className="text-[#8B7355]">Бързо зареждане</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#87A96B] rounded-full"></div>
                  <span className="text-[#8B7355]">Професионално качество</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C65D00] to-[#E97451] text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Обратно към началото</span>
          </Link>
        </div>
      </div>
    </div>
  );
}