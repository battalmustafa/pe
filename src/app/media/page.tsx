import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for reportages
const reportages = [
  {
    id: 1,
    title: "Edebiyat Dünyasında Psikolojik Gerilim",
    description: "Modern edebiyatta psikolojik gerilim türünün yükselişi ve okuyucu üzerindeki etkileri üzerine bir röportaj.",
    image: "/images/media/reportage1.jpg",
    link: "/medya/roportajlar/psikolojik-gerilim"
  },
  {
    id: 2,
    title: "Yazarlık Yolculuğum",
    description: "Bir yazar olarak ilk adımlarım, ilham kaynaklarım ve yazım sürecim hakkında samimi bir sohbet.",
    image: "/images/media/reportage2.jpg",
    link: "/medya/roportajlar/yazarlik-yolculugum"
  },
  {
    id: 3,
    title: "Kitapların Ötesinde",
    description: "Edebiyatın günlük hayatımıza nasıl dokunduğu ve toplumsal etkisi üzerine derinlemesine bir analiz.",
    image: "/images/media/reportage3.jpg",
    link: "/medya/roportajlar/kitaplarin-otesinde"
  }
];

// Mock data for radio broadcasts
const radioShows = [
  {
    id: 1,
    title: "Psikoloji ve Edebiyat",
    description: "Psikoloji biliminin edebiyat dünyasına etkisi ve karakterlerin derinliği üzerine bir radyo programı.",
    image: "/images/media/radio1.jpg",
    link: "/medya/radyo/psikoloji-ve-edebiyat"
  },
  {
    id: 2,
    title: "Yazım Teknikleri",
    description: "Etkili hikaye anlatımı, karakter geliştirme ve diyalog yazımı üzerine pratik ipuçları içeren bir sohbet.",
    image: "/images/media/radio2.jpg",
    link: "/medya/radyo/yazim-teknikleri"
  },
  {
    id: 3,
    title: "Kitap Önerileri",
    description: "Farklı türlerde kitap önerileri ve okuma alışkanlıklarımızı geliştirme üzerine keyifli bir program.",
    image: "/images/media/radio3.jpg",
    link: "/medya/radyo/kitap-onerileri"
  }
];

// Mock data for Onedio stories
const onedioStories = [
  {
    id: 1,
    title: "Psikolojik Gerilim Tutkunları İçin 10 Kitap",
    description: "Zihninizi zorlayacak, sizi düşündürecek ve şaşırtacak en iyi psikolojik gerilim kitapları.",
    image: "/images/media/onedio1.jpg",
    link: "/medya/onedio/psikolojik-gerilim-kitaplari"
  },
  {
    id: 2,
    title: "Bir Yazarın Günlük Rutini",
    description: "Bir yazarın yaratıcılığını korumak için uyguladığı günlük alışkanlıklar ve ilham bulma yöntemleri.",
    image: "/images/media/onedio2.jpg",
    link: "/medya/onedio/yazar-rutini"
  },
  {
    id: 3,
    title: "Okurlarla Buluşma Anıları",
    description: "İmza günleri ve edebiyat festivallerinden unutulmaz anlar ve okurlarla yaşanan özel deneyimler.",
    image: "/images/media/onedio3.jpg",
    link: "/medya/onedio/okur-bulusmalari"
  }
];

export default function MediaPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/10 to-secondary/5 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10 z-0"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="title-gradient">Medya</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              Röportajlar, radyo programları ve özel içeriklerle Pınar Eğilmez'in dünyasını keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* Reportages Section */}
      <section className="py-12 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Röportajlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportages.map((item) => (
              <div key={item.id} className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
                <div className="relative h-60 w-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
                    <Link href={item.link}>
                      Devamını Oku <MoveRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radio Shows Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Radyo Yayınları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {radioShows.map((item) => (
              <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-accent/20 group">
                <div className="relative h-60 w-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant="ghost" className="text-accent hover:text-accent/90 hover:bg-accent/10 p-0 flex items-center gap-1" asChild>
                    <Link href={item.link}>
                      Dinle <MoveRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onedio Stories Section */}
      <section className="py-12 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Onedio Hikayeleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onedioStories.map((item) => (
              <div key={item.id} className="bg-background rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg hover:shadow-secondary/20 group">
                <div className="relative h-60 w-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant="ghost" className="text-secondary hover:text-secondary/90 hover:bg-secondary/10 p-0 flex items-center gap-1" asChild>
                    <Link href={item.link}>
                      Hikayeyi Oku <MoveRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 