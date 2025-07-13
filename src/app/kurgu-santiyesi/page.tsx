"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, ArrowRight, CreditCard, Check, X, Users } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Define TypeScript interface for the mindfulness session
interface MindfulnessSession {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  sessions: string;
  price: number;
  maxParticipants: number;
  availableSpots: number;
  startDate: string;
  level: string;
  features: string[];
}

// Mindfulness session data
const sessions: MindfulnessSession[] = [
  {
    id: "hikaye-yaratim",
    title: "Hikaye Yaratım Atölyesi",
    description: "Karakterleri, sahneleri ve gerilim unsurlarıyla etkileyici hikayeler oluşturmayı öğrenin.",
    image: "/images/mindfulness1.jpg",
    duration: "6 hafta",
    sessions: "12 oturum",
    price: 1899,
    maxParticipants: 15,
    availableSpots: 8,
    startDate: "15 Haziran 2023",
    level: "Başlangıç-Orta",
    features: [
      "Haftada iki canlı oturum",
      "Kişisel geribildirim",
      "Kayıtlı dersler",
      "Haftalık soru-cevap",
      "Özel topluluk erişimi"
    ]
  },
  {
    id: "gerilim-kurgusu",
    title: "Gerilim Kurgusu Şantiyesi",
    description: "Psikolojik gerilim ve gizem unsurlarını kullanarak okuyucuları hikayenize kenetlemenin yollarını keşfedin.",
    image: "/images/mindfulness2.jpg",
    duration: "8 hafta",
    sessions: "16 oturum",
    price: 2499,
    maxParticipants: 12,
    availableSpots: 5,
    startDate: "10 Temmuz 2023",
    level: "İleri Seviye",
    features: [
      "Gerilim teknikleri incelemesi",
      "Karakter psikolojisi derinlemesine",
      "Kişisel rehberlik",
      "Özel materyallere erişim",
      "Tamamlama sertifikası"
    ]
  },
  {
    id: "yeni-yazarlar",
    title: "Yeni Yazarlar Platformu",
    description: "İlk romanınızı veya öykü koleksiyonunuzu yazmaya başlamak için gereken tüm bilgi ve teknikleri öğrenin.",
    image: "/images/mindfulness3.jpg",
    duration: "4 hafta",
    sessions: "8 oturum",
    price: 1299,
    maxParticipants: 20,
    availableSpots: 12,
    startDate: "5 Ağustos 2023",
    level: "Başlangıç",
    features: [
      "Temel yazarlık teknikleri",
      "Aşamalı ilerleme",
      "Grup desteği",
      "Günlük yazma alıştırmaları",
      "Okuma materyalleri dahil"
    ]
  }
];

export default function KurguSantiyesi() {
  const [selectedSession, setSelectedSession] = useState<MindfulnessSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const openModal = (session: MindfulnessSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegister = (session: MindfulnessSession) => {
    setSelectedSession(session);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would process payment
    setPaymentComplete(true);
  };
  
  const resetPayment = () => {
    setSelectedSession(null);
    setPaymentComplete(false);
  };

  return (
    <div className="flex flex-col container">
      <section className="relative py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Kurgu Şantiyesi</h1>
            <p className="text-xl text-foreground/80">
              Pınar Eğilmez'in profesyonel rehberliğinde, yaratıcı yazarlık becerilerinizi geliştirin ve
              kendi hikayelerinizi oluşturma sanatını keşfedin.
            </p>
          </div>
        </div>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-primary">Benzersiz Bir Kurgu Yaklaşımı</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Psikoloji alanındaki geçmişinden ve yazar olarak çalışmalarından ilham alan Pınar, 
            anlatım, psikolojik entegrasyon ve yaratıcı ifadeye odaklanan özgün bir
            kurgu yaklaşımı sunuyor.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Bu atölyeler sadece yazma tekniklerini öğrenmekle kalmayıp, kendi zihninizin 
            derinliklerini keşfetmenize, psikolojik dayanıklılık geliştirmenize ve yaratıcı 
            potansiyelinizi ortaya çıkarmanıza yardımcı olacak.
          </p>
          <div className="pt-4">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-sm px-4 py-1">
              Küçük Gruplar
            </Badge>
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-sm px-4 py-1 ml-2">
              Kişiselleştirilmiş Yaklaşım
            </Badge>
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-sm px-4 py-1 ml-2">
              Canlı Oturumlar
            </Badge>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/mindfulness-hero.jpg"
            alt="Kurgu Şantiyesi"
            fill
            className="object-cover"
          />
        </div>
      </section>
      
      {/* Available Sessions */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Mevcut Atölyeler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div key={session.id} className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56 w-full bg-muted">
                <Image
                  src={session.image}
                  alt={session.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                  {session.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    <span className="text-sm">{session.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-primary" />
                    <span className="text-sm">{session.availableSpots} kişi kaldı</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{session.price} TL</p>
                  <Button size="sm" onClick={() => openModal(session)}>
                    Detaylar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 bg-card/50 rounded-lg">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">What Participants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <p className="italic text-foreground/80 mb-4">
                "These sessions have completely transformed how I understand my own mind. Pınar's approach 
                combines modern psychological insights with mindfulness in a way I've never experienced before."
              </p>
              <p className="font-semibold">Ayşe K.</p>
              <p className="text-sm text-foreground/70">Deep Mind Exploration participant</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <p className="italic text-foreground/80 mb-4">
                "The Shadows and Light program helped me confront aspects of myself I'd been avoiding for years. 
                It wasn't always comfortable, but it was deeply healing and transformative."
              </p>
              <p className="font-semibold">Mehmet R.</p>
              <p className="text-sm text-foreground/70">Shadows and Light participant</p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <p className="italic text-foreground/80 mb-4">
                "As someone new to mindfulness, I appreciated how the Beginner's Mind program eased me into the 
                practice. Pınar is an exceptional guide with profound insights into human psychology."
              </p>
              <p className="font-semibold">Zeynep T.</p>
              <p className="text-sm text-foreground/70">Beginner's Mind participant</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="container py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Sık Sorulan Sorular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Bu atölyeler kime uygun?</AccordionTrigger>
              <AccordionContent>
                Yazma becerilerini geliştirmek isteyen, yaratıcı yazarlıkla ilgilenen ve kurgusal hikayeler oluşturmak isteyen herkese uygundur. Başlangıç seviyesinden ileri seviyeye kadar farklı programlarımız bulunmaktadır.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Hangi konular ele alınacak?</AccordionTrigger>
              <AccordionContent>
                Karakter oluşturma, hikaye yapısı, diyalog yazımı, sahne kurgusu, gerilim oluşturma teknikleri ve kurgunuzu geliştirecek psikolojik unsurlar gibi çeşitli konular ele alınacaktır.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Atölyelere nasıl katılabilirim?</AccordionTrigger>
              <AccordionContent>
                İlgilendiğiniz atölyenin detaylar sayfasından kayıt olabilirsiniz. Kontenjanlar sınırlıdır, bu nedenle erken kayıt yaptırmanız önerilir.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-4">
              <AccordionTrigger>Ekipmana ihtiyacım var mı?</AccordionTrigger>
              <AccordionContent>
                Basit bir not defteri ve kalem yeterlidir, ancak dizüstü bilgisayar kullanmayı tercih edebilirsiniz. Atölye başlamadan önce detaylı bir ekipman listesi paylaşılacaktır.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Kaçırdığım dersleri telafi edebilir miyim?</AccordionTrigger>
              <AccordionContent>
                Evet, tüm atölye oturumları kaydedilir ve katılımcılarla paylaşılır. İsterseniz kaçırdığınız dersi daha sonra izleyebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>İade politikanız nedir?</AccordionTrigger>
              <AccordionContent>
                Atölye başlangıç tarihinden 7 gün öncesine kadar tam iade yapılmaktadır. Daha sonraki iptal istekleri için kısmi iade veya bir sonraki atölyeye transfer seçenekleri sunulmaktadır.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Session Modal */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative h-48 w-full">
              <Image
                src={selectedSession.image}
                alt={selectedSession.title}
                fill
                className="object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 bg-background/80 p-1 rounded-full hover:bg-background/100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedSession.title}</h3>
              <p className="text-foreground/70 mb-6">{selectedSession.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Süre</h4>
                  <p>{selectedSession.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Oturum Sayısı</h4>
                  <p>{selectedSession.sessions}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Başlangıç Tarihi</h4>
                  <p>{selectedSession.startDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Seviye</h4>
                  <p>{selectedSession.level}</p>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Dahil Olanlar:</h4>
              <ul className="mb-6 space-y-1">
                {selectedSession.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-foreground/60">Fiyat</p>
                  <p className="text-2xl font-bold">{selectedSession.price} TL</p>
                </div>
                <div>
                  <p className="text-sm text-center sm:text-right text-foreground/60 mb-2">
                    {selectedSession.availableSpots} / {selectedSession.maxParticipants} kişi kaldı
                  </p>
                  <Button onClick={() => { closeModal(); handleRegister(selectedSession); }} className="w-full sm:w-auto">
                    Hemen Kaydol
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Success Modal */}
      {paymentComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-md p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Kaydınız Tamamlandı!</h3>
            <p className="text-foreground/70 mb-6">
              Atölye hakkında detaylı bilgiler e-posta adresinize gönderilmiştir.
            </p>
            <Button onClick={() => setPaymentComplete(false)} className="w-full">
              Tamam
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 