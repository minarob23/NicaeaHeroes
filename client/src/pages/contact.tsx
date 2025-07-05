import { MapPin, Phone, Mail, Clock, Heart, Star, Send, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";
import { motion } from "framer-motion";

export default function Contact() {
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
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orthodox-blue via-orthodox-navy to-orthodox-blue relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-8 h-8 text-orthodox-gold" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
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
              <MessageSquare className="text-orthodox-blue w-12 h-12" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-orthodox-gold font-amiri"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 25px rgba(255, 215, 0, 0.6)",
                  "0 0 10px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              تواصل معنا
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-orthodox-cream mb-8"
            variants={fadeInUp}
          >
            نحن هنا لمساعدتك والإجابة على جميع استفساراتك
          </motion.p>

          <motion.div 
            className="flex items-center justify-center space-x-reverse space-x-6"
            variants={fadeInUp}
          >
            {[
              { icon: Send, text: "أرسل رسالة" },
              { icon: Phone, text: "اتصل بنا" },
              { icon: Star, text: "كن معنا" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-reverse space-x-2 bg-orthodox-gold bg-opacity-20 px-4 py-2 rounded-full"
                animate={floatingAnimation}
                transition={{
                  ...floatingAnimation.transition,
                  delay: index * 0.3
                }}
              >
                <item.icon className="w-5 h-5 text-orthodox-gold" />
                <span className="text-orthodox-cream font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Contact Information */}
          <motion.div variants={fadeInUp}>
            <motion.h2 
              className="text-3xl font-bold text-orthodox-gold mb-8 flex items-center"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Phone className="w-8 h-8 text-orthodox-gold ml-3" />
              معلومات الاتصال
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: "العنوان",
                  content: "شارع الكنيسة، المنطقة الأثرية، القاهرة",
                  color: "bg-red-500"
                },
                {
                  icon: Phone,
                  title: "الهاتف",
                  content: "+20 123 456 7890",
                  color: "bg-green-500"
                },
                {
                  icon: Mail,
                  title: "البريد الإلكتروني",
                  content: "info@nicaea-heroes.org",
                  color: "bg-blue-500"
                },
                {
                  icon: Clock,
                  title: "ساعات العمل",
                  content: "يومياً من 9:00 ص إلى 5:00 م",
                  color: "bg-purple-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-reverse space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <item.icon className="text-white w-8 h-8" />
                  </motion.div>
                  <div className="text-white">
                    <h3 className="font-bold mb-2 text-orthodox-gold text-lg">{item.title}</h3>
                    <p className="text-orthodox-cream text-lg">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-orthodox-gold border-opacity-30 shadow-2xl">
              <CardContent className="p-8">
                <motion.h2 
                  className="text-3xl font-bold text-orthodox-gold mb-8 flex items-center"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Send className="w-8 h-8 text-orthodox-gold ml-3" />
                  أرسل رسالة
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <ContactForm />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
