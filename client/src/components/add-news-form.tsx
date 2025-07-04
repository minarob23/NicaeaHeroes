import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Newspaper, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddNewsFormProps {
  onSuccess?: () => void;
}

export default function AddNewsForm({ onSuccess }: AddNewsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    relatedWorkIds: [] as number[],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch available works
  const { data: works = [] } = useQuery({
    queryKey: ["/api/works"],
  });

  const addNewsMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/news`, "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "تم إضافة الخبر بنجاح",
        description: "تم حفظ الخبر الجديد",
      });
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        relatedWorkIds: [],
      });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "حدث خطأ",
        description: "فشل في إضافة الخبر",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewsMutation.mutate(formData);
  };

  const handleWorkSelection = (workId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      relatedWorkIds: checked 
        ? [...prev.relatedWorkIds, workId]
        : prev.relatedWorkIds.filter(id => id !== workId)
    }));
  };

  if (!isOpen) {
    return (
      <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all" 
            onClick={() => setIsOpen(true)}>
        <CardContent className="p-8 text-center">
          <Plus className="w-16 h-16 mx-auto mb-4 text-orthodox-gold" />
          <h3 className="text-xl font-bold mb-2">إضافة خبر جديد</h3>
          <p className="text-blue-100">انقر لإضافة خبر أو إعلان جديد</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader>
        <CardTitle className="text-orthodox-blue flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          إضافة خبر جديد
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان الخبر</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان الخبر"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">التصنيف</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="إعلان مهم">إعلان مهم</SelectItem>
                <SelectItem value="حملة">حملة</SelectItem>
                <SelectItem value="فعالية">فعالية</SelectItem>
                <SelectItem value="أخبار">أخبار</SelectItem>
                <SelectItem value="إنجاز">إنجاز</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="excerpt">الوصف المختصر</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="وصف مختصر للخبر"
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">محتوى الخبر</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="المحتوى التفصيلي للخبر"
              rows={6}
              required
            />
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">الأعمال المرتبطة (اختياري)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
              {(works as any[]).length > 0 ? (
                (works as any[]).map((work: any) => (
                  <div key={work.id} className="flex items-center space-x-reverse space-x-2">
                    <Checkbox
                      id={`work-${work.id}`}
                      checked={formData.relatedWorkIds.includes(work.id)}
                      onCheckedChange={(checked) => handleWorkSelection(work.id, checked as boolean)}
                    />
                    <Label htmlFor={`work-${work.id}`} className="text-sm cursor-pointer">
                      {work.title}
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">لا توجد أعمال متاحة للربط</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={addNewsMutation.isPending}
              className="bg-orthodox-blue hover:bg-orthodox-navy text-white"
            >
              {addNewsMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ الخبر"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-orthodox-blue text-orthodox-blue hover:bg-orthodox-blue hover:text-white"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}