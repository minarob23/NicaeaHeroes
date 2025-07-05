
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Users, Church, Star, Shield, Scroll, Globe } from "lucide-react";

export default function ImperialCouncil() {
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

  const imperialFeatures = [
    {
      icon: Crown,
      title: "الرعاية الإمبراطورية",
      description: "الإمبراطور قسطنطين الأول يرعى المجمع شخصياً ويوفر الدعم الكامل",
      details: "أول إمبراطور روماني مسيحي يدعو لمجمع مسكوني لتوحيد الكنيسة"
    },
    {
      icon: Users,
      title: "حضور عالمي",
      description: "300 أسقف من جميع أنحاء الإمبراطورية الرومانية",
      details: "أساقفة من أوروبا وآسيا وأفريقيا اجتمعوا في نيقية"
    },
    {
      icon: Church,
      title: "مكانة كنسية عليا",
      description: "أول مجمع مسكوني في تاريخ المسيحية",
      details: "مرجعية عقيدية وكنسية لجميع الكنائس المسيحية"
    },
    {
      icon: Shield,
      title: "حماية الدولة",
      description: "الحماية الإمبراطورية الكاملة للمجمع والمشاركين",
      details: "ضمان الأمان والحرية في المناقشات العقيدية"
    }
  ];

  const timeline = [
    {
      year: "313 م",
      event: "مرسوم ميلان",
      description: "قسطنطين يصدر مرسوم الحرية الدينية"
    },
    {
      year: "324 م",
      event: "توحيد الإمبراطورية",
      description: "قسطنطين يصبح الإمبراطور الوحيد"
    },
    {
      year: "325 م",
      event: "دعوة المجمع",
      description: "الدعوة الرسمية لمجمع نيقية"
    },
    {
      year: "مايو 325 م",
      event: "افتتاح المجمع",
      description: "بداية أعمال المجمع المسكوني الأول"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
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
              className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-6 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147,51,234,0.3)",
                  "0 0 40px rgba(147,51,234,0.6)",
                  "0 0 20px rgba(147,51,234,0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="text-white w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-purple-800 font-amiri"
              variants={fadeInUp}
            >
              المجمع الإمبراطوري
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            أول مجمع مسكوني برعاية إمبراطورية مسيحية في التاريخ
          </motion.p>
        </motion.div>

        {/* Imperial Features */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-purple-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            خصائص المجمع الإمبراطوري
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {imperialFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-white to-purple-50 shadow-xl hover:shadow-2xl transition-all h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-purple-800">{feature.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{feature.description}</p>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm text-purple-700">{feature.details}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-purple-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            الطريق إلى المجمع الإمبراطوري
          </motion.h2>

          <div className="relative">
            <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-indigo-600"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  variants={fadeInUp}
                >
                  <div className="w-1/2 pr-8 text-right">
                    <Card className="bg-gradient-to-br from-white to-purple-50 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-purple-800 mb-2">{item.event}</h3>
                        <p className="text-purple-600 font-semibold mb-2">{item.year}</p>
                        <p className="text-gray-700">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
            className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-12 rounded-3xl shadow-2xl"
            variants={fadeInUp}
          >
            <Crown className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 font-amiri">التراث الإمبراطوري</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              مجمع نيقية الإمبراطوري وضع الأساس لعلاقة جديدة بين الكنيسة والدولة، 
              حيث أصبحت الإمبراطورية الرومانية حامية للإيمان المسيحي الأرثوذكسي. 
              هذا التراث الإمبراطوري استمر عبر التاريخ البيزنطي والأرثوذكسي.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
