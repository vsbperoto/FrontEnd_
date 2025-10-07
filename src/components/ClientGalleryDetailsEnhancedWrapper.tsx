import React from 'react';
import ClientGalleryDetailsEnhanced from './ClientGalleryDetailsEnhanced';

const fakeGallery = {
  id: '123',
  bride_name: 'Jane',
  groom_name: 'John',
  client_email: 'jane@example.com',
  gallery_slug: 'jane-john-wedding',
  access_code: 'LOVE2025',
  created_at: new Date().toISOString(),
  wedding_date: new Date().toISOString(),
  allow_downloads: true,
  status: 'active',
  images: ['coamfmmllcbcfvhzrdn4'], // your Cloudinary public_id
  cover_image: 'coamfmmllcbcfvhzrdn4',
  welcome_message: 'Welcome to our big day!',
  admin_notes: 'Check image sizes and quality',
};

const ClientGalleryDetailsEnhancedWrapper = () => {
  return (
    <ClientGalleryDetailsEnhanced
      gallery={fakeGallery}
      onBack={() => window.history.back()}
      onUpdate={() => console.log('Updated!')}
    />
  );
};

export default ClientGalleryDetailsEnhancedWrapper;