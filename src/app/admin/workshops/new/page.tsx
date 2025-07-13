"use client";

import WorkshopForm from "@/components/WorkshopForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewWorkshopPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Yeni Atölye Ekle</h1>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <WorkshopForm />
      </div>
    </div>
  );
} 