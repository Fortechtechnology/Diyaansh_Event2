"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

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
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg animate-pulse bg-white-900/20" />
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

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-semibold text-center px-2">
          {alt}
        </span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "galleryImages"));
        const items: { src: string; alt: string }[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.src && data.alt) {
            items.push({ src: data.src, alt: data.alt });
          }
        });
        setImages(items);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxLoaded(false);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <Navigation activeSection="gallery" />

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

        {/* Gallery grid or skeletons */}
        {/* <section className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-48 w-full rounded-lg bg-red-900/10 animate-pulse"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-400">No images found.</p>
          ) : (
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
          )}
        </section> */}
        <section className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-48 w-full rounded-lg bg-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-400">No images found.</p>
          ) : (
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
          )}
        </section>
      </main>

      {/* Lightbox */}
      {lightboxOpen && images[currentImageIndex] && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {!lightboxLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full max-h-[80vh] rounded-lg animate-pulse bg-white/10" />
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
    </div>
  );
}
