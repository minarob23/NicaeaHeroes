# دليل الإعداد على Windows - كتيبة أبطال نيقية

## متطلبات النظام

1. **Node.js 20+**: تحميل من [nodejs.org](https://nodejs.org)
2. **PostgreSQL 15+**: تحميل من [postgresql.org](https://www.postgresql.org/download/windows/)
3. **Git**: تحميل من [git-scm.com](https://git-scm.com/download/win)

## إعداد PostgreSQL على Windows

### 1. تنصيب PostgreSQL

```cmd
# بعد تنصيب PostgreSQL من الموقع الرسمي
# افتح Command Prompt كـ Administrator
```

### 2. إنشاء قاعدة البيانات

```cmd
# افتح psql من قائمة Start
# أو من Command Prompt:
psql -U postgres

# في psql:
CREATE DATABASE nicaea_heroes;
CREATE USER nicaea_admin WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE nicaea_heroes TO nicaea_admin;
\q
```

### 3. تأكيد الاتصال

```cmd
# اختبر الاتصال
psql -h localhost -U nicaea_admin -d nicaea_heroes
# إذا نجح الاتصال، اخرج بـ \q
```

## إعداد التطبيق

### 1. استنساخ المشروع

```cmd
git clone https://github.com/your-repo/nicaea-heroes.git
cd nicaea-heroes
```

### 2. إعداد متغيرات البيئة

```cmd
# انسخ ملف الإعداد المحلي
copy .env.local .env

# عدل ملف .env بمعلومات قاعدة البيانات الخاصة بك
notepad .env
```

**محتوى ملف .env:**
```env
DATABASE_URL=postgresql://nicaea_admin:secure_password_123@localhost:5432/nicaea_heroes
PGHOST=localhost
PGPORT=5432
PGDATABASE=nicaea_heroes
PGUSER=nicaea_admin
PGPASSWORD=secure_password_123
NODE_ENV=development
PORT=5000
SESSION_SECRET=local-dev-secret-key-change-this
```

### 3. تنصيب الحزم

```cmd
npm install
```

### 4. إعداد قاعدة البيانات

```cmd
# إنشاء الجداول
npm run db:push
```

### 5. تشغيل التطبيق

```cmd
# للتطوير
npm run dev

# للإنتاج
npm run build
npm start
```

## استكشاف المشاكل الشائعة

### 1. خطأ SASL Authentication

```
Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
```

**الحل:**
- تأكد من أن كلمة المرور في DATABASE_URL محاطة بعلامات اقتباس
- تأكد من صحة معلومات الاتصال
- أعد إنشاء المستخدم في PostgreSQL

### 2. خطأ ECONNREFUSED

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**الحل:**
- تأكد من تشغيل خدمة PostgreSQL
- افتح Services.msc وابحث عن postgresql-x64-15
- تأكد من أن الخدمة تعمل

### 3. خطأ Permission Denied

**الحل:**
```cmd
# في psql كـ postgres user:
GRANT ALL PRIVILEGES ON DATABASE nicaea_heroes TO nicaea_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nicaea_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nicaea_admin;
```

### 4. مشكلة المنافذ

**الحل:**
- تأكد من أن المنفذ 5000 غير مستخدم
- أو غير PORT في ملف .env

## تشغيل مع Docker (البديل السهل)

إذا واجهت مشاكل مع الإعداد المحلي:

### 1. تنصيب Docker Desktop

تحميل من [docker.com](https://www.docker.com/products/docker-desktop/)

### 2. تشغيل مع Docker Compose

```cmd
# انسخ ملف docker-compose
copy docker-compose.yml docker-compose.local.yml

# عدل المتغيرات حسب الحاجة
notepad docker-compose.local.yml

# تشغيل
docker-compose -f docker-compose.local.yml up -d

# للتوقف
docker-compose -f docker-compose.local.yml down
```

## أدوات مفيدة

### 1. pgAdmin (أداة إدارة PostgreSQL البصرية)

تحميل من [pgadmin.org](https://www.pgadmin.org/download/pgadmin-4-windows/)

### 2. VS Code Extensions

- PostgreSQL by Chris Kolkman
- REST Client
- GitLens

### 3. Command Line Tools

```cmd
# تحقق من إصدار Node.js
node --version

# تحقق من إصدار npm
npm --version

# تحقق من إصدار PostgreSQL
psql --version

# تحقق من حالة الخدمات
sc query postgresql-x64-15
```

## النسخ الاحتياطية على Windows

### إنشاء نسخة احتياطية

```cmd
# إنشاء مجلد للنسخ الاحتياطية
mkdir C:\nicaea-backups

# إنشاء نسخة احتياطية
pg_dump -h localhost -U nicaea_admin nicaea_heroes > C:\nicaea-backups\backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
```

### استعادة النسخة الاحتياطية

```cmd
# استعادة
psql -h localhost -U nicaea_admin nicaea_heroes < C:\nicaea-backups\backup_file.sql
```

## التشغيل التلقائي

### إعداد Windows Service

```cmd
# تنصيب pm2
npm install -g pm2
npm install -g pm2-windows-service

# إنشاء الخدمة
pm2-service-install -n PM2

# تشغيل التطبيق
pm2 start npm --name "nicaea-heroes" -- start
pm2 save
```

## الدعم

إذا واجهت أي مشاكل:

1. تحقق من سجلات الأخطاء
2. تأكد من تشغيل PostgreSQL
3. تحقق من متغيرات البيئة
4. راجع هذا الدليل

للمساعدة الإضافية، يرجى توفير:
- رسالة الخطأ الكاملة
- إصدار Windows
- إصدار Node.js و PostgreSQL
- محتوى ملف .env (بدون كلمات المرور)