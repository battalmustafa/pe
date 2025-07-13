import Image from "next/image";

export default function Biography() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">About Pınar Eğilmez</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="col-span-1">
          <div className="sticky top-24">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg shadow-lg mb-6">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-20 pointer-events-none"></div>
              <Image
                src="/images/author-bio.jpg"
                alt="Pınar Eğilmez"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-foreground/70">Born:</span>
                  <span className="font-medium">Istanbul, Turkey</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-foreground/70">Genre:</span>
                  <span className="font-medium">Psychological Thriller</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-foreground/70">Published Works:</span>
                  <span className="font-medium">3 Novels</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-foreground/70">Education:</span>
                  <span className="font-medium">Psychology, Literature</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed">
              Pınar Eğilmez is a renowned psychological thriller author known for her deep exploration 
              of the human psyche and masterful storytelling that keeps readers on the edge of their seats.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Early Life & Background</h2>
            <p>
              Born and raised in Istanbul, Turkey, Pınar developed an early fascination with the 
              complexities of human behavior. She pursued dual degrees in Psychology and Literature, 
              which would later inform her uniquely insightful approach to character development and 
              psychological tension in her novels.
            </p>
            
            <p>
              After completing her academic studies, Pınar worked as a clinical psychologist for several 
              years, an experience that provided her with invaluable insights into the human mind and 
              its vulnerabilities—themes that prominently feature in her work.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Literary Career</h2>
            <p>
              Pınar's debut novel, "Shadows of the Mind," was published to critical acclaim in 2018, 
              establishing her as a powerful new voice in psychological fiction. Critics praised her 
              ability to create tension and suspense while maintaining psychological authenticity and depth.
            </p>
            
            <p>
              Her subsequent works, "Whispers in the Dark" (2020) and "The Silent Observer" (2022), 
              further cemented her reputation for crafting intricate plots with unexpected twists and 
              complex, nuanced characters. Each book delves into different aspects of psychological 
              fragility, fear, and human resilience.
            </p>
            
            <div className="bg-card/40 p-6 rounded-lg my-8 border-l-4 border-accent">
              <blockquote className="text-xl italic font-semibold text-foreground/90">
                "I write to explore the shadowed corners of the mind—places we rarely venture 
                willingly but that shape so much of who we are. In fiction, we can safely examine 
                these depths and perhaps understand ourselves a little better."
              </blockquote>
              <p className="text-right mt-4 text-foreground/70">— Pınar Eğilmez</p>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Mindfulness Practice</h2>
            <p>
              In addition to her writing, Pınar is a certified mindfulness instructor who believes 
              in the transformative power of mindfulness practices. She developed her own approach 
              to mindfulness that incorporates elements of storytelling and psychological techniques.
            </p>
            
            <p>
              Her mindfulness sessions have gained popularity for their unique blend of psychological 
              insight, narrative elements, and traditional mindfulness practices. Pınar believes that 
              mindfulness offers a powerful counterbalance to the psychological tensions she explores 
              in her fiction.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Current Work & Future Projects</h2>
            <p>
              Pınar is currently working on her fourth novel, while also expanding her mindfulness 
              practice through online sessions and workshops. She continues to be fascinated by the 
              intersection of psychology, storytelling, and mindfulness—a combination that informs all 
              aspects of her work.
            </p>
            
            <p>
              When not writing or leading mindfulness sessions, Pınar enjoys traveling, photography, 
              and exploring the rich cultural heritage of her native Turkey. She lives in Istanbul with 
              her cat, Mavi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 