import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { Clock, Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    return JSON.parse(images) as string[];
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

// Get the status badge and label
function getStatusInfo(status: string) {
  switch (status) {
    case 'DEVAM_EDIYOR':
      return { label: 'Devam Ediyor', className: 'bg-green-100 text-green-700' };
    case 'YAKLASANDA':
      return { label: 'Çok Yakında', className: 'bg-amber-100 text-amber-700' };
    case 'TAMAMLANDI':
      return { label: 'Tamamlandı', className: 'bg-foreground/10 text-foreground/70' };
    default:
      return { label: status, className: 'bg-gray-100 text-gray-700' };
  }
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Await params if it's a promise
  const resolvedParams = await Promise.resolve(params);
  const workshopId = parseInt(resolvedParams.id);
  
  if (isNaN(workshopId)) {
    notFound();
  }

  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
  });

  if (!workshop) {
    notFound();
  }

  const images = parseImages(workshop.images);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/workshops" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Atölyeler
          </Link>
        </Button>
      </div>

      {/* Workshop Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={images[0]} 
                alt={workshop.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={image}
                      alt={`${workshop.title} - ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Workshop Info */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getCategoryName(workshop.category)}
              </span>
              {'status' in workshop && (
                <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusInfo(workshop.status as string).className}`}>
                  {getStatusInfo(workshop.status as string).label}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{workshop.title}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Tarih</p>
                  <p className="text-muted-foreground">
                    {formatDate(new Date(workshop.startDate))}
                    {new Date(workshop.startDate).toDateString() !== new Date(workshop.endDate).toDateString() && 
                     ` - ${formatDate(new Date(workshop.endDate))}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Saat</p>
                  <p className="text-muted-foreground">
                    {formatTime(new Date(workshop.startTime))} - {formatTime(new Date(workshop.endTime))}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Konum</p>
                  <p className="text-muted-foreground">{workshop.location}</p>
                </div>
              </div>
              
              {workshop.capacity && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Kapasite</p>
                    <p className="text-muted-foreground">{workshop.capacity} kişi</p>
                  </div>
                </div>
              )}
            </div>
            
            <Button size="lg" className="w-full">Atölyeye Katıl</Button>
          </div>
        </div>
      </div>

      {/* Workshop Detail Content */}
      <div className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{workshop.detailPageHeader}</h2>
          <div dangerouslySetInnerHTML={{ __html: workshop.description }} className="mb-6" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Atölye Detayları</h3>
          <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection1 }} className="mb-6" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Neler Öğreneceksiniz?</h3>
          <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection2 }} className="mb-6" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Kimler Katılabilir?</h3>
          <div dangerouslySetInnerHTML={{ __html: workshop.detailPageSection3 }} className="mb-6" />
        </div>
        
        <div className="bg-muted p-6 rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: workshop.detailPageFooter }} />
        </div>
      </div>
    </div>
  );
} 