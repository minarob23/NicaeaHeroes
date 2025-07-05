import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import NewsCard from "@/components/news-card";
import AddEventForm from "@/components/add-event-form";
import AddNewsForm from "@/components/add-news-form";
import EditEventForm from "@/components/edit-event-form";
import { Calendar, Clock, MapPin, Newspaper, Bell, Star, Sparkles, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export default function News() {
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: number) => {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم حذف الفعالية بنجاح",
        description: "تم حذف الفعالية نهائياً",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    },
    onError: (error) => {
      toast({
        title: "خطأ في حذف الفعالية",
        description: "حدث خطأ أثناء حذف الفعالية",
        variant: "destructive",
      });
    }
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (newsId: number) => {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete news');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم حذف الخبر بنجاح",
        description: "تم حذف الخبر نهائياً",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    },
    onError: (error) => {
      toast({
        title: "خطأ في حذف الخبر",
        description: "حدث خطأ أثناء حذف الخبر",
        variant: "destructive",
      });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-orthodox-cream to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Newspaper className="w-6 h-6 text-orthodox-gold" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
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
              className="w-20 h-20 bg-orthodox-gold rounded-full flex items-center justify-center mr-6"
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
              <Newspaper className="text-orthodox-blue w-10 h-10" />
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
            اطلع على آخر الأخبار والفعاليات القادمة
          </motion.p>

          <motion.div 
            className="flex items-center justify-center space-x-reverse space-x-4"
            variants={fadeInUp}
          >
            {[
              { icon: Bell, text: "أخبار حديثة" },
              { icon: Calendar, text: "فعاليات قادمة" },
              { icon: Star, text: "إعلانات مهمة" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-reverse space-x-2 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-lg"
                animate={floatingAnimation}
                transition={{
                  ...floatingAnimation.transition,
                  delay: index * 0.3,
                }}
              >
                <item.icon className="w-5 h-5 text-orthodox-gold" />
                <span className="text-orthodox-blue font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* الفعاليات القادمة */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-orthodox-blue mb-8 text-center"
            variants={fadeInUp}
          >
            الفعاليات القادمة
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <AddEventForm />
            </motion.div>
            
            {(events as any[]).map((event: any, index: number) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-6 h-6 text-orthodox-gold mr-3" />
                        <h3 className="text-xl font-bold text-orthodox-blue">{event.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-orthodox-blue hover:bg-orthodox-blue hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>تعديل الفعالية</DialogTitle>
                            </DialogHeader>
                            <EditEventForm 
                              event={event}
                              onClose={() => setEditingEvent(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>حذف الفعالية</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف هذه الفعالية؟ هذا الإجراء لا يمكن التراجع عنه.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteEventMutation.mutate(event.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                حذف
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-orthodox-gold mr-2" />
                        <span>{new Date(event.eventDate).toLocaleString('ar-SA')}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-orthodox-gold mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* الأخبار */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-orthodox-blue mb-8 text-center"
            variants={fadeInUp}
          >
            آخر الأخبار
          </motion.h2>

          <motion.div
            className="mb-8"
            variants={fadeInUp}
          >
            <AddNewsForm />
          </motion.div>

          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className="animate-pulse shadow-lg">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
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
              <Card className="text-center py-16 bg-gradient-to-br from-white to-orthodox-cream shadow-2xl">
                <CardContent>
                  <Newspaper className="w-16 h-16 text-orthodox-gold mx-auto mb-6" />
                  <div className="text-orthodox-blue text-2xl font-bold mb-4">لا توجد أخبار متاحة حالياً</div>
                  <p className="text-gray-600 text-lg">ترقبوا آخر الأخبار والتحديثات قريباً</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {(news as any[]).map((article: any, index: number) => (
                <motion.div
                  key={article.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <NewsCard 
                    article={article} 
                    onDelete={(articleId) => deleteNewsMutation.mutate(articleId)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
