import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Music,
  Mail,
  BookOpen 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-[family-name:var(--font-crimson-pro)] text-primary">
              Pınar Eğilmez
            </h3>
            <p className="text-sm text-foreground/80 max-w-xs">
              Psikolojik gerilim yazarı, mindfulness koçu ve 
              insan psikolojisinin kaşifi.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://spotify.com" 
                target="_blank" 
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Music size={20} />
                <span className="sr-only">Spotify</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/biography" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Biyografi
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Kitaplar
                </Link>
              </li>
              <li>
                <Link href="/mindfulness" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Mindfulness Seansları
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Makaleler
                </Link>
              </li>
              <li>
                <Link href="/spotify" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Spotify
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">İletişim</h3>
            <div className="space-y-2">
              <p className="text-sm flex items-center gap-2 text-foreground/70">
                <Mail size={16} />
                <a href="mailto:contact@pinarezilmez.com" className="hover:text-primary transition-colors">
                  contact@pinarezilmez.com
                </a>
              </p>
              <p className="text-sm flex items-center gap-2 text-foreground/70">
                <BookOpen size={16} />
                <span>Edebi Ajans: Ajans Adı</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Pınar Eğilmez. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 