import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOHeadProps {
  page?: 'home' | 'gallery';
}

const SEOHead: React.FC<SEOHeadProps> = ({ page = 'home' }) => {
  const { language } = useLanguage();

  const seoData = {
    bg: {
      home: {
        title: 'Evermore Weddings | Професионална сватбена фотография България',
        description: 'Професионален екип от 5 души за сватбена фотография и видео в България. Над 500 сватби, луксозни албуми, онлайн галерии. Резервирайте вашата дата днес!',
        keywords: 'сватбена фотография, сватбен фотограф, България, Плевен, сватбено видео, фотосесия, луксозни албуми'
      },
      gallery: {
        title: 'Клиентска галерия | Evermore Weddings',
        description: 'Защитена с парола клиентска галерия за разглеждане и изтегляне на вашите сватбени снимки. Високо качество, лесно споделяне с близки.',
        keywords: 'клиентска галерия, сватбени снимки, защитена галерия, изтегляне снимки'
      }
    },
    en: {
      home: {
        title: 'Evermore Weddings | Professional Wedding Photography Bulgaria',
        description: 'Professional team of 5 for wedding photography and videography in Bulgaria. Over 500 weddings, luxury albums, online galleries. Book your date today!',
        keywords: 'wedding photography, wedding photographer, Bulgaria, Pleven, wedding video, photoshoot, luxury albums'
      },
      gallery: {
        title: 'Client Gallery | Evermore Weddings',
        description: 'Password-protected client gallery for viewing and downloading your wedding photos. High quality, easy sharing with family and friends.',
        keywords: 'client gallery, wedding photos, protected gallery, photo download'
      }
    }
  };

  const currentSEO = seoData[language][page];
  const baseUrl = 'https://evermore-weddings-cl-9j6u.bolt.host';
  const currentUrl = page === 'home' ? baseUrl : `${baseUrl}/gallery`;
  const previewImage = `${baseUrl}/og-image.jpg`;

  // JSON-LD Structured Data
  const structuredData = React.useMemo(
    () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    "name": "Evermore Weddings",
    "alternateName": language === 'bg' ? "Евермор Уедингс" : "Evermore Weddings",
    "description": currentSEO.description,
    "url": baseUrl,
    "telephone": "+359888888888",
    "email": "hello@evermoreweddings.bg",
    "image": previewImage,
    "logo": `${baseUrl}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pleven",
      "addressRegion": "Pleven Province",
      "addressCountry": "BG",
      "streetAddress": "Pleven, Bulgaria"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.4170",
      "longitude": "24.6167"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Bulgaria"
      }
    ],
    "serviceType": language === 'bg' ? "Сватбена фотография и видеография" : "Wedding Photography and Videography",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'bg' ? "Сватбени пакети" : "Wedding Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Wedding Package 1",
          "price": "1170",
          "priceCurrency": "BGN",
          "description": language === 'bg' ? "1 сватбен фотограф, до 10 часа покритие" : "1 wedding photographer, up to 10 hours coverage"
        },
        {
          "@type": "Offer",
          "name": "Wedding Package 2", 
          "price": "1370",
          "priceCurrency": "BGN",
          "description": language === 'bg' ? "1 сватбен фотограф, до 12 часа покритие" : "1 wedding photographer, up to 12 hours coverage"
        },
        {
          "@type": "Offer",
          "name": "Wedding Package 3",
          "price": "1470", 
          "priceCurrency": "BGN",
          "description": language === 'bg' ? "1 сватбен фотограф, целодневно покритие, луксозна фотокнига" : "1 wedding photographer, full day coverage, luxury photo book"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": language === 'bg' ? "Мария и Георги" : "Maria & George"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": language === 'bg' 
          ? "Невероятен екип! Снимките са прекрасни и качеството е изключително. Препоръчваме ги на всички наши приятели!"
          : "Amazing team! The photos are beautiful and the quality is exceptional. We recommend them to all our friends!"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/evermoreweddings",
      "https://www.instagram.com/evermoreweddings"
    ],
    "openingHours": "Mo-Su 09:00-21:00",
    "priceRange": "1170-2740 BGN"
    }),
    [language, currentSEO.description, previewImage]
  );

  React.useEffect(() => {
    // Update document title
    document.title = currentSEO.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', currentSEO.description);
      document.head.appendChild(metaDescription);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', currentSEO.keywords);
      document.head.appendChild(metaKeywords);
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: currentSEO.title },
      { property: 'og:description', content: currentSEO.description },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: previewImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'Evermore Weddings' },
      { property: 'og:locale', content: language === 'bg' ? 'bg_BG' : 'en_US' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', tag.content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        metaTag.setAttribute('content', tag.content);
        document.head.appendChild(metaTag);
      }
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: currentSEO.title },
      { name: 'twitter:description', content: currentSEO.description },
      { name: 'twitter:image', content: previewImage },
      { name: 'twitter:site', content: '@evermoreweddings' },
      { name: 'twitter:creator', content: '@evermoreweddings' }
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', tag.content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        metaTag.setAttribute('content', tag.content);
        document.head.appendChild(metaTag);
      }
    });

    // Update hreflang tags
    const hreflangTags = [
      { hreflang: 'bg', href: page === 'home' ? baseUrl : `${baseUrl}/gallery` },
      { hreflang: 'en', href: page === 'home' ? `${baseUrl}?lang=en` : `${baseUrl}/gallery?lang=en` },
      { hreflang: 'x-default', href: page === 'home' ? baseUrl : `${baseUrl}/gallery` }
    ];

    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

    hreflangTags.forEach(tag => {
      const linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'alternate');
      linkTag.setAttribute('hreflang', tag.hreflang);
      linkTag.setAttribute('href', tag.href);
      document.head.appendChild(linkTag);
    });

    // Update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', currentUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', currentUrl);
      document.head.appendChild(canonicalTag);
    }

    // Update JSON-LD structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Update lang attribute on html element
    document.documentElement.setAttribute('lang', language === 'bg' ? 'bg' : 'en');

  }, [language, page, currentSEO, currentUrl, previewImage, structuredData]);

  return null;
};

export default SEOHead;