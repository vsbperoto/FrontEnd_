import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BlogPage() {
  const { language, translations } = useLanguage();

  // Mock blog posts for SEO optimization
  const blogPostsBG = [
    {
      id: 1,
      title: "10 съвета за перфектната сватбена фотосесия",
      excerpt: "Открийте тайните за създаване на незабравими сватбени снимки. От избора на локация до позиране - всичко което трябва да знаете.",
      date: "15 Септември 2025",
      author: "Евелин Георгиев",
      category: "Съвети",
      readTime: "5 мин четене",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "10-saveta-za-perfektnata-svatbena-fotosesiya"
    },
    {
      id: 2,
      title: "Тенденции в сватбената фотография за 2025",
      excerpt: "Разгледайте най-новите тенденции в сватбената фотография. От кинематографски стил до минималистични композиции.",
      date: "10 Август 2025",
      author: "Трифон Тодоров",
      category: "Тенденции",
      readTime: "7 мин четене",
      image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "tendencii-svatbena-fotografiya-2025"
    },
    {
      id: 3,
      title: "Как да изберете перфектната локация за сватбена фотосесия",
      excerpt: "Локацията може да направи или развали вашите сватбени снимки. Ето как да изберете най-подходящото място.",
      date: "25 Юли 2025",
      author: "Евелин Георгиев",
      category: "Планиране",
      readTime: "6 мин четене",
      image: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "kak-da-izberete-perfektnata-lokaciya"
    },
    {
      id: 4,
      title: "Подготовка за сватбения ден: Чеклист за фотографията",
      excerpt: "Всичко което трябва да подготвите преди големия ден, за да получите най-добрите възможни снимки.",
      date: "12 Юли 2025",
      author: "Трифон Тодоров",
      category: "Подготовка",
      readTime: "8 мин четене",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "podgotovka-svatben-den-cheklist"
    },
    {
      id: 5,
      title: "Защо да изберете професионален сватбен фотограф",
      excerpt: "Разликата между любителска и професионална сватбена фотография. Инвестицията, която си заслужава.",
      date: "8 Юни 2025",
      author: "Евелин Георгиев",
      category: "Съвети",
      readTime: "4 мин четене",
      image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "zashto-profesionalen-svatben-fotograf"
    },
    {
      id: 6,
      title: "Сватбено видео: Как да запазите емоциите завинаги",
      excerpt: "Видеографията добавя нова димензия към сватбените спомени. Научете защо е важна и как да я използвате най-добре.",
      date: "3 Юни 2025",
      author: "Трифон Тодоров",
      category: "Видео",
      readTime: "5 мин четене",
      image: "https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "svatbeno-video-emocii-zavinagi"
    }
  ];

  const blogPostsEN = [
    {
      id: 1,
      title: "10 Tips for the Perfect Wedding Photoshoot",
      excerpt: "Discover the secrets to creating unforgettable wedding photos. From choosing the location to posing - everything you need to know.",
      date: "September 15, 2025",
      author: "Evelin Georgiev",
      category: "Tips",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "10-tips-perfect-wedding-photoshoot"
    },
    {
      id: 2,
      title: "Wedding Photography Trends for 2025",
      excerpt: "Explore the latest trends in wedding photography. From cinematic style to minimalist compositions.",
      date: "August 10, 2025",
      author: "Trifon Todorov",
      category: "Trends",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "wedding-photography-trends-2025"
    },
    {
      id: 3,
      title: "How to Choose the Perfect Location for Wedding Photography",
      excerpt: "The location can make or break your wedding photos. Here's how to choose the most suitable place.",
      date: "July 25, 2025",
      author: "Evelin Georgiev",
      category: "Planning",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "how-to-choose-perfect-location"
    },
    {
      id: 4,
      title: "Wedding Day Preparation: Photography Checklist",
      excerpt: "Everything you need to prepare before the big day to get the best possible photos.",
      date: "July 12, 2025",
      author: "Trifon Todorov",
      category: "Preparation",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "wedding-day-preparation-checklist"
    },
    {
      id: 5,
      title: "Why Choose a Professional Wedding Photographer",
      excerpt: "The difference between amateur and professional wedding photography. An investment worth making.",
      date: "June 8, 2025",
      author: "Evelin Georgiev",
      category: "Tips",
      readTime: "4 min read",
      image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      slug: "why-choose-professional-wedding-photographer"
    }
  ];

  const blogPosts = language === 'bg' ? blogPostsBG : blogPostsEN;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5E6D3]">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 pt-24 pb-16">
        <div className="text-center py-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 text-[#2c3831] tracking-tight" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].blog.title}
          </h2>
          <p className="text-xl sm:text-2xl text-[#2c3831]/70 max-w-4xl mx-auto leading-relaxed">
            {translations[language].blog.subtitle}
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#e5d5c8] group">
            <div className="md:flex">
              <div className="md:w-1/2 overflow-hidden">
                <img 
                  srcSet={`
                    ${blogPosts[0].image}?width=400&quality=75&format=webp 400w,
                    ${blogPosts[0].image}?width=600&quality=80&format=webp 600w,
                    ${blogPosts[0].image}?width=800&quality=85&format=webp 800w
                  `}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={`${blogPosts[0].image}?width=600&quality=80&format=webp`}
                  alt={`Featured wedding photography blog post: ${blogPosts[0].title}`}
                  className="w-full h-72 md:h-auto md:min-h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-gradient-to-r from-[#c9705f] to-[#e97451] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                    {translations[language].blog.featured}
                  </span>
                  <span className="text-[#2c3831]/70 text-sm font-medium">{blogPosts[0].category}</span>
                </div>
                
                <h3 className="text-3xl font-semibold mb-4 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                  {blogPosts[0].title}
                </h3>
                
                <p className="text-lg text-[#2c3831]/70 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-[#2c3831]/60">
                    <div className="flex items-center space-x-1">
                      <User className="w-5 h-5" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-5 h-5" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-5 h-5" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-medium">
                    {translations[language].blog.readMore}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#e5d5c8] group">
              <div className="relative overflow-hidden">
                <img 
                  srcSet={`
                    ${post.image}?width=300&quality=75&format=webp 300w,
                    ${post.image}?width=400&quality=80&format=webp 400w,
                    ${post.image}?width=600&quality=85&format=webp 600w
                  `}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={`${post.image}?width=400&quality=80&format=webp`}
                  alt={`Wedding photography blog post: ${post.title} - Professional tips and inspiration`}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/80 backdrop-blur-sm text-[#2c3831] px-4 py-1.5 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-[#2c3831] line-clamp-2" style={{fontFamily: 'Playfair Display, serif'}}>
                  {post.title}
                </h3>
                
                <p className="text-base text-[#2c3831]/70 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-[#2c3831]/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-5 h-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#2c3831]/60 text-sm">{post.date}</span>
                  <button className="inline-flex items-center space-x-1 text-[#7c9885] hover:text-[#6a8470] font-medium transition-colors">
                    <span>{translations[language].blog.read}</span>
                    <ArrowRight className="w-4 h-4 min-h-[48px] min-w-[48px] touch-manipulation" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] rounded-3xl shadow-xl p-10 text-center">
          <h3 className="text-3xl font-semibold mb-4 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].blog.newsletter.title}
          </h3>
          <p className="mb-8 text-lg text-[#2c3831]/70">
            {translations[language].blog.newsletter.subtitle}
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder={translations[language].blog.newsletter.placeholder}
              className="flex-1 px-4 py-3 rounded-lg text-[#2c3831] focus:outline-none focus:ring-2 focus:ring-[#7c9885] min-h-[48px] touch-manipulation"
            />
            <button className="bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[48px] min-w-[48px] touch-manipulation">
              {translations[language].blog.newsletter.cta}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg p-10">
          <h3 className="text-3xl font-semibold mb-6 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].blog.about.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-[#2c3831]/70">
            <div>
              <p className="mb-4 leading-relaxed text-lg">
                {translations[language].blog.about.content1}
              </p>
              <p className="mb-4 leading-relaxed text-lg">
                {translations[language].blog.about.content2}
              </p>
            </div>
            <div>
              <p className="mb-4 leading-relaxed text-lg">
                {translations[language].blog.about.content3}
              </p>
              <p className="leading-relaxed text-lg">
                {translations[language].blog.about.content4}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}