"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Send,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, this would send the form data to a server
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };
  
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        <span className="title-gradient">Get in Touch</span>
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-foreground/80">
        Have questions about Pınar's books, mindfulness sessions, or speaking engagements? 
        Reach out using the form below.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Connect with Pınar Eğilmez or her team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a 
                    href="mailto:contact@pinarezilmez.com" 
                    className="text-sm text-foreground/70 hover:text-primary"
                  >
                    contact@pinarezilmez.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Literary Agent</h3>
                  <p className="text-sm text-foreground/70">
                    For book-related inquiries:
                  </p>
                  <a 
                    href="mailto:agent@literaryagency.com" 
                    className="text-sm text-foreground/70 hover:text-primary"
                  >
                    agent@literaryagency.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Speaking Engagements</h3>
                  <p className="text-sm text-foreground/70">
                    For speaking requests:
                  </p>
                  <a 
                    href="mailto:speaking@pinarezilmez.com" 
                    className="text-sm text-foreground/70 hover:text-primary"
                  >
                    speaking@pinarezilmez.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Follow Pınar</CardTitle>
              <CardDescription>
                Stay connected on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href="https://twitter.com/pinarezilmez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
                <ExternalLink size={12} className="text-foreground/50 group-hover:text-primary transition-colors" />
              </a>
              
              <a 
                href="https://instagram.com/pinarezilmez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
                <ExternalLink size={12} className="text-foreground/50 group-hover:text-primary transition-colors" />
              </a>
              
              <a 
                href="https://facebook.com/pinarezilmez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Facebook
                <ExternalLink size={12} className="text-foreground/50 group-hover:text-primary transition-colors" />
              </a>
              
              <a 
                href="https://open.spotify.com/user/pinarezilmez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.36.242.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
                <ExternalLink size={12} className="text-foreground/50 group-hover:text-primary transition-colors" />
              </a>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and Pınar or her team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is your message regarding?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary-500"
                    />
                    <label htmlFor="newsletter" className="text-sm text-foreground/70">
                      Subscribe to Pınar's newsletter for updates on new books, events, and mindfulness sessions.
                    </label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="py-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">How quickly can I expect a response?</h3>
            <p className="text-foreground/80">
              Pınar and her team typically respond to inquiries within 2-3 business days.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">Can I request a book signing or event?</h3>
            <p className="text-foreground/80">
              Yes, please use the contact form and select "Events" in the subject line. Include details about your event.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">How do I request a review copy of a book?</h3>
            <p className="text-foreground/80">
              For review copies, please contact Pınar's literary agent directly with your credentials and publication details.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">Can I interview Pınar for my podcast/publication?</h3>
            <p className="text-foreground/80">
              Pınar is open to interview requests. Please provide details about your platform, audience, and proposed topics in your message.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 