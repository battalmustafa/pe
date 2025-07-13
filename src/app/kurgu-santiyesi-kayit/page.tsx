"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function KurguSantiyesiKayit() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    ornekHikaye: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          type: 'kurgu-santiyesi-kayit',
          formData: formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Kayıt Gönderildi",
        description: "Kayıt formunuz başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.",
      });

      // Reset form
      setFormData({
        ad: "",
        soyad: "",
        telefon: "",
        email: "",
        ornekHikaye: ""
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/kurgu-santiyesi");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <CardTitle>Kurgu Şantiyesi Kayıt Formu</CardTitle>
          <CardDescription>
            Lütfen aşağıdaki formu doldurarak kayıt işleminizi tamamlayın.
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

            <div className="space-y-2">
              <Label htmlFor="ornekHikaye">Örnek Kısa Hikaye</Label>
              <Textarea
                id="ornekHikaye"
                name="ornekHikaye"
                value={formData.ornekHikaye}
                onChange={handleChange}
                required
                placeholder="Lütfen kısa bir hikaye örneği yazın..."
                className="min-h-[200px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Kayıt Ol"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 