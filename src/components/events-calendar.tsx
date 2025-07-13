"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight,
  Filter 
} from "lucide-react";

// Event type definition
interface Event {
  id: number;
  title: string;
  date: Date;
  endTime: Date;
  location: string;
  type: string;
  description?: string;
  registrationLink?: string;
}

export function EventsCalendar() {
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        let data = await response.json();
        
        // Transform the data for our component
        data = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date),
          endTime: new Date(event.end),
          location: event.location,
          type: event.type,
          description: event.description || `Pınar Eğilmez'in bu ${event.type.replace('-', ' ')} etkinliğine katılın.`,
          registrationLink: `/events/${event.id}`
        }));
        
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Etkinlikler yüklenemedi');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);
  
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.type === filter);

  const getEventTypeLabel = (type: string) => {
    const types: {[key: string]: string} = {
      "book-signing": "Kitap İmza",
      "workshop": "Atölye",
      "panel": "Panel Tartışması",
      "interview": "Röportaj",
      "mindfulness": "Mindfulness Seansı"
    };
    return types[type] || type;
  };
  
  const getEventTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      "book-signing": "bg-primary/10 text-primary",
      "workshop": "bg-blue-100 text-blue-600",
      "panel": "bg-amber-100 text-amber-600",
      "interview": "bg-purple-100 text-purple-600",
      "mindfulness": "bg-green-100 text-green-600"
    };
    return colors[type] || "bg-gray-100 text-gray-600";
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  // Generate days for the current month's calendar
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();
    
    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create array for the calendar days
    return Array.from({ length: 35 }).map((_, i) => {
      const dayNumber = i - startingDayOfWeek + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      
      if (!isCurrentMonth) {
        return { dayNumber: '', isCurrentMonth: false, events: [] };
      }
      
      const date = new Date(year, month, dayNumber);
      
      // Find events for this date
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === date.getDate() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getFullYear() === date.getFullYear();
      });
      
      return {
        dayNumber,
        isCurrentMonth,
        events: dayEvents,
        date
      };
    });
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Yaklaşan Kurgu Şantiyeleri</h2>
            <p className="text-foreground/70">Pınar Eğilmez'in bu kurgu şantiyelerine katılın</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Filter className="mr-2 h-4 w-4 text-foreground/70" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tüm Kurgu Şantiyeleri</option>
              <option value="book-signing">Kitap İmza Günleri</option>
              <option value="workshop">Kurgu Şantiyeleri</option>
              <option value="panel">Panel Tartışmaları</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Column */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
              <div className="p-4 border-b border-border bg-muted/20">
                <h3 className="font-medium flex items-center justify-between">
                  <button 
                    onClick={() => changeMonth(-1)}
                    className="p-1 hover:bg-muted rounded text-foreground/70"
                  >
                    &lt;
                  </button>
                  <span className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {format(currentMonth, "MMMM yyyy", { locale: tr })}
                  </span>
                  <button 
                    onClick={() => changeMonth(1)}
                    className="p-1 hover:bg-muted rounded text-foreground/70"
                  >
                    &gt;
                  </button>
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
                  <div>P</div>
                  <div>P</div>
                  <div>S</div>
                  <div>Ç</div>
                  <div>P</div>
                  <div>C</div>
                  <div>C</div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <p>Takvim yükleniyor...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, i) => (
                      <div 
                        key={i} 
                        className={`h-8 flex items-center justify-center text-xs rounded-full ${
                          day.isCurrentMonth
                            ? day.events.length > 0
                              ? "bg-primary text-white font-medium cursor-pointer hover:bg-primary/90"
                              : "hover:bg-muted/50 cursor-pointer"
                            : "text-foreground/30"
                        }`}
                        title={day.events.length > 0 ? day.events.map(e => e.title).join(', ') : undefined}
                      >
                        {day.dayNumber}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Events List Column */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-card p-10 rounded-lg border border-border text-center">
                <p>Etkinlikler yükleniyor...</p>
              </div>
            ) : error ? (
              <div className="bg-card p-10 rounded-lg border border-border text-center">
                <h3 className="text-lg font-medium mb-2">Hata</h3>
                <p className="text-destructive">{error}</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold mb-2 md:mb-0">{event.title}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col space-y-3 mb-4">
                        <div className="flex items-center text-foreground/70">
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          <span>{format(event.date, "EEEE, d MMMM yyyy", { locale: tr })}</span>
                        </div>
                        
                        <div className="flex items-center text-foreground/70">
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          <span>
                            {format(event.date, "HH:mm", { locale: tr })} - {format(event.endTime, "HH:mm", { locale: tr })}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-foreground/70">
                          <MapPin className="mr-2 h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 mb-4">
                        {event.description}
                      </p>
                      
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={event.registrationLink || `/events/${event.id}`}>
                          Şimdi Kaydol <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-10 rounded-lg border border-border text-center">
                <h3 className="text-lg font-medium mb-2">Etkinlik bulunamadı</h3>
                <p className="text-foreground/70">Filtre kriterlerinize uygun etkinlik bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 