# دليل البدء السريع - كتيبة أبطال نيقية

## للتشغيل على Windows

### الطريقة السهلة (بدون PostgreSQL)

1. **قم بتحميل المشروع**
2. **افتح Command Prompt في مجلد المشروع**
3. **شغل:**
   ```cmd
   npm install
   npm run dev
   ```

سيعمل التطبيق على `http://localhost:5000` باستخدام ملفات محلية.

### مع PostgreSQL (للاستخدام المتقدم)

1. **تنصيب PostgreSQL** من [postgresql.org](https://www.postgresql.org/download/windows/)
2. **إنشاء قاعدة البيانات:**
   ```cmd
   psql -U postgres
   CREATE DATABASE nicaea_heroes;
   \q
   ```
3. **إعداد التطبيق:**
   ```cmd
   copy .env.local .env
   # عدل ملف .env بمعلومات قاعدة البيانات
   npm install
   npm run db:push
   npm run dev
   ```

## للنشر على الخادم

### استخدام Docker (الأسهل)

```bash
# انسخ المشروع للخادم
git clone <repository-url>
cd nicaea-heroes

# تشغيل مع Docker
docker-compose up -d
```

### النشر التقليدي

```bash
# على الخادم
git clone <repository-url>
cd nicaea-heroes

# تشغيل سكريبت الإعداد
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## الميزات الرئيسية

✅ **إدارة الأعضاء**: إضافة وتعديل وحذف الأعضاء  
✅ **تسجيل الأعمال**: تسجيل الأعمال الخيرية والتطوعية  
✅ **الأخبار**: نشر أخبار وإعلانات المجموعة  
✅ **الأحداث**: جدولة وإدارة الفعاليات  
✅ **الإحصائيات**: متابعة الإنجازات والأرقام  

## الدعم

اقرأ الملفات التالية للمساعدة:
- `WINDOWS-SETUP.md` - دليل Windows مفصل
- `README-DEPLOYMENT.md` - دليل النشر الشامل

## المشاكل الشائعة

**خطأ في قاعدة البيانات؟**  
→ احذف ملف .env وشغل بدون PostgreSQL

**خطأ في المنفذ؟**  
→ غير PORT في .env إلى رقم آخر مثل 3000

**مشاكل في التنصيب؟**  
→ تأكد من تنصيب Node.js 20+