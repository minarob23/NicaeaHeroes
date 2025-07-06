import { Link } from "wouter";
import { Trophy, Cross, Scroll, Flame, Shield, Star, Sparkles, Heart, ArrowDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const statsData = stats as { totalWorks: number; totalBeneficiaries: number; totalMembers: number } | undefined;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const float = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const sparkle = {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orthodox-blue via-orthodox-navy to-orthodox-blue min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orthodox-gold rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="mb-8"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Animated Logo */}
              <motion.div 
                className="relative w-32 h-32 mx-auto mb-6"
                variants={fadeInUp}
                animate={pulse}
              >
                <div className="w-full h-full bg-orthodox-gold rounded-full flex items-center justify-center shadow-2xl">
                  <Trophy className="text-orthodox-blue w-16 h-16" />
                </div>

                {/* Sparkles around logo */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                      left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                      top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                    }}
                    animate={sparkle}
                    transition={{
                      ...sparkle.transition,
                      delay: i * 0.2
                    }}
                  >
                    <Star className="w-full h-full text-orthodox-gold" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Title */}
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-orthodox-gold font-amiri mb-4"
                variants={fadeInUp}
              >
                <motion.span 
                  className="inline-block"
                  animate={float}
                  transition={{ ...float.transition, delay: 0.5 }}
                >
                  🏆
                </motion.span>
                {" "}
                شعار أبطال نيقية الجديد
                {" "}
                <motion.span 
                  className="inline-block"
                  animate={float}
                  transition={{ ...float.transition, delay: 1 }}
                >
                  🏆
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-2xl text-orthodox-cream mb-8"
                variants={fadeInUp}
              >
                <motion.span 
                  className="inline-block"
                  animate={float}
                  transition={{ ...float.transition, delay: 1.5 }}
                >
                  يتقال بصوت واحد وقلوب مولعة 🔥
                </motion.span>
              </motion.p>
            </motion.div>

            {/* Redesigned Motto Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mb-8"
            >
              {/* Main Hero Text */}
              <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 rounded-3xl p-8 mb-6 shadow-2xl border border-orthodox-gold border-opacity-30">
                <motion.div 
                  className="text-center space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                    variants={fadeInUp}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    إحنا أبطال نيقية... واقفين ومافيش زَيّنا!
                  </motion.h2>
                  
                  <motion.p 
                    className="text-xl text-emerald-300 font-semibold"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                  >
                    ماسكين فإيمانّا... وعايشين على عهد آبائنا
                  </motion.p>
                  
                  <motion.p 
                    className="text-xl text-cyan-300 font-semibold"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                  >
                    مهما تهبّ ريح، إحنا صخرة ما بتهزش
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-pink-300"
                    variants={fadeInUp}
                  >
                    ونقولها بجرأة وصوت عالي:
                  </motion.p>
                  
                  <motion.div 
                    className="bg-black bg-opacity-30 rounded-2xl p-6 border-2 border-orthodox-gold"
                    variants={fadeInUp}
                    animate={pulse}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-orthodox-gold">
                      "نؤمن... نثبت... ونكمل للآخر!"
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Three Cards Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-6 text-center shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(220, 38, 127, 0.3)",
                      "0 20px 40px rgba(220, 38, 127, 0.5)",
                      "0 10px 30px rgba(220, 38, 127, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className="text-4xl mb-3">💥</div>
                  <p className="text-white font-bold text-lg">
                    ما بنقلدش... ما بنتهاونش
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-center shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(245, 158, 11, 0.3)",
                      "0 20px 40px rgba(245, 158, 11, 0.5)",
                      "0 10px 30px rgba(245, 158, 11, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity, delay: 0.5 }
                  }}
                >
                  <div className="text-4xl mb-3">🕯</div>
                  <p className="text-white font-bold text-lg">
                    وسط الظلمة، إحنا النور
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-center shadow-xl"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(16, 185, 129, 0.3)",
                      "0 20px 40px rgba(16, 185, 129, 0.5)",
                      "0 10px 30px rgba(16, 185, 129, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity, delay: 1 }
                  }}
                >
                  <div className="text-4xl mb-3">🚫</div>
                  <p className="text-white font-bold text-lg">
                    لا عقيدتنا للبيع... ولا قلبنا هيتغير!
                  </p>
                </motion.div>
              </div>

              {/* Final Call to Action */}
              <motion.div 
                className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 rounded-3xl p-8 text-center shadow-2xl border-2 border-orthodox-gold"
                variants={fadeInUp}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  animate={float}
                  className="space-y-4"
                >
                  <div className="text-5xl mb-4">🎶</div>
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    إحنا أبطال... إحنا نور...
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-orthodox-gold">
                    كملوا بينا المشوار!
                  </p>
                  
                  {/* Decorative Stars */}
                  <div className="flex justify-center space-x-4 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Star className="w-6 h-6 text-orthodox-gold" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Action Buttons */}
            <motion.div 
              className="space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 md:flex md:justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold py-6 px-10 rounded-xl w-full md:w-auto text-lg shadow-2xl"
                >
                  <Link href="/works">
                    <Heart className="w-5 h-5 ml-2" />
                    سجل عملك الآن
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-orthodox-gold text-orthodox-gold hover:bg-orthodox-gold hover:text-orthodox-blue font-bold py-6 px-10 rounded-xl w-full md:w-auto text-lg shadow-2xl backdrop-blur-sm"
                >
                  <Link href="/works">
                    <Sparkles className="w-5 h-5 ml-2" />
                    تصفح الأعمال
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown className="w-8 h-8 text-orthodox-gold mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {statsData && (
        <motion.section 
          className="py-20 bg-gradient-to-br from-gray-50 to-orthodox-cream relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-24 border border-orthodox-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl font-bold text-orthodox-blue font-amiri mb-6"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 20px rgba(218,165,32,0.3)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                إحصائيات أبطال نيقية
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                أرقام تعكس إنجازاتنا المجتمعية
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Works Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-2xl border-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-400 opacity-20"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div 
                      className="mb-4"
                      animate={pulse}
                    >
                      <Trophy className="w-12 h-12 text-pink-300 mx-auto" />
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold text-pink-200 mb-3"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {statsData?.totalWorks || 0}
                    </motion.div>
                    <div className="text-pink-100 font-semibold">إجمالي الأعمال</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Total Beneficiaries Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue shadow-2xl border-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-20"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div 
                      className="mb-4"
                      animate={pulse}
                    >
                      <Heart className="w-12 h-12 text-orthodox-blue mx-auto" />
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold mb-3"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {statsData?.totalBeneficiaries || 0}
                    </motion.div>
                    <div className="font-semibold">عدد المستفيدين</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Total Members Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-2xl border-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-300 opacity-20"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div 
                      className="mb-4"
                      animate={pulse}
                    >
                      <Shield className="w-12 h-12 text-yellow-200 mx-auto" />
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold mb-3"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {statsData?.totalMembers || 0}
                    </motion.div>
                    <div className="font-semibold">عدد الأعضاء</div>
                  </CardContent>
                </Card>
              </motion.div>


            </div>

            {/* Call to Action */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-2xl text-orthodox-blue font-semibold mb-8"
                animate={float}
              >
                انضم إلى مسيرة الخير والعطاء
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl"
                >
                  <Link href="/works">
                    <Star className="w-5 h-5 ml-2" />
                    ابدأ رحلتك البطولية
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Vision Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-orthodox-blue to-orthodox-navy relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Animated Cross Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + (i % 3),
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Cross className="w-8 h-8 text-orthodox-gold" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-orthodox-gold font-amiri mb-6"
              animate={{
                textShadow: [
                  "0 0 10px rgba(218, 165, 32, 0.5)",
                  "0 0 30px rgba(218, 165, 32, 0.8)",
                  "0 0 10px rgba(218, 165, 32, 0.5)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              رؤيتنا ورسالتنا
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 bg-opacity-95 backdrop-blur-sm border-purple-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={pulse}
                    transition={{ ...pulse.transition, delay: 0.3 }}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    رؤيتنا
                  </h3>
                  <p className="text-purple-100 text-lg leading-relaxed text-center">
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
              <Card className="bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 bg-opacity-95 backdrop-blur-sm border-emerald-300 border-opacity-40 shadow-2xl hover:shadow-3xl hover:from-emerald-500 hover:to-cyan-500 transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div 
                    className="text-center mb-6"
                    animate={pulse}
                    transition={{ ...pulse.transition, delay: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-2 border-white border-opacity-30">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white font-amiri mb-4 text-center">
                    رسالتنا
                  </h3>
                  <p className="text-emerald-100 text-lg leading-relaxed text-center">
                    نعمل على تنظيم وتوثيق الأعمال الخيرية والتطوعية، ونوفر منصة تتيح 
                    للأعضاء مشاركة إنجازاتهم وتحفيز الآخرين للمشاركة في العطاء.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-orthodox-gold font-amiri mb-12 text-center">
              قيمنا الأساسية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Cross, 
                  title: "الإيمان", 
                  description: "نؤمن بالله ونعمل بإرشاده" 
                },
                { 
                  icon: Heart, 
                  title: "المحبة", 
                  description: "نحب الجميع ونخدم بلا تمييز" 
                },
                { 
                  icon: Shield, 
                  title: "الأمانة", 
                  description: "نتعامل بصدق وشفافية" 
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-orthodox-gold border-opacity-20 text-center hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div 
                        className="mb-4"
                        animate={float}
                        transition={{ ...float.transition, delay: index * 0.5 }}
                      >
                        <value.icon className="w-12 h-12 text-orthodox-gold mx-auto" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-orthodox-gold mb-3">
                        {value.title}
                      </h4>
                      <p className="text-orthodox-cream">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}