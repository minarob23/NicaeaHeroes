
# 🏆 كتيبة أبطال نيقية | Nicaea Heroes

<div align="center">

![Orthodox Cross](https://img.shields.io/badge/Faith-Orthodox%20Christian-gold?style=for-the-badge&logo=cross&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)

**منصة تسجيل الأعمال الخيرية والتطوعية للمجتمع الأرثوذكسي**

*A work registration system for Orthodox Christian community charitable and volunteer activities*

</div>

---

## 📖 نظرة عامة | Overview

**كتيبة أبطال نيقية** هي منصة ويب حديثة مصممة خصيصاً للمجتمع الأرثوذكسي المسيحي لتسجيل وتوثيق ومشاركة الأعمال الخيرية والتطوعية. تدعم المنصة اللغة العربية بالكامل مع دعم RTL وتتميز بتصميم جميل يعكس التراث الأرثوذكسي.

**Nicaea Heroes** is a modern web platform designed specifically for the Orthodox Christian community to register, document, and share charitable and volunteer works. The platform fully supports Arabic with RTL support and features a beautiful design that reflects Orthodox heritage.

## ✨ الميزات الرئيسية | Key Features

### 🎯 إدارة الأعمال | Work Management
- **تسجيل الأعمال الخيرية** - Register charitable works
- **تصنيف الأنشطة** - Categorize activities  
- **إحصائيات المستفيدين** - Beneficiary statistics
- **تواريخ الأعمال** - Work dates tracking

### 👥 إدارة الأعضاء | Member Management
- **ملفات الأعضاء** - Member profiles
- **إحصائيات الأعضاء** - Member statistics
- **أدوار المستخدمين** - User roles
- **تحرير الملفات** - Profile editing

### 📰 نظام الأخبار | News System
- **إعلانات المجتمع** - Community announcements
- **ربط الأعمال بالأخبار** - Link works to news
- **نشر المحتوى** - Content publishing

### 📅 إدارة الفعاليات | Events Management
- **جدولة الأنشطة** - Activity scheduling
- **تواريخ الفعاليات** - Event dates
- **مواقع الفعاليات** - Event locations

### 📊 لوحة الإحصائيات | Dashboard Analytics
- **إجمالي الأعمال** - Total works
- **عدد المستفيدين** - Number of beneficiaries
- **عدد الأعضاء** - Number of members
- **ساعات التطوع** - Volunteer hours

## 🛠️ التقنيات المستخدمة | Tech Stack

### Frontend
- **⚛️ React 18** - Modern UI library
- **🔷 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **🧩 shadcn/ui** - Beautiful components
- **🔍 TanStack Query** - Data fetching
- **🎭 Framer Motion** - Smooth animations
- **🎯 Wouter** - Lightweight routing

### Backend
- **🟢 Node.js** - Server runtime
- **⚡ Express.js** - Web framework
- **🐘 PostgreSQL** - Database
- **🔧 Drizzle ORM** - Type-safe database queries
- **🏗️ esbuild** - Fast bundling

### Development
- **⚡ Vite** - Fast build tool
- **🔥 HMR** - Hot module replacement
- **📦 tsx** - TypeScript execution
- **🐳 Docker** - Containerization (optional)

## 🚀 البدء السريع | Quick Start

### 📋 المتطلبات | Prerequisites

```bash
Node.js 20+
npm or yarn
PostgreSQL 15+ (optional - file storage fallback available)
```

### ⚡ التشغيل السريع | Quick Run

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/nicaea-heroes.git
cd nicaea-heroes

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

🎉 **يعمل التطبيق الآن على** | **App now running on**: `http://localhost:5000`

### 🗄️ مع قاعدة البيانات | With Database

```bash
# 1. Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# 2. Create database
createdb nicaea_heroes

# 3. Push database schema
npm run db:push

# 4. Start with database
npm run dev
```

## 📁 هيكل المشروع | Project Structure

```
📦 nicaea-heroes/
├── 🖥️ client/                 # Frontend React app
│   ├── 📄 src/
│   │   ├── 🧩 components/      # UI components
│   │   ├── 📱 pages/           # Page components
│   │   ├── 🎣 hooks/           # Custom hooks
│   │   └── 📚 lib/             # Utilities
├── 🔧 server/                  # Backend Express app
│   ├── 📡 routes.ts            # API routes
│   ├── 💾 storage.ts           # Data storage
│   └── 🌱 seed-data.ts         # Sample data
├── 🤝 shared/                  # Shared types & schemas
├── 📊 data/                    # File-based storage
├── 🐳 scripts/                 # Deployment scripts
└── ⚙️ config files
```

## 🎨 التصميم والألوان | Design & Colors

المنصة تستخدم نظام ألوان مستوحى من التراث الأرثوذكسي:

```css
/* Orthodox Color Palette */
--orthodox-blue: #1e3a8a     /* الأزرق الأرثوذكسي */
--orthodox-navy: #1e2856     /* الأزرق الداكن */
--orthodox-gold: #daa520     /* الذهبي الأرثوذكسي */
--orthodox-cream: #fef3c7    /* الكريمي الفاتح */
```

## 📱 واجهة المستخدم | User Interface

### 🏠 الصفحة الرئيسية | Home Page
- شعار أبطال نيقية الجديد
- إحصائيات تفاعلية
- الرؤية والرسالة
- دعوة للعمل

### 💼 إدارة الأعمال | Works Management
- نموذج تسجيل الأعمال
- عرض كروت الأعمال
- تصفية وبحث
- إحصائيات مفصلة

### 👥 الأعضاء | Members
- ملفات الأعضاء
- إضافة عضو جديد
- تحرير المعلومات
- إحصائيات الأعضاء

## 🔧 أوامر التطوير | Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run check        # TypeScript check

# Utilities
npm install          # Install dependencies
npm run clean        # Clean build files
```

## 🚀 النشر | Deployment

### 🌐 على Replit | On Replit

```bash
# 1. Fork/Import the project to Replit
# 2. Set environment variables in Secrets
# 3. Click Run button
```

### 🐳 باستخدام Docker | Using Docker

```bash
# Build and run with Docker
docker-compose up -d

# Stop containers
docker-compose down
```

### 🖥️ خادم تقليدي | Traditional Server

```bash
# Production deployment
npm run build
NODE_ENV=production npm start
```

## 🔒 متغيرات البيئة | Environment Variables

```env
# Database (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/nicaea_heroes

# Session
SESSION_SECRET=your-secret-key

# Application
NODE_ENV=development
PORT=5000
```

## 📊 قاعدة البيانات | Database Schema

### 👤 المستخدمون | Users
- ID, الاسم الكامل, اسم المستخدم
- البريد الإلكتروني, الدور
- تاريخ الإنشاء

### 💼 الأعمال | Works
- العنوان, الوصف, الفئة
- تاريخ العمل, عدد المستفيدين
- معرف المؤلف

### 📰 الأخبار | News
- العنوان, المحتوى
- تاريخ النشر, حالة النشر

### 📅 الفعاليات | Events
- العنوان, الوصف
- تاريخ الفعالية, الموقع

## 🤝 المساهمة | Contributing

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

```bash
# 1. Fork المشروع
# 2. إنشاء فرع جديد
git checkout -b feature/amazing-feature

# 3. Commit التغييرات
git commit -m 'Add amazing feature'

# 4. Push للفرع
git push origin feature/amazing-feature

# 5. فتح Pull Request
```

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل | Contact

- **المشروع**: كتيبة أبطال نيقية
- **البريد الإلكتروني**: contact@nicaea-heroes.org
- **الموقع**: [nicaea-heroes.org](https://nicaea-heroes.org)

## 🙏 شكر وتقدير | Acknowledgments

- **الكنيسة الأرثوذكسية** - للإلهام والتوجيه الروحي
- **المطورين** - للمساهمة في التطوير
- **المجتمع** - للدعم والمشاركة

---

<div align="center">

**✨ صُنع بـ ❤️ للمجتمع الأرثوذكسي | Made with ❤️ for the Orthodox Community ✨**

![Cross](https://img.shields.io/badge/☦️-Orthodox%20Christian-gold?style=for-the-badge)

</div>
