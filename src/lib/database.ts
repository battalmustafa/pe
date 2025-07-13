import { prisma, turso } from './prisma';

// Database utility functions that work with both Prisma and Turso
export async function getEvents() {
  try {
    if (turso) {
      // Use Turso in production
      const result = await turso.execute(`
        SELECT * FROM Event 
        ORDER BY date ASC
      `);
      return result.rows.map(row => ({
        id: row.id,
        title: row.title,
        date: new Date(row.date as string),
        startTime: new Date(row.startTime as string),
        endTime: new Date(row.endTime as string),
        location: row.location,
        type: row.type,
        description: row.description,
        capacity: row.capacity,
        regRequired: Boolean(row.regRequired),
        createdAt: new Date(row.createdAt as string),
        updatedAt: new Date(row.updatedAt as string),
      }));
    } else {
      // Use Prisma for local development
      return await prisma.event.findMany({
        orderBy: { date: 'asc' }
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data as fallback
    return [
      {
        id: 1,
        title: "Edebiyat ile İyileşme Atölyesi",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T14:00:00"),
        endTime: new Date("2025-01-20T16:00:00"),
        location: "Online",
        type: "workshop",
        description: "Yazma terapisi ile iç dünyamızı keşfetme atölyesi",
        capacity: 20,
        regRequired: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Kitap İmza Günü",
        date: new Date("2025-01-25"),
        startTime: new Date("2025-01-25T15:00:00"),
        endTime: new Date("2025-01-25T17:00:00"),
        location: "İstanbul Kitap Fuarı",
        type: "book-signing",
        description: "Yeni kitabımın imza günü",
        capacity: null,
        regRequired: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }
}

export async function getWorkshops() {
  try {
    if (turso) {
      // Use Turso in production
      const result = await turso.execute(`
        SELECT * FROM Workshop 
        ORDER BY startDate ASC
      `);
      return result.rows.map(row => ({
        id: row.id,
        title: row.title,
        images: JSON.parse(row.images as string),
        category: row.category,
        startDate: new Date(row.startDate as string),
        endDate: new Date(row.endDate as string),
        startTime: new Date(row.startTime as string),
        endTime: new Date(row.endTime as string),
        location: row.location,
        description: row.description,
        detailPageHeader: row.detailPageHeader,
        detailPageSection1: row.detailPageSection1,
        detailPageSection2: row.detailPageSection2,
        detailPageSection3: row.detailPageSection3,
        detailPageFooter: row.detailPageFooter,
        capacity: row.capacity,
        status: row.status,
        createdAt: new Date(row.createdAt as string),
        updatedAt: new Date(row.updatedAt as string),
      }));
    } else {
      // Use Prisma for local development
      return await prisma.workshop.findMany({
        orderBy: { startDate: 'asc' }
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data as fallback
    return [
      {
        id: 1,
        title: "Online Yazma Atölyesi",
        images: ["/placeholder-workshop.jpg"],
        category: "ONLINE" as const,
        startDate: new Date("2025-01-15"),
        endDate: new Date("2025-01-15"),
        startTime: new Date("2025-01-15T19:00:00"),
        endTime: new Date("2025-01-15T21:00:00"),
        location: "Online",
        description: "Yazma becerilerinizi geliştirin",
        detailPageHeader: "Online Yazma Atölyesi",
        detailPageSection1: "Bu atölyede yazma tekniklerini öğreneceksiniz",
        detailPageSection2: "Pratik uygulamalar yapacağız",
        detailPageSection3: "Sorularınızı cevaplayacağız",
        detailPageFooter: "Katılım için kayıt gereklidir",
        capacity: 25,
        status: "YAKLASANDA" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }
}

export async function getWorkshopsByCategory(category: string) {
  try {
    if (turso) {
      // Use Turso in production
      const result = await turso.execute(`
        SELECT * FROM Workshop 
        WHERE category = ? 
        ORDER BY startDate ASC
      `, [category.toUpperCase()]);
      return result.rows.map(row => ({
        id: row.id,
        title: row.title,
        images: JSON.parse(row.images as string),
        category: row.category,
        startDate: new Date(row.startDate as string),
        endDate: new Date(row.endDate as string),
        startTime: new Date(row.startTime as string),
        endTime: new Date(row.endTime as string),
        location: row.location,
        description: row.description,
        detailPageHeader: row.detailPageHeader,
        detailPageSection1: row.detailPageSection1,
        detailPageSection2: row.detailPageSection2,
        detailPageSection3: row.detailPageSection3,
        detailPageFooter: row.detailPageFooter,
        capacity: row.capacity,
        status: row.status,
        createdAt: new Date(row.createdAt as string),
        updatedAt: new Date(row.updatedAt as string),
      }));
    } else {
      // Use Prisma for local development
      return await prisma.workshop.findMany({
        where: { category: category.toUpperCase() as any },
        orderBy: { startDate: 'asc' }
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data based on category
    const mockWorkshops = [
      {
        id: 1,
        title: "Online Yazma Atölyesi",
        images: ["/placeholder-workshop.jpg"],
        category: "ONLINE" as const,
        startDate: new Date("2025-01-15"),
        endDate: new Date("2025-01-15"),
        startTime: new Date("2025-01-15T19:00:00"),
        endTime: new Date("2025-01-15T21:00:00"),
        location: "Online",
        description: "Yazma becerilerinizi geliştirin",
        detailPageHeader: "Online Yazma Atölyesi",
        detailPageSection1: "Bu atölyede yazma tekniklerini öğreneceksiniz",
        detailPageSection2: "Pratik uygulamalar yapacağız",
        detailPageSection3: "Sorularınızı cevaplayacağız",
        detailPageFooter: "Katılım için kayıt gereklidir",
        capacity: 25,
        status: "YAKLASANDA" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Konaklama Yazma Kampı",
        images: ["/placeholder-workshop.jpg"],
        category: "KONAKLAMALI" as const,
        startDate: new Date("2025-02-01"),
        endDate: new Date("2025-02-03"),
        startTime: new Date("2025-02-01T10:00:00"),
        endTime: new Date("2025-02-03T16:00:00"),
        location: "Bozcaada",
        description: "3 günlük yazma kampı",
        detailPageHeader: "Konaklama Yazma Kampı",
        detailPageSection1: "Doğayla iç içe yazma deneyimi",
        detailPageSection2: "Profesyonel rehberlik",
        detailPageSection3: "Konaklama ve yemek dahil",
        detailPageFooter: "Erken kayıt indirimi",
        capacity: 15,
        status: "YAKLASANDA" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    return mockWorkshops.filter(workshop => 
      workshop.category === category.toUpperCase()
    );
  }
} 