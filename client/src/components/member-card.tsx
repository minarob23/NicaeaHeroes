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
    <Card className="bg-gradient-to-br from-orthodox-cream to-white hover:shadow-xl transition-shadow">
      <CardContent className="p-6 text-center">
        <div
          className={`w-24 h-24 ${getRoleColor(
            member.role
          )} rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-orthodox-gold`}
        >
          <span className="text-white font-bold text-lg">
            {getInitials(member.fullName)}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-orthodox-blue mb-2">{member.fullName}</h3>
        <p className="text-gray-600 mb-4">{member.role}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center space-x-reverse space-x-2">
            <Trophy className="w-4 h-4 text-orthodox-gold" />
            <span>{member.worksCount} عمل</span>
          </div>
          <div className="flex items-center justify-center space-x-reverse space-x-2">
            <Users className="w-4 h-4 text-orthodox-gold" />
            <span>{member.totalBeneficiaries} مستفيد</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
