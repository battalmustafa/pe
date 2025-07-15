"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpenText, 
  ChevronRight,
  Instagram,
  MessageSquareText,
  Loader2
} from "lucide-react";
import { ImageCarousel } from "@/components/image-carousel";
import { books } from '@/data/books';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          formData: { email }
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Başarıyla abone oldunuz! Teşekkür ederiz.');
        setEmail('');
      } else {
        const error = await response.json();
        setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

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
               
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 hover-effect">
                  <Link href="/books">Kitapları Keşfet</Link>
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
            {books.map((book) => (
              <div key={book.id} className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
                <div className="relative h-80 w-full bg-muted">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {book.synopsis.split('\n')[0]}
                  </p>
                  <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
                    <Link href="/books">
                      Devamını Oku <ChevronRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
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
                <Link href="/books">Kitapları Keşfet</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquareText className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Röportajlar</h3>
              <p className="text-foreground/70 mb-4">
              Pınar'ın yazarlık, psikoloji ve kültür hakkındaki düşüncelerini okuyun.
              </p>
              <Button variant="link" className="text-accent mt-auto" asChild>
                <Link href="/articles">Röportajları Oku</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg card-hover">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Instagram className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-foreground/70 mb-4">
                Pınar'ın instagram'ındaki güncel görüntülerini ve güncel gönderilerini görüntüleyin.
              </p>
              <Button variant="link" className="text-accent mt-auto" asChild>
                <Link href="https://www.instagram.com/pinaregilmezz" target="_blank">Şimdi Görüntüle</Link>
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
                <Link href="/kurgu-santiyesi">Şantiyeye Katıl</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

   
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Bağlantıda Kalın</h2>
            <p className="text-foreground/80 mb-6">
              Yeni kitaplar, kurgu şantiyesi ve özel içerikler hakkında güncellemeler için 
              bültenime abone olun.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 h-12 px-4 py-3 rounded-md border border-input bg-background"
                required
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 h-12 px-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  'Abone Ol'
                )}
              </Button>
            </form>
            {message && (
              <div className={`mt-4 p-3 rounded-md ${
                isSuccess 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
