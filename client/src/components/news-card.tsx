import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface NewsCardProps {
  article: {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author?: {
      id: number;
      fullName: string;
    };
    createdAt: string;
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: ar,
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "إعلان مهم":
        return "bg-orthodox-gold text-orthodox-blue";
      case "حملة":
        return "bg-blue-500 text-white";
      case "فعالية":
        return "bg-green-500 text-white";
      case "أخبار":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="h-64 bg-gradient-to-br from-orthodox-blue to-orthodox-navy rounded-t-lg flex items-center justify-center">
        <div className="text-orthodox-gold text-6xl font-bold font-amiri">
          {article.title.charAt(0)}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(article.category)}>
            {article.category}
          </Badge>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-orthodox-blue mb-3">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <User className="w-4 h-4 text-orthodox-gold" />
            <span className="text-sm text-gray-600">
              {article.author?.fullName || "غير معروف"}
            </span>
          </div>
          <button className="text-orthodox-blue hover:text-orthodox-gold font-semibold transition-colors">
            اقرأ المزيد
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
