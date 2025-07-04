import { Link } from "wouter";
import { Trophy, Cross, Scroll, Flame, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orthodox-blue to-orthodox-navy min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-24 h-24 bg-orthodox-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-orthodox-blue w-12 h-12" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-orthodox-gold font-amiri mb-4">
                🏆 شعار أبطال نيقية الجديد 🏆
              </h1>
              <p className="text-xl text-orthodox-cream mb-6">
                يتقال بصوت واحد وقلوب مولعة 🔥
              </p>
            </div>

            <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-orthodox-gold border-opacity-30 mb-8">
              <CardContent className="p-8">
                <div className="space-y-4 text-white text-lg leading-relaxed">
                  <p className="flex items-center justify-center space-x-reverse space-x-3">
                    <Cross className="w-6 h-6" />
                    <span>
                      <strong>إحنا أبطال نيقية... واقفين ومافيش زَيّنا!</strong>
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-reverse space-x-3">
                    <Scroll className="w-6 h-6" />
                    <span>ماسكين فإيمانّا... وعايشين على عهد آبائنا</span>
                  </p>
                  <p className="flex items-center justify-center space-x-reverse space-x-3">
                    <Flame className="w-6 h-6" />
                    <span>مهما تهبّ ريح، إحنا صخرة ما بتهزش</span>
                  </p>
                  <p className="flex items-center justify-center space-x-reverse space-x-3">
                    <Shield className="w-6 h-6" />
                    <span>ونقولها بجرأة وصوت عالي:</span>
                  </p>
                  <p className="text-orthodox-gold text-xl font-bold">
                    "نؤمن... نثبت... ونكمل للآخر!"
                  </p>
                  <div className="border-t border-orthodox-gold border-opacity-30 pt-4 mt-6">
                    <p className="text-orthodox-cream">💥 ما بنقلدش... ما بنتهاونش</p>
                    <p className="text-orthodox-cream">🕯 وسط الظلمة، إحنا النور</p>
                    <p className="text-orthodox-cream">🚫 لا عقيدتنا للبيع... ولا قلبنا هيتغير!</p>
                  </div>
                  <div className="border-t border-orthodox-gold border-opacity-30 pt-4 mt-6">
                    <p className="text-orthodox-gold text-xl font-bold">
                      🎶 إحنا أبطال... إحنا نور...
                    </p>
                    <p className="text-orthodox-gold text-xl font-bold">كملوا بينا المشوار!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 md:flex md:justify-center">
              <Button
                asChild
                className="bg-orthodox-gold hover:bg-yellow-500 text-orthodox-blue font-bold py-4 px-8 rounded-xl w-full md:w-auto"
              >
                <Link href="/works">سجل عملك الآن</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-orthodox-gold text-orthodox-gold hover:bg-orthodox-gold hover:text-orthodox-blue font-bold py-4 px-8 rounded-xl w-full md:w-auto"
              >
                <Link href="/works">تصفح الأعمال</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-orthodox-blue font-amiri mb-4">
                إحصائيات أبطال نيقية
              </h2>
              <p className="text-lg text-gray-600">أرقام تعكس إنجازاتنا المجتمعية</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-gradient-to-br from-orthodox-blue to-orthodox-navy text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orthodox-gold mb-2">
                    {stats.totalWorks}
                  </div>
                  <div className="text-orthodox-cream">إجمالي الأعمال</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orthodox-gold to-yellow-500 text-orthodox-blue">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stats.totalBeneficiaries}</div>
                  <div>عدد المستفيدين</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orthodox-light-blue to-blue-500 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stats.totalMembers}</div>
                  <div>عدد الأعضاء</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stats.volunteerHours}</div>
                  <div>ساعات التطوع</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
