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
       

        <div className="border-t border-border/30 mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Pınar Eğilmez. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 