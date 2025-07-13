"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Calendar, 
  BookText, 
  BookOpen, 
  FileText, 
  Settings,
  LayoutDashboard,
  LogOut,
  Users,
  Image
} from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// This wrapper checks authentication and redirects if not authenticated
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    // If not authenticated and not already on the login page, redirect to login
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setShouldRender(true);
    }
  }, [isAuthenticated, router, pathname]);

  // If on login page, render children directly
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  
  // If we're still determining authentication or redirecting, show nothing
  if (!shouldRender) {
    return null;
  }
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  const navItems = [
    { name: "Ana Panel", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Etkinlikler", path: "/admin/events", icon: Calendar },
    { name: "Atölyeler", path: "/admin/workshops", icon: BookOpen },
    { name: "Kitaplar", path: "/admin/books", icon: BookText },
    { name: "Makaleler", path: "/admin/articles", icon: FileText },
    { name: "Kurgu Şantiyesi", path: "/admin/sessions", icon: Users },
    { name: "Kaydırıcı Resimleri", path: "/admin/carousel", icon: Image },
    { name: "Ayarlar", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card shadow-md hidden md:block">
        <div className="p-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Yönetici Paneli</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-6 border-t border-border mt-6">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors text-foreground/70 hover:bg-muted"
            >
              <LogOut className="h-5 w-5" />
              <span>Siteye Dön</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-2 px-4 py-2.5 rounded-md transition-colors text-destructive hover:bg-destructive/10 mt-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden bg-card w-full p-4 flex items-center justify-between border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Yönetici</span>
        </Link>
        
        <div className="flex space-x-3">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`p-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}

// Main layout component that provides the AuthProvider
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
} 