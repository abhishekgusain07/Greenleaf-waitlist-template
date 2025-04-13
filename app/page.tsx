"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Sparkles, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please complete all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, attempt to send the email
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        });

        if (!mailResponse.ok) {
          if (mailResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Email sending failed");
          }
          return;
        }

        // Add to PostgreSQL waitlist
        const waitlistResponse = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (!waitlistResponse.ok) {
          if (waitlistResponse.status === 429) {
            reject("Rate limited");
          } else if (waitlistResponse.status === 409) {
            reject("Already on waitlist");
          } else {
            reject("Database error");
          }
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist...",
      success: () => {
        setName("");
        setEmail("");
        return "You're on the waitlist! Welcome aboard ✨";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "Please try again in a few minutes";
        } else if (error === "Email sending failed") {
          return "We couldn't send you a confirmation email. Please try again.";
        } else if (error === "Database error") {
          return "Something went wrong. Please try again.";
        } else if (error === "Already on waitlist") {
          return "You're already on our waitlist!";
        }
        return "Something went wrong. Please try again.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,239,125,0.15),rgba(17,153,142,0.08)_20%,rgba(0,0,0,0)_65%)]" />
      
      {/* Header */}
      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-medium">GreenLeaf</span>
        </div>
        <a 
          href="https://github.com/abhishekgusain07/Greenleaf-waitlist-template" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white"
          aria-label="GitHub Repository"
        >
          <Github size={20} />
        </a>
      </header>

      <main className="relative mx-auto flex max-w-7xl flex-col-reverse items-center px-6 pb-24 pt-12 md:flex-row md:gap-12 md:pt-24 lg:gap-20">
        {/* Left Column - Form */}
        <motion.div 
          className="mt-12 w-full md:mt-0 md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm md:p-8">
            <h2 className="text-2xl font-semibold">Join the waitlist</h2>
            <p className="mt-2 text-zinc-400">Be the first to know when we launch.</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 space-y-3">
              {[
                "Early access to all features",
                "Priority support and onboarding",
                "Special founding member benefits"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check size={12} className="text-emerald-500" />
                  </div>
                  <span className="text-sm text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Hero Content */}
        <motion.div 
          className="w-full text-center md:w-1/2 md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="block">The smarter way to</span>
            <span className="mt-1 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              grow your audience
            </span>
          </h1>
          
          <p className="mt-6 text-zinc-400 md:text-lg lg:text-xl">
            Build a waitlist that converts. Collect leads, send beautiful emails, and launch your product with confidence.
          </p>
          
          <div className="mt-12">
            <p className="mb-3 text-sm text-zinc-500">Trusted by innovative teams</p>
            <div className="flex flex-wrap items-center justify-center gap-6 grayscale md:justify-start">
              {[
                { name: 'nextjs', alt: 'Next.js logo' },
                { name: 'neon', alt: 'Neon logo' },
                { name: 'resend', alt: 'Resend logo' },
                { name: 'upstash', alt: 'Upstash logo' },
                { name: 'vercel', alt: 'Vercel logo' }
              ].map((logo) => (
                <div key={logo.name} className="relative h-8 w-24">
                  <Image 
                    src={`/${logo.name}.svg`}
                    alt={logo.alt}
                    width={96}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="relative border-t border-zinc-800 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} GreenLeaf. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="https://x.com/agusainbuilds" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
