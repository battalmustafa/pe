"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

// Form schema validation
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Atölye adı en az 2 karakter olmalıdır.",
  }),
  category: z.enum(["ONLINE", "KONAKLAMALI", "KURUMSAL"], {
    message: "Lütfen bir kategori seçin.",
  }),
  status: z.enum(["DEVAM_EDIYOR", "YAKLASANDA", "TAMAMLANDI"], {
    message: "Lütfen bir durum seçin.",
  }),
  startDate: z.date({
    required_error: "Başlangıç tarihi zorunludur.",
  }),
  endDate: z.date({
    required_error: "Bitiş tarihi zorunludur.",
  }),
  startTime: z.string({
    required_error: "Başlangıç saati zorunludur.",
  }),
  endTime: z.string({
    required_error: "Bitiş saati zorunludur.",
  }),
  location: z.string().min(2, {
    message: "Konum en az 2 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }),
  detailPageHeader: z.string().min(2, {
    message: "Detay sayfası başlığı en az 2 karakter olmalıdır.",
  }),
  detailPageSection1: z.string(),
  detailPageSection2: z.string(),
  detailPageSection3: z.string(),
  detailPageFooter: z.string(),
  capacity: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface WorkshopFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function WorkshopForm({ initialData, isEditing = false }: WorkshopFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Initialize form with default values or existing workshop data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
      endDate: initialData.endDate ? new Date(initialData.endDate) : undefined,
      startTime: initialData.startTime ? format(new Date(initialData.startTime), "HH:mm") : "",
      endTime: initialData.endTime ? format(new Date(initialData.endTime), "HH:mm") : "",
      capacity: initialData.capacity?.toString() || "",
      status: initialData.status || "YAKLASANDA",
    } : {
      title: "",
      category: "ONLINE",
      status: "YAKLASANDA",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      detailPageHeader: "",
      detailPageSection1: "",
      detailPageSection2: "",
      detailPageSection3: "",
      detailPageFooter: "",
      capacity: "",
    },
  });

  // Parse initial images from JSON string if editing
  useEffect(() => {
    if (initialData && initialData.images) {
      try {
        const parsedImages = JSON.parse(initialData.images);
        if (Array.isArray(parsedImages)) {
          setImages(parsedImages);
        }
      } catch (error) {
        console.error("Error parsing images:", error);
      }
    }
  }, [initialData]);

  // Handle image URL input
  const handleAddImage = () => {
    if (imageURL && !images.includes(imageURL)) {
      setImages([...images, imageURL]);
      setImageURL("");
    }
  };

  // Remove image from the list
  const handleRemoveImage = (url: string) => {
    setImages(images.filter((image) => image !== url));
  };

  // Form submission
  const onSubmit = async (values: FormValues) => {
    // Prepare the data for API request
    const workshopData: any = {
      ...values,
      images: JSON.stringify(images),
      startTime: new Date(`${format(values.startDate, "yyyy-MM-dd")}T${values.startTime}`).toISOString(),
      endTime: new Date(`${format(values.endDate, "yyyy-MM-dd")}T${values.endTime}`).toISOString(),
      capacity: values.capacity ? parseInt(values.capacity) : null,
    };

    setSubmitting(true);

    try {
      const url = isEditing ? `/api/workshops` : "/api/workshops";
      const method = isEditing ? "PUT" : "POST";
      
      // Add id for editing
      if (isEditing && initialData) {
        workshopData.id = initialData.id;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workshopData),
      });

      if (!response.ok) {
        throw new Error(isEditing ? "Failed to update workshop" : "Failed to create workshop");
      }

      toast({
        title: "Başarılı",
        description: isEditing ? "Atölye başarıyla güncellendi" : "Atölye başarıyla oluşturuldu",
      });

      // Redirect to workshop management page
      router.push("/admin/workshops");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata",
        description: isEditing ? "Atölye güncellenirken bir hata oluştu" : "Atölye oluşturulurken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workshop Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Atölye Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Atölye adını girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Workshop Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ONLINE">Çevrimiçi</SelectItem>
                    <SelectItem value="KONAKLAMALI">Konaklamalı</SelectItem>
                    <SelectItem value="KURUMSAL">Kurumsal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Workshop Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durum</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEVAM_EDIYOR">Devam Ediyor</SelectItem>
                    <SelectItem value="YAKLASANDA">Çok Yakında</SelectItem>
                    <SelectItem value="TAMAMLANDI">Tamamlandı</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Başlangıç Tarihi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Tarih seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Bitiş Tarihi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Tarih seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Time */}
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlangıç Saati</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Time */}
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bitiş Saati</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konum</FormLabel>
                <FormControl>
                  <Input placeholder="Atölye konumunu girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Capacity */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasite</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Katılımcı sayısı"
                    {...field}
                  />
                </FormControl>
                <FormDescription>İsteğe bağlı</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <FormLabel>Atölye Görselleri</FormLabel>
          <div className="flex space-x-2">
            <Input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="Görsel URL'si ekleyin"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddImage}>
              Ekle
            </Button>
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="aspect-square object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(url)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {images.length === 0 && (
            <p className="text-sm text-muted-foreground">Henüz görsel eklenmedi.</p>
          )}
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Atölye açıklamasını girin"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Page Header */}
        <FormField
          control={form.control}
          name="detailPageHeader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detay Sayfası Başlığı</FormLabel>
              <FormControl>
                <Input placeholder="Detay sayfası başlığını girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Page Section 1 */}
        <FormField
          control={form.control}
          name="detailPageSection1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detay Sayfası Bölüm 1</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detay sayfası bölüm 1 içeriğini girin"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Page Section 2 */}
        <FormField
          control={form.control}
          name="detailPageSection2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detay Sayfası Bölüm 2</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detay sayfası bölüm 2 içeriğini girin"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Page Section 3 */}
        <FormField
          control={form.control}
          name="detailPageSection3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detay Sayfası Bölüm 3</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detay sayfası bölüm 3 içeriğini girin"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Page Footer */}
        <FormField
          control={form.control}
          name="detailPageFooter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detay Sayfası Altbilgisi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detay sayfası altbilgisini girin"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/workshops")}
            disabled={submitting}
          >
            İptal
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Oluştur"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 