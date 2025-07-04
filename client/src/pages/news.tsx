import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import NewsCard from "@/components/news-card";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function News() {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orthodox-blue font-amiri mb-4">أخبار وإعلانات</h1>
          <p className="text-lg text-gray-600">آخر الأخبار والفعاليات القادمة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-orthodox-blue mb-6">آخر الأخبار</h2>
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : news.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-500 text-lg">لا توجد أخبار حالياً</div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {news.map((article: any) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orthodox-blue mb-4">الفعاليات القادمة</h3>
                {events.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">لا توجد فعاليات قادمة</div>
                ) : (
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event: any) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-reverse space-x-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                      >
                        <div className="w-12 h-12 bg-orthodox-gold rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="text-orthodox-blue w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-orthodox-blue mb-1">{event.title}</h4>
                          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(event.eventDate).toLocaleDateString("ar-EG")}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            {stats && (
              <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">إحصائيات أبطال نيقية</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>إجمالي الأعمال</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalWorks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد المستفيدين</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalBeneficiaries}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد الأعضاء</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.totalMembers}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ساعات التطوع</span>
                      <span className="text-orthodox-gold font-bold text-xl">
                        {stats.volunteerHours}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
