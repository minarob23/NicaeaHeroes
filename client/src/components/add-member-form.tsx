
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, User, Shield } from "lucide-react";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "member"
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addMemberMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("فشل في إضافة العضو");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "تم بنجاح",
        description: "تم إضافة العضو الجديد بنجاح",
      });
      setFormData({ username: "", fullName: "", email: "", password: "", role: "member" });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في إضافة العضو",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMemberMutation.mutate(formData);
  };

  if (!isOpen) {
    return (
      <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all" 
            onClick={() => setIsOpen(true)}>
        <CardContent className="p-8 text-center">
          <UserPlus className="w-16 h-16 mx-auto mb-4 text-orthodox-gold" />
          <h3 className="text-xl font-bold mb-2">إضافة عضو جديد</h3>
          <p className="text-orthodox-cream">انقر لإضافة عضو جديد إلى الفريق</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader>
        <CardTitle className="text-orthodox-blue flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          إضافة عضو جديد
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              الاسم الكامل
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="username">اسم المستخدم</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="role" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الدور
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">عضو</SelectItem>
                <SelectItem value="leader">قائد</SelectItem>
                <SelectItem value="moderator">مشرف</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={addMemberMutation.isPending}
              className="bg-orthodox-blue hover:bg-orthodox-navy"
            >
              {addMemberMutation.isPending ? "جاري الإضافة..." : "إضافة العضو"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
