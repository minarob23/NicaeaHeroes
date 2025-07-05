import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Calendar, Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import EditNewsForm from "./edit-news-form";

interface NewsCardProps {
  article: any;
  onEdit?: (article: any) => void;
  onDelete?: (articleId: number) => void;
}

export default function NewsCard({ article, onEdit, onDelete }: NewsCardProps) {
  if (!article) {
    return null;
  }

  const createdAt = article.createdAt ? new Date(article.createdAt) : new Date();
  const title = article.title || 'بدون عنوان';
  const excerpt = article.excerpt || 'لا يوجد وصف متاح';
  const category = article.category || 'عام';
  const authorName = article.author?.fullName || 'غير محدد';

  const timeAgo = formatDistanceToNow(createdAt, {
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
      <div className="h-64 bg-gradient-to-br from-orthodox-blue to-orthodox-navy rounded-t-lg flex items-center justify-center relative">
        <div className="text-orthodox-gold text-6xl font-bold font-amiri">
          {title.charAt(0)}
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-orthodox-blue hover:bg-orthodox-blue hover:text-white bg-white/90"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>تعديل الخبر</DialogTitle>
              </DialogHeader>
              <EditNewsForm 
                news={article}
                onClose={() => {}}
              />
            </DialogContent>
          </Dialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-600 hover:text-white bg-white/90"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>حذف الخبر</AlertDialogTitle>
                <AlertDialogDescription>
                  هل أنت متأكد من حذف هذا الخبر؟ هذا الإجراء لا يمكن التراجع عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(article.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
        </div>

        <h3 className="text-2xl font-bold text-orthodox-blue mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <User className="w-4 h-4 text-orthodox-gold" />
            <span className="text-sm text-gray-600">
              {authorName}
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