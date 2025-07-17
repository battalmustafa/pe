import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Biyografi",
  description: "Pınar Eğilmez'in biyografisi. 1975 doğumlu yazar. Hacettepe Üniversitesi mezunu, psiko-kurgu tarzının öncülerinden.",
  keywords: [
    "Pınar Eğilmez biyografi",
    "Pınar Eğilmez kimdir",
    "Türk yazar biyografi",
    "psiko-kurgu",
    "Hacettepe Üniversitesi",
    "mindfulness uzmanı"
  ],
  openGraph: {
    title: "Pınar Eğilmez Biyografi",
    description: "1975 doğumlu yazar, psikolog ve mindfulness uzmanı Pınar Eğilmez'in biyografisi.",
    url: "https://pinaregilmez.com/biography",
    images: [
      {
        url: "/images/author-bio.jpg",
        width: 1200,
        height: 630,
        alt: "Pınar Eğilmez Biyografi",
      },
    ],
  },
  twitter: {
    title: "Pınar Eğilmez Biyografi",
    description: "1975 doğumlu yazar, psikolog ve mindfulness uzmanı Pınar Eğilmez'in biyografisi.",
    images: ["/images/author-bio.jpg"],
  },
  alternates: {
    canonical: "/biography",
  },
};

export default function Biography() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Pınar Eğilmez</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="col-span-1">
          <div className="sticky top-24">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg shadow-lg mb-6">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-20 pointer-events-none"></div>
              <Image
                src="/images/author-bio.jpg"
                alt="Pınar Eğilmez"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-lg"
              />
            </div>
            
            
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed">
            1975 doğumlu yazar Hacettepe Üniversitesi Edebiyat Fakültesi İngilizce Mütercim Tercümanlık Bölümü mezunudur. Ait olduğu Çağdaş Türk Edebiyatı neslinde kendi yazı dilini psiko - kurgu olarak tanımlar. Romanları, öyküleri ve deneme yazılarının ekseni; okurun, karakterler ve sahneler üzerinden kendini ve ötekini anlamasını hedefler. Yazar bu anlayışın sonu olmadığına inanır ve bu bağlamda çok katmanlı bir anlatıyı psiko - kurgu eserlerinin karakteristik özelliği olarak benimser.

            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary"></h2>
            <p>
              
            </p>
            
            <p>
              
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary"></h2>
            <p>
              
            </p>
            
            <p>
              
            </p>
            
            <div className="bg-card/40 p-6 rounded-lg my-8 border-l-4 border-accent">
              <blockquote className="text-xl italic font-semibold text-foreground/90">
              "Herkesin biricik bir hikayesi vardır. Kendine uyanış hikayesi. 'O' hikayesi. Senin yok mu... Olacaktır.
              </blockquote>
              <p className="text-right mt-4 text-foreground/70">— Pınar Eğilmez</p>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary"></h2>
            <p>
              
            </p>
            
            <p>
             
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary"></h2>
            <p>
              
            </p>
            
            <p>
             
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 