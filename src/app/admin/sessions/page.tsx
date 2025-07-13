"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { PlusCircle, Calendar, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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

export default function SessionsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch sessions from the API
  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true);
        const response = await fetch('/api/sessions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        let data = await response.json();
        
        // Convert string dates to Date objects
        data = data.map((session: any) => ({
          ...session,
          date: new Date(session.date),
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt)
        }));
        
        setSessions(data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Kurgu şantiyeleri yüklenemedi. Lütfen tekrar deneyin.');
        setSessions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  // Filter sessions based on search term
  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (session.description && session.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    session.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Session status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 hover:text-green-800">Aktif</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 hover:text-blue-800">Yaklaşan</Badge>;
      case "completed":
        return <Badge className="bg-gray-500/20 text-gray-700 hover:bg-gray-500/30 hover:text-gray-800">Tamamlandı</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle session deletion
  const handleDeleteSession = async (id: number) => {
    if (confirm("Bu kurgu şantiyesini silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/sessions?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete session');
        }

        // Update the sessions list
        setSessions(sessions.filter(session => session.id !== id));
        
        toast({
          title: "Başarılı",
          description: "Kurgu şantiyesi başarıyla silindi",
          variant: "default",
        });
      } catch (err) {
        console.error('Error deleting session:', err);
        toast({
          title: "Hata",
          description: "Kurgu şantiyesi silinirken bir hata oluştu",
          variant: "destructive",
        });
      }
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kurgu Şantiyesi Yönetimi</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/admin/sessions/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Kurgu Şantiyesi Ekle
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kurgu şantiyesi ara..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Sessions Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kurgu Şantiyesi Adı</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Süre</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Katılımcılar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-8" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              // Error state
              <TableRow>
                <TableCell colSpan={7} className="text-center h-40">
                  <div className="flex flex-col items-center justify-center text-destructive">
                    <p>{error}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredSessions.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={7} className="text-center h-40">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Calendar className="h-10 w-10 mb-2" />
                    <p>Kurgu şantiyesi bulunamadı</p>
                    <p className="text-sm">Yeni bir kurgu şantiyesi eklemek için "Yeni Kurgu Şantiyesi Ekle" düğmesini kullanın</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data display
              filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/admin/sessions/${session.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {session.title}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(session.date)}</TableCell>
                  <TableCell>{session.duration} dakika</TableCell>
                  <TableCell>{formatPrice(session.price)}</TableCell>
                  <TableCell>{`${session.bookings}${session.capacity ? '/' + session.capacity : ''}`}</TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menü</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/sessions/${session.id}`}>
                            Detayları Görüntüle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/sessions/${session.id}/edit`}>
                            Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/sessions/${session.id}/participants`}>
                            Katılımcıları Yönet
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteSession(session.id)}
                          className="text-destructive"
                        >
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 