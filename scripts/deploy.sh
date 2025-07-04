#!/bin/bash

# Nicaea Heroes Deployment Script
# استخدم هذا السكريبت لنشر التطبيق على الخادم

set -e

echo "🚀 بدء عملية النشر..."

# التحقق من متطلبات النظام
check_requirements() {
    echo "🔍 التحقق من متطلبات النظام..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js غير موجود. يرجى تنصيبه أولاً"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm غير موجود. يرجى تنصيبه أولاً"
        exit 1
    fi
    
    if ! command -v psql &> /dev/null; then
        echo "❌ PostgreSQL غير موجود. يرجى تنصيبه أولاً"
        exit 1
    fi
    
    echo "✅ جميع المتطلبات متوفرة"
}

# إعداد متغيرات البيئة
setup_environment() {
    echo "🔧 إعداد متغيرات البيئة..."
    
    if [ ! -f .env ]; then
        echo "📝 إنشاء ملف .env من القالب..."
        cp .env.example .env
        echo "⚠️  يرجى تعديل ملف .env بالإعدادات الصحيحة قبل المتابعة"
        read -p "اضغط Enter للمتابعة بعد تعديل .env..."
    fi
    
    source .env
    echo "✅ تم تحميل متغيرات البيئة"
}

# تنصيب الحزم
install_dependencies() {
    echo "📦 تنصيب الحزم..."
    npm ci --production
    echo "✅ تم تنصيب الحزم"
}

# بناء التطبيق
build_application() {
    echo "🔨 بناء التطبيق..."
    npm run build
    echo "✅ تم بناء التطبيق"
}

# إعداد قاعدة البيانات
setup_database() {
    echo "🗄️ إعداد قاعدة البيانات..."
    
    # التحقق من الاتصال بقاعدة البيانات
    if ! psql $DATABASE_URL -c '\q' 2>/dev/null; then
        echo "❌ فشل الاتصال بقاعدة البيانات. تحقق من DATABASE_URL"
        exit 1
    fi
    
    # دفع مخطط قاعدة البيانات
    npm run db:push
    echo "✅ تم إعداد قاعدة البيانات"
}

# إعداد PM2
setup_pm2() {
    echo "🔄 إعداد PM2..."
    
    if ! command -v pm2 &> /dev/null; then
        echo "📦 تنصيب PM2..."
        npm install -g pm2
    fi
    
    # إيقاف التطبيق إذا كان يعمل
    pm2 stop nicaea-heroes 2>/dev/null || true
    pm2 delete nicaea-heroes 2>/dev/null || true
    
    # تشغيل التطبيق
    pm2 start dist/index.js --name "nicaea-heroes" --env production
    pm2 save
    
    echo "✅ تم إعداد PM2"
}

# الدالة الرئيسية
main() {
    echo "🎯 مرحباً بك في أداة نشر كتيبة أبطال نيقية"
    echo "======================================"
    
    check_requirements
    setup_environment
    install_dependencies
    build_application
    setup_database
    setup_pm2
    
    echo ""
    echo "🎉 تم النشر بنجاح!"
    echo "======================================"
    echo "📊 حالة التطبيق: pm2 status"
    echo "📝 سجلات التطبيق: pm2 logs nicaea-heroes"
    echo "🔄 إعادة تشغيل: pm2 restart nicaea-heroes"
    echo "🔗 التطبيق متاح على: http://localhost:5000"
}

# تشغيل الدالة الرئيسية
main "$@"