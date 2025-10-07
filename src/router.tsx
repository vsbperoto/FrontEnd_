import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ClientGalleryDetailsEnhancedWrapper from './components/ClientGalleryDetailsEnhancedWrapper';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/test-gallery',
      element: <ClientGalleryDetailsEnhancedWrapper />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);