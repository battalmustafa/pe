import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, MapPin, Users } from 'lucide-react';

// Define the Workshop interface
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

// Format the date for display
function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return 'Tarih belirtilmemiş';
  }
  return format(dateObj, "d MMMM yyyy", { locale: tr });
}

// Format the time for display
function formatTime(time: Date | string) {
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  if (isNaN(timeObj.getTime())) {
    return 'Saat belirtilmemiş';
  }
  return format(timeObj, "HH:mm", { locale: tr });
}

// Get the first image from the images array
function getFirstImage(images: string) {
  try {
    const parsedImages = JSON.parse(images);
    return parsedImages[0] || '/placeholder-workshop.jpg';
  } catch (e) {
    return '/placeholder-workshop.jpg';
  }
}

export default async function WorkshopsPage() {
  const categories = [
    {
      id: 'online',
      title: '',
      description: 'Çevrimiçi olarak katılabileceğiniz atölyeler',
      image: '/images/workshop/workshop-online.jpg'
    },
    {
      id: 'konaklamali',
      title: '',
      description: 'Konaklamalı olarak katılabileceğiniz atölyeler',
      image: '/images/workshop/workshop-konaklama.jpg'
    },
    {
      id: 'kurumsal',
      title: 'Kurumsal Atölyeler',
      description: 'Kurumsal olarak katılabileceğiniz atölyeler',
      image: '/images/workshop/workshop-kurumsal.jpg'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="mb-6 flex justify-center">
          <img 
            src="/images/eii-logo.png" 
            alt="Edebiyat ile İyileşme Logo" 
            className="h-48 w-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="title-gradient">Edebiyat ile İyileşme Atölyeleri</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((category) => (
          <Link href={`/workshops/${category.id}`} key={category.id}>
            <div className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <Button className="w-full">Atölyeleri Görüntüle</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Workshop Card Component
function WorkshopCard({ workshop }: { workshop: Workshop }) {
  // Get the status badge style
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

  // Get the status label
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
          <Badge className="self-start">
            {workshop.category === 'ONLINE' ? 'Çevrimiçi' : 
             workshop.category === 'KONAKLAMALI' ? 'Konaklamalı' : 'Kurumsal'}
          </Badge>
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
              {(() => {
                const startDate = new Date(workshop.startDate);
                const endDate = new Date(workshop.endDate);
                
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                  return 'Tarih bilgisi mevcut değil';
                }
                
                const startDateStr = formatDate(startDate);
                const endDateStr = formatDate(endDate);
                
                return startDate.toDateString() === endDate.toDateString() 
                  ? startDateStr 
                  : `${startDateStr} - ${endDateStr}`;
              })()}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {formatTime(workshop.startTime)} - {formatTime(workshop.endTime)}
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