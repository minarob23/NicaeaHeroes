import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يحتوي على حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  subject: z.string().min(5, "الموضوع يجب أن يحتوي على 5 أحرف على الأقل"),
  message: z.string().min(10, "الرسالة يجب أن تحتوي على 10 أحرف على الأقل"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "شكراً لك على تواصلك معنا. سنرد عليك قريباً.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-orthodox-cream font-semibold">الاسم الكامل</FormLabel>
              <FormControl>
                <Input
                  placeholder="أدخل اسمك الكامل"
                  className="bg-white bg-opacity-20 text-white placeholder:text-orthodox-cream placeholder:opacity-70 border-orthodox-cream border-opacity-30 focus:ring-orthodox-gold focus:border-orthodox-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-orthodox-cream font-semibold">البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="bg-white bg-opacity-20 text-white placeholder:text-orthodox-cream placeholder:opacity-70 border-orthodox-cream border-opacity-30 focus:ring-orthodox-gold focus:border-orthodox-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-orthodox-cream font-semibold">الموضوع</FormLabel>
              <FormControl>
                <Input
                  placeholder="موضوع الرسالة"
                  className="bg-white bg-opacity-20 text-white placeholder:text-orthodox-cream placeholder:opacity-70 border-orthodox-cream border-opacity-30 focus:ring-orthodox-gold focus:border-orthodox-gold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-orthodox-cream font-semibold">الرسالة</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اكتب رسالتك هنا..."
                  className="h-32 bg-white bg-opacity-20 text-white placeholder:text-orthodox-cream placeholder:opacity-70 border-orthodox-cream border-opacity-30 focus:ring-orthodox-gold focus:border-orthodox-gold"
                  {...field}
                />
              </FormControl>
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
              جاري الإرسال...
            </>
          ) : (
            "أرسل الرسالة"
          )}
        </Button>
      </form>
    </Form>
  );
}
