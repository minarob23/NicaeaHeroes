
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, User, Shield, Trophy, Users, X } from "lucide-react";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "member",
    worksCount: 0,
    totalBeneficiaries: 0
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
      setFormData({ 
        fullName: "", 
        role: "member", 
        worksCount: 0,
        totalBeneficiaries: 0
      });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all">
          <CardContent className="p-8 text-center">
            <UserPlus className="w-16 h-16 mx-auto mb-4 text-orthodox-gold" />
            <h3 className="text-xl font-bold mb-2">إضافة عضو جديد</h3>
            <p className="text-teal-100">انقر لإضافة عضو جديد إلى الفريق</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-white to-orthodox-cream border-0 shadow-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-orthodox-blue flex items-center gap-2 text-xl font-bold">
            <UserPlus className="w-6 h-6" />
            إضافة عضو جديد
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName" className="flex items-center gap-2 text-orthodox-navy font-semibold">
              <User className="w-4 h-4" />
              الاسم الكامل
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="mt-1 border-orthodox-gold/30 focus:border-orthodox-gold"
              placeholder="أدخل الاسم الكامل"
            />
          </div>

          

          <div>
            <Label htmlFor="role" className="flex items-center gap-2 text-orthodox-navy font-semibold">
              <Shield className="w-4 h-4" />
              الدور
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="mt-1 border-orthodox-gold/30 focus:border-orthodox-gold">
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

          <div>
            <Label htmlFor="worksCount" className="flex items-center gap-2 text-orthodox-navy font-semibold">
              <Trophy className="w-4 h-4" />
              عدد الأعمال
            </Label>
            <Input
              id="worksCount"
              type="number"
              min="0"
              value={formData.worksCount}
              onChange={(e) => setFormData({ ...formData, worksCount: parseInt(e.target.value) || 0 })}
              className="mt-1 border-orthodox-gold/30 focus:border-orthodox-gold"
              placeholder="عدد الأعمال المنجزة"
            />
          </div>

          <div>
            <Label htmlFor="totalBeneficiaries" className="flex items-center gap-2 text-orthodox-navy font-semibold">
              <Users className="w-4 h-4" />
              عدد المستفيدين
            </Label>
            <Input
              id="totalBeneficiaries"
              type="number"
              min="0"
              value={formData.totalBeneficiaries}
              onChange={(e) => setFormData({ ...formData, totalBeneficiaries: parseInt(e.target.value) || 0 })}
              className="mt-1 border-orthodox-gold/30 focus:border-orthodox-gold"
              placeholder="إجمالي عدد المستفيدين"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={addMemberMutation.isPending}
              className="flex-1 bg-orthodox-blue hover:bg-orthodox-navy text-white font-semibold"
            >
              {addMemberMutation.isPending ? "جاري الإضافة..." : "إضافة العضو"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-orthodox-gold text-orthodox-blue hover:bg-orthodox-gold/10"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
