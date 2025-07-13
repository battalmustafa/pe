"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Format the date for display
function formatDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: tr });
}

// Format the time for display
function formatTime(time: Date) {
  return format(time, "HH:mm", { locale: tr });
}

// Parse the images from the JSON string
function parseImages(images: string) {
  try {
    return JSON.parse(images);
  } catch (e) {
    return ['/placeholder-workshop.jpg'];
  }
}

// Get the category name in Turkish
function getCategoryName(category: string) {
  switch (category) {
    case 'ONLINE':
      return 'Çevrimiçi';
    case 'KONAKLAMALI':
      return 'Konaklamalı';
    case 'KURUMSAL':
      return 'Kurumsal';
    default:
      return category;
  }
}

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
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
        const response = await fetch(`/api/workshops?id=${params.id}`);
        
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
  }, [params.id]);

  // Handle workshop deletion
  const handleDeleteWorkshop = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/workshops?id=${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete workshop');
      }
      
      toast({
        title: "Başarılı",
        description: "Atölye başarıyla silindi",
      });
      
      router.push("/admin/workshops");
    } catch (err) {
      console.error("Error deleting workshop:", err);
      toast({
        title: "Hata",
        description: "Atölye silinirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // If workshop not found or error, show message
  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/workshops">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Geri</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Atölye Detayları</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => router.push("/admin/workshops")}
              >
                Atölye Listesine Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/workshops">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Geri</span>
            </Link>
          </Button>
          {loading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <h1 className="text-2xl font-bold tracking-tight">{workshop.title}</h1>
          )}
        </div>
        
        {!loading && workshop && (
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/workshops/${params.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Düzenle
              </Link>
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="mr-2 h-4 w-4" />
                  Sil
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Atölyeyi silmek istediğinize emin misiniz?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu işlem geri alınamaz. Atölye kalıcı olarak silinecektir.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteWorkshop} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Siliniyor..." : "Sil"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button asChild size="sm">
              <Link href={`/workshops/${params.id}`} target="_blank">
                Görüntüle
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : workshop && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Atölye Bilgileri</span>
                <Badge>{getCategoryName(workshop.category)}</Badge>
              </CardTitle>
              <CardDescription>
                Oluşturulma: {formatDate(new Date(workshop.createdAt))}
                {workshop.createdAt !== workshop.updatedAt && 
                  ` | Son Güncelleme: ${formatDate(new Date(workshop.updatedAt))}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Kategori</h3>
                    <p>{getCategoryName(workshop.category)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tarih</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatDate(new Date(workshop.startDate))}
                        {new Date(workshop.startDate).toDateString() !== new Date(workshop.endDate).toDateString() && 
                        ` - ${formatDate(new Date(workshop.endDate))}`}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Saat</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatTime(new Date(workshop.startTime))} - {formatTime(new Date(workshop.endTime))}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Konum</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{workshop.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Kapasite</h3>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{workshop.capacity || 'Sınırsız'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="content">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="content" className="flex-1">İçerik</TabsTrigger>
              <TabsTrigger value="images" className="flex-1">Görseller</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Atölye Açıklaması</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: workshop.description }} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detay Sayfası Başlığı</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{workshop.detailPageHeader}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detay Sayfası Bölüm 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection1 }} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detay Sayfası Bölüm 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection2 }} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detay Sayfası Bölüm 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection3 }} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detay Sayfası Altbilgisi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: workshop.detailPageFooter }} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Atölye Görselleri</CardTitle>
                </CardHeader>
                <CardContent>
                  {parseImages(workshop.images).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Henüz görsel eklenmemiş.</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {parseImages(workshop.images).map((image: string, index: number) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`${workshop.title} - ${index + 1}`}
                            className="aspect-square object-cover rounded-md border"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
} 