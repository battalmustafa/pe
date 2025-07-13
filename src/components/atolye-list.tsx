"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight,
  Filter 
} from "lucide-react";

// Atolye type definition
interface Atolye {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  type: string;
  status: string; // 'DEVAM_EDIYOR', 'YAKLASANDA', 'TAMAMLANDI'
  description?: string;
  detail?: {
    images?: string;
    header?: string;
    body?: string;
    body_section1?: string;
    body_section2?: string;
    body_section3?: string;
    footer?: string;
  };
}

export function AtolyeList() {
  const [filter, setFilter] = useState("all");
  const [workshops, setWorkshops] = useState<Atolye[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    async function fetchWorkshops() {
      try {
        setLoading(true);
        const response = await fetch('/api/atolye');
        
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        
        let data = await response.json();
        
        // Transform the data for our component
        data = data.map((atolye: any) => ({
          id: atolye.id,
          title: atolye.title,
          startDate: new Date(atolye.startDate),
          endDate: new Date(atolye.endDate),
          startTime: new Date(atolye.startTime),
          endTime: new Date(atolye.endTime),
          location: atolye.location,
          type: atolye.type,
          status: atolye.status || 'TAMAMLANDI',
          description: atolye.description || `Pınar Eğilmez'in bu atölye çalışmasına katılın.`,
          detail: atolye.detail
        }));
        
        setWorkshops(data);
      } catch (err) {
        console.error('Error fetching workshops:', err);
        setError('Atölyeler yüklenemedi');
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWorkshops();
  }, []);
  
  const filteredWorkshops = filter === "all" 
    ? workshops 
    : workshops.filter(atolye => atolye.type === filter);

  const getWorkshopTypeLabel = (type: string) => {
    const types: {[key: string]: string} = {
      "online": "Online Atölye",
      "kurumsal": "Kurumsal Atölye",
      "konaklama": "Konaklamalı Atölye"
    };
    return types[type] || type;
  };
  
  const getWorkshopTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      "online": "bg-blue-100 text-blue-600",
      "kurumsal": "bg-amber-100 text-amber-600",
      "konaklama": "bg-green-100 text-green-600"
    };
    return colors[type] || "bg-gray-100 text-gray-600";
  };

  // Get the status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DEVAM_EDIYOR":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">Devam Ediyor</span>;
      case "YAKLASANDA":
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600">Çok Yakında</span>;
      case "TAMAMLANDI":
        return <span className="px-2 py-1 text-xs rounded-full bg-foreground/10 text-foreground/70">Tamamlandı</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="py-12 bg-background">
      <div className="container">
        {loading ? (
          <div className="flex justify-center my-16">
            <p>Atölyeler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center my-16">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-primary" : ""}
              >
                Tümü
              </Button>
              <Button 
                variant={filter === "online" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("online")}
                className={filter === "online" ? "bg-primary" : ""}
              >
                Online
              </Button>
              <Button 
                variant={filter === "kurumsal" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("kurumsal")}
                className={filter === "kurumsal" ? "bg-primary" : ""}
              >
                Kurumsal
              </Button>
              <Button 
                variant={filter === "konaklama" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("konaklama")}
                className={filter === "konaklama" ? "bg-primary" : ""}
              >
                Konaklamalı
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-foreground/70">
                    Seçilen kriterlere uygun atölye bulunamadı.
                  </p>
                </div>
              ) : (
                filteredWorkshops.map((atolye) => {
                  const isUpcoming = new Date(atolye.startDate) > new Date();
                  
                  return (
                    <div 
                      key={atolye.id} 
                      className="flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {atolye.detail?.images && (
                        <div className="h-48 w-full bg-muted overflow-hidden">
                          <img 
                            src={atolye.detail.images.split(',')[0]} 
                            alt={atolye.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getWorkshopTypeColor(atolye.type)}`}>
                            {getWorkshopTypeLabel(atolye.type)}
                          </span>
                          <span className="ml-2">
                            {getStatusBadge(atolye.status)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{atolye.title}</h3>
                        
                        <div className="flex items-start gap-2 text-sm mb-2">
                          <CalendarIcon className="h-4 w-4 mt-0.5 text-foreground/70" />
                          <div>
                            <div>{format(atolye.startDate, "PPP", { locale: tr })}</div>
                            {!atolye.endDate.toISOString().includes(atolye.startDate.toISOString().split('T')[0]) && (
                              <div className="text-foreground/70">
                                {format(atolye.endDate, "PPP", { locale: tr })}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 text-sm mb-2">
                          <Clock className="h-4 w-4 mt-0.5 text-foreground/70" />
                          <div>
                            {format(atolye.startTime, "p", { locale: tr })} - {format(atolye.endTime, "p", { locale: tr })}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 text-sm mb-4">
                          <MapPin className="h-4 w-4 mt-0.5 text-foreground/70" />
                          <div>{atolye.location}</div>
                        </div>
                        
                        <p className="text-foreground/80 text-sm mb-4 line-clamp-3">
                          {atolye.description}
                        </p>
                        
                        <div className="mt-auto">
                          <Button asChild variant="ghost" className="text-primary font-medium p-0 h-auto">
                            <Link href={`/atolye/${atolye.id}`} className="flex items-center">
                              Detaylar <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 