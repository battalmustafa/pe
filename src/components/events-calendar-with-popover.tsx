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
  ChevronLeft,
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

export function EventsCalendarWithPopover() {
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
          registrationLink: `/workshops/${event.id}`
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
      "workshop": "Atölye",
      "retreat": "Konaklamalı Atölye",
      "panel": "Panel Tartışması"
    };
    return types[type] || type;
  };
  
  const getEventTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      "workshop": "bg-blue-100 text-blue-600",
      "retreat": "bg-amber-100 text-amber-600",
      "panel": "bg-purple-100 text-purple-600"
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
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get last day of previous month for padding if needed
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Calculate total cells needed (including padding days from prev/next month)
    const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
    
    // Create array for the calendar days
    return Array.from({ length: totalCells }).map((_, i) => {
      let dayNumber;
      let isCurrentMonth = false;
      let date;
      
      if (i < startingDayOfWeek) {
        // Previous month padding days
        dayNumber = daysInPrevMonth - (startingDayOfWeek - i - 1);
        date = new Date(year, month - 1, dayNumber);
      } else if (i - startingDayOfWeek + 1 > daysInMonth) {
        // Next month padding days
        dayNumber = i - startingDayOfWeek + 1 - daysInMonth;
        date = new Date(year, month + 1, dayNumber);
      } else {
        // Current month days
        dayNumber = i - startingDayOfWeek + 1;
        isCurrentMonth = true;
        date = new Date(year, month, dayNumber);
      }
      
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
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Yaklaşan Etkinlikler</h2>
            <p className="text-foreground/70">Pınar Eğilmez'in atölyelerine ve etkinliklerine katılın</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Filter className="mr-2 h-4 w-4 text-foreground/70" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tüm Etkinlikler</option>
              <option value="workshop">Online Atölyeler</option>
              <option value="retreat">Konaklamalı Atölyeler</option>
              <option value="panel">Kurumsal Atölyeler</option>
            </select>
          </div>
        </div>

        <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm mb-8">
          <div className="p-6 border-b border-border bg-muted/20">
            <h3 className="font-medium flex items-center justify-between text-xl">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-muted rounded text-foreground/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                {format(currentMonth, "MMMM yyyy", { locale: tr })}
              </span>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-muted rounded text-foreground/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4 text-foreground/70">
              <div>Pazar</div>
              <div>Pazartesi</div>
              <div>Salı</div>
              <div>Çarşamba</div>
              <div>Perşembe</div>
              <div>Cuma</div>
              <div>Cumartesi</div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <p>Takvim yükleniyor...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-12 text-destructive">
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1 min-h-[400px]">
                {generateCalendarDays().map((day, i) => (
                  <div 
                    key={i} 
                    className={`border border-border rounded-md p-2 min-h-[120px] relative flex flex-col ${
                      day.isCurrentMonth 
                        ? day.events.length > 0 
                          ? "bg-primary/5 border-primary/30" 
                          : "hover:bg-muted/50" 
                        : "text-foreground/30 bg-muted/10"
                    }`}
                  >
                    <div className={`text-sm font-medium ${
                      day.events.length > 0 && day.isCurrentMonth ? "text-primary" : ""
                    }`}>
                      {day.dayNumber}
                    </div>
                    
                    {day.events.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1 overflow-auto flex-grow pr-1">
                        {day.events.map((event) => (
                          <div key={event.id} className="text-xs border-l-2 border-primary pl-1">
                            <div className="font-medium line-clamp-1">{event.title}</div>
                            <div className="text-foreground/70 line-clamp-1 flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-primary" />
                              {format(event.date, "HH:mm", { locale: tr })} - {format(event.endTime, "HH:mm", { locale: tr })}
                            </div>
                            <div className="text-foreground/70 line-clamp-1 flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-primary" />
                              {event.location}
                            </div>
                            <span className={`px-1 py-0.5 text-[10px] rounded-full mt-1 inline-block ${getEventTypeColor(event.type)}`}>
                              {getEventTypeLabel(event.type)}
                            </span>
                            <div className="mt-1">
                              <Button asChild variant="link" className="p-0 h-auto text-primary text-[10px]">
                                <Link href={event.registrationLink || `/workshops/${event.id}`}>
                                  Detaylar
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredEvents.length > 0 && !loading && !error && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6">Yaklaşan Etkinlikler Listesi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <p className="text-foreground/80 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                      <Link href={event.registrationLink || `/workshops/${event.id}`}>
                        Şimdi Kaydol <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="bg-card p-10 rounded-lg border border-border text-center mt-8">
            <h3 className="text-lg font-medium mb-2">Etkinlik bulunamadı</h3>
            <p className="text-foreground/70">Filtre kriterlerinize uygun etkinlik bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </section>
  );
} 