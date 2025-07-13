"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

// Types for Instagram posts
interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  likes_count: number;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/instagram');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const formatDate = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true, 
        locale: tr // Use Turkish locale
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Bilinmeyen tarih';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Instagram</h2>
            <p className="text-foreground/70">Son paylaşımlarım</p>
          </div>
          <Link href="https://www.instagram.com/edebiyatileiyilesme/" target="_blank" passHref>
            <Button variant="outline" className="gap-2">
              <Instagram size={18} />
              <span>@edebiyatileiyilesme</span>
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-border group"
              >
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <Instagram size={32} className="text-foreground/30" />
                  </div>
                  {post.media_url && (
                    <Image 
                      src={post.media_url}
                      alt={post.caption.substring(0, 50)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm line-clamp-3 mb-2">{post.caption}</p>
                  <div className="flex justify-between items-center text-xs text-foreground/60">
                    <span>{post.likes_count} beğeni</span>
                    <span>{formatDate(post.timestamp)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-8">
          <Link href="https://www.instagram.com/edebiyatileiyilesme/" target="_blank" passHref>
            <Button className="bg-primary hover:bg-primary/90">Tüm gönderileri gör</Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 