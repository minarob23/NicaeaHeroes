import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "الأعمال", href: "/works" },
    { name: "الأعضاء", href: "/members" },
    { name: "الأخبار", href: "/news" },
    { name: "عن الموقع", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-orthodox-blue shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-reverse space-x-3">
            <div className="w-12 h-12 bg-orthodox-gold rounded-full flex items-center justify-center">
              <Cross className="text-orthodox-blue w-6 h-6" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold font-amiri">كتيبة أبطال مجمع نيقية</h1>
              <p className="text-sm text-orthodox-cream">تسجيل الأعمال والإنجازات</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-reverse space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-orthodox-gold"
                    : "text-white hover:text-orthodox-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-orthodox-blue border-orthodox-gold">
              <div className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors ${
                      isActive(item.href)
                        ? "text-orthodox-gold font-semibold"
                        : "text-white hover:text-orthodox-gold"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
