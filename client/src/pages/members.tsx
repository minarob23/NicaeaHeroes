import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import MemberCard from "@/components/member-card";
import { Users, Trophy, Award, Target } from "lucide-react";

export default function Members() {
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["/api/members"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orthodox-blue font-amiri mb-4">أبطال نيقية</h1>
          <p className="text-lg text-gray-600">تعرف على الأعضاء المميزين وإنجازاتهم</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-orthodox-gold" />
                <div className="text-2xl font-bold text-orthodox-gold mb-2">
                  {stats.totalMembers}
                </div>
                <div className="text-orthodox-cream">إجمالي الأعضاء</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{stats.totalWorks}</div>
                <div>إجمالي الأعمال</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orthodox-light-blue to-blue-500 text-white">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{stats.totalBeneficiaries}</div>
                <div>إجمالي المستفيدين</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{stats.volunteerHours}</div>
                <div>ساعات التطوع</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Members Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : members.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 text-lg">لا توجد أعضاء مسجلين حالياً</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member: any) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
