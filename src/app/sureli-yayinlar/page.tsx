import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Mock data for Süreli Yayınlar (Periodicals)
const periodicalsData = {
  featured: {
    title: "Yazı Dergileri",
    description: "Pınar Eğilmez'in düzenli olarak katkı sağladığı edebiyat ve psikoloji alanındaki dergiler. Bu dergilerde Pınar'ın makaleleri, söyleşileri ve hikayeleri yer almaktadır.",
    publications: [
      {
        id: "notos-dergisi",
        title: "Notos Dergisi",
        description: "Türkiye'nin önde gelen edebiyat dergilerinden biri olan Notos'ta, Pınar Eğilmez'in düzenli olarak yayımlanan psikolojik kurgu analizleri.",
        frequency: "İki Aylık",
        image: "/images/publication1.jpg",
        latest: "Mayıs-Haziran 2023"
      },
      {
        id: "ot-dergisi",
        title: "OT Dergisi",
        description: "Edebiyat ve sanat dergisi OT'da Pınar'ın edebiyatla iyileşme üzerine kaleme aldığı yazı dizisi.",
        frequency: "Aylık",
        image: "/images/publication2.jpg",
        latest: "Temmuz 2023"
      },
      {
        id: "varlık-dergisi",
        title: "Varlık Dergisi",
        description: "Türkiye'nin en köklü edebiyat dergilerinden Varlık'ta yayımlanan yazıları ve söyleşileri.",
        frequency: "Aylık",
        image: "/images/publication3.jpg",
        latest: "Ağustos 2023"
      }
    ]
  },
  academicPublications: [
    {
      id: "cogito",
      title: "Cogito",
      description: "Yapı Kredi Yayınları tarafından çıkarılan düşünce dergisinde edebiyat ve psikoloji kesişimindeki yazıları.",
      frequency: "Üç Aylık",
      image: "/images/publication4.jpg",
      latest: "Bahar 2023",
      tags: ["Psikoloji", "Edebiyat Eleştirisi"]
    },
    {
      id: "psikeart",
      title: "PsikeArt",
      description: "Sanat ve psikoloji dergisinde katkıda bulunduğu inceleme yazıları.",
      frequency: "İki Aylık",
      image: "/images/publication5.jpg",
      latest: "Mayıs-Haziran 2023",
      tags: ["Sanat", "Psikoloji"]
    },
    {
      id: "kitap-lik",
      title: "Kitap-lık",
      description: "Yapı Kredi Yayınları'nın edebiyat dergisinde yer alan eleştiri yazıları ve değerlendirmeleri.",
      frequency: "İki Aylık",
      image: "/images/publication6.jpg",
      latest: "Temmuz-Ağustos 2023",
      tags: ["Edebiyat", "Kitap İncelemesi"]
    }
  ],
  newspaperColumns: [
    {
      id: "cumhuriyet-kitap",
      title: "Cumhuriyet Kitap Eki",
      description: "Cumhuriyet gazetesinin kitap ekinde düzenli olarak yayımlanan yazıları.",
      frequency: "Haftalık",
      image: "/images/publication7.jpg",
      latest: "28 Temmuz 2023"
    },
    {
      id: "birgun-pazar",
      title: "BirGün Pazar",
      description: "BirGün gazetesinin Pazar ekinde iki haftada bir yayımlanan köşe yazıları.",
      frequency: "İki Haftalık",
      image: "/images/publication8.jpg",
      latest: "16 Temmuz 2023"
    },
    {
      id: "milliyet-sanat",
      title: "Milliyet Sanat",
      description: "Milliyet gazetesinin sanat ekinde katkıda bulunduğu makaleler.",
      frequency: "Aylık",
      image: "/images/publication9.jpg",
      latest: "Temmuz 2023"
    }
  ]
};

export default function SureliYayinlarPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Süreli Yayınlar</span>
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-foreground/80">
        Pınar Eğilmez'in düzenli olarak yazılarının, makalelerinin ve hikayelerinin 
        yayımlandığı dergi ve gazeteler.
      </p>
      
      {/* Featured Publications Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">{periodicalsData.featured.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <p className="text-lg mb-6 text-foreground/80">
                  {periodicalsData.featured.description}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link 
                    href="/articles" 
                    className="flex items-center gap-2 w-full justify-center"
                  >
                    <FileText size={18} />
                    Makaleleri Görüntüle
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Dergilerde Yer Alan Yazılar</h3>
              {periodicalsData.featured.publications.map((publication) => (
                <Card key={publication.id} className="bg-card/50 hover:bg-card transition-colors duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{publication.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {publication.frequency} • Son Sayı: {publication.latest}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 text-sm">{publication.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-2">
                      <ExternalLink size={16} />
                      Detayları Görüntüle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link 
                    href="/articles" 
                    className="flex items-center gap-2"
                  >
                    Tüm Yazıları Görüntüle
                    <ExternalLink size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Academic Publications Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Akademik Yayınlar</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {periodicalsData.academicPublications.map((publication) => (
            <Card key={publication.id} className="overflow-hidden border-border group card-hover">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={publication.image}
                  alt={publication.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 flex items-center justify-center p-0">
                    <ExternalLink className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{publication.title}</CardTitle>
                <CardDescription>
                  {publication.frequency} • Son Sayı: {publication.latest}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 text-sm">{publication.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {publication.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Newspaper Columns Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Gazete Yazıları</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {periodicalsData.newspaperColumns.map((publication, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-md group card-hover">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={publication.image}
                  alt={publication.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-xl mb-1">{publication.title}</h3>
                  <p className="text-white/90 text-sm">{publication.frequency}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{publication.title}</h3>
                <p className="text-sm text-foreground/60 mb-2">
                  {publication.frequency} • Son Yazı: {publication.latest}
                </p>
                <p className="text-sm text-foreground/80 mb-4">
                  {publication.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href={`/articles?source=${publication.id}`} className="flex items-center justify-center gap-2">
                    Yazıları Görüntüle
                    <ExternalLink size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 