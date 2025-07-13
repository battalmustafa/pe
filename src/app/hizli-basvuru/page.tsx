"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

interface Workshop {
  id: number;
  title: string;
  category: string;
}

interface KurguSantiyesiProgram {
  id: string;
  title: string;
  type: string;
}

export default function HizliBasvuru() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    secilenProgramlar: [] as string[]
  });

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const kurguSantiyesiProgramlari: KurguSantiyesiProgram[] = [
    {
      id: "normal-program",
      title: "Kurgu Şantiyesi - Normal Program",
      type: "Normal"
    },
    {
      id: "yogun-program",
      title: "Kurgu Şantiyesi - Yoğun Program",
      type: "Yoğun"
    }
  ];

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/workshops/list');
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setError('Atölyeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form data:", formData);
    // For now, we'll just redirect back to the main page
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramSelect = (programId: string) => {
    setFormData(prev => {
      const secilenProgramlar = prev.secilenProgramlar.includes(programId)
        ? prev.secilenProgramlar.filter(id => id !== programId)
        : [...prev.secilenProgramlar, programId];
      
      return {
        ...prev,
        secilenProgramlar
      };
    });
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
          <CardTitle>Hızlı Başvuru Formu</CardTitle>
          <CardDescription>
            Lütfen aşağıdaki formu doldurarak başvurunuzu tamamlayın.
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

            <div className="space-y-4">
              <Label>Katılmak İstediğiniz Programlar</Label>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Kurgu Şantiyesi Programları</h4>
                <div className="space-y-2">
                  {kurguSantiyesiProgramlari.map((program) => (
                    <div key={program.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={program.id}
                        checked={formData.secilenProgramlar.includes(program.id)}
                        onCheckedChange={() => handleProgramSelect(program.id)}
                      />
                      <label
                        htmlFor={program.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {program.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Atölyeler</h4>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Atölyeler yükleniyor...</p>
                ) : error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : (
                  <div className="space-y-2">
                    {workshops.map((workshop) => (
                      <div key={workshop.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`workshop-${workshop.id}`}
                          checked={formData.secilenProgramlar.includes(`workshop-${workshop.id}`)}
                          onCheckedChange={() => handleProgramSelect(`workshop-${workshop.id}`)}
                        />
                        <label
                          htmlFor={`workshop-${workshop.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {workshop.title}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Başvuru Yap
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 