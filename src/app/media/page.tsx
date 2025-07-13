import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for reportages
const reportages = [
  {
    id: 1,
    title: "En Yükseğe Çıkan Zihinler",
    description: "Gazete Oksijen'de yayınlanan röportaj: En yükseğe çıkan zihinlerin genelde duygusal anlamda en dibi gören insanlardan olduğu üzerine.",
    image: "/images/media/reportage1.jpg",
    link: "https://gazeteoksijen.com/kitap/yazar-pinar-egilmez-en-yuksege-cikan-zihinler-genelde-duygusal-anlamda-en-dibi-goren-insanlardan-oluyor-233625"
  },
  {
    id: 2,
    title: "Gece Geçen Gemi'yi Yazmaya Direnç Gösterdim",
    description: "Ajandakolik'te yayınlanan röportaj: Yeni kitap 'Gece Geçen Gemi' üzerine samimi bir sohbet.",
    image: "/images/media/reportage2.jpg",
    link: "https://www.ajandakolik.com/pinar-egilmez-gece-gecen-gemiyi-yazmaya-direnc-gosterdim-bir-cesit-sanatsal-olum-korkusu/"
  },
  {
    id: 3,
    title: "Sesini Duyurma Şansı Bulamamış Acılar",
    description: "BirGün'de yayınlanan makale: Edebiyatın toplumsal etkisi ve sesini duyuramayanların hikayeleri.",
    image: "/images/media/reportage3.jpg",
    link: "https://www.birgun.net/makale/sesini-duyurma-sansi-bulamamis-acilar-570130"
  },
  {
    id: 4,
    title: "Edebiyat Dünyasına Girişim Pek Sıradan Değildi",
    description: "Gazete Duvar'da yayınlanan röportaj: Edebiyat yolculuğunun başlangıcı ve ilk adımlar.",
    image: "/images/media/reportage4.jpg",
    link: "https://www.gazeteduvar.com.tr/pinar-egilmez-edebiyat-dunyasina-girisim-pek-siradan-degildi-haber-1731386"
  },
  {
    id: 5,
    title: "Gece Geçen Gemi Okuyucudan Tam Not Aldı",
    description: "TGRT Haber'de yayınlanan haber: Yeni kitap hakkında okuyucu yorumları ve değerlendirmeler.",
    image: "/images/media/reportage5.jpg",
    link: "https://www.tgrthaber.com/mavikadin/pinar-egilmezin-gece-gecen-gemi-eseri-okuyucudan-tam-not-aldi/"
  }
];

// Mock data for radio broadcasts
const radioShows = [
  {
    id: 1,
    title: "Psiko Kurgu Yazarı Pınar Eğilmez ile Söyleşi",
    description: "Serhat Sarısözen'le Gündem Dışı programında yazar Pınar Eğilmez'in psiko kurgu türü ve yazarlık süreci üzerine samimi sohbeti.",
    image: "/images/media/radio1.jpg",
    link: "https://anlatilaninotesi.com.tr/20250112/1092593845.html",
    audioSrc: "https://nfw.ria.ru/flv/file.aspx?ID=71621349&type=mp3"
  },
  
];

// Mock data for Onedio stories
const onedioStories = [
  {
    id: 1,
    title: "Neden Sana İyi Gelmeyen Bir Yerde Durmayı Seçiyorsun?",
    description: "İlişkilerde kendimizi neden iyi hissetmediğimiz durumlarda tuttuğumuz üzerine düşündüren bir yazı.",
    image: "/images/media/onedio1.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-neden-sana-iyi-gelmeyen-bir-yerde-durmayi-seciyorsun-967567"
  },
  {
    id: 2,
    title: "Tam Da Şimdi Bizim Zamanımız",
    description: "Şimdinin değeri ve anın önemini vurgulayan, zaman algımızı sorgulatan bir yazı.",
    image: "/images/media/onedio2.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-tam-da-simdi-bizim-zamanimiz-962832"
  },
  {
    id: 3,
    title: "Tavsiye Etmemenizi Tavsiye Ederim",
    description: "Başkalarının hayatlarına müdahale etme ve tavsiye verme konusunda farklı bir bakış açısı.",
    image: "/images/media/onedio3.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-tavsiye-etmemenizi-tavsiye-ederim-956577"
  },
  {
    id: 4,
    title: "Seçin Bakalım: Böbrek mi Karaciğer mi, Duygu mu Düşünce mi?",
    description: "Duygusal ve düşünsel kararlarımızın hayatımıza etkisi üzerine düşündüren bir yazı.",
    image: "/images/media/onedio4.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-secin-bakalim-bobrek-mi-karaciger-mi-duygu-mu-dusunce-mi-952592"
  },
  {
    id: 5,
    title: "Kimyanın Kılıcı",
    description: "İnsan ilişkilerindeki kimyasal bağlar ve etkileşimler üzerine derinlemesine bir analiz.",
    image: "/images/media/onedio5.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-kimyanin-kilici-949727"
  },
  {
    id: 6,
    title: "Ortak Çaresizliğimiz veya Bir Donanım Yazılım Sorunu",
    description: "Modern hayatın getirdiği ortak sorunlar ve çözüm arayışları üzerine düşündüren bir yazı.",
    image: "/images/media/onedio6.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-ortak-caresizligimiz-veya-bir-donanim-yazilim-sorunu-948268"
  },
  {
    id: 7,
    title: "Zihinsel Obezite",
    description: "Günümüzde bilgi bombardımanı altında zihnimizin durumu ve bunun etkileri üzerine bir analiz.",
    image: "/images/media/onedio7.jpg",
    link: "https://onedio.com/haber/pinar-egilmez-yazio-zihinsel-obezite-947154"
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
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
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
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  {item.audioSrc ? (
                    <div className="mb-4">
                      <audio controls className="w-full">
                        <source src={item.audioSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <Button variant="ghost" className="text-accent hover:text-accent/90 hover:bg-accent/10 p-0 flex items-center gap-1" asChild>
                      <Link href={item.link}>
                        Dinle <MoveRight size={16} />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onedio Stories Section */}
      <section className="py-12 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Onedio.com </h2>
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
                  <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-1" asChild>
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