import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Save, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string | null;
  createdAt: string;
}

interface EditEventFormProps {
  event: Event;
  onClose?: () => void;
}

export default function EditEventForm({ event, onClose }: EditEventFormProps) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
    location: event.location || ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateEventMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم تحديث الفعالية بنجاح",
        description: "تم حفظ التغييرات على الفعالية",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      onClose?.();
    },
    onError: (error) => {
      toast({
        title: "خطأ في تحديث الفعالية",
        description: "حدث خطأ أثناء تحديث الفعالية",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEventMutation.mutate({
      title: formData.title,
      description: formData.description,
      eventDate: new Date(formData.eventDate).toISOString(),
      location: formData.location || null
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white to-orthodox-cream shadow-xl">
      <CardHeader className="bg-gradient-to-r from-orthodox-blue to-orthodox-gold text-white">
        <CardTitle className="text-2xl font-bold text-center">
          تعديل الفعالية
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">عنوان الفعالية</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="edit-description">وصف الفعالية</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="edit-eventDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              تاريخ الفعالية
            </Label>
            <Input
              id="edit-eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="edit-location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              المكان
            </Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={updateEventMutation.isPending}
              className="flex-1 bg-orthodox-blue hover:bg-orthodox-blue/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateEventMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
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