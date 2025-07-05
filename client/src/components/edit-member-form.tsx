import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Shield, 
  Trophy, 
  Edit3, 
  Save, 
  X, 
  UserCheck,
  Crown,
  Users,
  Calendar,
  Award
} from "lucide-react";

interface Member {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  worksCount: number;
  totalBeneficiaries: number;
  createdAt: string;
}

interface EditMemberFormProps {
  member: Member;
  onClose?: () => void;
}

const roleConfig = {
  member: {
    label: "عضو",
    icon: User,
    color: "bg-blue-100 text-blue-800",
    gradient: "from-blue-50 to-blue-100"
  },
  leader: {
    label: "قائد",
    icon: Crown,
    color: "bg-purple-100 text-purple-800",
    gradient: "from-purple-50 to-purple-100"
  },
  admin: {
    label: "مدير",
    icon: Shield,
    color: "bg-red-100 text-red-800",
    gradient: "from-red-50 to-red-100"
  }
};

export default function EditMemberForm({ member, onClose }: EditMemberFormProps) {
  const [formData, setFormData] = useState({
    fullName: member.fullName,
    role: member.role,
    worksCount: member.worksCount || 0
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMemberMutation = useMutation({
    mutationFn: async (data: Partial<Member>) => {
      console.log(`Updating member ${member.id} with data:`, data);
      const response = await fetch(`/api/members/${member.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", errorData);
        throw new Error(errorData.message || "فشل في تحديث العضو");
      }

      const result = await response.json();
      console.log("Update successful:", result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsOpen(false);
      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات العضو بنجاح",
      });
    },
    onError: (error: any) => {
      console.error("Update mutation error:", error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحديث العضو",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberMutation.mutate(formData);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const currentRole = roleConfig[member.role as keyof typeof roleConfig] || roleConfig.member;
  const RoleIcon = currentRole.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-blue-50 hover:text-blue-600 border-blue-200 transition-all duration-200"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50">
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${currentRole.gradient} border-b border-gray-200 px-6 py-4`}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="p-2 bg-white/80 rounded-full">
                  <RoleIcon className="w-6 h-6 text-gray-700" />
                </div>
                تعديل بيانات العضو
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Member Info Card */}
          <div className="p-6 space-y-6">
            <Card className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${currentRole.color}`}>
                      <RoleIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{member.fullName}</h3>
                    </div>
                  </div>
                  <Badge className={`${currentRole.color} text-sm font-medium`}>
                    {currentRole.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-800">{member.worksCount}</p>
                    <p className="text-sm text-blue-600">الأعمال</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-800">{member.totalBeneficiaries}</p>
                    <p className="text-sm text-green-600">المستفيدين</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-bold text-purple-800">
                      {new Date(member.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                    <p className="text-sm text-purple-600">تاريخ الانضمام</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Edit Form */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  تعديل البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4 text-blue-600" />
                      الاسم الكامل
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="أدخل الاسم الكامل"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Shield className="w-4 h-4 text-red-600" />
                        الدور
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                          <SelectValue placeholder="اختر الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">عضو</SelectItem>
                          <SelectItem value="leader">قائد</SelectItem>
                          <SelectItem value="admin">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="worksCount" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Award className="w-4 h-4 text-orange-600" />
                        عدد الأعمال
                      </Label>
                      <Input
                        id="worksCount"
                        type="number"
                        value={formData.worksCount}
                        onChange={(e) => setFormData({ ...formData, worksCount: parseInt(e.target.value) || 0 })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="flex items-center gap-2 hover:bg-gray-50"
                    >
                      <X className="w-4 h-4" />
                      إلغاء
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateMemberMutation.isPending}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
                    >
                      {updateMemberMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جارٍ الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          حفظ التغييرات
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}