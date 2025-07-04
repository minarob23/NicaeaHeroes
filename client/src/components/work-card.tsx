import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface WorkCardProps {
  work: {
    id: number;
    title: string;
    description: string;
    category: string;
    workDate: string;
    beneficiariesCount: number;
    author?: {
      id: number;
      fullName: string;
    };
    createdAt: string;
  };
  getCategoryColor: (category: string) => string;
}

export default function WorkCard({ work, getCategoryColor }: WorkCardProps) {
  const timeAgo = formatDistanceToNow(new Date(work.createdAt), {
    addSuffix: true,
    locale: ar,
  });

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-orthodox-cream to-orthodox-gold rounded-t-lg flex items-center justify-center">
        <div className="text-orthodox-blue text-6xl font-bold">
          {work.title.charAt(0)}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(work.category)}>
            {work.category}
          </Badge>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
        </div>
        
        <h3 className="text-xl font-bold text-orthodox-blue mb-2">{work.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{work.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-2">
              <User className="w-4 h-4 text-orthodox-gold" />
              <span className="text-sm text-gray-600">
                {work.author?.fullName || "غير معروف"}
              </span>
            </div>
            <div className="flex items-center space-x-reverse space-x-2">
              <Users className="w-4 h-4 text-orthodox-gold" />
              <span className="text-sm text-gray-600">
                {work.beneficiariesCount} مستفيد
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-reverse space-x-2">
            <Calendar className="w-4 h-4 text-orthodox-gold" />
            <span className="text-sm text-gray-600">
              {new Date(work.workDate).toLocaleDateString("ar-EG")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
