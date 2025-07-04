import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, User } from "lucide-react";

interface MemberCardProps {
  member: {
    id: number;
    fullName: string;
    role: string;
    worksCount: number;
    totalBeneficiaries: number;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "moderator":
        return "bg-orange-500";
      case "leader":
        return "bg-purple-500";
      default:
        return "bg-orthodox-gold";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-orthodox-gold/20 hover:shadow-xl hover:border-orthodox-gold/40 transition-all duration-200">
      <CardContent className="p-6 text-center">
        <div
          className={`w-24 h-24 ${getRoleColor(
            member.role
          )} rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-orthodox-gold shadow-lg`}
        >
          <span className="text-white font-bold text-lg">
            {getInitials(member.fullName)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-orthodox-blue mb-2">{member.fullName}</h3>
        <p className="text-orthodox-navy/80 font-medium mb-4">{member.role}</p>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-center space-x-reverse space-x-2 bg-orthodox-blue/5 p-2 rounded-lg">
            <Trophy className="w-4 h-4 text-orthodox-gold" />
            <span className="text-orthodox-navy font-medium">{member.worksCount} عمل</span>
          </div>
          <div className="flex items-center justify-center space-x-reverse space-x-2 bg-orthodox-gold/10 p-2 rounded-lg">
            <Users className="w-4 h-4 text-orthodox-blue" />
            <span className="text-orthodox-navy font-medium">{member.totalBeneficiaries} مستفيد</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
