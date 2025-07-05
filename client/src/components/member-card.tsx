import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, User, Edit, Trash2 } from "lucide-react";
import EditMemberForm from "./edit-member-form";

interface MemberCardProps {
  member: {
    id: number;
    fullName: string;
    role: string;
    worksCount: number;
    totalBeneficiaries: number;
    createdAt: string;
  };
  onEdit?: (member: any) => void;
  onDelete?: (memberId: number) => void;
}

export default function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
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
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-orthodox-gold/20">
          <EditMemberForm member={member} />
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(member.id)}
              className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              حذف
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
