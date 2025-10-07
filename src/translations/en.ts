import type { TranslationContent } from './types';

export const enTranslations: TranslationContent = {
  // Basic navigation
  home: 'Home',
  gallery: 'Gallery',
  pricing: 'Pricing',
  about: 'About',
  contact: 'Contact',
  
  // Hero section
  heroTitle: 'Your Love, Captured Forever',
  heroSubtitle: 'Professional wedding photography and videography in Bulgaria',
  cta: 'Book Now',
  
  // About section
  aboutTitle: 'About Evermore Weddings',
  aboutText: 'Evermore Weddings is a team of 3 photographers and 2 videographers dedicated to capturing timeless moments. Our passion is telling your love story through the lens, creating memories you\'ll cherish forever.',
  
  // Testimonials
  testimonialTitle: 'Client Testimonials',
  
  // Packages
  packageEssential: 'Essential',
  packageSignature: 'Signature',
  packageLuxury: 'Luxury',
  bookNow: 'Reserve Your Date',
  
  // Lead magnet
  downloadChecklist: 'Download Free Wedding Checklist',
  
  // Extended navigation
  nav: {
    home: 'HOME',
    portfolio: 'PORTFOLIO',
    about: 'ABOUT',
    packages: 'PACKAGES & PRICING',
    gallery: 'CLIENT AREA',
    blog: 'BLOG',
    contact: 'CONTACT',
    testimonials: 'TESTIMONIALS'
  },
  hero: {
    title: 'Evermore Weddings',
    subtitle: 'YOUR LOVE, OUR PASSION',
    description: 'Our dedicated team is here to capture every unforgettable moment of your special day',
    cta: 'View Prices',
    secondaryCta: 'Contact Us'
  },
  features: {
    title: 'Why choose us',
    love: {
      title: 'Attention to detail',
      description: 'Every photo is created with attention to the smallest details'
    },
    experience: {
      title: 'Professional experience',
      description: 'Over 500 weddings and countless happy couples'
    },
    quality: {
      title: 'Exceptional quality',
      description: 'High quality photos and professional processing'
    }
  },
  aboutSection: {
    title: 'Our Story',
    subtitle: 'Creating timeless memories for over 10 years',
    mission: 'Our mission is to capture the authentic emotions and moments that make every wedding unique. We believe every love story deserves to be told with beauty and passion.',
    values: {
      authenticity: {
        title: 'Authenticity',
        description: 'We capture genuine emotions and spontaneous moments'
      },
      creativity: {
        title: 'Creativity',
        description: 'Every wedding is a unique creative opportunity'
      },
      excellence: {
        title: 'Excellence',
        description: 'We strive for the highest quality in everything we do'
      }
    }
  },
  testimonials: {
    title: 'Client Testimonials',
    subtitle: 'What our clients say about our work',
    reviews: [
      {
        name: 'Maria and George',
        date: 'June 2024',
        text: 'Amazing team! The photos are beautiful and the quality is exceptional. We recommend them to all our friends!',
        rating: 5
      },
      {
        name: 'Ivan and Elena',
        date: 'May 2024',
        text: 'The professionalism and creativity of the team impressed us. They captured every important moment of our special day.',
        rating: 5
      },
      {
        name: 'Sofia and Dimitar',
        date: 'July 2024',
        text: 'Thank you for the beautiful memories! The video and photos exceeded all our expectations. True professionals!',
        rating: 5
      }
    ]
  },
  leadMagnet: {
    title: 'Free Wedding Checklist',
    subtitle: 'Everything you need to know for planning the perfect wedding',
    benefits: [
      'Complete 12-month planning timeline',
      'Monthly task breakdown with priorities',
      'Tips for choosing photographer and videographer',
      'Wedding budget calculator',
      'Verified vendor contact information'
    ],
    cta: 'Download Free',
    disclaimer: 'No spam. Just useful tips for your wedding.'
  },
  clientGallery: {
    title: 'Your personal online gallery',
    description: 'Every couple receives a password-protected online gallery where they can view, download and share their wedding photos with family and friends. The gallery remains active for 1 year after the wedding.',
    features: {
      secure: {
        title: 'Secure access',
        description: 'Only you decide who sees the photos with a unique password for each gallery'
      },
      quality: {
        title: 'High quality',
        description: 'Download photos in full resolution, ready for printing and sharing'
      },
      favorites: {
        title: 'Favorite photos',
        description: 'Mark your favorite photos for easy album creation'
      }
    },
    cta: {
      title: 'Ready to see your photos?',
      description: 'Enter the client area with the password you received by email',
      button: 'Open gallery'
    }
  },
  packages: {
    title: 'Invest in memories that last forever',
    subtitle: 'Transparent pricing, no hidden fees',
    currency: '',
    cta: 'BOOK NOW',
    savings: 'YOU SAVE',
    popular: 'MOST POPULAR',
    availability: 'Only 3 dates available for May-September 2025',
    trust: {
      contract: 'Official contract',
      insurance: 'Insurance coverage',
      backup: 'Backup equipment'
    },
    packages: [
      {
        name: 'Essential',
        price: 2500,
        description: 'Perfect start for your love story',
        features: [
          '1 professional photographer',
          '6 hours event coverage',
          'Online gallery for 1 year',
          'Full resolution download',
          'Delivery within 30 days',
          '10 retouched portraits'
        ],
        ideal: 'Ideal for: Intimate weddings up to 50 guests'
      },
      {
        name: 'Signature',
        price: 4000,
        originalPrice: 4500,
        description: 'Our recommendation for complete coverage',
        features: [
          '2 photographers + 1 videographer',
          '10 hours coverage',
          'Professional video clip',
          'Drone for aerial shots',
          'Pre-wedding photoshoot BONUS',
          'Online gallery for 2 years',
          '20 retouched portraits',
          'Express delivery of 50 photos for social media'
        ],
        ideal: 'Ideal for: Weddings from 50 to 150 guests',
        featured: true
      },
      {
        name: 'Luxury',
        price: 6000,
        description: 'The complete VIP experience for your special day',
        features: [
          '3 photographers + 2 videographers',
          'Unlimited coverage (full day)',
          'Full wedding film',
          'Short clip for Instagram Reels',
          '2 drones for unique perspectives',
          'Pre-wedding AND post-wedding sessions',
          'Luxury photo album 30x30cm',
          'Online gallery FOREVER',
          '50 retouched portraits',
          'Priority processing (15 days)',
          'USB box with all photos'
        ],
        ideal: 'Ideal for: Large weddings over 150 guests'
      },
      {
        name: 'Wedding Package 4',
        price: 1897,
        description: '2 professional photographers',
        features: [
          '2 wedding photographers',
          'Full day coverage',
          'Delivery within 60 working days',
          'USB flash drive in stylish box',
          'Cloud link for sharing',
          '30 photos 13x18cm',
          'Post-wedding photoshoot gift',
          'Delivery within 60 working days',
          'Official contract'
        ],
        ideal: '(970€)'
      },
      {
        name: 'Video Package',
        price: 1369,
        description: 'Professional videographer',
        features: [
          'Videographer for the whole day',
          'Full HD quality',
          'All key moments',
          'Delivery within 60 working days',
          'USB flash drive in stylish box',
          'Cloud link for sharing',
          'Official contract'
        ],
        ideal: '(700€)'
      },
      {
        name: 'Combo (Photo + Video)',
        price: 2738,
        description: 'Photographer + Videographer',
        features: [
          'Photographer + Videographer',
          'Up to 12 hours coverage',
          'Full HD video',
          'USB flash drive in stylish box',
          'Cloud link for sharing',
          '15 photos 10x15cm + A4 print gift',
          'Delivery: photos 30-60 days, video 60 days',
          'Official contract'
        ],
        ideal: '(1400€)',
        featured: true
      }
    ]
  },
  blog: {
    title: 'Wedding Blog',
    subtitle: 'Tips, inspiration and professional secrets for creating perfect wedding memories. Learn everything about wedding photography and videography from our expert team.',
    featured: 'Featured',
    readMore: 'Read More',
    read: 'Read',
    newsletter: {
      title: 'Subscribe to our newsletter',
      subtitle: 'Get the latest wedding photography tips and special offers directly in your inbox.',
      placeholder: 'Your email address',
      cta: 'Subscribe'
    },
    about: {
      title: 'About Evermore Weddings Blog',
      content1: 'Welcome to the Evermore Weddings blog - your place for professional advice, inspiration and expert knowledge in the field of wedding photography and videography in Bulgaria.',
      content2: 'Our team of professional photographers and videographers shares their experience from over 500 weddings to help you create perfect memories from the most important day of your life.',
      content3: 'Here you will find practical tips for planning your wedding photoshoot, the latest trends in wedding photography, location ideas and many other useful materials.',
      content4: 'Follow our blog regularly for new publications and don\'t miss our special offers for wedding packages in Pleven and throughout Bulgaria.'
    }
  },
  adminDashboard: {
    title: 'EVERMORE ADMIN',
    welcome: 'Welcome',
    signOut: 'Sign Out',
    tabs: {
      dashboard: 'Dashboard',
      gallery: 'Gallery',
      clients: 'Clients',
      contacts: 'Contacts',
      analytics: 'Analytics',
      settings: 'Settings'
    },
    stats: {
      totalGalleries: 'Total Galleries',
      activeClients: 'Active Clients',
      newInquiries: 'New Inquiries'
    },
    selectSection: 'Select a section from the menu to manage content.',
    inDevelopment: 'This section is under development.'
  },
  adminLogin: {
    title: 'Admin Panel',
    subtitle: 'Sign in to the admin panel',
    email: 'Email address',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    forgotPassword: 'Forgot password?',
    contactSupport: 'Contact support',
    enterCredentials: 'Please enter email and password.',
    loginError: 'An error occurred during login.'
  },
  gallerySection: {
    title: 'Explore our wedding stories',
    subtitle: 'Every photo tells a unique love story',
    backToGallery: 'Back to gallery',
    loadingMemories: 'Loading memories...',
    viewGallery: 'View gallery'
  },
  quickContactForm: {
    successMessage: 'Thank you! We will contact you soon.',
    errorMessage: 'An error occurred. Please try again.',
    name: 'Your name *',
    email: 'Email *',
    phone: 'Phone',
    message: 'Your message',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+359 888 123 456',
    messagePlaceholder: 'Tell us about your wedding...',
    submit: 'Send Message'
  },
  contactSection: {
    directContact: 'Contact us directly',
    callNow: 'Call now',
    sendEmail: 'Send email',
    followUs: 'Follow us',
    weddings: 'Eternal Moments',
    rating: 'Rating',
    yearsExperience: 'Years experience',
    freeConsultation: 'Free consultation',
    personalizedOffer: 'Get a personalized offer for your wedding',
    responseTime: 'Response within 2 hours',
    consultation: 'Free consultation',
    offer: 'Personalized offer',
    noHiddenFees: 'No hidden fees',
    whyChooseUs: 'Why choose us?',
    professionals: 'Professionals',
    hoursCoverage: 'Hours coverage'
  },
  faqSection: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to the most common questions from our clients',
    noAnswer: 'Didn\'t find the answer to your question?',
    contactUs: 'Contact us',
    faqs: [
      {
        question: "How long does photo processing take?",
        answer: "Photo processing takes between 30 and 60 business days depending on the chosen package. For video materials, the deadline is up to 60 business days."
      },
      {
        question: "What are the booking conditions?",
        answer: "To book a date, you need to pay 30% of the package value as a deposit. The remaining amount is paid on the wedding day. We sign an official contract to guarantee services. Payment can also be made by bank transfer."
      },
      {
        question: "What do the packages include?",
        answer: "Each package includes professional photography, processed photos, USB drive in a stylish box and official contract. Specific services vary according to the chosen package."
      }
    ]
  },
  pricingSection: {
    selectPackage: 'Choose Package',
    bookNow: 'BOOK NOW',
    comboTitle: 'Combo Package',
    photoVideoSubtitle: 'Photography + Videography',
    allIncluded: 'Everything included:',
    whyChooseUs: 'Why choose us?',
    officialContract: 'Official contract',
    contractDescription: 'Full legal protection and guaranteed services',
    personalApproach: 'Personal approach to every couple',
    personalDescription: 'Individual attention and care for every detail',
    emotionalCapture: 'We capture emotions, not just frames',
    emotionalDescription: 'We focus on genuine feelings and moments',
    insurance: 'Insurance',
    rating: '5★ rating',
    experience: '10+ years experience',
    professionals: 'Professionals'
  },
  ctaSection: {
    title: 'Ready to capture your special day?',
    description: 'Contact us for a free consultation and personalized offer'
  },
  contactInfo: {
    phone: '+359 87 8289891, +359 87 6601606',
    email: 'info@evermoreweddings.bg'
  },
  footer: {
    copyright: '© 2025 Evermore Weddings. All rights reserved.'
  },
  clientGalleryAccess: {
    title: 'Gallery Access',
    subtitle: 'Sign in to view your wedding photos',
    tabLink: 'Via Link',
    tabEmail: 'Via Email',
    enterAccessCode: 'Enter access code',
    accessCodePlaceholder: 'Your 8-character code',
    enterEmail: 'Enter email',
    emailPlaceholder: 'your@email.com',
    enterCode: 'Enter access code',
    codePlaceholder: 'Code from email',
    login: 'Sign In',
    loggingIn: 'Signing in...',
    invalidAccessCode: 'Invalid access code',
    galleryExpired: 'Gallery has expired',
    galleryNotFound: 'Gallery not found',
    galleryInactive: 'Gallery is not active',
    invalidCredentials: 'Invalid email or access code',
    attemptsRemaining: '{count} attempts remaining',
    tooManyAttempts: 'Too many failed attempts. Please try again in {minutes} minutes.',
    databaseNotConfigured: 'Database not configured. Please contact the photographer.',
    serviceUnavailable: 'Service temporarily unavailable. Please try again in a few minutes.',
    forgotAccessCode: 'Didn\'t receive your code?',
    contactPhotographer: 'Contact photographer',
    backHome: 'Back to home'
  },
  galleryViewer: {
    welcome: 'Welcome',
    weddingOf: 'Wedding of',
    totalImages: '{count} images',
    favorites: 'Favorites',
    favoriteCount: '{count} favorites',
    expiresOn: 'Expires on',
    expiresIn: 'Expires in {days} days',
    expiredOn: 'Expired on',
    downloadAll: 'Download All',
    downloadFavorites: 'Download Favorites',
    showFavoritesOnly: 'Favorites Only',
    showAll: 'All Images',
    logout: 'Logout',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    noImages: 'Gallery is being prepared',
    noImagesDescription: 'Please check back later',
    noFavorites: 'No favorites marked yet',
    noFavoritesDescription: 'Click the heart on any image to add it to favorites',
    imageOf: 'Image {current} of {total}',
    downloadImage: 'Download image',
    expirationWarning: 'Gallery expiring soon!',
    requestExtension: 'Request extension'
  },
  download: {
    downloading: 'Downloading...',
    preparingZip: 'Preparing archive',
    downloadComplete: 'Download complete',
    downloadFailed: 'Download failed',
    confirmDownload: 'Confirm download',
    confirmMessage: 'This will download {count} images ({size}). Continue?',
    estimatedSize: 'Estimated size',
    processingImage: 'Processing image {current} of {total}',
    retry: 'Retry',
    cancel: 'Cancel',
    close: 'Close'
  }
};