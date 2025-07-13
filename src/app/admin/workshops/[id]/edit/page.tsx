"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WorkshopForm from "@/components/WorkshopForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

export default function EditWorkshopPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkshop() {
      try {
        setLoading(true);
        const response = await fetch(`/api/workshops?id=${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Workshop not found");
          }
          throw new Error("Failed to fetch workshop");
        }
        
        const data = await response.json();
        setWorkshop(data);
      } catch (err) {
        console.error("Error fetching workshop:", err);
        setError("Atölye yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshop();
  }, [params.id]);

  // If workshop not found, show error and redirect
  if (error) {
    toast({
      title: "Hata",
      description: error,
      variant: "destructive",
    });
    router.push("/admin/workshops");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/workshops">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Geri</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {loading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              `${workshop?.title || "Atölye"} Düzenle`
            )}
          </h1>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : workshop ? (
          <WorkshopForm initialData={workshop} isEditing={true} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Atölye bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
} 