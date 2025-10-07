# 🚨 CRITICAL: Deployment Checklist

## ✅ Changes Made

1. **Updated `.env` file** with correct Supabase URL:
   - Changed from: `https://0ec90b57d6e95fcbda19832f.supabase.co`
   - Changed to: `https://kkkdvshjcxicupptpixs.supabase.co`
   - **IMPORTANT**: You need to add your correct `VITE_SUPABASE_ANON_KEY`

2. **Removed hardcoded Supabase URLs** from `src/sections/HeroSection.tsx`:
   - Now uses Cloudinary for hero image
   - No more hardcoded `nwnzogoxolvgeahqasqj.supabase.co` references

3. **Updated `setup-photos.js`** to use environment variables instead of hardcoded URLs

## 🔑 REQUIRED: Update Vercel Environment Variables

Go to your Vercel project settings and set these environment variables:

```
VITE_SUPABASE_URL=https://kkkdvshjcxicupptpixs.supabase.co
VITE_SUPABASE_ANON_KEY=<YOUR_ANON_KEY_FROM_SUPABASE_DASHBOARD>
VITE_CLOUDINARY_CLOUD_NAME=djrsrxkls
```

### How to get your Supabase Anon Key:

1. Go to: https://supabase.com/dashboard/project/kkkdvshjcxicupptpixs/settings/api
2. Copy the "anon/public" key (NOT the service_role key)
3. Paste it in Vercel environment variables as `VITE_SUPABASE_ANON_KEY`

## 📋 Deployment Steps

1. **Update local `.env` file** with correct anon key:
   ```bash
   VITE_SUPABASE_URL=https://kkkdvshjcxicupptpixs.supabase.co
   VITE_SUPABASE_ANON_KEY=<paste_your_anon_key_here>
   ```

2. **Commit and push changes**:
   ```bash
   git add .env src/sections/HeroSection.tsx setup-photos.js
   git commit -m "Fix: Update Supabase URL to correct project"
   git push
   ```

3. **Update Vercel environment variables** (see above)

4. **Redeploy on Vercel**:
   - Vercel should auto-deploy on push
   - OR manually redeploy from Vercel dashboard

5. **Verify the fix**:
   - Open browser DevTools > Network tab
   - Navigate to your client gallery
   - Check that Supabase requests go to `kkkdvshjcxicupptpixs.supabase.co`
   - Images should now load correctly

## 🔍 Database Check (CRITICAL)

After fixing the URL, you still need to check your database for corrupted image URLs:

```sql
-- Run this in Supabase SQL Editor
SELECT id, image_url, thumbnail_url, created_at
FROM client_images
ORDER BY created_at DESC
LIMIT 10;
```

**If you see corrupted URLs** like:
- `namtozosolvsedhoasslri.tv/DSO09964_1.JPGsi`
- `466zeea1-c340-436c-a0bd-d295ed02aefe1`

You need to fix them. Example fix:

```sql
-- Update corrupted URLs to correct Cloudinary format
UPDATE client_images
SET image_url = 'wedding_gallery/DSC09964_1.JPG'
WHERE image_url LIKE '%namtozosolvsedhoasslri%';
```

## ⚠️ Important Notes

- The Supabase client initialization (`src/lib/supabaseClient.ts`) is already correct - it reads from environment variables
- The problem was the `.env` file had the wrong URL
- Make sure Vercel environment variables match your local `.env`
- After deployment, the 404 errors should disappear if the database URLs are correct

## 📝 Next Steps After Deployment

1. Verify images load in client galleries
2. Check browser console for any remaining errors
3. If images still don't load, check database URLs (see Database Check section)
4. If you need to upload new images, ensure the upload system saves correct Cloudinary URLs or public IDs
