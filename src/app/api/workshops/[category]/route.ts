import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  try {
    const categoryUpper = category.toUpperCase();
    
    try {
      const workshops = await prisma.workshop.findMany({
        where: {
          category: categoryUpper as any
        },
        orderBy: {
          endDate: 'asc',
        },
      });

      return NextResponse.json(workshops);
    } catch (dbError) {
      console.error('Database error, returning mock workshops for category:', categoryUpper, dbError);
      
      // Return mock workshops filtered by category
      const mockWorkshops = [
        {
          id: 1,
          title: 'Online Yazma Atölyesi',
          images: JSON.stringify(['/placeholder-workshop.jpg']),
          category: 'ONLINE',
          startDate: new Date('2024-02-15'),
          endDate: new Date('2024-02-15'),
          startTime: new Date('2024-02-15T10:00:00'),
          endTime: new Date('2024-02-15T12:00:00'),
          location: 'Online',
          description: 'Edebiyat ile iyileşme online yazma atölyesi',
          detailPageHeader: 'Online Yazma Atölyesi',
          detailPageSection1: 'Bu atölyede yazma tekniklerini öğreneceksiniz.',
          detailPageSection2: 'Edebiyat ile iyileşme yolculuğuna çıkacaksınız.',
          detailPageSection3: 'Grup çalışmaları ve bireysel egzersizler yapacaksınız.',
          detailPageFooter: 'Katılım için kayıt yaptırabilirsiniz.',
          capacity: 20,
          status: 'YAKLASANDA',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: 'Konaklamalı Retreat',
          images: JSON.stringify(['/placeholder-workshop.jpg']),
          category: 'KONAKLAMALI',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-03-03'),
          startTime: new Date('2024-03-01T09:00:00'),
          endTime: new Date('2024-03-03T17:00:00'),
          location: 'Kapadokya',
          description: 'Konaklamalı edebiyat ile iyileşme programı',
          detailPageHeader: 'Konaklamalı Retreat',
          detailPageSection1: '3 günlük yoğun program.',
          detailPageSection2: 'Doğa ile iç içe yazma deneyimi.',
          detailPageSection3: 'Bireysel ve grup çalışmaları.',
          detailPageFooter: 'Konaklama dahil program.',
          capacity: 15,
          status: 'YAKLASANDA',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          title: 'Kurumsal Atölye',
          images: JSON.stringify(['/placeholder-workshop.jpg']),
          category: 'KURUMSAL',
          startDate: new Date('2024-04-01'),
          endDate: new Date('2024-04-01'),
          startTime: new Date('2024-04-01T14:00:00'),
          endTime: new Date('2024-04-01T18:00:00'),
          location: 'İstanbul Ofis',
          description: 'Kurumsal çalışanlar için özel atölye',
          detailPageHeader: 'Kurumsal Atölye',
          detailPageSection1: 'Çalışan motivasyonu ve yaratıcılık.',
          detailPageSection2: 'Takım çalışması ve iletişim.',
          detailPageSection3: 'Stres yönetimi ve yaratıcı yazma.',
          detailPageFooter: 'Kurumsal paketler mevcuttur.',
          capacity: 30,
          status: 'YAKLASANDA',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const filteredWorkshops = mockWorkshops.filter(w => w.category === categoryUpper);
      return NextResponse.json(filteredWorkshops);
    }
  } catch (error) {
    console.error('Error fetching workshops for category:', category, error);
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
} 