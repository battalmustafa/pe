"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Workshop {
  id: number;
  title: string;
  category: string;
  startDate: string | Date;
  endDate: string | Date;
  location: string;
  description: string;
}

export default function WorkshopRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [workshopId, setWorkshopId] = useState<string>("");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: ""
  });

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setWorkshopId(resolvedParams.id);
      fetchWorkshop(resolvedParams.id);
    };
    
    resolveParams();
  }, [params]);

  const fetchWorkshop = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/workshops?id=${id}`);
      if (!response.ok) {
        throw new Error('Workshop bulunamadı');
      }
      const data = await response.json();
      setWorkshop(data);
    } catch (error) {
      console.error('Error fetching workshop:', error);
      setError('Atölye bilgileri yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'workshop-registration',
          formData: {
            ...formData,
            workshopTitle: workshop?.title,
            workshopId: workshopId
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Kayıt Başarılı",
        description: "Atölye kaydınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.",
      });

      // Reset form
      setFormData({
        ad: "",
        soyad: "",
        telefon: "",
        email: ""
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/workshops/${workshopId}`);
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Hata",
        description: "Kayıt gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="container max-w-2xl py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="container max-w-2xl py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hata</h1>
          <p className="text-gray-600 mb-4">{error || 'Atölye bulunamadı'}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-12">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Geri Dön
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Atölye Kaydı</CardTitle>
          <CardDescription>
            <strong>{workshop.title}</strong> atölyesine kayıt için lütfen aşağıdaki formu doldurun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ad">Ad</Label>
                <Input
                  id="ad"
                  name="ad"
                  value={formData.ad}
                  onChange={handleChange}
                  required
                  placeholder="Adınız"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soyad">Soyad</Label>
                <Input
                  id="soyad"
                  name="soyad"
                  value={formData.soyad}
                  onChange={handleChange}
                  required
                  placeholder="Soyadınız"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefon">Telefon</Label>
              <Input
                id="telefon"
                name="telefon"
                type="tel"
                value={formData.telefon}
                onChange={handleChange}
                required
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ornek@email.com"
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Atölye Bilgileri</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Atölye:</strong> {workshop.title}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Konum:</strong> {workshop.location}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Tarih:</strong> {(() => {
                  const startDate = new Date(workshop.startDate);
                  const endDate = new Date(workshop.endDate);
                  
                  // Check if dates are valid
                  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return 'Tarih bilgisi mevcut değil';
                  }
                  
                  const startDateStr = startDate.toLocaleDateString('tr-TR');
                  const endDateStr = endDate.toLocaleDateString('tr-TR');
                  
                  // Compare dates by their string representation
                  return startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;
                })()}
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Kayıt Gönderiliyor..." : "Kayıt Ol"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 