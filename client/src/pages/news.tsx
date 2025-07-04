import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import NewsCard from "@/components/news-card";
import { Calendar, Clock, MapPin, Newspaper, Bell, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function News() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orthodox-cream to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
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
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-orthodox-gold" />
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
              <Newspaper className="text-orthodox-blue w-12 h-12" />
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
              الأخبار والفعاليات
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            آخر الأخبار والفعاليات في رحلة أبطال نيقية
          </motion.p>

          <motion.div 
            className="flex items-center justify-center space-x-reverse space-x-6"
            variants={fadeInUp}
          >
            {[
              { icon: Bell, text: "أحدث الأخبار", color: "text-red-500" },
              { icon: Calendar, text: "الفعاليات القادمة", color: "text-blue-500" },
              { icon: Star, text: "الأحداث المميزة", color: "text-yellow-500" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-reverse space-x-2 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-lg"
                animate={floatingAnimation}
                transition={{
                  ...floatingAnimation.transition,
                  delay: index * 0.2
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-orthodox-blue font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* News Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl font-bold text-orthodox-blue mb-8 flex items-center"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bell className="w-8 h-8 text-orthodox-gold ml-3" />
              آخر الأخبار
            </motion.h2>
            {isLoading ? (
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
              >
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <Card className="animate-pulse shadow-lg">
                      <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (news as any[]).length === 0 ? (
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
                      <Newspaper className="w-16 h-16 text-orthodox-gold mx-auto" />
                    </motion.div>
                    <div className="text-orthodox-blue text-2xl font-bold mb-4">لا توجد أخبار حالياً</div>
                    <p className="text-gray-600 text-lg">ترقبوا آخر الأخبار والتحديثات من أبطال نيقية</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
              >
                {(news as any[]).map((article: any, index: number) => (
                  <motion.div
                    key={article.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
          >
            {/* Upcoming Events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orthodox-blue mb-4">الفعاليات القادمة</h3>
                {events.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">لا توجد فعاليات قادمة</div>
                ) : (
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event: any) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-reverse space-x-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                      >
                        <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="text-orthodox-blue w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-orthodox-blue mb-1">{event.title}</h4>
                          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(event.eventDate).toLocaleDateString("ar-EG")}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            {stats && (
              <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">إحصائيات أبطال نيقية</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>إجمالي الأعمال</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalWorks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد المستفيدين</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalBeneficiaries}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد الأعضاء</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalMembers}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ساعات التطوع</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.volunteerHours}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
