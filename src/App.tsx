import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import SEOHead from './components/SEOHead';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';

// Lazy load non-critical components
const PublicGallery = lazy(() => import('./components/PublicGallery'));
const ClientGalleryAccess = lazy(() => import('./components/ClientGalleryAccess'));
const GalleryViewer = lazy(() => import('./components/GalleryViewer'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
// import AdminLogin from './components/admin/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9705f] mx-auto mb-4"></div>
      <p className="text-[#2c3831]">Зареждане...</p>
    </div>
  </div>
);

function App() {
  // Removed unused user state and related logic

  return (
    <LanguageProvider>
      <div className="App">
        <SEOHead />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route 
            path="/blog" 
            element={
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogPage />
                </Suspense>
              </Layout>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicGallery />
              </Suspense>
            } 
          />

          <Route
            path="/client-gallery"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ClientGalleryAccess />
              </Suspense>
            }
          />
          <Route
            path="/client-gallery/:slug"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ClientGalleryAccess />
              </Suspense>
            }
          />
          <Route
            path="/gallery/:galleryId"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GalleryViewer />
              </Suspense>
            }
          />
          
          {/* Admin Routes */}
          {/* <Route 
            path="/admin" 
            element={user ? <AdminDashboard /> : <AdminLogin />} 
          />
          <Route 
            path="/admin/login" 
            element={user ? <Navigate to="/admin" /> : <AdminLogin />} 
          /> */}
        </Routes>
      </div>
    </LanguageProvider>
  );
}


export default App;
