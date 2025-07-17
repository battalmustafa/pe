import type { Metadata } from "next";
import { Crimson_Pro, Lato } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData, personSchema, websiteSchema } from "@/components/structured-data";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pınar Eğilmez | Yazar",
    template: "%s | Pınar Eğilmez"
  },
  description: "Yazar Pınar Eğilmez'in resmi web sitesi.",
  keywords: [
    "Pınar Eğilmez",
    "Türk yazar",
    "psikoloji",
    "psiko kurgu",
    "roman",
    "mindfulness",
    "psikoloji",
    "kurgu şantiyesi",
    "yazarlık atölyesi",
    "Türk edebiyatı",
    "kitap",
    "meditasyon"
  ],
  authors: [{ name: "Pınar Eğilmez" }],
  creator: "Pınar Eğilmez",
  publisher: "Pınar Eğilmez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pinaregilmez.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://pinaregilmez.com',
    title: 'Pınar Eğilmez | Yazar',
      description: 'Yazar Pınar Eğilmez\'in resmi web sitesi. ',
      siteName: 'Pınar Eğilmez',
    images: [
      {
        url: '/images/author.jpg',
        width: 1200,
        height: 630,
        alt: 'Pınar Eğilmez',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${crimsonPro.variable} ${lato.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StructuredData data={personSchema} />
          <StructuredData data={websiteSchema} />
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
