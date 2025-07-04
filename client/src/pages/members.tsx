import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MemberCard from "@/components/member-card";
import AddMemberForm from "@/components/add-member-form";
import { Users, Trophy, Award, Target, Shield, Star, Crown, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Members() {
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["/api/members"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orthodox-cream to-gray-50 relative overflow-hidden">
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
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Crown className="w-8 h-8 text-orthodox-gold" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Animated Header */}
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
              className="w-24 h-24 bg-orthodox-gold rounded-full flex items-center justify-center mr-6"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="text-orthodox-blue w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-orthodox-blue font-amiri"
              animate={{
                textShadow: [
                  "0 0 10px rgba(30, 58, 138, 0.3)",
                  "0 0 25px rgba(30, 58, 138, 0.6)",
                  "0 0 10px rgba(30, 58, 138, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              أبطال نيقية
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            تعرف على الأعضاء المميزين وإنجازاتهم في خدمة المجتمع
          </motion.p>

          <motion.div 
            className="flex items-center justify-center space-x-reverse space-x-4"
            variants={fadeInUp}
          >
            {[
              { icon: Star, text: "أبطال المجتمع" },
              { icon: Heart, text: "خدام الخير" },
              { icon: Crown, text: "قادة التغيير" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-reverse space-x-2 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                <item.icon className="w-5 h-5 text-orthodox-gold" />
                <span className="text-orthodox-blue font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Stats Cards */}
        {stats && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white shadow-2xl border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orthodox-gold opacity-10"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <Users className="w-16 h-16 mx-auto text-orthodox-gold" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-orthodox-gold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {stats.totalMembers || 0}
                  </motion.div>
                  <div className="text-orthodox-cream font-semibold">إجمالي الأعضاء</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue shadow-2xl border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-20"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <Trophy className="w-16 h-16 mx-auto" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {stats.totalWorks || 0}
                  </motion.div>
                  <div className="font-semibold">إجمالي الأعمال</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="bg-gradient-to-br from-orthodox-light-blue to-blue-500 text-white shadow-2xl border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orthodox-gold opacity-20"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <Target className="w-16 h-16 mx-auto" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    {stats.totalBeneficiaries || 0}
                  </motion.div>
                  <div className="font-semibold">إجمالي المستفيدين</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-300 opacity-20"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <Award className="w-16 h-16 mx-auto text-yellow-300" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    {stats.volunteerHours || 0}
                  </motion.div>
                  <div className="font-semibold">ساعات التطوع</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Animated Members Grid */}
        {isLoading ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="animate-pulse shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (members as any[]).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="text-center py-16 bg-gradient-to-br from-white to-orthodox-cream shadow-2xl border-2 border-orthodox-gold border-opacity-20">
              <CardContent>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-6"
                >
                  <Users className="w-16 h-16 text-orthodox-gold mx-auto" />
                </motion.div>
                <div className="text-orthodox-blue text-2xl font-bold mb-4">لا توجد أعضاء مسجلين حالياً</div>
                <p className="text-gray-600 text-lg">انضم إلى عائلة أبطال نيقية وكن جزءاً من رحلة الخير والعطاء</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <AddMemberForm />
            </motion.div>
            {(members as any[]).map((member: any, index: number) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
