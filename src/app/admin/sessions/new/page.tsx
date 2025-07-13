"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Form validation schema
const sessionFormSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  date: z.string(),
  duration: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Süre bir sayı olmalıdır",
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Fiyat bir sayı olmalıdır",
  }),
  capacity: z.string().optional(),
  bookings: z.string().default("0").optional(),
});

export default function NewSessionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      duration: "90",
      price: "1899",
      capacity: "15",
      bookings: "0",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof sessionFormSchema>) {
    setIsSubmitting(true);
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      
      const data = await response.json();
      console.log('Session created:', data);
      
      toast({
        title: "Başarılı",
        description: "Kurgu şantiyesi başarıyla oluşturuldu",
        variant: "default",
      });
      
      // Navigate back to sessions page after successful submission
      router.push("/admin/sessions");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Hata",
        description: "Kurgu şantiyesi oluşturulurken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push("/admin/sessions")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Yeni Kurgu Şantiyesi Ekle</h1>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Kurgu Şantiyesi Bilgileri</CardTitle>
          <CardDescription>
            Yeni bir kurgu şantiyesi oluşturmak için aşağıdaki formu doldurun
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kurgu Şantiyesi Adı</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Hikaye Anlatımı Kurgu Şantiyesi" />
                    </FormControl>
                    <FormDescription>
                      Kurgu şantiyesinin başlığı
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Kurgu şantiyesi hakkında detaylı açıklama" 
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Kurgu şantiyesinin içeriği ve katılımcılara sağladığı faydalar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tarih</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP", { locale: tr })
                            ) : (
                              <span>Tarih seçin</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Kurgu şantiyesinin başlangıç tarihi
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Duration and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Süre (dakika)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormDescription>
                        Kurgu şantiyesinin süresi
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fiyat (TL)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" step="0.01" />
                      </FormControl>
                      <FormDescription>
                        Kurgu şantiyesinin fiyatı
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Capacity and Bookings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kapasite</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormDescription>
                        Maksimum katılımcı sayısı
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bookings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mevcut Katılımcı Sayısı</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormDescription>
                        Halihazırda kayıtlı katılımcı sayısı
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/sessions")}
              >
                İptal
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
} 