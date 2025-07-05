
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cross, Book, Star, Heart, Shield } from "lucide-react";

export default function Creed() {
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

  const creedSections = [
    {
      title: "الإيمان بالله الآب",
      text: "نؤمن بإله واحد، الآب ضابط الكل، خالق السماء والأرض، كل ما يُرى وما لا يُرى",
      icon: Shield,
      explanation: "الإيمان بالله الآب كخالق ومدبر الكون"
    },
    {
      title: "الإيمان بالرب يسوع المسيح",
      text: "وبرب واحد يسوع المسيح، ابن الله الوحيد، المولود من الآب قبل كل الدهور، نور من نور، إله حق من إله حق، مولود غير مخلوق، مساوٍ للآب في الجوهر",
      icon: Cross,
      explanation: "تأكيد ألوهية المسيح الكاملة ومساواته للآب"
    },
    {
      title: "التجسد والخلاص",
      text: "الذي من أجلنا نحن البشر ومن أجل خلاصنا نزل من السماء وتجسد من الروح القدس ومن مريم العذراء وتأنس",
      icon: Heart,
      explanation: "سر التجسد الإلهي لخلاص الإنسان"
    },
    {
      title: "الصلب والقيامة",
      text: "وصُلب عنا على عهد بيلاطس البنطي وتألم وقُبر، وقام في اليوم الثالث كما في الكتب",
      icon: Star,
      explanation: "عمل المسيح الخلاصي بالصلب والقيامة"
    },
    {
      title: "الروح القدس",
      text: "وبالروح القدس الرب المحيي المنبثق من الآب، الذي هو مع الآب والابن مسجود له وممجد",
      icon: Book,
      explanation: "الإيمان بالروح القدس كأقنوم ثالث في الثالوث"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
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
              className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mr-6 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(217,119,6,0.3)",
                  "0 0 40px rgba(217,119,6,0.6)",
                  "0 0 20px rgba(217,119,6,0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Book className="text-white w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-amber-800 font-amiri"
              variants={fadeInUp}
            >
              قانون الإيمان
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            قانون الإيمان النيقاوي - أساس الإيمان المسيحي الأرثوذكسي
          </motion.p>
        </motion.div>

        {/* Full Creed */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-12 shadow-2xl"
            variants={fadeInUp}
          >
            <div className="text-center mb-8">
              <Cross className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-amber-800 font-amiri">قانون الإيمان النيقاوي الكامل</h2>
            </div>
            
            <div className="bg-amber-100 p-8 rounded-2xl text-center">
              <div className="text-lg leading-relaxed text-amber-900 space-y-4">
                <p className="font-bold text-xl">نؤمن بإله واحد</p>
                <p>الآب ضابط الكل، خالق السماء والأرض، كل ما يُرى وما لا يُرى</p>
                
                <Separator className="my-4" />
                
                <p className="font-bold text-xl">وبرب واحد يسوع المسيح</p>
                <p>ابن الله الوحيد، المولود من الآب قبل كل الدهور</p>
                <p>نور من نور، إله حق من إله حق</p>
                <p>مولود غير مخلوق، مساوٍ للآب في الجوهر</p>
                <p>الذي به كان كل شيء</p>
                
                <Separator className="my-4" />
                
                <p>الذي من أجلنا نحن البشر ومن أجل خلاصنا</p>
                <p>نزل من السماء وتجسد من الروح القدس ومن مريم العذراء وتأنس</p>
                <p>وصُلب عنا على عهد بيلاطس البنطي وتألم وقُبر</p>
                <p>وقام في اليوم الثالث كما في الكتب</p>
                <p>وصعد إلى السماء وجلس عن يمين الآب</p>
                <p>وسيأتي أيضاً بمجد ليدين الأحياء والأموات الذي لا فناء لملكه</p>
                
                <Separator className="my-4" />
                
                <p className="font-bold text-xl">وبالروح القدس</p>
                <p>الرب المحيي المنبثق من الآب</p>
                <p>الذي هو مع الآب والابن مسجود له وممجد</p>
                <p>الناطق بالأنبياء</p>
                
                <Separator className="my-4" />
                
                <p>وبكنيسة واحدة مقدسة جامعة رسولية</p>
                <p>ونعترف بمعمودية واحدة لمغفرة الخطايا</p>
                <p>وننتظر قيامة الأموات وحياة الدهر الآتي</p>
                <p className="font-bold text-xl">آمين</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Creed Sections Explained */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-amber-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            شرح أقسام قانون الإيمان
          </motion.h2>

          <div className="space-y-8">
            {creedSections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-white to-amber-50 shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-amber-800 mb-2">{section.title}</h3>
                        <p className="text-gray-700 text-sm">{section.explanation}</p>
                      </div>
                    </div>
                    <div className="bg-amber-100 p-4 rounded-lg">
                      <p className="text-amber-900 leading-relaxed font-medium">
                        "{section.text}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Historical Context */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-amber-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            السياق التاريخي
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-white to-amber-50 shadow-xl h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">الحاجة إلى قانون الإيمان</h3>
                  <p className="text-gray-700 leading-relaxed">
                    انتشار البدعة الآريوسية التي أنكرت ألوهية المسيح دفع الكنيسة لوضع قانون إيمان واضح 
                    يحدد العقائد الأساسية للإيمان المسيحي الأرثوذكسي.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-white to-amber-50 shadow-xl h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">التأثير الدائم</h3>
                  <p className="text-gray-700 leading-relaxed">
                    قانون الإيمان النيقاوي أصبح الأساس العقيدي لجميع الكنائس المسيحية، ولا يزال 
                    يُتلى في القداسات والصلوات حول العالم بعد أكثر من 1700 عام.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
            className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-12 rounded-3xl shadow-2xl"
            variants={fadeInUp}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Book className="w-16 h-16 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6 font-amiri">الإيمان الحي</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              قانون الإيمان النيقاوي ليس مجرد نص تاريخي، بل هو إعلان حي للإيمان المسيحي الأرثوذكسي 
              الذي يربط كل جيل بالكنيسة الأولى وبالمسيح نفسه. إنه خلاصة الإيمان المسيحي في كلمات دقيقة ومقدسة.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
