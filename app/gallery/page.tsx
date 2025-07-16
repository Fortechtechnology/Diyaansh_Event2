"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import Link from "next/link";

// ────────────────────────────────────────────────────────────────────────────────
//  Reusable gallery‑card with skeleton shimmer
// ────────────────────────────────────────────────────────────────────────────────

interface GalleryImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      {/* Skeleton shimmer while the <Image> loads */}
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg animate-pulse bg-red-900/20" />
      )}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={500}
        height={300}
        onLoadingComplete={() => setLoaded(true)}
        className={`object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Alt text overlay (shown on hover) */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-semibold text-center px-2">
          {alt}
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
//  Gallery page
// ────────────────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const images = [
    { src: "/images/elegant-dinner.png", alt: "Elegant Dinner Event" },
    {
      src: "/images/balloon-celebration.png",
      alt: "Balloon Celebration Event",
    },
    { src: "/images/cultural-festival.png", alt: "Cultural Festival Event" },
    { src: "/images/elegant-dinner.png", alt: "Another Elegant Dinner Event" },
    {
      src: "/images/balloon-celebration.png",
      alt: "Another Balloon Celebration Event",
    },
    {
      src: "/images/cultural-festival.png",
      alt: "Another Cultural Festival Event",
    },
  ];

  // ──────────────────────────────────────
  //  Lightbox helpers
  // ──────────────────────────────────────
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxLoaded(false); // reset skeleton
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  // ──────────────────────────────────────
  //  Render
  // ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Persisted UI */}
      <ScrollProgress />
      <Navigation activeSection="gallery" />

      {/* ────────────────────────── Hero */}
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent animate-fade-in-up">
            Our Event Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-delayed">
            Explore the magic we create through our captivating event
            photographs.
          </p>
        </section>

        {/* ────────────────────────── Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <GalleryImage
                key={idx}
                src={img.src}
                alt={img.alt}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ────────────────────────── Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Image + nav */}
          <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Skeleton while large image loads */}
            {!lightboxLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full max-h-[80vh] rounded-lg animate-pulse bg-red-900/20" />
            )}

            <Image
              src={images[currentImageIndex].src || "/placeholder.svg"}
              alt={images[currentImageIndex].alt}
              width={1200}
              height={800}
              onLoadingComplete={() => setLightboxLoaded(true)}
              className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-500 ${
                lightboxLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20 z-10"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        </div>
      )}

      {/* ────────────────────────── Footer */}
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-red-900/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src="/images/logo2.png" // adjust path if needed
                    alt="Diyaansh Event Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Diyaansh Events
                </span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                Creating unforgettable experiences through exceptional event
                planning and execution.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    href="https://sklbx.com/cPvyT6k4"
                    className="hover:text-red-500 transition-colors"
                  >
                    SkillBox
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://in.bookmyshow.com/activities/garba-dazzle-2-0/ET00452675?webview=true"
                    className="hover:text-red-500 transition-colors"
                  >
                    Book My Show
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.district.in/events/garba-dazlle-20-sep27-2025-buy-tickets"
                    className="hover:text-red-500 transition-colors"
                  >
                    District By Zomato
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="#"
                    className="hover:text-red-500 transition-colors"
                  >
                    Entertainment
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {["About Us", "Portfolio", "Testimonials", "Contact"].map(
                  (c) => (
                    <li key={c}>
                      <Link
                        href="#"
                        className="hover:text-red-500 transition-colors"
                      >
                        {c}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-2">
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <Button
                    key={social}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500 text-sm p-2"
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-red-900/30 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} EventMaster. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
