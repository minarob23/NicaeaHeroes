# Nicaea Heroes - Work Registration System

## Overview

This is a full-stack web application for "Nicaea Heroes" (كتيبة أبطال نيقية), an Orthodox Christian community work registration system. The platform allows members to register, track, and showcase their charitable works, volunteer activities, and community contributions. The application features Arabic RTL support and is built with a modern tech stack.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Language**: Arabic RTL support with custom Orthodox Christian theme colors

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API**: REST API with JSON responses

### Build System
- **Frontend Bundler**: Vite
- **Backend Bundler**: esbuild
- **Development**: tsx for TypeScript execution
- **CSS Processing**: PostCSS with Tailwind CSS

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **Users**: Authentication and member profiles
- **Works**: Charitable and volunteer work records
- **News**: Community announcements and updates
- **Events**: Upcoming activities and gatherings

### API Endpoints
- **Works Management**: CRUD operations for charitable works
- **User Management**: Member profiles and authentication
- **News System**: Community announcements
- **Events System**: Activity scheduling
- **Statistics**: Dashboard metrics

### UI Components
- **Layout**: Header with navigation, footer with contact info
- **Forms**: Work registration, contact forms with validation
- **Cards**: Display components for works, members, news
- **Theming**: Orthodox Christian color scheme (blue, gold, navy)

## Data Flow

1. **Client Request**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and validate data
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response**: JSON data returned to client for UI updates
5. **State Management**: TanStack Query handles caching and synchronization

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries
- **Connection**: Environment variable `DATABASE_URL`

### UI Libraries
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Replit Integration**: Development environment optimizations
- **Vite Plugins**: HMR and development tooling
- **TypeScript**: Full type safety across the stack

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: Auto-assigned by Vite
- **Database**: Neon Database connection
- **Environment**: NODE_ENV=development

### Production
- **Build**: `npm run build` (Vite + esbuild)
- **Start**: `npm start`
- **Output**: `dist/` directory
- **Database**: Production Neon Database

### Database Management
- **Migrations**: `db:push` command with Drizzle Kit
- **Schema**: Shared between client and server
- **Type Safety**: Drizzle-zod for runtime validation
- **Sessions**: PostgreSQL-based session storage
- **Seeding**: Automatic sample data initialization

### Local and Production Deployment
- **Development**: Replit environment with PostgreSQL
- **Local Setup**: Docker Compose with PostgreSQL
- **Production**: VPS/Dedicated server with PM2
- **Security**: Session management, CORS, security headers
- **Monitoring**: PM2 process management
- **Backups**: Automated PostgreSQL backups

## Changelog

- July 04, 2025. Initial setup and migration completed
- July 04, 2025. Enhanced member management:
  - Added edit and delete buttons to member cards
  - Improved member card visibility with better contrast
  - Removed "Total Beneficiaries" statistics box
  - Added work count field to member registration form
- July 04, 2025. Enhanced news system:
  - Added ability to link works to news articles
  - Created comprehensive news creation form with work selection
- July 04, 2025. Major database migration and production setup:
  - Migrated from MemStorage to PostgreSQL database
  - Added database seeding with sample data
  - Created attractive edit member form with comprehensive UI
  - Added session management with PostgreSQL storage
  - Implemented security headers and production configurations
  - Created Docker and deployment configurations
  - Added comprehensive deployment documentation
  - Set up backup and restore scripts
  - Added intelligent storage fallback system (PostgreSQL → File storage)
  - Created Windows-specific setup guides and batch scripts
  - Added file-based storage for offline/local development
  - Implemented automatic storage selection based on environment
- July 05, 2025. Vercel deployment preparation:
  - Migrated project from Replit Agent to standard Replit environment
  - Created Vercel configuration and serverless API functions
  - Built unified API handler for all routes in serverless environment
  - Added proper CORS handling for production deployment
  - Created comprehensive deployment guide and troubleshooting documentation
  - Fixed build permissions and optimized for Vercel deployment

## User Preferences

Preferred communication style: Simple, everyday language.