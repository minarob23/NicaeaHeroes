import { Link } from "wouter";
import { Cross, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orthodox-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 bg-orthodox-gold rounded-full flex items-center justify-center">
                <Cross className="text-orthodox-blue w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-amiri">كتيبة أبطال نيقية</h3>
                <p className="text-orthodox-cream text-sm">تسجيل الأعمال والإنجازات</p>
              </div>
            </div>
            <p className="text-orthodox-cream text-sm">
              منصة لتسجيل ومتابعة الأعمال الخيرية والتطوعية لأبطال نيقية
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-orthodox-cream">
              <li>
                <Link href="/" className="hover:text-orthodox-gold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-orthodox-gold transition-colors">
                  الأعمال
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-orthodox-gold transition-colors">
                  الأعضاء
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-orthodox-gold transition-colors">
                  الأخبار
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
            <ul className="space-y-2 text-orthodox-cream">
              <li>
                <Link href="/works" className="hover:text-orthodox-gold transition-colors">
                  تسجيل الأعمال
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-orthodox-gold transition-colors">
                  متابعة الإنجازات
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-orthodox-gold transition-colors">
                  انضمام للأعضاء
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orthodox-gold transition-colors">
                  الدعم الفني
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
            <div className="flex space-x-reverse space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-orthodox-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <Facebook className="text-orthodox-blue w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orthodox-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <Twitter className="text-orthodox-blue w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orthodox-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <Instagram className="text-orthodox-blue w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orthodox-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <Youtube className="text-orthodox-blue w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orthodox-cream border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-orthodox-cream">
            © 2024 كتيبة أبطال مجمع نيقية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
