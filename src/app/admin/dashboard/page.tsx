"use client";

import Link from "next/link";
import { 
  Calendar, 
  BookText, 
  FileText, 
  Users,
  PlusCircle,
  TrendingUp,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock statistics data
const stats = [
  { name: "Toplam Etkinlikler", value: "12", icon: Calendar, color: "bg-blue-100 text-blue-600" },
  { name: "Yayınlanan Kitaplar", value: "5", icon: BookText, color: "bg-amber-100 text-amber-600" },
  { name: "Makaleler", value: "24", icon: FileText, color: "bg-emerald-100 text-emerald-600" },
  { name: "Oturum Rezervasyonları", value: "87", icon: Users, color: "bg-purple-100 text-purple-600" },
];

// Mock upcoming events
const upcomingEvents = [
  { 
    title: "Kitap İmza - Aklın Gölgeleri", 
    date: "15 Mayıs 2025", 
    location: "İstanbul Şehir Kütüphanesi",
    type: "book-signing" 
  },
  { 
    title: "Yazarlar için Mindfulness Atölyesi", 
    date: "18 Mayıs 2025", 
    location: "Zoom Üzerinden Online",
    type: "workshop" 
  },
  { 
    title: "Karakterlerin Psikolojisi Paneli", 
    date: "22 Mayıs 2025", 
    location: "Edebiyat Festivali, Ankara",
    type: "panel" 
  },
];

// Mock recent activity
const recentActivity = [
  { action: "Mindfulness oturumu için yeni rezervasyon", time: "2 saat önce" },
  { action: "'Sessiz Gözlemci' kitap bilgileri güncellendi", time: "1 gün önce" },
  { action: "Yeni makale yayınlandı: 'Yazı ve Ruh Sağlığı'", time: "3 gün önce" },
  { action: "Yeni etkinlik eklendi: 'Kitap İmza'", time: "5 gün önce" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Ana Panel</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/admin/events/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni Atölye Ekle
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="bg-card p-6 rounded-lg border border-border shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Yaklaşan Etkinlikler
            </h2>
          </div>
          <div className="p-6">
            {upcomingEvents.map((event, i) => (
              <div key={i} className={`${i < upcomingEvents.length - 1 ? 'border-b border-border pb-4 mb-4' : ''}`}>
                <h3 className="font-medium">{event.title}</h3>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <div className="flex items-center text-foreground/70">
                    <Clock className="mr-1 h-4 w-4" />
                    {event.date}
                  </div>
                  <span className="text-primary">{event.location}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/events">Tüm Etkinlikleri Görüntüle</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Son Aktiviteler
            </h2>
          </div>
          <div className="p-6">
            {recentActivity.map((activity, i) => (
              <div 
                key={i} 
                className={`flex justify-between ${i < recentActivity.length - 1 ? 'border-b border-border pb-4 mb-4' : ''}`}
              >
                <p className="text-sm">{activity.action}</p>
                <span className="text-xs text-foreground/60">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/events">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Atölyeleri Yönet</h3>
            </div>
          </div>
        </Link>
        <Link href="/admin/books">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <BookText className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Kitapları Yönet</h3>
            </div>
          </div>
        </Link>
        <Link href="/admin/articles">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Makaleleri Yönet</h3>
            </div>
          </div>
        </Link>
        <Link href="/admin/sessions">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Kurgu Şantiyesini Yönet</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 