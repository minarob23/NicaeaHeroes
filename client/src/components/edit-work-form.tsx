import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Users } from "lucide-react";

interface Work {
  id: number;
  title: string;
  description: string;
  category: string;
  workDate: string;
  beneficiariesCount: number;
  authorId?: number | null;
  createdAt: string;
}

interface EditWorkFormProps {
  work: Work;
  onClose?: () => void;
}

export default function EditWorkForm({ work, onClose }: EditWorkFormProps) {
  const [formData, setFormData] = useState({
    title: work.title,
    description: work.description,
    category: work.category,
    workDate: new Date(work.workDate).toISOString().slice(0, 16),
    beneficiariesCount: work.beneficiariesCount
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateWorkMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/works/${work.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update work');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم تحديث العمل بنجاح",
        description: "تم حفظ التغييرات على العمل",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/works"] });
      onClose?.();
    },
    onError: (error) => {
      toast({
        title: "خطأ في تحديث العمل",
        description: "حدث خطأ أثناء تحديث العمل",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkMutation.mutate({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      workDate: new Date(formData.workDate).toISOString(),
      beneficiariesCount: formData.beneficiariesCount
    });
  };

  const categories = [
    "حملة إطعام",
    "زيارة أيتام",
    "كسوة الشتاء",
    "رعاية مسنين",
    "تعليم مجاني",
    "رعاية صحية",
    "إغاثة طوارئ",
    "تنظيف بيئي",
    "دعم أسر محتاجة",
    "أخرى"
  ];

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader className="bg-gradient-to-r from-orthodox-blue to-orthodox-gold text-white">
        <CardTitle className="text-2xl font-bold text-center">
          تعديل العمل
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-work-title">عنوان العمل</Label>
            <Input
              id="edit-work-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="edit-work-description">وصف العمل</Label>
            <Textarea
              id="edit-work-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="edit-work-category">فئة العمل</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="اختر فئة العمل" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-work-date">تاريخ العمل</Label>
            <Input
              id="edit-work-date"
              type="datetime-local"
              value={formData.workDate}
              onChange={(e) => setFormData({ ...formData, workDate: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="edit-beneficiaries" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              عدد المستفيدين
            </Label>
            <Input
              id="edit-beneficiaries"
              type="number"
              min="1"
              value={formData.beneficiariesCount}
              onChange={(e) => setFormData({ ...formData, beneficiariesCount: parseInt(e.target.value) || 0 })}
              required
              className="mt-1"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={updateWorkMutation.isPending}
              className="flex-1 bg-orthodox-blue hover:bg-orthodox-blue/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateWorkMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}