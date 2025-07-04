import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="min-h-screen bg-orthodox-blue">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orthodox-gold font-amiri mb-4">تواصل معنا</h1>
          <p className="text-lg text-orthodox-cream">
            نحن هنا لمساعدتك والإجابة على استفساراتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-orthodox-gold mb-6">معلومات الاتصال</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center">
                  <MapPin className="text-orthodox-blue w-6 h-6" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-1">العنوان</h3>
                  <p className="text-orthodox-cream">شارع الكنيسة، المنطقة الأثرية، القاهرة</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center">
                  <Phone className="text-orthodox-blue w-6 h-6" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-1">الهاتف</h3>
                  <p className="text-orthodox-cream">+20 123 456 7890</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center">
                  <Mail className="text-orthodox-blue w-6 h-6" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                  <p className="text-orthodox-cream">info@nicaea-heroes.org</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center">
                  <Clock className="text-orthodox-blue w-6 h-6" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-1">ساعات العمل</h3>
                  <p className="text-orthodox-cream">السبت - الخميس: 9 صباحاً - 6 مساءً</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-orthodox-gold border-opacity-30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-orthodox-gold mb-6">أرسل رسالة</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
