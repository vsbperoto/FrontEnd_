import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/client-galleries/access', async ({ request }) => {
    const body = await request.json();
    
    // Mock validation
    if (body.access_code === 'TEST1234') {
      return HttpResponse.json({
        success: true,
        gallery: {
          id: 'mock-gallery-id',
          bride_name: 'Test Bride',
          groom_name: 'Test Groom',
          images: []
        }
      });
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  })
];