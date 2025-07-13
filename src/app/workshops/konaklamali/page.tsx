import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

interface Workshop {
  id: number;
  title: string;
  images: string;
  category: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  capacity?: number;
  status?: string;
}

function formatDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: tr });
}

function formatTime(time: Date) {
  return format(time, "HH:mm", { locale: tr });
}

function getFirstImage(images: string) {
  try {
    const parsedImages = JSON.parse(images);
    return parsedImages[0] || '/placeholder-workshop.jpg';
  } catch (e) {
    return '/placeholder-workshop.jpg';
  }
}

async function getWorkshops() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/api/workshops?category=konaklamali`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch workshops');
  }
  
  return res.json();
}

export default async function KonaklamaliWorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="title-gradient">Konaklamalı Atölyeler</span>
        </h1>
      </div>

      {workshops.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Şu anda konaklamalı atölye bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop: Workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'DEVAM_EDIYOR':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'YAKLASANDA':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'TAMAMLANDI':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DEVAM_EDIYOR':
        return 'Devam Ediyor';
      case 'YAKLASANDA':
        return 'Çok Yakında';
      case 'TAMAMLANDI':
        return 'Tamamlandı';
      default:
        return status;
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getFirstImage(workshop.images)}
          alt={workshop.title}
          className="w-full h-full object-contain"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="self-start">Konaklamalı</Badge>
          {workshop.status && (
            <Badge variant="outline" className={`self-start ${getStatusBadgeStyle(workshop.status)}`}>
              {getStatusLabel(workshop.status)}
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{workshop.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {workshop.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {formatDate(new Date(workshop.startDate))}
              {new Date(workshop.startDate).toDateString() !== new Date(workshop.endDate).toDateString() && 
               ` - ${formatDate(new Date(workshop.endDate))}`}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {formatTime(new Date(workshop.startTime))} - {formatTime(new Date(workshop.endTime))}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{workshop.location}</span>
          </div>
          {workshop.capacity && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>Kapasite: {workshop.capacity}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/workshops/${workshop.id}`}>
            Detayları Görüntüle
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 