import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// SSG export function
export const createApp = () => {
  // Use HashRouter for static generation (file://), otherwise create a
  // browser router and opt-in to React Router v7 future flags to silence
  // the runtime warnings about upcoming behavior changes.
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return (
      <StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </StrictMode>
    );
  }

  // Create a router that renders the SPA entrypoint. We pass the `future`
  // flags recommended by React Router to opt-in to v7 behaviors early and
  // avoid the console deprecation warnings shown in development.
  const router = createBrowserRouter(
    [
      {
        path: '/*',
        element: <App />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

// Client-side hydration
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(createApp());
  }
}

// Export for SSG
export default createApp;