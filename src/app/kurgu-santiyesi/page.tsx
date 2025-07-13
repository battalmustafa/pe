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
import { useRouter } from "next/navigation";

// Define TypeScript interface for the mindfulness session
interface KurguSantiyesiSession {
  id: string;
  title: string;
  type: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  sessions: string;
  maxParticipants: number;
  availableSpots: number;
  startDate: string;
  level: string;
  features: string[];
  programType: "Normal" | "Yoğun";
  paymentSchedule: {
    firstPayment: number;
    secondPayment: number;
  };
  contentPdf: string;
}

// Kurgu Santiyesi session data
const sessions: KurguSantiyesiSession[] = [
  {
    id: "normal-program",
    title: "Kurgu Şantiyesi - Normal Program",
    type: "Normal",
    description: "Yazar Pınar Eğilmez ile birebir geliştirici editörlük programı. Haftalık metin alışverişi, aylık görüntülü görüşmeler ve sürekli destek ile yazma yolculuğunuzda size eşlik ediyoruz.",
    image: "/images/kurgu images/noraml.png",
    duration: "4 hafta",
    sessions: "4 hafta boyunca haftada bir kez email yoluyla bölüm alışverişi",
    price: 24000,
    maxParticipants: 1,
    availableSpots: 1,
    startDate: "Her ay başında",
    level: "Tüm Seviyeler",
    programType: "Normal",
    paymentSchedule: {
      firstPayment: 8000,
      secondPayment: 16000
    },
    contentPdf: "/pdf/kurgu-santiyesi-normal-program.pdf",
    features: [
      "Haftada bir kez email yoluyla bölüm alışverişi",
      "İlk ay 3, diğer aylarda ayda 2 kez 1.5 saatlik görüntülü görüşme",
      "Whatsapp üzerinden sürekli destek",
      "Kişiye özel geliştirici editörlük",
      "Yazmanın psikolojisi üzerine destek",
      "Yayınevi referans desteği"
    ]
  },
  {
    id: "yogun-program",
    title: "Kurgu Şantiyesi - Yoğun Program",
    type: "Yoğun",
    description: "Daha yoğun bir program ile yazar Pınar Eğilmez ile birebir geliştirici editörlük. Haftalık metin alışverişi, ayda 4 görüntülü görüşme ve sürekli destek ile hızlı ilerleme sağlayın.",
    image: "/images/kurgu images/yogun.png",
    duration: "4 hafta",
    sessions: "4 hafta boyunca haftada bir kez email yoluyla bölüm alışverişi",
    price: 36000,
    maxParticipants: 1,
    availableSpots: 1,
    startDate: "Her ay başında",
    level: "Tüm Seviyeler",
    programType: "Yoğun",
    paymentSchedule: {
      firstPayment: 12000,
      secondPayment: 24000
    },
    contentPdf: "/pdf/kurgu-santiyesi-yogun-program.pdf",
    features: [
      "Haftada bir kez email yoluyla bölüm alışverişi",
      "Ayda 4 kez 1.5 saatlik görüntülü görüşme",
      "Whatsapp üzerinden sürekli destek",
      "Kişiye özel geliştirici editörlük",
      "Yazmanın psikolojisi üzerine destek",
      "Yayınevi referans desteği",
      "Daha yoğun görüşme programı"
    ]
  }
];

export default function KurguSantiyesi() {
  const router = useRouter();
  const [selectedSession, setSelectedSession] = useState<KurguSantiyesiSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const openModal = (session: KurguSantiyesiSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegister = (session: KurguSantiyesiSession) => {
    // Store the selected session in localStorage or state management
    localStorage.setItem('selectedProgram', JSON.stringify(session));
    // Navigate to registration page
    router.push('/kurgu-santiyesi-kayit');
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
              Yazar Pınar Eğilmez ile birebir geliştirici editörlük programı. Kendi yazma yolculuğunuzda size özel rehberlik.
            </p>
          </div>
        </div>
      </section>
      
    
      {/* Available Programs */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Program Seçenekleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <span className="text-sm">{session.programType} Program</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-foreground/60">Aylık Ücret</p>
                    <p className="font-bold text-lg">{session.price.toLocaleString('tr-TR')} TL</p>
                    <p className="text-xs text-foreground/60">
                      {session.paymentSchedule.firstPayment.toLocaleString('tr-TR')} TL (1. Taksit) + {session.paymentSchedule.secondPayment.toLocaleString('tr-TR')} TL (2. Taksit)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={session.contentPdf} target="_blank" rel="noopener noreferrer">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Tanıtım Bülteni
                      </a>
                    </Button>
                    <Button size="sm" onClick={() => openModal(session)}>
                      Detaylar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Program Details Modal */}
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
                  <h4 className="text-sm font-semibold text-foreground/60">Program Tipi</h4>
                  <p>{selectedSession.programType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Başlangıç</h4>
                  <p>{selectedSession.startDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground/60">Seviye</h4>
                  <p>{selectedSession.level}</p>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Program İçeriği:</h4>
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
                  <p className="text-sm text-foreground/60">Aylık Ücret</p>
                  <p className="text-2xl font-bold">{selectedSession.price.toLocaleString('tr-TR')} TL</p>
                  <p className="text-sm text-foreground/60">
                    {selectedSession.paymentSchedule.firstPayment.toLocaleString('tr-TR')} TL (1. Taksit) + {selectedSession.paymentSchedule.secondPayment.toLocaleString('tr-TR')} TL (2. Taksit)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a href={selectedSession.contentPdf} target="_blank" rel="noopener noreferrer">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Tanıtım Bülteni
                    </a>
                  </Button>
                  <Button onClick={() => { closeModal(); handleRegister(selectedSession); }}>
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
              Program hakkında detaylı bilgiler e-posta adresinize gönderilmiştir.
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