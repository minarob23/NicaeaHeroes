import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import WorkCard from "@/components/work-card";
import WorkRegistrationForm from "@/components/work-registration-form";
import { User, Users, Calendar, Plus } from "lucide-react";

export default function Works() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const { data: works = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/works", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory ? `/api/works?category=${selectedCategory}` : "/api/works";
      const response = await fetch(url);
      return response.json();
    },
  });

  const categories = [
    { id: "", name: "الكل" },
    { id: "أعمال خيرية", name: "أعمال خيرية" },
    { id: "أعمال تطوعية", name: "أعمال تطوعية" },
    { id: "أعمال كنسية", name: "أعمال كنسية" },
    { id: "أعمال اجتماعية", name: "أعمال اجتماعية" },
    { id: "أعمال تعليمية", name: "أعمال تعليمية" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "أعمال خيرية":
        return "bg-orthodox-gold text-orthodox-blue";
      case "أعمال تطوعية":
        return "bg-green-500 text-white";
      case "أعمال كنسية":
        return "bg-purple-500 text-white";
      case "أعمال اجتماعية":
        return "bg-blue-500 text-white";
      case "أعمال تعليمية":
        return "bg-orthodox-light-blue text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleWorkRegistered = () => {
    setShowRegistrationForm(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orthodox-blue font-amiri mb-4">أعمال الأبطال</h1>
          <p className="text-lg text-gray-600 mb-8">تصفح الأعمال والإنجازات المسجلة</p>
          
          <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
            <DialogTrigger asChild>
              <Button className="bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold">
                <Plus className="w-5 h-5 ml-2" />
                سجل عملك الآن
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-orthodox-blue font-amiri text-2xl">
                  سجل عملك البطولي
                </DialogTitle>
              </DialogHeader>
              <WorkRegistrationForm onSuccess={handleWorkRegistered} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-orthodox-gold text-orthodox-blue font-semibold"
                  : "bg-white text-orthodox-blue hover:bg-orthodox-gold hover:text-orthodox-blue font-semibold"
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Works Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : works.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 text-lg">لا توجد أعمال مسجلة حالياً</div>
              <p className="text-gray-400 mt-2">كن أول من يسجل عملاً في هذه الفئة</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work: any) => (
              <WorkCard key={work.id} work={work} getCategoryColor={getCategoryColor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
