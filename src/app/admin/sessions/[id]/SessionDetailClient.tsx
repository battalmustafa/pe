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
import { id, tr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Session type definition
interface Session {
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

export default function SessionDetailClient({ sessionId }: { sessionId: string }) {
  const router = useRouter();
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
        const sessionData = data.find((s: any) => s.id === parseInt(sessionId));
        
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
  }, [sessionId]);
  
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
          id: parseInt(sessionId),
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
      
      const response = await fetch(`/api/sessions?id=${sessionId}`, {
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
    return format(date, "dd MMMM yyyy", { locale: tr });
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return format(date, "HH:mm", { locale: tr });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Yaklaşan</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Tamamlandı</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (error || !session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin/sessions" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kurgu Şantiyelerine Dön
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Hata</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">{error || 'Kurgu şantiyesi bulunamadı'}</p>
            <Button asChild className="mt-4">
              <Link href="/admin/sessions">Kurgu Şantiyelerine Dön</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/sessions" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kurgu Şantiyelerine Dön
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
            <p className="text-gray-600">Kurgu Şantiyesi Detayları</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusBadge(session.status)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="w-4 h-4 mr-2" />
              {isEditing ? 'İptal' : 'Düzenle'}
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="w-4 h-4 mr-2" />
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
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                    {isSubmitting ? 'Siliniyor...' : 'Sil'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="grid gap-6">
        {/* Session Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Kurgu Şantiyesi Bilgileri</CardTitle>
            <CardDescription>
              Kurgu şantiyesinin temel bilgileri ve ayarları
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Durum</Label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Durum seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Yaklaşan</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="completed">Tamamlandı</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Tarih</Label>
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
                  
                  <div>
                    <Label htmlFor="duration">Süre (Dakika)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Fiyat (TL)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="capacity">Kapasite</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bookings">Rezervasyon Sayısı</Label>
                    <Input
                      id="bookings"
                      name="bookings"
                      type="number"
                      value={formData.bookings}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    İptal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Başlık</h3>
                  <p className="text-gray-600">{session.title}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Durum</h3>
                  {getStatusBadge(session.status)}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tarih</h3>
                  <p className="text-gray-600">{formatDate(session.date)}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Süre</h3>
                  <p className="text-gray-600">{session.duration} dakika</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fiyat</h3>
                  <p className="text-gray-600">{formatPrice(session.price)}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kapasite</h3>
                  <p className="text-gray-600">{session.capacity || 'Sınırsız'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rezervasyon</h3>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">{session.bookings} kişi</span>
                  </div>
                </div>
                
                {session.description && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Açıklama</h3>
                    <p className="text-gray-600">{session.description}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>İstatistikler</CardTitle>
            <CardDescription>
              Kurgu şantiyesi performans metrikleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{session.bookings}</div>
                <div className="text-sm text-gray-600">Toplam Rezervasyon</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {session.capacity ? Math.round((session.bookings / session.capacity) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Doluluk Oranı</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatPrice(session.price * session.bookings)}
                </div>
                <div className="text-sm text-gray-600">Toplam Gelir</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* System Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sistem Bilgileri</CardTitle>
            <CardDescription>
              Kurgu şantiyesi sistem kayıtları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Oluşturulma Tarihi</h3>
                <p className="text-gray-600">{formatDate(session.createdAt)}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Son Güncelleme</h3>
                <p className="text-gray-600">{formatDate(session.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 