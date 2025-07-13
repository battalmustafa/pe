"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Pencil, Trash, Calendar, Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Utility functions
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatTime(time: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(time);
}

function parseImages(images: string) {
  try {
    return JSON.parse(images);
  } catch {
    return [];
  }
}

function getCategoryName(category: string) {
  switch (category) {
    case 'ONLINE': return 'Online';
    case 'KONAKLAMALI': return 'Konaklamalı';
    case 'KURUMSAL': return 'Kurumsal';
    default: return category;
  }
}

export default function WorkshopDetailClient({ workshopId }: { workshopId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchWorkshop() {
      try {
        setLoading(true);
        const response = await fetch(`/api/workshops?id=${workshopId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Workshop not found");
          }
          throw new Error("Failed to fetch workshop");
        }
        
        const data = await response.json();
        setWorkshop(data);
      } catch (err) {
        console.error("Error fetching workshop:", err);
        setError("Atölye yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshop();
  }, [workshopId]);

  // Handle workshop deletion
  const handleDeleteWorkshop = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/workshops?id=${workshopId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete workshop");
      }

      toast({
        title: "Başarılı",
        description: "Atölye başarıyla silindi.",
        variant: "default",
      });

      router.push("/admin/workshops");
    } catch (err) {
      console.error("Error deleting workshop:", err);
      toast({
        title: "Hata",
        description: "Atölye silinirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h2 className="text-2xl font-bold mb-2">Atölye Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">{error || "Bu atölye bulunamadı veya silinmiş olabilir."}</p>
        <Button asChild>
          <Link href="/admin/workshops">Atölyelere Dön</Link>
        </Button>
      </div>
    );
  }

  const images = parseImages(workshop.images);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push("/admin/workshops")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Atölye Detayları</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/workshops/${workshopId}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Düzenle
            </Link>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="mr-2 h-4 w-4" />
                Sil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Atölyeyi Sil</DialogTitle>
                <DialogDescription>
                  Bu atölyeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">
                  İptal
                </Button>
                <Button variant="destructive" onClick={handleDeleteWorkshop} disabled={isDeleting}>
                  {isDeleting ? "Siliniyor..." : "Sil"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{workshop.title}</CardTitle>
                  <CardDescription className="mt-2">{workshop.description}</CardDescription>
                </div>
                <Badge variant={workshop.status === 'YAKLASANDA' ? 'default' : 'secondary'}>
                  {workshop.status === 'YAKLASANDA' ? 'Yaklaşan' : 
                   workshop.status === 'DEVAM_EDIYOR' ? 'Devam Ediyor' : 'Tamamlandı'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Başlangıç</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(workshop.startDate))} - {formatTime(new Date(workshop.startTime))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Bitiş</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(workshop.endDate))} - {formatTime(new Date(workshop.endTime))}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Konum</p>
                      <p className="text-sm text-muted-foreground">{workshop.location}</p>
                    </div>
                  </div>
                  
                  {workshop.capacity && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Kapasite</p>
                        <p className="text-sm text-muted-foreground">{workshop.capacity} kişi</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Görseller</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Workshop image ${index + 1}`}
                      className="rounded-lg object-cover aspect-square"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Detaylı Bilgi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Başlık</h4>
                <p className="text-sm text-muted-foreground">{workshop.detailPageHeader}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Bölüm 1</h4>
                <p className="text-sm text-muted-foreground">{workshop.detailPageSection1}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Bölüm 2</h4>
                <p className="text-sm text-muted-foreground">{workshop.detailPageSection2}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Bölüm 3</h4>
                <p className="text-sm text-muted-foreground">{workshop.detailPageSection3}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Alt Bilgi</h4>
                <p className="text-sm text-muted-foreground">{workshop.detailPageFooter}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Özet Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Kategori</span>
                <p className="font-medium">{getCategoryName(workshop.category)}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Durum</span>
                <p className="font-medium">
                  {workshop.status === 'YAKLASANDA' ? 'Yaklaşan' : 
                   workshop.status === 'DEVAM_EDIYOR' ? 'Devam Ediyor' : 'Tamamlandı'}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Oluşturulma</span>
                <p className="font-medium">{formatDate(new Date(workshop.createdAt))}</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Son Güncelleme</span>
                <p className="font-medium">{formatDate(new Date(workshop.updatedAt))}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 