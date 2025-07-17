import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";

// Import book data
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Kitaplar",
  description: "Pınar Eğilmez'in tüm kitapları. Romanlar, psikoloji kitapları. Türk edebiyatının önde gelen yazarlarından Pınar Eğilmez'in eserlerini keşfedin.",
  keywords: [
    "Pınar Eğilmez kitapları",
    "Türk romanları",
    "psikoloji kitapları",
    "mindfulness kitapları",
    "Türk edebiyatı",
    "roman",
    "kitap"
  ],
  openGraph: {
    title: "Pınar Eğilmez'in Kitapları",
    description: "Pınar Eğilmez'in tüm kitapları. Romanlar, psikoloji kitapları.",
    url: "https://pinaregilmez.com/books",
    images: [
      {
        url: "/images/book1.jpg",
        width: 1200,
        height: 630,
        alt: "Pınar Eğilmez Kitapları",
      },
    ],
  },
  twitter: {
    title: "Pınar Eğilmez'in Kitapları",
    description: "Pınar Eğilmez'in tüm kitapları. Romanlar, psikoloji kitapları.",
    images: ["/images/book1.jpg"],
  },
  alternates: {
    canonical: "/books",
  },
};

export default function Books() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Pınar Eğilmez'in Kitapları</span>
      </h1>
     

      <div className="space-y-24 mb-16">
        {books.map((book, index) => (
          <section key={book.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Book Image - Alternating left/right positions */}
            <div className={`col-span-1 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-20 pointer-events-none"></div>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover rounded-lg"
                />
              </div>
            
            </div>
            
            {/* Book Details */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{book.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/70 mb-4">
                  <span>Published: {book.publishYear}</span>
                  <span>Pages: {book.pages}</span>
                  <span>ISBN: {book.isbn}</span>
                </div>
              </div>
              <div className=" flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href={book.purchaseLink} target="_blank">
                  Satın Al
                  </Link>
                </Button>
               
              </div>
              <div className="text-lg text-foreground/80 leading-relaxed">
                {book.synopsis.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))}
              </div>
              <div className="text-lg text-foreground/80 leading-relaxed">
                {book.middleText.map((text, index) => (
                  <p key={index} className="mb-2 text-center">{text}</p>
                ))}
              </div>
              <div className="space-y-4 my-8">
                {book.praise.length > 0 && <h3 className="text-xl font-semibold text-primary">{book.title} için yorumlar</h3>}
                {book.praise.map((item, i) => (
                  <div key={i} className="bg-card/40 p-5 rounded-lg">
                    <blockquote className="italic text-foreground/90">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-right mt-2 text-sm text-foreground/70">
                      — {item.source}
                    </p>
                  </div>
                ))}
              </div>
              
            
            </div>
          </section>
        ))}
      </div>
      
      {/* Coming Soon Section */}
      <section className="bg-card/50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4"></h2>
        <p className="max-w-2xl mx-auto text-foreground/80 mb-6">
         Yeni kitaplar, etkinlikler ve atölyelere dair güncellemeleri kaçırmayın.
        </p>
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
          <Link href="/#newsletter">Bağlantıda Kalın</Link>
        </Button>
      </section>
    </div>
  );
} 