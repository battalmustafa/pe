"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { PlusCircle, Calendar, Search, MoreHorizontal, Filter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Workshop type definition
interface Workshop {
  id: number;
  title: string;
  images: string;
  category: 'ONLINE' | 'KONAKLAMALI' | 'KURUMSAL';
  status: 'DEVAM_EDIYOR' | 'YAKLASANDA' | 'TAMAMLANDI';
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  capacity?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function WorkshopsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch workshops from the API
  useEffect(() => {
    async function fetchWorkshops() {
      try {
        setLoading(true);
        const response = await fetch('/api/workshops');
        
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        
        let data = await response.json();
        
        // Convert string dates to Date objects
        data = data.map((workshop: any) => ({
          ...workshop,
          startDate: new Date(workshop.startDate),
          endDate: new Date(workshop.endDate),
          startTime: new Date(workshop.startTime),
          endTime: new Date(workshop.endTime),
          createdAt: new Date(workshop.createdAt),
          updatedAt: new Date(workshop.updatedAt)
        }));
        
        setWorkshops(data);
      } catch (err) {
        console.error('Error fetching workshops:', err);
        setError('Atölyeler yüklenemedi. Lütfen tekrar deneyin.');
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshops();
  }, []);

  // Filter workshops based on search term, category and status
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workshop.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || workshop.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get the category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "ONLINE":
        return <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 hover:text-blue-800">Çevrimiçi</Badge>;
      case "KONAKLAMALI":
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 hover:text-green-800">Konaklamalı</Badge>;
      case "KURUMSAL":
        return <Badge className="bg-purple-500/20 text-purple-700 hover:bg-purple-500/30 hover:text-purple-800">Kurumsal</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  // Get the status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DEVAM_EDIYOR":
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 hover:text-green-800">Devam Ediyor</Badge>;
      case "YAKLASANDA":
        return <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 hover:text-amber-800">Çok Yakında</Badge>;
      case "TAMAMLANDI":
        return <Badge className="bg-gray-500/20 text-gray-700 hover:bg-gray-500/30 hover:text-gray-800">Tamamlandı</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle workshop deletion
  const handleDeleteWorkshop = async (id: number) => {
    if (confirm("Bu atölyeyi silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/workshops?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete workshop');
        }

        // Update the workshops list
        setWorkshops(workshops.filter(workshop => workshop.id !== id));
        
        toast({
          title: "Başarılı",
          description: "Atölye başarıyla silindi",
          variant: "default",
        });
      } catch (err) {
        console.error('Error deleting workshop:', err);
        toast({
          title: "Hata",
          description: "Atölye silinirken bir hata oluştu",
          variant: "destructive",
        });
      }
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: tr });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Atölye Yönetimi</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/admin/workshops/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Atölye Ekle
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Atölye ara..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                <span>Kategoriler</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="ONLINE">Çevrimiçi</SelectItem>
              <SelectItem value="KONAKLAMALI">Konaklamalı</SelectItem>
              <SelectItem value="KURUMSAL">Kurumsal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                <span>Durum</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="DEVAM_EDIYOR">Devam Ediyor</SelectItem>
              <SelectItem value="YAKLASANDA">Çok Yakında</SelectItem>
              <SelectItem value="TAMAMLANDI">Tamamlandı</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Workshops Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Atölye Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Konum</TableHead>
              <TableHead>Kapasite</TableHead>
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
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-8" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              // Error state
              <TableRow>
                <TableCell colSpan={6} className="text-center h-40">
                  <div className="flex flex-col items-center justify-center text-destructive">
                    <p>{error}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredWorkshops.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={6} className="text-center h-40">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Calendar className="h-10 w-10 mb-2" />
                    <p>Atölye bulunamadı</p>
                    <p className="text-sm">Yeni bir atölye eklemek için "Yeni Atölye Ekle" düğmesini kullanın</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data display
              filteredWorkshops.map((workshop) => (
                <TableRow key={workshop.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/admin/workshops/${workshop.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {workshop.title}
                    </Link>
                  </TableCell>
                  <TableCell>{getCategoryBadge(workshop.category)}</TableCell>
                  <TableCell>{getStatusBadge(workshop.status)}</TableCell>
                  <TableCell>{formatDate(workshop.startDate)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{workshop.location}</TableCell>
                  <TableCell>{workshop.capacity || '-'}</TableCell>
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
                          <Link href={`/admin/workshops/${workshop.id}`}>
                            Detayları Görüntüle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/workshops/${workshop.id}/edit`}>
                            Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteWorkshop(workshop.id)}
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