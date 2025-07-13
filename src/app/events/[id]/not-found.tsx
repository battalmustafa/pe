import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function EventNotFound() {
  return (
    <div className="container mx-auto py-20 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Calendar className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-4">Etkinlik Bulunamadı</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Aradığınız etkinlik bulunamadı veya kaldırılmış olabilir.
      </p>
      <Button asChild className="bg-primary hover:bg-primary/90">
        <Link href="/etkinlikler">
          Tüm Etkinliklere Dön
        </Link>
      </Button>
    </div>
  );
} 