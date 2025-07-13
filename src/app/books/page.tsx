import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";

// Book data
const books = [
  {
    id: "shadows-of-the-mind",
    title: "Shadows of the Mind",
    coverImage: "/images/book1.jpg",
    publishYear: 2018,
    pages: 324,
    isbn: "978-1-2345-6789-0",
    synopsis: "A psychological thriller that explores the darkest corners of human consciousness. When psychologist Dr. Elena Reyes begins treating a patient with unusual memory patterns, she unwittingly stumbles into a web of deception and buried trauma. As the lines between observer and observed begin to blur, Elena must confront her own psychological shadows before they consume her completely.",
    praise: [
      {
        quote: "A masterfully crafted psychological labyrinth that will keep you questioning reality until the final page.",
        source: "The Literary Review"
      },
      {
        quote: "Eğilmez's debut establishes her as a formidable new voice in psychological fiction.",
        source: "Thriller Monthly"
      }
    ],
    tags: ["Psychological Thriller", "Mystery", "Mental Health"]
  },
  {
    id: "whispers-in-the-dark",
    title: "Whispers in the Dark",
    coverImage: "/images/book2.jpg",
    publishYear: 2020,
    pages: 368,
    isbn: "978-1-2345-6790-6",
    synopsis: "A haunting tale of suspense and psychological manipulation. Journalist Kaya Özkan is investigating a series of mysterious disappearances in a small coastal town when she begins experiencing strange auditory hallucinations—whispers that seem to guide her investigation. As she follows these ghostly voices deeper into the town's secrets, Kaya must determine whether she's uncovering the truth or being led into a carefully constructed trap.",
    praise: [
      {
        quote: "Eğilmez crafts suspense with surgical precision, building tension so gradually you don't realize you're holding your breath until the stunning conclusion.",
        source: "Psychological Fiction Quarterly"
      },
      {
        quote: "A perfect blend of supernatural suggestion and psychological realism. 'Whispers in the Dark' confirms Eğilmez as a master of psychological tension.",
        source: "European Book Review"
      }
    ],
    tags: ["Suspense", "Small Town", "Supernatural Elements"]
  },
  {
    id: "the-silent-observer",
    title: "The Silent Observer",
    coverImage: "/images/book3.jpg",
    publishYear: 2022,
    pages: 392,
    isbn: "978-1-2345-6791-3",
    synopsis: "A mind-bending thriller about perception, reality, and the spaces in between. When behavioral scientist Deniz Aydın develops an experimental therapy to treat voyeuristic disorders, she creates an unexpected side effect—participants gain the ability to experience the physical sensations of the people they observe. As the boundaries between observer and subject dissolve completely, Deniz must navigate ethical dilemmas, dangerous obsessions, and the ultimate question: can we ever truly know another's mind?",
    praise: [
      {
        quote: "Philosophically profound and utterly terrifying. 'The Silent Observer' will make you question the nature of consciousness itself.",
        source: "Science Fiction & Psychology"
      },
      {
        quote: "Eğilmez's most ambitious work yet, seamlessly blending cutting-edge neuroscience with heart-stopping suspense.",
        source: "International Thriller Writers"
      }
    ],
    tags: ["Scientific Thriller", "Ethics", "Consciousness"]
  }
];

export default function Books() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Books by Pınar Eğilmez</span>
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-foreground/80">
        Discover the psychological thrillers that have captivated readers worldwide and 
        explore the dark corridors of the human mind.
      </p>

      <div className="space-y-24 mb-16">
        {books.map((book, index) => (
          <section key={book.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Book Image - Alternating left/right positions */}
            <div className={`col-span-1 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-20 pointer-events-none"></div>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Book Details */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{book.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/70 mb-4">
                  <span>Published: {book.publishYear}</span>
                  <span>Pages: {book.pages}</span>
                  <span>ISBN: {book.isbn}</span>
                </div>
              </div>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                {book.synopsis}
              </p>
              
              <div className="space-y-4 my-8">
                <h3 className="text-xl font-semibold text-primary">Praise for {book.title}</h3>
                {book.praise.map((item, i) => (
                  <div key={i} className="bg-card/40 p-5 rounded-lg">
                    <blockquote className="italic text-foreground/90">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-right mt-2 text-sm text-foreground/70">
                      — {item.source}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href={`https://amazon.com/books/${book.id}`} target="_blank">
                    Purchase Book
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link href={`/books/${book.id}`}>
                    Read Excerpt
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      {/* Coming Soon Section */}
      <section className="bg-card/50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p className="max-w-2xl mx-auto text-foreground/80 mb-6">
          Pınar is currently working on her fourth novel, exploring the thin line between 
          memory and imagination. Sign up for the newsletter to be the first to know when it's released.
        </p>
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
          <Link href="/#newsletter">Join the Newsletter</Link>
        </Button>
      </section>
    </div>
  );
} 