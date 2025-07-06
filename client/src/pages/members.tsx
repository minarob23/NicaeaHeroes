import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MemberCard from "@/components/member-card";
import AddMemberForm from "@/components/add-member-form";
import { useToast } from "@/hooks/use-toast";
import { Users, Trophy, Award, Target, Shield, Star, Crown, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface Member {
  id: number;
  fullName: string;
  role: string;
  worksCount: number;
  totalBeneficiaries: number;
  createdAt: string;
}

interface Stats {
  totalMembers: number;
  totalWorks: number;
  totalBeneficiaries: number;
}

export default function Members() {
  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMemberMutation = useMutation({
    mutationFn: async (memberId: number) => {
      const response = await fetch(`/api/members/${memberId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("فشل في حذف العضو");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "تم الحذف",
        description: "تم حذف العضو بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في حذف العضو",
        variant: "destructive",
      });
    },
  });

  const handleDeleteMember = (memberId: number) => {
    if (confirm("هل أنت متأكد من حذف هذا العضو؟")) {
      deleteMemberMutation.mutate(memberId);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orthodox-blue mx-auto"></div>
          <p className="mt-4 text-lg text-orthodox-navy">جارٍ تحميل الأعضاء...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orthodox-cream via-white to-orthodox-blue/5">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orthodox-blue to-orthodox-navy rounded-full shadow-2xl">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orthodox-blue to-orthodox-navy bg-clip-text text-transparent">
              أعضاء الفريق
            </h1>
          </div>
          <p className="text-xl text-orthodox-navy/80 max-w-2xl mx-auto leading-relaxed">
            تعرف على أعضاء فريق أبطال نيقية وإنجازاتهم في خدمة المجتمع
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Total Members */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <Card className="bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-10"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-12 h-12 text-teal-100" />
                  <Shield className="w-8 h-8 text-teal-100 opacity-60" />
                </div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {stats?.totalMembers || 0}
                </motion.div>
                <div className="text-teal-100 font-semibold">إجمالي الأعضاء</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Works */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-20"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-12 h-12 text-orthodox-blue" />
                  <Star className="w-8 h-8 text-orthodox-blue opacity-60" />
                </div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {stats?.totalWorks || 0}
                </motion.div>
                <div className="text-orthodox-blue font-semibold">إجمالي الأعمال</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Beneficiaries */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-20"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-12 h-12 text-orthodox-blue" />
                  <Crown className="w-8 h-8 text-orthodox-blue opacity-60" />
                </div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {members.reduce((total, member) => total + (member.totalBeneficiaries || 0), 0)}
                </motion.div>
                <div className="text-orthodox-blue font-semibold">إجمالي المستفيدين</div>
              </CardContent>
            </Card>
          </motion.div>


        </motion.div>

        {/* Add Member Form */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AddMemberForm />
        </motion.div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 bg-gradient-to-br from-orthodox-cream to-white rounded-2xl shadow-xl max-w-md mx-auto">
              <Users className="w-20 h-20 text-orthodox-blue/50 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-orthodox-blue mb-4">لا يوجد أعضاء</h3>
              <p className="text-orthodox-navy/70">ابدأ بإضافة أعضاء جدد إلى الفريق</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {members.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <MemberCard 
                  member={member} 
                  onDelete={handleDeleteMember}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}