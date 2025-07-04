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

const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    workDate: "",
    beneficiariesCount: 0,
    authorId: 1 // This should come from authentication context
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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
                <SelectItem value="تعليم">تعليم وثقافة</SelectItem>
                <SelectItem value="صحة">الصحة والعافية</SelectItem>
                <SelectItem value="إغاثة">الإغاثة والمساعدات</SelectItem>
                <SelectItem value="بيئة">البيئة والنظافة</SelectItem>
                <SelectItem value="اجتماعي">العمل الاجتماعي</SelectItem>
                <SelectItem value="ديني">الأنشطة الدينية</SelectItem>
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