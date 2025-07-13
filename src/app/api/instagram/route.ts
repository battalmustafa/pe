import { NextResponse } from 'next/server';

// Instagram API credentials
const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

// Instagram Basic Display API endpoints
const GRAPH_API_URL = 'https://graph.instagram.com';

interface InstagramPost {
  id: string;
  caption: string | null;
  media_url: string;
  permalink: string;
  timestamp: string;
  likes_count?: number; // Not directly available with Basic Display API
}

// Mock Instagram posts for fallback when API is unavailable
const MOCK_POSTS: InstagramPost[] = [
  {
    id: "1",
    media_url: "/images/instagram/post1.jpg",
    caption: "Yeni kitabımın son düzeltmeleri üzerinde çalışıyorum. Heyecanla paylaşmak için sabırsızlanıyorum! #YeniKitap #YeniYolculuk",
    permalink: "https://www.instagram.com/edebiyatileiyilesme/",
    timestamp: new Date().toISOString(),
    likes_count: 124
  },
  {
    id: "2",
    media_url: "/images/instagram/post2.jpg",
    caption: "Bugünkü mindfulness oturumumuzdan bir kare. İçsel huzurun sırları üzerine çok değerli paylaşımlar oldu. #Mindfulness #İçselHuzur",
    permalink: "https://www.instagram.com/edebiyatileiyilesme/",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes_count: 98
  },
  {
    id: "3",
    media_url: "/images/instagram/post3.jpg",
    caption: "Okuyucularımla kitap imza günümden güzel bir anı. Herkese desteği için çok teşekkürler! #KitapİmzaGünü #Okuyucular",
    permalink: "https://www.instagram.com/edebiyatileiyilesme/",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes_count: 156
  }
];

export async function GET() {
  try {
    // If no access token is available, return mock data
    if (!INSTAGRAM_ACCESS_TOKEN) {
      console.log('Instagram access token not configured, using mock data');
      return NextResponse.json(MOCK_POSTS);
    }

    // Fetch media from Instagram Graph API
    const response = await fetch(
      `${GRAPH_API_URL}/me/media?fields=id,caption,media_url,permalink,timestamp&limit=3&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      // Log the error but return mock data
      const error = await response.json();
      console.error('Instagram API error:', error);
      console.log('Falling back to mock data');
      return NextResponse.json(MOCK_POSTS);
    }

    const data = await response.json();
    
    // Transform the data to our desired format
    const posts: InstagramPost[] = data.data.map((post: any) => ({
      id: post.id,
      caption: post.caption || '',
      media_url: post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      // Basic display API doesn't provide likes count directly
      likes_count: Math.floor(Math.random() * 200) + 50, // Mock likes count (remove in production)
    }));

    return NextResponse.json(posts);
  } catch (error) {
    // Log the error but return mock data
    console.error('Error fetching Instagram posts:', error);
    console.log('Falling back to mock data');
    return NextResponse.json(MOCK_POSTS);
  }
} 