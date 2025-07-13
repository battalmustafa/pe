"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ChevronLeft, Pencil, Trash, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Session type definition
interface Session {
  id: number;
  title: string;
  description?: string;
  date: Date;
  duration: number;
  price: number;
  capacity?: number;
  bookings: number;
  status: 'active' | 'upcoming' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export default function SessionDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { toast } = useToast();
  
  const [session, setSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    price: "",
    capacity: "",
    bookings: "",
    status: ""
  });
  
  // Fetch session data
  useEffect(() => {
    async function fetchSession() {
      try {
        setLoading(true);
        const response = await fetch('/api/sessions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        const data = await response.json();
        const sessionData = data.find((s: any) => s.id === parseInt(id));
        
        if (!sessionData) {
          setError('Kurgu şantiyesi bulunamadı');
          setSession(null);
          return;
        }
        
        // Convert string dates to Date objects
        const sessionWithDateObjects = {
          ...sessionData,
          date: new Date(sessionData.date),
          createdAt: new Date(sessionData.createdAt),
          updatedAt: new Date(sessionData.updatedAt)
        };
        
        setSession(sessionWithDateObjects);
        setSelectedDate(new Date(sessionData.date));
        
        // Initialize form data
        setFormData({
          title: sessionData.title,
          description: sessionData.description || "",
          date: format(new Date(sessionData.date), "yyyy-MM-dd"),
          duration: String(sessionData.duration),
          price: String(sessionData.price),
          capacity: sessionData.capacity ? String(sessionData.capacity) : "",
          bookings: String(sessionData.bookings),
          status: sessionData.status,
        });
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Kurgu şantiyesi yüklenemedi. Lütfen tekrar deneyin.');
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [id]);
  
  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle status change
  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value,
    });
  };
  
  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData({
        ...formData,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };
  
  // Handle form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the updated data to the API
      const response = await fetch('/api/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(id),
          ...formData,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update session');
      }
      
      const updatedSession = await response.json();
      
      // Update the session state
      setSession({
        ...updatedSession,
        date: new Date(updatedSession.date),
        createdAt: new Date(updatedSession.createdAt),
        updatedAt: new Date(updatedSession.updatedAt),
      });
      
      setIsEditing(false);
      
      toast({
        title: "Başarılı",
        description: "Kurgu şantiyesi başarıyla güncellendi",
        variant: "default",
      });
    } catch (err) {
      console.error('Error updating session:', err);
      toast({
        title: "Hata",
        description: "Kurgu şantiyesi güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle session deletion
  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/sessions?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete session');
      }
      
      toast({
        title: "Başarılı",
        description: "Kurgu şantiyesi başarıyla silindi",
        variant: "default",
      });
      
      // Redirect to sessions list after successful deletion
      router.push("/admin/sessions");
    } catch (err) {
      console.error('Error deleting session:', err);
      toast({
        title: "Hata",
        description: "Kurgu şantiyesi silinirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: tr });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-700">Aktif</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-700">Yaklaşan</Badge>;
      case "completed":
        return <Badge className="bg-gray-500/20 text-gray-700">Tamamlandı</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              disabled
            >
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
  
  // Show error state
  if (error || !session) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h2 className="text-2xl font-bold mb-2">Kurgu Şantiyesi Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">{error || "Bu kurgu şantiyesi bulunamadı veya silinmiş olabilir."}</p>
        <Button asChild>
          <Link href="/admin/sessions">Kurgu Şantiyelerine Dön</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push("/admin/sessions")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Kurgu Şantiyesi Detayları</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                <Trash className="mr-2 h-4 w-4" />
                Sil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kurgu Şantiyesini Sil</DialogTitle>
                <DialogDescription>
                  Bu kurgu şantiyesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  İptal
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Siliniyor..." : "Sil"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {isEditing ? (
        // Edit mode
        <form onSubmit={handleUpdate} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Kurgu Şantiyesi Bilgilerini Düzenle</CardTitle>
              <CardDescription>
                Bu formda değişikliklerinizi yapın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Kurgu Şantiyesi Adı</Label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-32"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select 
                    defaultValue={session.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Yaklaşan</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Fiyat (TL)</Label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Süre (dakika)</Label>
                  <Input 
                    id="duration"
                    name="duration"
                    type="number"
                    min="0"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Maksimum Katılımcı</Label>
                  <Input 
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="0"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bookings">Mevcut Katılımcı Sayısı</Label>
                <Input 
                  id="bookings"
                  name="bookings"
                  type="number"
                  min="0"
                  value={formData.bookings}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                İptal
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      ) : (
        // View mode
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{session.title}</CardTitle>
                    <CardDescription className="mt-2">{session.description}</CardDescription>
                  </div>
                  {getStatusBadge(session.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tarih</h3>
                    <p><span className="font-medium">Tarih:</span> {formatDate(session.date)}</p>
                    <p><span className="font-medium">Süre:</span> {session.duration} dakika</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Katılım Bilgileri</h3>
                    <p>
                      <span className="font-medium">Katılımcılar:</span> {session.bookings}
                      {session.capacity ? `/${session.capacity}` : ""}
                    </p>
                    <p>
                      <span className="font-medium">Doluluk:</span> {session.capacity 
                        ? `${Math.round((session.bookings / session.capacity) * 100)}%` 
                        : "Kapasite belirtilmemiş"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Katılımcılar</CardTitle>
                <CardDescription>
                  Kurgu Şantiyesine kayıtlı katılımcılar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">
                      {session.bookings} {session.capacity ? `/ ${session.capacity}` : ""} katılımcı
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/admin/sessions/${session.id}/participants`}>
                      Katılımcıları Yönet
                    </Link>
                  </Button>
                </div>
                <div className="bg-muted/50 p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">Katılımcı listesini görüntülemek için "Katılımcıları Yönet" düğmesine tıklayın</p>
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
                  <span className="text-sm text-muted-foreground">Fiyat</span>
                  <p className="text-2xl font-bold">{formatPrice(session.price)}</p>
                </div>
                
                {session.capacity && (
                  <div>
                    <span className="text-sm text-muted-foreground">Doluluk</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(session.bookings / session.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((session.bookings / session.capacity) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="text-sm text-muted-foreground">Oluşturulma</span>
                  <p>{formatDate(session.createdAt)}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Son Güncelleme</span>
                  <p>{formatDate(session.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 