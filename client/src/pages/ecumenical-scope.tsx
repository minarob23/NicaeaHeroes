
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin, Users, Church, Star, Compass } from "lucide-react";

export default function EcumenicalScope() {
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

  const regions = [
    {
      name: "أوروبا",
      delegates: 120,
      countries: ["إيطاليا", "اليونان", "البلقان", "الغال"],
      color: "bg-blue-500",
      description: "القلب الأوروبي للمسيحية"
    },
    {
      name: "آسيا الصغرى",
      delegates: 100,
      countries: ["بيثينيا", "كبادوكيا", "غلاطية", "أفسس"],
      color: "bg-green-500",
      description: "مهد الكنائس الأولى"
    },
    {
      name: "بلاد الشام",
      delegates: 50,
      countries: ["أنطاكية", "أورشليم", "دمشق", "حلب"],
      color: "bg-yellow-500",
      description: "أرض المسيح والرسل"
    },
    {
      name: "مصر وأفريقيا",
      delegates: 30,
      countries: ["الإسكندرية", "القاهرة", "قرطاج", "النوبة"],
      color: "bg-red-500",
      description: "مركز اللاهوت المسيحي"
    }
  ];

  const mapRegions = [
    { name: "إيطاليا", x: 45, y: 25, color: "blue" },
    { name: "اليونان", x: 55, y: 35, color: "blue" },
    { name: "آسيا الصغرى", x: 65, y: 30, color: "green" },
    { name: "بلاد الشام", x: 70, y: 40, color: "yellow" },
    { name: "مصر", x: 65, y: 55, color: "red" },
    { name: "أفريقيا", x: 50, y: 65, color: "red" },
    { name: "الغال", x: 35, y: 20, color: "blue" },
    { name: "إسبانيا", x: 25, y: 30, color: "blue" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-100">
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
              className="w-24 h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mr-6 shadow-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Globe className="text-white w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-green-800 font-amiri"
              variants={fadeInUp}
            >
              النطاق المسكوني
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            خريطة الإمبراطورية الرومانية ونطاق مجمع نيقية المسكوني
          </motion.p>
        </motion.div>

        {/* Interactive Map */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-green-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            خريطة النطاق المسكوني
          </motion.h2>

          <motion.div 
            className="relative bg-gradient-to-br from-blue-200 to-green-200 rounded-3xl p-8 shadow-2xl"
            variants={fadeInUp}
          >
            {/* Mediterranean Sea */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-blue-400 rounded-full opacity-60"></div>
            
            {/* Map Container */}
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl overflow-hidden">
              {/* Mediterranean Sea Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-700 font-bold text-lg">
                البحر الأبيض المتوسط
              </div>

              {/* Map Regions */}
              {mapRegions.map((region, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    region.color === 'blue' ? 'bg-blue-500' :
                    region.color === 'green' ? 'bg-green-500' :
                    region.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } shadow-lg`}></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800 whitespace-nowrap">
                    {region.name}
                  </div>
                </motion.div>
              ))}

              {/* Nicaea Location */}
              <motion.div
                className="absolute"
                style={{ left: '60%', top: '32%', transform: 'translate(-50%, -50%)' }}
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 10px rgba(220,38,38,0.5)",
                    "0 0 30px rgba(220,38,38,0.8)",
                    "0 0 10px rgba(220,38,38,0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <div className="w-6 h-6 bg-red-600 rounded-full shadow-2xl flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-800 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                  نيقية
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Regions Statistics */}
        <motion.section 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-green-800 mb-12 text-center font-amiri"
            variants={fadeInUp}
          >
            التمثيل الإقليمي
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-white to-green-50 shadow-xl hover:shadow-2xl transition-all h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-4 h-4 rounded-full ${region.color} mr-4`}></div>
                      <h3 className="text-2xl font-bold text-green-800">{region.name}</h3>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-lg font-semibold">{region.delegates} مندوب</span>
                      </div>
                      <p className="text-gray-700 mb-4">{region.description}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-2">البلدان الممثلة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {region.countries.map((country, i) => (
                          <span key={i} className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Global Impact */}
        <motion.section 
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-12 rounded-3xl shadow-2xl"
            variants={fadeInUp}
          >
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Globe className="w-16 h-16 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6 font-amiri">النطاق العالمي</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              مجمع نيقية جمع ممثلين من أربع قارات، مما جعله أول مجمع مسكوني حقيقي في التاريخ المسيحي. 
              هذا النطاق الواسع ضمن أن قرارات المجمع تمثل الكنيسة الجامعة بكل تنوعها الثقافي والجغرافي.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
