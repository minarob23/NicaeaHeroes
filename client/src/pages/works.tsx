import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import WorkCard from "@/components/work-card";
import WorkRegistrationForm from "@/components/work-registration-form";
import { User, Users, Calendar, Plus, Heart, Star, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: works = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/works", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory ? `/api/works?category=${selectedCategory}` : "/api/works";
      const response = await fetch(url);
      return response.json();
    },
  });

  const deleteWorkMutation = useMutation({
    mutationFn: async (workId: number) => {
      const response = await fetch(`/api/works/${workId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete work');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم حذف العمل بنجاح",
        description: "تم حذف العمل نهائياً",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/works"] });
    },
    onError: (error) => {
      toast({
        title: "خطأ في حذف العمل",
        description: "حدث خطأ أثناء حذف العمل",
        variant: "destructive",
      });
    }
  });

  const categories = [
    { id: "", name: "الكل" },
    { id: "أعمال خيرية", name: "أعمال خيرية" },
    { id: "أعمال تطوعية", name: "أعمال تطوعية" },
    { id: "أعمال كنسية", name: "أعمال كنسية" },
    { id: "أعمال اجتماعية", name: "أعمال اجتماعية" },
    { id: "أعمال تعليمية", name: "أعمال تعليمية" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "أعمال خيرية":
        return "bg-orthodox-gold text-orthodox-blue";
      case "أعمال تطوعية":
        return "bg-green-500 text-white";
      case "أعمال كنسية":
        return "bg-purple-500 text-white";
      case "أعمال اجتماعية":
        return "bg-blue-500 text-white";
      case "أعمال تعليمية":
        return "bg-orthodox-light-blue text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleWorkRegistered = () => {
    setShowRegistrationForm(false);
    refetch();
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orthodox-cream relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 border border-orthodox-gold rounded-full"
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
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
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
            className="mb-8"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className="w-20 h-20 bg-orthodox-gold rounded-full flex items-center justify-center mr-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="text-orthodox-blue w-10 h-10" />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-orthodox-blue font-amiri"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(30, 58, 138, 0.3)",
                    "0 0 20px rgba(30, 58, 138, 0.6)",
                    "0 0 10px rgba(30, 58, 138, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                أعمال الأبطال
              </motion.h1>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-10"
            variants={fadeInUp}
          >
            تصفح الأعمال والإنجازات المسجلة لأبطال نيقية
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
              <DialogTrigger asChild>
                <Button className="bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold py-4 px-8 rounded-xl text-lg shadow-2xl">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Plus className="w-6 h-6 ml-2" />
                  </motion.div>
                  سجل عملك الآن
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-orthodox-blue font-amiri text-2xl">
                    سجل عملك البطولي
                  </DialogTitle>
                </DialogHeader>
                <WorkRegistrationForm onSuccess={handleWorkRegistered} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Animated Filter Bar */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-orthodox-gold text-orthodox-blue font-semibold py-3 px-6 rounded-xl shadow-lg"
                    : "bg-white text-orthodox-blue hover:bg-orthodox-gold hover:text-orthodox-blue font-semibold py-3 px-6 rounded-xl shadow-lg border-2 border-orthodox-gold border-opacity-30"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                <motion.span
                  animate={selectedCategory === category.id ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {category.name}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Works Grid */}
        {isLoading ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="animate-pulse shadow-lg">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : works.length === 0 ? (
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
                  <Heart className="w-16 h-16 text-orthodox-gold mx-auto" />
                </motion.div>
                <div className="text-orthodox-blue text-2xl font-bold mb-4">لا توجد أعمال مسجلة حالياً</div>
                <p className="text-gray-600 text-lg">كن أول من يسجل عملاً في هذه الفئة واملأ الموقع بالإنجازات البطولية</p>
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold py-3 px-6 rounded-xl"
                  >
                    <Star className="w-5 h-5 ml-2" />
                    ابدأ بتسجيل عملك الأول
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {works.map((work: any, index: number) => (
              <motion.div
                key={work.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <WorkCard 
                  work={work} 
                  getCategoryColor={getCategoryColor}
                  onDelete={(workId) => deleteWorkMutation.mutate(workId)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
