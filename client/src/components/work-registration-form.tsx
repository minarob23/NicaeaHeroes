import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertWorkSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Upload } from "lucide-react";

const formSchema = insertWorkSchema.extend({
  workDate: z.string().min(1, "تاريخ العمل مطلوب"),
  agreement: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على نشر العمل",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface WorkRegistrationFormProps {
  onSuccess?: () => void;
}

export default function WorkRegistrationForm({ onSuccess }: WorkRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      beneficiariesCount: 0,
      workDate: "",
      images: [],
      agreement: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Convert string date to Date object
      const workData = {
        ...data,
        workDate: new Date(data.workDate),
        authorId: 1, // In a real app, this would come from the authenticated user
      };

      await apiRequest("POST", "/api/works", workData);
      
      toast({
        title: "تم تسجيل العمل بنجاح",
        description: "شكراً لك على مشاركة عملك البطولي معنا",
      });
      
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "فشل في تسجيل العمل. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "أعمال خيرية",
    "أعمال تطوعية",
    "أعمال كنسية",
    "أعمال اجتماعية",
    "أعمال تعليمية",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orthodox-blue font-semibold">اسم العمل</FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل اسم العمل"
                    className="focus:ring-orthodox-gold focus:border-orthodox-gold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orthodox-blue font-semibold">فئة العمل</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-orthodox-gold focus:border-orthodox-gold">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-orthodox-blue font-semibold">وصف العمل</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اكتب وصفاً مفصلاً عن العمل..."
                  className="h-32 focus:ring-orthodox-gold focus:border-orthodox-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="workDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orthodox-blue font-semibold">تاريخ العمل</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="focus:ring-orthodox-gold focus:border-orthodox-gold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="beneficiariesCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orthodox-blue font-semibold">عدد المستفيدين</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="focus:ring-orthodox-gold focus:border-orthodox-gold"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* File Upload Placeholder */}
        <div className="space-y-2">
          <label className="text-orthodox-blue font-semibold">صور العمل</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orthodox-gold transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">اسحب الصور هنا أو انقر للاختيار</p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-orthodox-gold data-[state=checked]:border-orthodox-gold"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-600">
                  أوافق على نشر هذا العمل في موقع أبطال نيقية
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold py-4 px-8 rounded-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              جاري التسجيل...
            </>
          ) : (
            "سجل العمل الآن"
          )}
        </Button>
      </form>
    </Form>
  );
}
