"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  title?: string;
  description?: string;
}

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

export function ImageCarousel({ title, description }: ImageCarouselProps) {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        setLoading(true);
        const response = await fetch('/api/carousel');
        
        if (!response.ok) {
          throw new Error('Carousel images could not be loaded');
        }
        
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching carousel images:', err);
        setError('Görüntüler yüklenirken bir hata oluştu.');
        
        // Fallback to default images if API fails
        setImages([
          { id: '1', url: '/images/carousel/default1.jpg', alt: 'Carousel image 1' },
          { id: '2', url: '/images/carousel/default2.jpg', alt: 'Carousel image 2' },
          { id: '3', url: '/images/carousel/default3.jpg', alt: 'Carousel image 3' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCarouselImages();
    
    // Auto rotate carousel
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-muted/30 rounded-lg max-w-6xl mx-auto">
        <p className="text-foreground/70">Yükleniyor...</p>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-muted/30 rounded-lg max-w-6xl mx-auto">
        <p className="text-foreground/70">{error || "Görüntü bulunamadı."}</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container">
        {title && <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>}
        {description && <p className="text-foreground/70 mb-8 text-center max-w-3xl mx-auto">{description}</p>}
        
        <div className="relative h-[500px] rounded-lg overflow-hidden group max-w-6xl mx-auto">
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
          
          {/* Current image */}
          <div className="relative h-full w-full">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
                  className="object-cover rounded-lg"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-background/40 hover:bg-background/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 