import React from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const PremiumGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] to-[#2a2a2a]">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-[#C19A6B]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-[#F8F4E3] hover:text-[#C19A6B] transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад към началото</span>
            </Link>
            
            <h1 className="text-2xl font-light tracking-[0.2em] text-[#C19A6B]" style={{fontFamily: 'Playfair Display, serif'}}>
              PREMIUM GALLERY
            </h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="bg-gradient-to-br from-[#F8F4E3] to-[#f0ead6] rounded-2xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#C19A6B] to-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-8">
            <Camera className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl font-light mb-6 text-[#181818]" style={{fontFamily: 'Playfair Display, serif'}}>
            Премиум галерия
          </h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-[#C19A6B] to-[#8B6F47] mx-auto mb-8"></div>
          
          <p className="text-[#181818]/80 mb-12 leading-relaxed max-w-3xl mx-auto text-lg">
            Премиумната галерия с кинематографски дизайн временно не е достъпна. 
            Тази функционалност ще предложи уникално преживяване за разглеждане на сватбени албуми.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-[#C19A6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#181818] mb-2">Албумни карти</h3>
              <p className="text-[#181818]/70 text-sm">Елегантни карти с имена на двойките и дати</p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#181818] mb-2">Кинематографски дизайн</h3>
              <p className="text-[#181818]/70 text-sm">Parallax ефекти и плавни анимации</p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-[#C19A6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#181818] mb-2">Storytelling</h3>
              <p className="text-[#181818]/70 text-sm">Разказване на историята чрез секции</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#181818] to-[#2a2a2a] rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#F8F4E3] mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
              Планирани функции:
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#C19A6B] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Masonry grid layout</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#C19A6B] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Филтри по година и стил</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#C19A6B] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Hero секции с overlay текст</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#C19A6B] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Цитати от двойките</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Lightbox с zoom и swipe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Фонова музика (по избор)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Conversion triggers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8B6F47] rounded-full"></div>
                  <span className="text-[#F8F4E3]/90">Мобилна оптимизация</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C19A6B] to-[#8B6F47] text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Обратно към началото</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumGallery;