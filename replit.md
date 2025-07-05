# Nicaea Heroes - Work Registration System

## Overview

**Nicaea Heroes (كتيبة أبطال نيقية)** is a comprehensive web platform designed specifically for the Orthodox Christian community to register, document, and share charitable and volunteer works. The platform features full Arabic language support with RTL (Right-to-Left) text direction and incorporates Orthodox Christian design elements with a beautiful gold and blue color scheme.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript 5+
- **Styling**: Tailwind CSS with custom Orthodox-themed colors and Arabic font support
- **UI Components**: Radix UI component library with shadcn/ui design system
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Native Arabic language support with RTL layout

### Backend Architecture
- **Runtime**: Node.js 20+ with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **Session Management**: Express-session with PostgreSQL session store
- **Security**: Comprehensive security headers and CORS protection

### Database Design
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Fallback Storage**: File-based JSON storage for development
- **Migration System**: Drizzle Kit for database migrations
- **Schema**: Strongly typed schemas with Zod validation

## Key Components

### Data Models
1. **Users**: Member profiles with roles (admin, leader, member)
2. **Works**: Charitable and volunteer work records
3. **News**: Community announcements and updates  
4. **Events**: Scheduled activities and gatherings

### Core Features
- **Work Registration**: Complete system for logging charitable activities
- **Member Management**: User profiles with role-based permissions
- **News System**: Community announcements with work linking
- **Event Management**: Activity scheduling and location tracking
- **Analytics Dashboard**: Statistics and performance metrics

### User Interface
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA compliance and keyboard navigation
- **Animation**: Framer Motion for smooth transitions and interactions
- **Theme**: Orthodox Christian inspired design with gold/blue color palette

## Data Flow

### Client-Server Communication
1. **Frontend** makes HTTP requests to REST API endpoints
2. **Express Server** processes requests and validates data
3. **Storage Layer** (PostgreSQL or file-based) handles data persistence
4. **Response** sent back to client with JSON data

### State Management
- **Server State**: Managed by TanStack Query with automatic caching
- **Local State**: React hooks for component-level state
- **Form State**: React Hook Form for complex form handling

### Authentication Flow
- Session-based authentication using express-session
- PostgreSQL session store for production deployments
- Role-based access control (admin, leader, member)

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing solution
- **framer-motion**: Animation library
- **date-fns**: Date manipulation with Arabic locale support
- **tailwindcss**: Utility-first CSS framework

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store
- **zod**: Runtime type validation

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **ESBuild**: JavaScript bundler for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with file-based storage fallback
- **Hot Reload**: Automatic reloading for frontend and backend changes
- **Type Checking**: Real-time TypeScript validation

### Production Deployment
- **Platform**: Vercel serverless deployment
- **Database**: PostgreSQL (Neon Database for serverless)
- **Build Process**: Vite for frontend, ESBuild for backend
- **Static Assets**: Served via Vercel's CDN
- **API Routes**: Deployed as Vercel Functions

### Build Configuration
- **Client Build**: Vite produces optimized static assets
- **Server Build**: ESBuild creates serverless function
- **Environment Variables**: Database URLs and session secrets
- **Asset Optimization**: Automatic compression and caching

## Changelog

Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Added edit and delete functionality for all sections (works, news, events)
- July 05, 2025. Removed volunteer hours references completely from all statistics
- July 05, 2025. Created comprehensive About page focusing on the Council of Nicaea
- July 05, 2025. Fixed database schema issues for Vercel deployment compatibility

## User Preferences

Preferred communication style: Simple, everyday language.