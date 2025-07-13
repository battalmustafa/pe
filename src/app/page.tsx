import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  BookOpenText, 
  BookOpen, 
  Music, 
  MessageSquareText,
  ChevronRight
} from "lucide-react";
import { InstagramFeed } from "@/components/instagram-feed";
import { ImageCarousel } from "@/components/image-carousel";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/10 to-secondary/5 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10 z-0"></div>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
                <span className="title-gradient">Pınar Eğilmez</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/80">
                İnsan zihninin karmaşıklığını 
                <span className="text-primary font-semibold"> psikolojik gerilim romanları</span> ve 
                <span className="text-accent font-semibold"> kurgu şantiyesi</span> ile keşfedin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 hover-effect">
                  <Link href="/books">Kitapları Keşfet</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover-effect">
                  <Link href="/mindfulness">Kurgu Şantiyesine Katıl</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full md:w-[300px] lg:w-[400px] overflow-hidden rounded-lg shadow-xl">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-20 pointer-events-none"></div>
              <Image
                src="/images/author.jpg"
                alt="Pınar Eğilmez"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover rounded-lg hover-effect"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Kitaplar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Book 1 */}
            <div className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
              <div className="relative h-80 w-full bg-muted">
                <Image
                  src="/images/book1.jpg"
                  alt="Aklın Gölgeleri"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Aklın Gölgeleri</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  İnsan bilincinin en karanlık köşelerini keşfeden psikolojik bir gerilim.
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
                  <Link href="/books">
                    Devamını Oku <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
              <div className="relative h-80 w-full bg-muted">
                <Image
                  src="/images/book2.jpg"
                  alt="Karanlıktaki Fısıltılar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Karanlıktaki Fısıltılar</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  Gerilim ve psikolojik manipülasyonun etkileyici bir hikayesi.
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
                  <Link href="/books">
                    Devamını Oku <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Book 3 */}
            <div className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
              <div className="relative h-80 w-full bg-muted">
                <Image
                  src="/images/book3.jpg"
                  alt="Sessiz Gözlemci"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sessiz Gözlemci</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  Algı, gerçeklik ve aradaki boşluklar hakkında zihin bükücü bir gerilim.
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
                  <Link href="/books">
                    Devamını Oku <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
              <Link href="/books">Tüm Kitapları Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <ImageCarousel 
        title="Etkinliklerden Kareler"
        description="Pınar Eğilmez'in katıldığı etkinliklerden, imza günlerinden ve söyleşilerden görüntüler."
      />

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Pınar'ın Dünyasını Keşfedin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpenText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kitaplar</h3>
              <p className="text-foreground/70 mb-4">
                Pınar'ın romanlarındaki heyecan verici dünyaları ve karmaşık karakterleri keşfedin.
              </p>
              <Button variant="link" className="text-primary mt-auto" asChild>
                <Link href="/books">Koleksiyona Göz At</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Makaleler</h3>
              <p className="text-foreground/70 mb-4">
                Pınar'ın yazarlık, psikoloji ve mindfulness hakkındaki düşüncelerini okuyun.
              </p>
              <Button variant="link" className="text-accent mt-auto" asChild>
                <Link href="/articles">Makaleleri Oku</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Music className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Spotify</h3>
              <p className="text-foreground/70 mb-4">
                Pınar'ın podcast'lerini ve önerdiği çalma listelerini dinleyin.
              </p>
              <Button variant="link" className="text-secondary mt-auto" asChild>
                <Link href="/spotify">Şimdi Dinle</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquareText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kurgu Şantiyesi</h3>
              <p className="text-foreground/70 mb-4">
                Pınar tarafından yönetilen özel kurgu şantiyesi atölyelerine katılın.
              </p>
              <Button variant="link" className="text-primary mt-auto" asChild>
                <Link href="/mindfulness">Şantiyeye Katıl</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Bağlantıda Kalın</h2>
            <p className="text-foreground/80 mb-6">
              Yeni kitaplar, kurgu şantiyesi ve özel içerikler hakkında güncellemeler için 
              bültenime abone olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="min-w-0 flex-1 px-4 py-3 rounded-md border border-input bg-background"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Abone Ol
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
