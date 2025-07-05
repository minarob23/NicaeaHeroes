import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Crown, Cross, Church, Star, Shield, Book, Globe, Heart, Sparkles } from "lucide-react";

export default function About() {
  // Animation variants
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

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const nicaeaTimeline = [
    {
      year: "325 م",
      title: "الدعوة للمجمع",
      description: "الإمبراطور قسطنطين الأول يدعو لعقد مجمع مسكوني في نيقية لحل الخلافات العقيدية",
      icon: Crown
    },
    {
      year: "20 مايو 325 م",
      title: "بداية المجمع",
      description: "افتتاح المجمع المسكوني الأول بحضور 300 أسقف من جميع أنحاء الإمبراطورية الرومانية",
      icon: Church
    },
    {
      year: "جوهر المجمع",
      title: "مواجهة الآريوسية",
      description: "إدانة تعاليم آريوس التي تنكر ألوهية السيد المسيح الكاملة ووضع قانون الإيمان النيقاوي",
      icon: Cross
    },
    {
      year: "النتيجة",
      title: "قانون الإيمان",
      description: "صياغة قانون الإيمان النيقاوي الذي يؤكد على ألوهية المسيح ووحدانية الثالوث الأقدس",
      icon: Star
    }
  ];

  const keyFigures = [
    {
      name: "الإمبراطور قسطنطين الأول",
      role: "راعي المجمع",
      description: "أول إمبراطور روماني مسيحي، دعا إلى المجمع لتوحيد الكنيسة المسيحية",
      contribution: "توفير الحماية والدعم السياسي للمجمع"
    },
    {
      name: "هوسيوس القرطبي",
      role: "مندوب الإمبراطور",
      description: "أسقف قرطبة ومستشار الإمبراطور قسطنطين في الشؤون الكنسية",
      contribution: "إدارة وتنسيق أعمال المجمع"
    },
    {
      name: "أثناسيوس الإسكندري",
      role: "المدافع عن الإيمان الأرثوذكسي",
      description: "شماس الإسكندرية الذي دافع بقوة ضد الآريوسية",
      contribution: "صياغة الرد اللاهوتي على البدعة الآريوسية"
    },
    {
      name: "آريوس الإسكندري",
      role: "مؤسس البدعة الآريوسية",
      description: "كاهن من الإسكندرية أنكر المساواة الكاملة بين الآب والابن",
      contribution: "السبب في عقد المجمع لإدانة تعاليمه المنحرفة"
    }
  ];

  const legacy = [
    {
      title: "قانون الإيمان النيقاوي",
      description: "النص الأساسي الذي يحدد الإيمان المسيحي الأرثوذكسي حول طبيعة المسيح الإلهية",
      icon: Book,
      impact: "لا يزال يُتلى في جميع الكنائس المسيحية حول العالم"
    },
    {
      title: "وحدة الكنيسة المسيحية",
      description: "تأسيس مبدأ المجامع المسكونية كوسيلة لحل الخلافات العقيدية",
      icon: Globe,
      impact: "نموذج للوحدة المسيحية عبر الثقافات والحدود"
    },
    {
      title: "اللاهوت الأرثوذكسي",
      description: "إرساء الأسس اللاهوتية الصحيحة لفهم طبيعة السيد المسيح",
      icon: Cross,
      impact: "حماية العقيدة المسيحية من التحريف والانحراف"
    },
    {
      title: "التراث الروحي",
      description: "إلهام أجيال من المؤمنين للدفاع عن الإيمان الصحيح",
      icon: Heart,
      impact: "استمرار الشهادة المسيحية عبر التاريخ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orthodox-cream via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Cross className="w-8 h-8 text-orthodox-gold" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="flex items-center justify-center mb-12"
            variants={fadeInUp}
          >
            <motion.div 
              className="w-32 h-32 bg-gradient-to-br from-orthodox-gold to-yellow-500 rounded-full flex items-center justify-center mr-8 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(218,165,32,0.3)",
                  "0 0 40px rgba(218,165,32,0.6)",
                  "0 0 20px rgba(218,165,32,0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Cross className="text-orthodox-blue w-16 h-16" />
            </motion.div>
            <motion.h1 
              className="text-6xl md:text-7xl font-bold text-orthodox-blue font-amiri leading-tight"
              animate={{
                textShadow: [
                  "0 0 10px rgba(30, 58, 138, 0.3)",
                  "0 0 30px rgba(30, 58, 138, 0.6)",
                  "0 0 10px rgba(30, 58, 138, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              مجمع نيقية المسكوني
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            المجمع المسكوني الأول (325 م) - حجر الأساس في تاريخ المسيحية الأرثوذكسية
          </motion.p>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6"
            variants={fadeInUp}
          >
            {[
              { icon: Crown, text: "مجمع إمبراطوري" },
              { icon: Globe, text: "نطاق مسكوني" },
              { icon: Star, text: "قانون الإيمان" },
              { icon: Shield, text: "حماية العقيدة" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-reverse space-x-3 bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
                animate={floatingAnimation}
                transition={{
                  ...floatingAnimation.transition,
                  delay: index * 0.4,
                }}
              >
                <item.icon className="w-6 h-6 text-orthodox-gold" />
                <span className="text-orthodox-blue font-semibold text-lg">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Historical Context */}
        <motion.section 
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-orthodox-blue mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            السياق التاريخي والأهمية
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-2xl border-orthodox-gold border-2">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-orthodox-blue mb-6">لماذا عُقد المجمع؟</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      في بداية القرن الرابع الميلادي، واجهت الكنيسة المسيحية تحدياً عقيدياً خطيراً 
                      تمثل في انتشار البدعة الآريوسية التي أسسها آريوس الإسكندري.
                    </p>
                    <p>
                      كانت هذه البدعة تنكر الألوهية الكاملة للسيد المسيح، مدّعية أنه مخلوق أدنى من الآب، 
                      مما هدد جوهر الإيمان المسيحي.
                    </p>
                    <p>
                      لذلك دعا الإمبراطور قسطنطين إلى عقد أول مجمع مسكوني في التاريخ المسيحي 
                      لحسم هذا الخلاف وتوحيد الكنيسة.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">أهمية المجمع</h3>
                  <div className="space-y-4 leading-relaxed">
                    <div className="flex items-start space-x-reverse space-x-3">
                      <Star className="w-6 h-6 mt-1 flex-shrink-0" />
                      <p>أول مجمع مسكوني في تاريخ المسيحية</p>
                    </div>
                    <div className="flex items-start space-x-reverse space-x-3">
                      <Cross className="w-6 h-6 mt-1 flex-shrink-0" />
                      <p>صياغة قانون الإيمان الأساسي</p>
                    </div>
                    <div className="flex items-start space-x-reverse space-x-3">
                      <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
                      <p>حماية العقيدة الأرثوذكسية</p>
                    </div>
                    <div className="flex items-start space-x-reverse space-x-3">
                      <Globe className="w-6 h-6 mt-1 flex-shrink-0" />
                      <p>توحيد الكنيسة العالمية</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-orthodox-blue mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            الخط الزمني للمجمع
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-orthodox-gold to-orthodox-blue"></div>

            <div className="space-y-12">
              {nicaeaTimeline.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8 text-right' : 'pr-8'}`}>
                    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl hover:shadow-2xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <event.icon className="w-8 h-8 text-orthodox-gold ml-3" />
                          <div>
                            <h3 className="text-xl font-bold text-orthodox-blue">{event.title}</h3>
                            <p className="text-orthodox-gold font-semibold">{event.year}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <motion.div 
                      className="w-4 h-4 bg-orthodox-gold rounded-full border-4 border-white shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Figures */}
        <motion.section 
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-orthodox-blue mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            الشخصيات الرئيسية
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {keyFigures.map((figure, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl hover:shadow-2xl transition-all h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-orthodox-blue mb-2">{figure.name}</h3>
                    <p className="text-orthodox-gold font-semibold mb-3">{figure.role}</p>
                    <p className="text-gray-700 mb-4 leading-relaxed">{figure.description}</p>
                    <Separator className="my-4" />
                    <div className="bg-orthodox-cream p-3 rounded-lg">
                      <p className="text-sm text-orthodox-blue font-medium">
                        <span className="font-bold">المساهمة:</span> {figure.contribution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Legacy and Impact */}
        <motion.section 
          className="mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-orthodox-blue mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            الإرث والتأثير الدائم
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {legacy.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-600 bg-opacity-95 backdrop-blur-sm border-violet-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-violet-600 hover:to-pink-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={{scale: [1, 1.2, 1] }}
                    transition={{duration: 2, repeat: Infinity, delay: 0.3, ease: "easeInOut"}}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    رؤيتنا
                  </h3>
                  <p className="text-violet-100 text-lg leading-relaxed text-center">
                    أن نكون منارة للخير والعطاء في مجتمعنا، نسعى لبناء جيل من الأبطال 
                    المؤمنين الذين يحملون رسالة المحبة والسلام إلى كل مكان.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-teal-700 via-cyan-600 to-blue-600 bg-opacity-95 backdrop-blur-sm border-teal-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-teal-600 hover:to-blue-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={{scale: [1, 1.2, 1] }}
                    transition={{duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut"}}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Cross className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    مهمتنا
                  </h3>
                  <p className="text-teal-100 text-lg leading-relaxed text-center">
                    نعمل على خدمة المجتمع وتقديم العون للمحتاجين، ونشر قيم المحبة والتسامح 
                    والعدالة من خلال أعمالنا وخدماتنا المتنوعة.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Message Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-700 via-lime-600 to-emerald-600 bg-opacity-95 backdrop-blur-sm border-green-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-green-600 hover:to-emerald-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={{scale: [1, 1.2, 1] }}
                    transition={{duration: 2, repeat: Infinity, delay: 0.7, ease: "easeInOut"}}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    رسالتنا
                  </h3>
                  <p className="text-green-100 text-lg leading-relaxed text-center">
                    نحمل رسالة الإيمان والرجاء والمحبة، ونسعى لتحقيق العدالة الاجتماعية 
                    وبناء مجتمع متماسك قائم على الحب والاحترام المتبادل.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goals Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-red-700 via-rose-600 to-orange-600 bg-opacity-95 backdrop-blur-sm border-red-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-red-600 hover:to-orange-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={{scale: [1, 1.2, 1] }}
                    transition={{duration: 2, repeat: Infinity, delay: 0.9, ease: "easeInOut"}}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    أهدافنا
                  </h3>
                  <p className="text-red-100 text-lg leading-relaxed text-center">
                    نهدف إلى تطوير قدرات أعضائنا وتمكينهم من خدمة المجتمع بفعالية، 
                    وإقامة شراكات قوية مع المؤسسات الأخرى لتحقيق أكبر تأثير إيجابي.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
              
              
            </motion.div>
            ))}
          </motion.div>
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
            className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue p-12 rounded-3xl shadow-2xl"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 font-amiri"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              إرث مجمع نيقية اليوم
            </motion.h2>
            <motion.p 
              className="text-xl leading-relaxed max-w-4xl mx-auto mb-8"
              variants={fadeInUp}
            >
              بعد أكثر من 1700 عام، لا يزال مجمع نيقية المسكوني الأول يقف كشاهد على قوة الإيمان الأرثوذكسي 
              وأهمية الوحدة في الدفاع عن الحق. قانون الإيمان النيقاوي الذي صاغه هذا المجمع العظيم 
              يُتلى اليوم في جميع الكنائس المسيحية حول العالم، وهو بمثابة الأساس الراسخ لإيماننا المسيحي الأرثوذكسي.
            </motion.p>
            <motion.div 
              className="flex items-center justify-center space-x-reverse space-x-4"
              variants={fadeInUp}
            >
              <Cross className="w-8 h-8" />
              <span className="text-2xl font-bold font-amiri">واحد هو الرب، واحد هو الإيمان، واحدة هي المعمودية</span>
              <Cross className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.section>
      </div>

      {/* Scroll to Top */}
      <motion.div 
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="bg-orthodox-gold text-orthodox-blue p-3 rounded-full shadow-xl hover:shadow-2xl"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </motion.button>
      </motion.div>
    </div>
  );
}