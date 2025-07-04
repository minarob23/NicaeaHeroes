
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Users, Calendar, Plus, Tag } from "lucide-react";

interface WorkRegistrationFormProps {
  onSuccess?: () => void;
}

export default function WorkRegistrationForm({ onSuccess }: WorkRegistrationFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    workDate: "",
    beneficiariesCount: 0,
    authorId: 1 // This should come from authentication context
  });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const addWorkMutation = useMutation({
    mutationFn: async (workData: any) => {
      const response = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workData),
      });
      if (!response.ok) throw new Error("Failed to add work");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم بنجاح",
        description: "تم تسجيل العمل بنجاح",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/works"] });
      setFormData({
        title: "",
        description: "",
        category: "",
        workDate: "",
        beneficiariesCount: 0,
        authorId: 1
      });
      setShowNewCategory(false);
      setNewCategory("");
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل العمل",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = showNewCategory && newCategory ? newCategory : formData.category;
    addWorkMutation.mutate({
      ...formData,
      category: finalCategory,
      workDate: new Date(formData.workDate).toISOString()
    });
  };

  const handleCategoryChange = (value: string) => {
    if (value === "new_category") {
      setShowNewCategory(true);
      setFormData({ ...formData, category: "" });
    } else {
      setShowNewCategory(false);
      setNewCategory("");
      setFormData({ ...formData, category: value });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orthodox-blue font-amiri">
          <Trophy className="w-6 h-6" />
          سجل عملك البطولي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              عنوان العمل
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="أدخل عنوان العمل"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              وصف العمل
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="اكتب وصفاً مفصلاً للعمل"
              className="mt-1"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              الفئة
            </Label>
            <Select value={showNewCategory ? "new_category" : formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="اختر فئة العمل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="أعمال خيرية">أعمال خيرية</SelectItem>
                <SelectItem value="أعمال تطوعية">أعمال تطوعية</SelectItem>
                <SelectItem value="أعمال كنسية">أعمال كنسية</SelectItem>
                <SelectItem value="أعمال اجتماعية">أعمال اجتماعية</SelectItem>
                <SelectItem value="أعمال تعليمية">أعمال تعليمية</SelectItem>
                <SelectItem value="new_category">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إنشاء فئة جديدة
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {showNewCategory && (
              <Input
                placeholder="أدخل اسم الفئة الجديدة"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mt-2"
                required
              />
            )}
          </div>

          <div>
            <Label htmlFor="workDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              تاريخ العمل
            </Label>
            <Input
              id="workDate"
              type="date"
              value={formData.workDate}
              onChange={(e) => setFormData({ ...formData, workDate: e.target.value })}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="beneficiariesCount" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              عدد المستفيدين
            </Label>
            <Input
              id="beneficiariesCount"
              type="number"
              min="0"
              value={formData.beneficiariesCount}
              onChange={(e) => setFormData({ ...formData, beneficiariesCount: parseInt(e.target.value) || 0 })}
              placeholder="عدد الأشخاص المستفيدين"
              className="mt-1"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold"
            disabled={addWorkMutation.isPending}
          >
            {addWorkMutation.isPending ? "جاري التسجيل..." : "سجل العمل"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
