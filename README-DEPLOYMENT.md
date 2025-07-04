# دليل النشر - كتيبة أبطال نيقية

## متطلبات النظام

- Node.js 20 أو أحدث
- PostgreSQL 15 أو أحدث
- Docker (اختياري للنشر السهل)

## التشغيل المحلي

### 1. التشغيل مع قاعدة البيانات المحلية

```bash
# تنصيب الحزم
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# عدل الملف .env بمعلومات قاعدة البيانات المحلية

# إنشاء قاعدة البيانات
createdb nicaea_heroes

# دفع مخطط قاعدة البيانات
npm run db:push

# تشغيل التطبيق في وضع التطوير
npm run dev

# أو للإنتاج
npm run build
npm start
```

### 2. التشغيل باستخدام Docker

```bash
# تشغيل كامل مع PostgreSQL
docker-compose up -d

# فقط قاعدة البيانات
docker-compose up -d postgres

# بناء صورة التطبيق
docker build -t nicaea-heroes .

# تشغيل التطبيق
docker run -p 5000:5000 --env-file .env nicaea-heroes
```

## النشر على الخادم

### 1. النشر على VPS أو Dedicated Server

```bash
# على الخادم
git clone <repository-url>
cd nicaea-heroes

# تنصيب Node.js والحزم
npm install --production

# إعداد PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# إنشاء قاعدة البيانات والمستخدم
sudo -u postgres psql
CREATE DATABASE nicaea_heroes;
CREATE USER nicaea_admin WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE nicaea_heroes TO nicaea_admin;
\q

# إعداد متغيرات البيئة للإنتاج
nano .env

# بناء التطبيق
npm run build

# تشغيل مع PM2 (مدير العمليات)
npm install -g pm2
pm2 start dist/index.js --name "nicaea-heroes"
pm2 startup
pm2 save
```

### 2. النشر باستخدام Docker على الخادم

```bash
# على الخادم
git clone <repository-url>
cd nicaea-heroes

# تشغيل مع Docker Compose
docker-compose -f docker-compose.yml up -d

# للتحديث
git pull
docker-compose build
docker-compose up -d
```

### 3. إعداد Nginx (عكس الوكيل)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## متغيرات البيئة للإنتاج

```env
# Database
DATABASE_URL=postgresql://nicaea_admin:secure_password@localhost:5432/nicaea_heroes

# Application
NODE_ENV=production
PORT=5000

# Security
SESSION_SECRET=super-secure-random-string-generate-new-one
CORS_ORIGIN=https://yourdomain.com

# Optional: Redis for sessions
REDIS_URL=redis://localhost:6379
```

## النسخ الاحتياطية

### النسخ الاحتياطي لقاعدة البيانات

```bash
# إنشاء نسخة احتياطية
pg_dump -h localhost -U nicaea_admin nicaea_heroes > backup_$(date +%Y%m%d_%H%M%S).sql

# استعادة النسخة الاحتياطية
psql -h localhost -U nicaea_admin nicaea_heroes < backup_file.sql

# النسخ الاحتياطي التلقائي (crontab)
0 2 * * * /usr/bin/pg_dump -h localhost -U nicaea_admin nicaea_heroes > /path/to/backups/nicaea_$(date +\%Y\%m\%d).sql
```

## المراقبة والصيانة

### تحقق من حالة التطبيق

```bash
# مع PM2
pm2 status
pm2 logs nicaea-heroes

# مع Docker
docker-compose ps
docker-compose logs app

# تحقق من قاعدة البيانات
psql -h localhost -U nicaea_admin -d nicaea_heroes -c "SELECT COUNT(*) FROM users;"
```

### تحديث التطبيق

```bash
# مع PM2
git pull
npm install --production
npm run build
pm2 restart nicaea-heroes

# مع Docker
git pull
docker-compose build
docker-compose up -d
```

## الأمان

### إعدادات الأمان المهمة

1. **تشفير HTTPS**: استخدم Let's Encrypt مع Certbot
2. **Firewall**: افتح فقط المنافذ الضرورية (80, 443, 22)
3. **تحديثات النظام**: قم بتحديث النظام بانتظام
4. **كلمات مرور قوية**: استخدم كلمات مرور معقدة
5. **النسخ الاحتياطية**: قم بعمل نسخ احتياطية يومية

### HTTPS مع Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
sudo systemctl enable certbot.timer
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

1. **فشل الاتصال بقاعدة البيانات**
   - تأكد من تشغيل PostgreSQL
   - تحقق من صحة DATABASE_URL

2. **خطأ في المنافذ**
   - تأكد من عدم استخدام المنفذ 5000
   - غير المنفذ في متغير PORT

3. **مشاكل الصلاحيات**
   - تأكد من صلاحيات مستخدم قاعدة البيانات
   - تحقق من صلاحيات الملفات

## الدعم

للحصول على المساعدة أو الإبلاغ عن المشاكل، يرجى:
- مراجعة هذا الدليل أولاً
- التحقق من سجلات التطبيق
- التأكد من إعدادات البيئة