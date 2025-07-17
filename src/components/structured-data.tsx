"use client";

import { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Person schema for Pınar Eğilmez
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pınar Eğilmez",
  "description": "Türk yazar",
  "birthDate": "1975",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Hacettepe Üniversitesi"
  },
  "jobTitle": "Yazar",
  "knowsAbout": [
    "Psiko-kurgu",
    "Mindfulness",
    "Psikoloji",
    "Türk edebiyatı",
    "Yazarlık"
  ],
  "url": "https://pinaregilmez.com",
  "image": "https://pinaregilmez.com/images/author.jpg",
  "sameAs": [
    "https://www.instagram.com/pinaregilmezz"
  ]
};

// Organization schema for Eİİ
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Edebiyat ile İyileşme (Eİİ)",
  "description": "Pınar Eğilmez tarafından yönetilen atölyeler",
  "url": "https://pinaregilmez.com/workshops",
  "logo": "https://pinaregilmez.com/images/eii-logo.png",
  "founder": {
    "@type": "Person",
    "name": "Pınar Eğilmez"
  },
  "serviceType": [
    "Mindfulness Atölyeleri",
    "Yazarlık Atölyeleri",
    "Psikoloji Atölyeleri"
  ]
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pınar Eğilmez",
  "url": "https://pinaregilmez.com",
  "description": "Yazar Pınar Eğilmez'in resmi web sitesi",
  "author": {
    "@type": "Person",
    "name": "Pınar Eğilmez"
  },
  "publisher": {
    "@type": "Person",
    "name": "Pınar Eğilmez"
  }
}; 