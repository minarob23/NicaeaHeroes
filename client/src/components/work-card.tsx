import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Users, Calendar, Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import EditWorkForm from "./edit-work-form";

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
  onEdit?: (work: any) => void;
  onDelete?: (workId: number) => void;
}

export default function WorkCard({ work, getCategoryColor, onEdit, onDelete }: WorkCardProps) {
  const timeAgo = formatDistanceToNow(new Date(work.createdAt), {
    addSuffix: true,
    locale: ar,
  });

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-orthodox-cream to-orthodox-gold rounded-t-lg flex items-center justify-center relative">
        <div className="text-orthodox-blue text-6xl font-bold">
          {work.title.charAt(0)}
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
                <DialogTitle>تعديل العمل</DialogTitle>
              </DialogHeader>
              <EditWorkForm 
                work={work}
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
                <AlertDialogTitle>حذف العمل</AlertDialogTitle>
                <AlertDialogDescription>
                  هل أنت متأكد من حذف هذا العمل؟ هذا الإجراء لا يمكن التراجع عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(work.id)}
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
