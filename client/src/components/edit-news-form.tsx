import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, Save, X } from "lucide-react";

interface News {
  id: number;
  title: string;
  content: string;
  summary?: string | null;
  published: boolean;
  authorId?: number | null;
  relatedWorkId?: number | null;
  createdAt: string;
}

interface EditNewsFormProps {
  news: News;
  onClose?: () => void;
}

export default function EditNewsForm({ news, onClose }: EditNewsFormProps) {
  const [formData, setFormData] = useState({
    title: news.title,
    content: news.content,
    summary: news.summary || "",
    published: news.published
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateNewsMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/news/${news.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update news');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم تحديث الخبر بنجاح",
        description: "تم حفظ التغييرات على الخبر",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      onClose?.();
    },
    onError: (error) => {
      toast({
        title: "خطأ في تحديث الخبر",
        description: "حدث خطأ أثناء تحديث الخبر",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNewsMutation.mutate({
      title: formData.title,
      content: formData.content,
      summary: formData.summary || null,
      published: formData.published
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader className="bg-gradient-to-r from-orthodox-blue to-orthodox-gold text-white">
        <CardTitle className="text-2xl font-bold text-center">
          تعديل الخبر
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-news-title">عنوان الخبر</Label>
            <Input
              id="edit-news-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="edit-news-summary">ملخص الخبر</Label>
            <Textarea
              id="edit-news-summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="mt-1"
              rows={2}
              placeholder="ملخص مختصر للخبر (اختياري)"
            />
          </div>

          <div>
            <Label htmlFor="edit-news-content">محتوى الخبر</Label>
            <Textarea
              id="edit-news-content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              className="mt-1"
              rows={6}
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="edit-news-published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="edit-news-published">نشر الخبر</Label>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={updateNewsMutation.isPending}
              className="flex-1 bg-orthodox-blue hover:bg-orthodox-blue/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateNewsMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
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