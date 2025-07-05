
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Sword, Book, Cross, Star, AlertTriangle, CheckCircle } from "lucide-react";

export default function DoctrineProtection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const protectionMethods = [
    {
      title: "الإدانة الرسمية",
      description: "إدانة البدعة الآريوسية رسمياً من قبل 300 أسقف",
      icon: Sword,
      details: "أول إدانة مسكونية رسمية لبدعة تهدد الإيمان المسيحي"
    },
    {
      title: "صياغة قانون الإيمان",
      description: "وضع نص عقيدي واضح يحدد الإيمان الأرثوذكسي",
      icon: Book,
      details: "قانون إيمان دقيق يمنع التأويل المنحرف"
    },
    {
      title: "الإجماع المسكوني",
      description: "إجماع عالمي من جميع أنحاء الإمبراطورية الرومانية",
      icon: CheckCircle,
      details: "شرعية عالمية لا يمكن الطعن فيها"
    },
    {
      title: "الدعم الإمبراطوري",
      description: "الحماية الإمبراطورية للقرارات المجمعية",
      icon: Shield,
      details: "قوة القانون المدني لتطبيق القرارات الكنسية"
    }
  ];

  const heresies = [
    {
      name: "الآريوسية",
      founder: "آريوس الإسكندري",
      error: "إنكار ألوهية المسيح الكاملة",
      response: "تأكيد أن المسيح 'مساوٍ للآب في الجوهر'",
      status: "مُدانة",
      color: "bg-red-500"
    },
    {
      name: "الأبولينارية",
      founder: "أبولينار اللاذقي",
      error: "إنكار الطبيعة البشرية الكاملة للمسيح",
      response: "تأكيد التجسد الكامل",
      status: "مُدانة لاحقاً",
      color: "bg-orange-500"
    },
    {
      name: "النسطورية",
      founder: "نسطور القسطنطيني",
      error: "فصل الطبيعتين الإلهية والبشرية",
      response: "تأكيد الاتحاد الأقنومي",
      status: "مُدانة لاحقاً",
      color: "bg-yellow-500"
    }
  ];

  const defenders = [
    {
      name: "القديس أثناسيوس",
      title: "عمود الأرثوذكسية",
      contribution: "الدفاع اللاهوتي ضد الآريوسية",
      sacrifice: "خمسة منافي"
    },
    {
      name: "القديس باسيليوس",
      title: "الكبير الكبادوكي",
      contribution: "تطوير اللاهوت الثالوثي",
      sacrifice: "المقاومة الإمبراطورية"
    },
    {
      name: "القديس يوحنا الذهبي الفم",
      title: "معلم الكنيسة",
      contribution: "الوعظ والتعليم",
      sacrifice: "النفي والاضطهاد"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            variants={fadeInUp}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-6 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220,38,38,0.3)",
                  "0 0 40px rgba(220,38,38,0.6)",
                  "0 0 20px rgba(220,38,38,0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="text-white w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-red-800 font-amiri"
              variants={fadeInUp}
            >
              حماية العقيدة
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            كيف حمى مجمع نيقية الإيمان المسيحي من البدع والانحرافات
          </motion.p>
        </motion.div>

        {/* Protection Methods */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-red-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            وسائل الحماية
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {protectionMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-white to-red-50 shadow-xl hover:shadow-2xl transition-all h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-red-800">{method.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{method.description}</p>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <p className="text-sm text-red-700">{method.details}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Heresies and Responses */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-red-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            البدع والردود العقيدية
          </motion.h2>

          <div className="space-y-8">
            {heresies.map((heresy, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-white to-red-50 shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <div className={`w-4 h-4 rounded-full ${heresy.color} mr-4 mt-2`}></div>
                      <div>
                        <h3 className="text-2xl font-bold text-red-800 mb-2">{heresy.name}</h3>
                        <p className="text-gray-600 mb-4">مؤسسها: {heresy.founder}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                          <h4 className="font-bold text-red-800">الخطأ العقيدي</h4>
                        </div>
                        <p className="text-red-700">{heresy.error}</p>
                      </div>
                      
                      <div className="bg-green-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-bold text-green-800">الرد الأرثوذكسي</h4>
                        </div>
                        <p className="text-green-700">{heresy.response}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                        heresy.status === 'مُدانة' ? 'bg-red-600' : 'bg-orange-600'
                      }`}>
                        {heresy.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Defenders of the Faith */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-red-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            حماة الإيمان
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defenders.map((defender, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-white to-red-50 shadow-xl hover:shadow-2xl transition-all h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Cross className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">{defender.name}</h3>
                    <p className="text-red-600 font-semibold mb-4">{defender.title}</p>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <p className="text-sm text-red-700">
                          <span className="font-bold">المساهمة:</span> {defender.contribution}
                        </p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <p className="text-sm text-orange-700">
                          <span className="font-bold">التضحية:</span> {defender.sacrifice}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section 
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-br from-red-600 to-orange-600 text-white p-12 rounded-3xl shadow-2xl"
            variants={fadeInUp}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="w-16 h-16 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6 font-amiri">الحماية الدائمة</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              مجمع نيقية لم يكتفِ بإدانة البدع، بل وضع أسساً قوية لحماية الإيمان المسيحي عبر التاريخ. 
              القديسون الذين دافعوا عن الإيمان الأرثوذكسي أصبحوا مثالاً للأجيال القادمة في الثبات على الحق 
              مهما كانت التضحيات.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
