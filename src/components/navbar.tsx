"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const NavItems = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Biyografi", href: "/biography" },
  { name: "Kitaplar", href: "/books" },
  { name: "Etkinlikler", href: "/etkinlikler" },
  { name: "Eİİ Atölyeler", href: "/workshops" },
  { name: "Kurgu Şantiyesi", href: "/kurgu-santiyesi" },
  { name: "Medya", href: "/media" },
  
  { name: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between py-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold font-[family-name:var(--font-crimson-pro)] title-gradient">
              Pınar Eğilmez
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
              <Link href="/hizli-basvuru">
                Hızlı Başvuru
              </Link>
            </Button>
            <ThemeSwitcher />
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center gap-2">
            <ThemeSwitcher />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span>Menü</span>
                  <span className="sr-only">Menüyü aç/kapat</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] bg-card">
                <nav className="flex flex-col justify-center items-center gap-4 mt-8">
                  {NavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium py-2 text-foreground/90 hover:text-primary transition-colors"
                      onClick={handleMobileItemClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={handleMobileItemClick}>
                    <Link href="/hizli-basvuru">
                      Hızlı Başvuru
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 