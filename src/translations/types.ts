export interface TranslationContent {
  // Navigation
  home: string;
  gallery: string;
  pricing: string;
  about: string;
  contact: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  
  // About Section
  aboutTitle: string;
  aboutText: string;
  
  // Testimonials
  testimonialTitle: string;
  
  // Packages
  packageEssential: string;
  packageSignature: string;
  packageLuxury: string;
  bookNow: string;
  
  // Lead Magnet
  downloadChecklist: string;
  
  // Additional content
  nav: {
    home: string;
    portfolio: string;
    about: string;
    packages: string;
    gallery: string;
    blog: string;
    contact: string;
    testimonials: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    love: {
      title: string;
      description: string;
    };
    experience: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
  };
  aboutSection: {
    title: string;
    subtitle: string;
    mission: string;
    values: {
      authenticity: {
        title: string;
        description: string;
      };
      creativity: {
        title: string;
        description: string;
      };
      excellence: {
        title: string;
        description: string;
      };
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      date: string;
      text: string;
      rating: number;
    }>;
  };
  leadMagnet: {
    title: string;
    subtitle: string;
    benefits: string[];
    cta: string;
    disclaimer: string;
  };
  clientGallery: {
    title: string;
    description: string;
    features: {
      secure: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      favorites: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  packages: {
    title: string;
    subtitle: string;
    currency: string;
    cta: string;
    savings: string;
    popular: string;
    availability: string;
    trust: {
      contract: string;
      insurance: string;
      backup: string;
    };
    packages: Array<{
      name: string;
      price: number;
      originalPrice?: number;
      description: string;
      features: string[];
      ideal: string;
      featured?: boolean;
    }>;
  };
  ctaSection: {
    title: string;
    description: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  footer: {
    copyright: string;
  };
  blog: {
    title: string;
    subtitle: string;
    featured: string;
    readMore: string;
    read: string;
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      cta: string;
    };
    about: {
      title: string;
      content1: string;
      content2: string;
      content3: string;
      content4: string;
    };
  };
  adminDashboard: {
    title: string;
    welcome: string;
    signOut: string;
    tabs: {
      dashboard: string;
      gallery: string;
      clients: string;
      contacts: string;
      analytics: string;
      settings: string;
    };
    stats: {
      totalGalleries: string;
      activeClients: string;
      newInquiries: string;
    };
    selectSection: string;
    inDevelopment: string;
  };
  adminLogin: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    forgotPassword: string;
    contactSupport: string;
    enterCredentials: string;
    loginError: string;
  };
  gallerySection: {
    title: string;
    subtitle: string;
    backToGallery: string;
    loadingMemories: string;
    viewGallery: string;
  };
  quickContactForm: {
    successMessage: string;
    errorMessage: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submit: string;
  };
  contactSection: {
    directContact: string;
    callNow: string;
    sendEmail: string;
    followUs: string;
    weddings: string;
    rating: string;
    yearsExperience: string;
    freeConsultation: string;
    personalizedOffer: string;
    responseTime: string;
    consultation: string;
    offer: string;
    noHiddenFees: string;
    whyChooseUs: string;
    professionals: string;
    hoursCoverage: string;
  };
  faqSection: {
    title: string;
    subtitle: string;
    noAnswer: string;
    contactUs: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  pricingSection: {
    selectPackage: string;
    bookNow: string;
    comboTitle: string;
    photoVideoSubtitle: string;
    allIncluded: string;
    whyChooseUs: string;
    officialContract: string;
    contractDescription: string;
    personalApproach: string;
    personalDescription: string;
    emotionalCapture: string;
    emotionalDescription: string;
    insurance: string;
    rating: string;
    experience: string;
    professionals: string;
  };
  clientGalleryAccess: {
    title: string;
    subtitle: string;
    tabLink: string;
    tabEmail: string;
    enterPassword: string;
    passwordPlaceholder: string;
    enterEmail: string;
    emailPlaceholder: string;
    enterCode: string;
    codePlaceholder: string;
    login: string;
    loggingIn: string;
    wrongPassword: string;
    galleryExpired: string;
    galleryNotFound: string;
    galleryInactive: string;
    invalidCredentials: string;
    attemptsRemaining: string;
    tooManyAttempts: string;
    databaseNotConfigured: string;
    serviceUnavailable: string;
    forgotPassword: string;
    contactPhotographer: string;
    backHome: string;
  };
  galleryViewer: {
    welcome: string;
    weddingOf: string;
    totalImages: string;
    favorites: string;
    favoriteCount: string;
    expiresOn: string;
    expiresIn: string;
    expiredOn: string;
    downloadAll: string;
    downloadFavorites: string;
    showFavoritesOnly: string;
    showAll: string;
    logout: string;
    addToFavorites: string;
    removeFromFavorites: string;
    noImages: string;
    noImagesDescription: string;
    noFavorites: string;
    noFavoritesDescription: string;
    imageOf: string;
    downloadImage: string;
    confirmLogout: string;
    confirmLogoutMessage: string;
    cancel: string;
    download: string;
    share: string;
  };
}