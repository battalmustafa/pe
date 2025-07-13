import Link from "next/link";
import Image from "next/image";
import { Music, Play, Headphones, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Spotify data
const spotifyData = {
  podcast: {
    title: "The Mindful Writer",
    description: "Join Pınar Eğilmez as she explores the intersection of creativity, psychology, and mindfulness. Each episode features discussions with fellow writers, psychologists, and mindfulness practitioners about the creative process, psychological well-being, and mindful living.",
    episodes: [
      {
        id: "ep-12",
        title: "The Psychology of Thriller Writing",
        description: "How psychological thrillers tap into our deepest fears and what this reveals about human psychology.",
        duration: "48:21",
        date: "April 15, 2023"
      },
      {
        id: "ep-11",
        title: "Mindfulness for Creative Blocks",
        description: "Techniques for overcoming writer's block and creative stagnation through mindfulness practices.",
        duration: "52:07",
        date: "March 28, 2023"
      },
      {
        id: "ep-10",
        title: "Character Development and Psychology",
        description: "Creating authentic, psychologically complex characters that resonate with readers.",
        duration: "45:33",
        date: "March 10, 2023"
      }
    ]
  },
  playlists: [
    {
      id: "writing-flow",
      title: "Writing Flow",
      description: "Music that helps Pınar enter a state of creative flow while writing psychological thrillers.",
      image: "/images/playlist1.jpg",
      tracks: 28
    },
    {
      id: "mindful-moments",
      title: "Mindful Moments",
      description: "Ambient sounds and gentle melodies for mindfulness practice and meditation.",
      image: "/images/playlist2.jpg",
      tracks: 15
    },
    {
      id: "dark-inspiration",
      title: "Dark Inspiration",
      description: "The music that inspired the atmospheric tension in Pınar's novels.",
      image: "/images/playlist3.jpg",
      tracks: 22
    }
  ],
  bookSoundtracks: [
    {
      book: "Shadows of the Mind",
      playlist: "Shadows Soundtrack",
      description: "The unofficial soundtrack that captures the mood and themes of Shadows of the Mind.",
      image: "/images/book1.jpg",
      link: "https://open.spotify.com/playlist/shadwkahsdkjh"
    },
    {
      book: "Whispers in the Dark",
      playlist: "Whispers Soundtrack",
      description: "Music that evokes the coastal mystery setting of Whispers in the Dark.",
      image: "/images/book2.jpg",
      link: "https://open.spotify.com/playlist/whsiadaksdhak"
    },
    {
      book: "The Silent Observer",
      playlist: "Observer Soundtrack",
      description: "A soundscape to accompany the ethical dilemmas and suspense of The Silent Observer.",
      image: "/images/book3.jpg",
      link: "https://open.spotify.com/playlist/silentashbdjkhsa"
    }
  ]
};

export default function SpotifyPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Pınar on Spotify</span>
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-foreground/80">
        Explore Pınar's podcast, playlists, and book soundtracks that complement her 
        written works and mindfulness practice.
      </p>
      
      {/* Podcast Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Headphones className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Podcast: {spotifyData.podcast.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <Music className="h-12 w-12 text-primary mb-4" />
                <p className="text-lg mb-6 text-foreground/80">
                  {spotifyData.podcast.description}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link 
                    href="https://open.spotify.com/show/themindfulwriter" 
                    target="_blank"
                    className="flex items-center gap-2 w-full justify-center"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.36.242.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Listen on Spotify
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Recent Episodes</h3>
              {spotifyData.podcast.episodes.map((episode) => (
                <Card key={episode.id} className="bg-card/50 hover:bg-card transition-colors duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{episode.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {episode.date} • {episode.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 text-sm">{episode.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-2">
                      <Play size={16} />
                      Play Episode
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link 
                    href="https://open.spotify.com/show/themindfulwriter" 
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    View All Episodes
                    <ExternalLink size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Playlists Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Music className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Curated Playlists</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotifyData.playlists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden border-border group card-hover">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={playlist.image}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 flex items-center justify-center p-0">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{playlist.title}</CardTitle>
                <CardDescription>
                  {playlist.tracks} tracks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 text-sm">{playlist.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-primary/10 p-0 flex items-center gap-2">
                  <Link 
                    href={`https://open.spotify.com/playlist/${playlist.id}`} 
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    Open in Spotify
                    <ExternalLink size={14} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Book Soundtracks Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Book Soundtracks</h2>
        </div>
        
        <p className="text-lg mb-8 max-w-3xl text-foreground/80">
          Each of Pınar's novels has an accompanying Spotify playlist that captures the mood, 
          atmosphere, and emotional journey of the book. Listen while you read for an enhanced experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotifyData.bookSoundtracks.map((soundtrack, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-md group card-hover">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={soundtrack.image}
                  alt={soundtrack.book}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-white font-bold text-xl mb-1">{soundtrack.book}</h3>
                  <p className="text-white/90 text-sm">{soundtrack.playlist}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-foreground/70 text-sm mb-4">{soundtrack.description}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link 
                    href={soundtrack.link} 
                    target="_blank"
                    className="flex items-center gap-2 w-full justify-center"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.36.242.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Listen to Soundtrack
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 