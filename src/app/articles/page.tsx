import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, Clock, ArrowRight, BookOpen, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Articles data
const articles = [
  {
    id: "the-psychology-of-fear",
    title: "The Psychology of Fear in Fiction",
    excerpt: "An exploration of how psychological thrillers tap into our most primal fears and why readers are drawn to stories that frighten them.",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/images/article1.jpg",
    tags: ["Psychology", "Writing Craft", "Thriller"],
    featured: true
  },
  {
    id: "creating-complex-characters",
    title: "Creating Complex Characters with Psychological Depth",
    excerpt: "How to develop characters with authentic psychological motivations, internal conflicts, and growth arcs that resonate with readers.",
    date: "April 22, 2023",
    readTime: "12 min read",
    image: "/images/article2.jpg",
    tags: ["Character Development", "Writing Craft"],
    featured: true
  },
  {
    id: "mindfulness-for-writers",
    title: "Mindfulness Practices for Creative Writers",
    excerpt: "Specific mindfulness techniques that can help writers overcome blocks, enhance creativity, and develop a sustainable writing practice.",
    date: "March 30, 2023",
    readTime: "10 min read",
    image: "/images/article3.jpg",
    tags: ["Mindfulness", "Creativity", "Writing Practice"],
    featured: true
  },
  {
    id: "ethical-dilemmas",
    title: "Ethical Dilemmas as Plot Drivers",
    excerpt: "How moral questions and ethical conflicts can create compelling narrative tension and character development in psychological fiction.",
    date: "February 18, 2023",
    readTime: "9 min read",
    image: "/images/article4.jpg",
    tags: ["Plot Development", "Ethics", "Writing Craft"]
  },
  {
    id: "unreliable-narrators",
    title: "The Art of the Unreliable Narrator",
    excerpt: "Techniques for creating narrators whose perspective is compromised, and how this device can enhance psychological suspense.",
    date: "January 25, 2023",
    readTime: "11 min read",
    image: "/images/article5.jpg",
    tags: ["Narrative Technique", "Suspense"]
  },
  {
    id: "trauma-in-fiction",
    title: "Depicting Trauma Responsibly in Fiction",
    excerpt: "Guidelines for writers on how to portray traumatic experiences with sensitivity, accuracy, and respect for readers who may have similar lived experiences.",
    date: "December 12, 2022",
    readTime: "14 min read",
    image: "/images/article6.jpg",
    tags: ["Trauma", "Ethics", "Writing Craft"]
  },
  {
    id: "setting-as-psychology",
    title: "Setting as Psychology: Using Environment to Reflect Character",
    excerpt: "How physical environments in fiction can mirror, contrast with, or influence the psychological states of your characters.",
    date: "November 5, 2022",
    readTime: "7 min read",
    image: "/images/article7.jpg",
    tags: ["Setting", "Character Development"]
  },
  {
    id: "writers-meditation",
    title: "A Writer's Guide to Meditation",
    excerpt: "A beginner-friendly introduction to meditation practices specifically tailored for writers and creative thinkers.",
    date: "October 20, 2022",
    readTime: "9 min read",
    image: "/images/article8.jpg",
    tags: ["Meditation", "Mindfulness", "Writing Practice"]
  }
];

// Categories for the filter
const categories = [
  { name: "Writing Craft", count: 4 },
  { name: "Psychology", count: 2 },
  { name: "Mindfulness", count: 2 },
  { name: "Character Development", count: 2 },
  { name: "Ethics", count: 2 },
  { name: "Creativity", count: 1 },
  { name: "Narrative Technique", count: 1 },
  { name: "Thriller", count: 1 },
  { name: "Trauma", count: 1 },
  { name: "Meditation", count: 1 },
  { name: "Setting", count: 1 },
  { name: "Plot Development", count: 1 },
  { name: "Suspense", count: 1 },
  { name: "Writing Practice", count: 2 }
];

export default function Articles() {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);
  
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Articles & Insights</span>
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-foreground/80">
        Explore Pınar's thoughts on writing, psychology, mindfulness, and the creative process.
      </p>
      
      {/* Featured Articles */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary" />
          Featured Articles
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <Card 
              key={article.id} 
              className={`overflow-hidden border-transparent hover:border-primary/30 transition-all ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              } card-hover`}
            >
              <div className={`relative ${index === 0 ? 'h-80' : 'h-56'} w-full`}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-primary/20 text-primary border-none text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/80">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button 
                  variant="ghost" 
                  className="px-0 text-primary hover:text-primary/90 hover:bg-transparent"
                  asChild
                >
                  <Link href={`/articles/${article.id}`} className="flex items-center gap-2">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* All Articles */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant="outline"
                      size="sm"
                      className="text-xs border-primary/20 text-foreground/80 hover:text-primary hover:border-primary/40 flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {category.name} <span className="text-foreground/50 text-[10px]">({category.count})</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-primary">Join the Newsletter</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Subscribe to receive new articles, writing tips, and updates from Pınar directly to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90">Subscribe</Button>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-primary">About the Author</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/author.jpg"
                      alt="Pınar Eğilmez"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Pınar Eğilmez</h4>
                    <p className="text-xs text-foreground/60">Author & Mindfulness Practitioner</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">
                  Pınar is a psychological thriller author and mindfulness coach who explores the
                  depths of human consciousness through her writing and teaching.
                </p>
                <Button 
                  variant="link" 
                  className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
                  asChild
                >
                  <Link href="/biography">Read full biography</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Articles Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              All Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="overflow-hidden border-transparent hover:border-primary/30 transition-all card-hover"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="bg-primary/5 border-primary/20 text-primary text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <div className="flex items-center gap-4 text-foreground/60 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {article.readTime}
                      </span>
                    </div>
                    <p className="text-foreground/80 text-sm line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button 
                      variant="ghost" 
                      className="px-0 text-primary hover:text-primary/90 hover:bg-transparent"
                      asChild
                    >
                      <Link href={`/articles/${article.id}`} className="flex items-center gap-2">
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-foreground/80 hover:text-primary hover:border-primary/40"
                  disabled
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary/40 bg-primary/5"
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-foreground/80 hover:text-primary hover:border-primary/40"
                >
                  2
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-foreground/80 hover:text-primary hover:border-primary/40"
                >
                  3
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-foreground/80 hover:text-primary hover:border-primary/40"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 