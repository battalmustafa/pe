"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, UploadCloud } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
  fileName?: string;
}

export default function CarouselManager() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch carousel images
  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetch('/api/carousel');
        
        if (!response.ok) {
          throw new Error('Failed to fetch carousel images');
        }
        
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching carousel images:', err);
        setError('Carousel resimlerini yüklerken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchImages();
  }, []);

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      
      const response = await fetch('/api/carousel/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      // Add new image to the list
      setImages(prev => [...prev, {
        id: Date.now().toString(),
        url: data.url,
        alt: 'Carousel image',
        fileName: data.fileName
      }]);
      
      toast({
        title: "Başarılı",
        description: "Resim başarıyla yüklendi.",
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      toast({
        title: "Hata",
        description: "Resim yüklenirken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle image deletion
  const handleDelete = async (image: CarouselImage) => {
    try {
      // Extract filename from the URL
      const fileName = image.fileName || image.url.split('/').pop();
      
      if (!fileName) {
        throw new Error('Cannot determine filename');
      }
      
      const response = await fetch(`/api/carousel?filename=${fileName}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }
      
      // Remove image from the list
      setImages(prev => prev.filter(img => img.id !== image.id));
      
      toast({
        title: "Başarılı",
        description: "Resim başarıyla silindi.",
      });
    } catch (err) {
      console.error('Error deleting image:', err);
      toast({
        title: "Hata",
        description: "Resim silinirken bir sorun oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kaydırıcı Resimleri</h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            id="image-upload"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-primary/90"
            disabled={uploading}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            {uploading ? "Yükleniyor..." : "Resim Yükle"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p>Resimler yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          <p>{error}</p>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-card p-8 rounded-lg border border-border text-center">
          <p className="mb-4">Henüz yüklenmiş resim bulunmuyor.</p>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            İlk Resmi Yükle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="bg-card rounded-lg overflow-hidden border border-border group relative"
            >
              <div className="relative h-72 max-w-6xl mx-auto">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
                />
              </div>
              <div className="p-3 flex justify-end max-w-6xl mx-auto">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(image)}
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Delete image</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 