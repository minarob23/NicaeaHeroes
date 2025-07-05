# Vercel Deployment Guide for Nicaea Heroes

## Overview
This guide explains how to deploy the Nicaea Heroes application to Vercel successfully.

## Pre-deployment Setup Complete
✅ Created Vercel configuration (`vercel.json`)
✅ Built serverless API function (`api/index.js`)
✅ Created custom build script (`vercel-build.sh`)
✅ Fixed import paths for Vercel compatibility
✅ Configured proper Node.js runtime

## Deployment Steps

### 1. Connect Repository to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Import your repository
4. Vercel will automatically detect the configuration

### 2. Environment Variables (Optional)
If you want to use a PostgreSQL database in production:
- Add `DATABASE_URL` environment variable in Vercel dashboard
- Add `SESSION_SECRET` for secure sessions

### 3. Deploy
Click "Deploy" - Vercel will:
- Run the build script (`vercel-build.sh`)
- Build the React frontend
- Create serverless functions for the API
- Deploy to a global CDN

## Current Configuration

### Frontend
- Built with Vite
- Output directory: `dist/client`
- Served as static files

### Backend
- Serverless function at `/api/index.js`
- Uses file storage fallback (works without database)
- Handles all API routes dynamically

### Routes
- `/api/*` → Serverless function
- `/*` → Frontend application

## File Storage
The application uses intelligent storage fallback:
1. PostgreSQL (if DATABASE_URL provided)
2. File storage (automatic fallback)
3. Memory storage (development only)

This means the app works immediately without database setup.

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Runtime Errors
- Check function logs in Vercel dashboard
- API routes are handled by single function
- File storage creates data files automatically

## Production Recommendations

1. **Database**: Add PostgreSQL for production
2. **Environment**: Set proper environment variables
3. **Domain**: Configure custom domain in Vercel
4. **Analytics**: Enable Vercel analytics
5. **Security**: Review CORS settings for production

## Support
- Vercel Documentation: https://vercel.com/docs
- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction