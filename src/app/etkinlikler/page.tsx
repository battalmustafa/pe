import { EventsCalendarWithPopover } from "@/components/events-calendar-with-popover";
import { Metadata } from "next";
  
export const metadata: Metadata = {
  title: "Etkinlikler | Pınar Eğilmez",
  description: "Pınar Eğilmez'in etkinlikleri, kitap imza günleri, atölye çalışmaları ve daha fazlası.",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Etkinlikler</h1>
        <p className="text-xl text-foreground/70">
          Pınar Eğilmez'in yaklaşan etkinlikler, atölye çalışmaları ve kitap imza günleri
        </p>
      </div>
      
      <EventsCalendarWithPopover />
    </div>
  );
} 