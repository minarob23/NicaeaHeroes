
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Plus } from "lucide-react";

export default function AddEventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addEventMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          eventDate: new Date(data.eventDate).toISOString()
        }),
      });
      if (!response.ok) throw new Error("فشل في إضافة الفعالية");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "تم بنجاح",
        description: "تم إضافة الفعالية الجديدة بنجاح",
      });
      setFormData({ title: "", description: "", eventDate: "", location: "" });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في إضافة الفعالية",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEventMutation.mutate(formData);
  };

  if (!isOpen) {
    return (
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all" 
            onClick={() => setIsOpen(true)}>
        <CardContent className="p-8 text-center">
          <Plus className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-xl font-bold mb-2">إضافة فعالية جديدة</h3>
          <p className="text-green-100">انقر لإضافة فعالية قادمة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader>
        <CardTitle className="text-orthodox-blue flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          إضافة فعالية جديدة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان الفعالية</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">وصف الفعالية</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="eventDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              تاريخ الفعالية
            </Label>
            <Input
              id="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              المكان
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={addEventMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {addEventMutation.isPending ? "جاري الإضافة..." : "إضافة الفعالية"}
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
