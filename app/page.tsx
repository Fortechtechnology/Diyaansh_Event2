"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function EventOrganizerWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(true);

  // Hero slider images
  const heroSlides = [
    {
      image: "/images/img1.JPG",
      title: "High on Music Festival",
      subtitle: "Creating magical moments under the stars",
      description:
        "Transform your special occasions into unforgettable experiences with our premium event planning services.",
    },
    {
      image: "/images/banner2.JPG",
      title: "Garba Dhamaka: Dance • Dazzle • Celebrate!",
      subtitle: "Experience the rhythm of tradition",
      description:
        "Get ready to twirl, sparkle, and celebrate the spirit of Garba like never before!",
    },

    {
      video: "/images/v2.mp4", // <-- your video file path
      title: "Cultural Gatherings",
      subtitle: "Celebrating traditions and communities",
      description:
        "We specialize in organizing large-scale cultural events that bring people together in celebration.",
    },
  ];
  useEffect(() => {
    // Add a check for window existence
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const sections = ["home", "services", "about", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance hero slider
  // useEffect(() => {
  //   // Add a check for window existence
  //   if (typeof window === "undefined") return;

  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  //   }, 6000);
  //   return () => clearInterval(timer);
  // }, [heroSlides.length]);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide(
  //     (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
  //   );
  // };

  useEffect(() => {
    if (heroSlides[currentSlide].video) return; // ⛔ Do not auto-advance if it's a video
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);
  useEffect(() => {
    if (heroSlides[currentSlide].video) {
      setShowText(true);
      const timer = setTimeout(() => setShowText(false), 5000); // Hide after 5 sec
      return () => clearTimeout(timer);
    } else {
      setShowText(true);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };
  const services = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Corporate Events",
      description:
        "Professional conferences, seminars, and business gatherings that leave lasting impressions.",
      features: [
        "Team Building",
        "Product Launches",
        "Annual Meetings",
        "Awards Ceremonies",
      ],
      image: "/images/balloon-celebration.png",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Wedding Planning",
      description:
        "Creating magical moments for your special day with attention to every detail.",
      features: ["Venue Selection", "Catering", "Photography", "Entertainment"],
      image: "/images/elegant-dinner.png",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Events",
      description:
        "Memorable celebrations for birthdays, anniversaries, and special occasions.",
      features: [
        "Birthday Parties",
        "Anniversaries",
        "Graduations",
        "Family Reunions",
      ],
      image: "/images/cultural-festival.png",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Entertainment Events",
      description:
        "Spectacular shows, concerts, and entertainment experiences.",
      features: [
        "Concerts",
        "Fashion Shows",
        "Art Exhibitions",
        "Cultural Events",
      ],
      image: "/images/balloon-celebration.png",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Artist Management",
      description:
        "Spectacular shows, concerts, and entertainment experiences.",
      features: [
        "Concerts",
        "Fashion Shows",
        "Art Exhibitions",
        "Cultural Events",
      ],
      image: "/images/balloon-celebration.png",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Sound production",
      description:
        "Expert sound production for events of all sizes, ensuring crystal-clear audio.",
      features: [
        "Venue Selection",
        "Logistics Coordination",
        "On-Site Management",
        "Vendor Liaison",
      ],
      image: "/images/cultural-festival.png",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Tentage &  Decor",
      description:
        "Elegant tentage and decor solutions to transform any space into a stunning venue.",
      features: [
        "Budget Planning",
        "Theme Development",
        "Timeline Management",
        "Vendor Recommendations",
      ],
      image: "/images/elegant-dinner.png",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Crowd Management",
      description:
        "Efficient crowd management solutions for large events, ensuring safety and smooth operations.",
      features: [
        "Menu Planning",
        "Food Tasting",
        "Beverage Selection",
        "Service Staff",
      ],
      image: "/images/balloon-celebration.png",
    },
  ];

  const portfolio = [
    {
      title: "Garba Dazzle 2k24",
      category: "Entertainment",
      image: "/images/Garba.png",
      attendees: "10000+",
      description:
        "A vibrant Garba night filled with music, dance, colorful attire, and festive spirit celebrating tradition with joyful energy..",
    },
    {
      title: "Rang E Sufi",
      category: "Entertainment",
      image: "/images/holi.png",
      attendees: "5000+",
      description:
        "A soulful evening of Sufi music, poetry, and colors celebrating love, devotion, and spiritual harmony.",
    },
    {
      title: "Run for a Girl Child",
      category: "Social Cause",
      image: "/images/girl.jpg",
      attendees: "10000+",
      description:
        "Run for a Girl Child: A social initiative promoting education, empowerment, and equality for girls through community participation and awareness.",
    },
    {
      title: "Garba Dazzle 2.0 2k25",
      category: "Entertainment",
      image: "/images/183.JPG",
      attendees: "12000+",
      description:
        "Garba Dazzle: A dazzling night of rhythmic dance, vibrant outfits, and cultural celebration under the festive Navratri lights. ",
    },
  ];
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "EventMaster transformed our annual conference into an unforgettable experience. The attention to detail was exceptional!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Wedding Client",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Our wedding was absolutely perfect. Every moment was magical, and our guests are still talking about it!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Cultural Association",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "They managed our 2000+ attendee festival flawlessly. Professional, creative, and culturally sensitive.",
      rating: 5,
    },
  ];

  const stats = [
    {
      number: "100+",
      label: "Events Organized",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      number: "50K+",
      label: "Happy Clients",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "3+",
      label: "Years Experience",
      icon: <Award className="w-5 h-5" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      {/* Enhanced Header */}
      <Navigation activeSection={activeSection} />
      <SmoothScroll />

      {/* Hero Section with Dynamic Image Slider */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-950/50 to-black/80 z-10"></div>
              {slide.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover absolute inset-0"
                >
                  <source src={slide.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-red-600/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-red-600/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-500 scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-red-600/30 text-red-300 border-red-500/50 hover:bg-red-600/50 animate-pulse-slow px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
              Premium Event Planning
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent animate-text-shimmer leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4 text-red-300 animate-fade-in-delayed">
              {heroSlides[currentSlide].subtitle}
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              {heroSlides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/50 rounded-lg"
              >
                Book Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-red-400 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-black/20 rounded-lg"
              >
                <Play className="mr-2 w-4 h-4" />
                Explore
              </Button>
            </div>
          </div>
        </div> */}
        {showText && (
          <div className="relative z-20 container mx-auto px-4 text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-red-600/30 text-red-300 border-red-500/50 hover:bg-red-600/50 animate-pulse-slow px-4 py-1">
                <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
                Premium Event Planning
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent animate-text-shimmer leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4 text-red-300 animate-fade-in-delayed">
                {heroSlides[currentSlide].subtitle}
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                {heroSlides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/50 rounded-lg"
                >
                  Book Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-red-400 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 px-6 py-3 font-bold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-black/20 rounded-lg"
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-red-500/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-red-400/30 rounded-full animate-float-delayed blur-sm"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-red-600/25 rounded-full animate-pulse-slow blur-sm"></div>
        <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-red-300/35 rounded-full animate-ping-slow blur-sm"></div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-950/40 via-black to-red-950/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/balloon-celebration.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-red-500/30">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30 px-4 py-1">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              What We Do Best
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we specialize in
              creating events that exceed expectations and create lasting
              memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-red-900/30 hover:border-red-500/70 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20 overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <CardHeader className="relative p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-red-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs text-gray-300"
                      >
                        <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-red-950/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/elegant-dinner.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30 px-4 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-red-900/30 hover:border-red-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-red-500 mb-4 opacity-50" />
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-red-400 text-xs">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30 px-4 py-1 animate-fade-in-up">
                About EventMaster
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent animate-fade-in-up">
                Crafting Dreams Into Reality
              </h2>
              <div className="space-y-4 animate-fade-in-delayed">
                <p className="text-base text-gray-300 leading-relaxed">
                  With over{" "}
                  <span className="text-red-400 font-semibold">
                    5 years of experience
                  </span>{" "}
                  in the event planning industry, EventMaster has established
                  itself as a premier event organizing company. We believe that
                  every event tells a story, and we're here to help you tell
                  yours in the most spectacular way possible.
                </p>
                <p className="text-base text-gray-300 leading-relaxed">
                  Our team of{" "}
                  <span className="text-red-400 font-semibold">
                    creative professionals
                  </span>{" "}
                  brings passion, expertise, and attention to detail to every
                  project. From concept to execution, we handle every aspect of
                  your event with precision and care.
                </p>
                <div className="bg-gradient-to-r from-red-900/20 to-transparent p-4 rounded-lg border-l-4 border-red-500 my-6">
                  <p className="text-gray-200 italic">
                    "We don't just plan events - we create experiences that
                    leave lasting impressions and bring people together in
                    celebration."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 animate-slide-up">
                <div className="text-center p-4 bg-gradient-to-br from-red-900/40 via-red-800/20 to-transparent rounded-lg border border-red-900/30 hover:border-red-600/50 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-red-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    100+
                  </div>
                  <div className="text-gray-300 text-sm">Events Completed</div>
                  <div className="w-full bg-red-900/30 rounded-full h-1 mt-2">
                    <div className="bg-red-500 h-1 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-900/40 via-red-800/20 to-transparent rounded-lg border border-red-900/30 hover:border-red-600/50 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-red-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    95%
                  </div>
                  <div className="text-gray-300 text-sm">
                    Client Satisfaction
                  </div>
                  <div className="w-full bg-red-900/30 rounded-full h-1 mt-2">
                    <div className="bg-red-500 h-1 rounded-full w-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in">
                {/* <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300 rounded-lg shadow-lg hover:shadow-red-500/30">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300 rounded-lg bg-transparent"
                >
                  View Our Story
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button> */}
              </div>
            </div>

            <div className="relative order-1 lg:order-2 animate-tilt">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-800/30 rounded-2xl transform rotate-6 blur-sm animate-pulse-slow"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-red-900/30 hover:border-red-600/50 transition-all duration-500 group">
                <Image
                  src="/images/about.JPG"
                  alt="About Diyaansh Events - Cultural Festival"
                  width={500}
                  height={600}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="text-white font-semibold text-sm mb-1">
                      High on Music Festival
                    </h4>
                    <p className="text-gray-300 text-xs">
                      One of our signature large-scale events
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/30 rounded-full animate-bounce-slow blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400/40 rounded-full animate-float-delayed blur-sm"></div>
            </div>
          </div>

          {/* Additional About Content */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Award Winning</h3>
              <p className="text-gray-400 text-sm">
                Recognized for excellence in event planning and execution
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-400 text-sm">
                Professional event planners with diverse expertise
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">
                Passionate Service
              </h3>
              <p className="text-gray-400 text-sm">
                Dedicated to making your vision come to life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section
        id="portfolio"
        className="py-16 bg-gradient-to-br from-red-950/20 to-black"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30 px-4 py-1">
              Our Portfolio
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Recent Success Stories
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Take a look at some of our most memorable events and see how we
              bring visions to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-red-900/30 hover:border-red-600/50 transition-all duration-300 group overflow-hidden hover:transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-600 text-white text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-white group-hover:text-red-400 transition-colors text-base">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-300">
                      <Users className="w-3 h-3 mr-1 text-red-500" />
                      {project.attendees} Attendees
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 text-xs p-1"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30 px-4 py-1">
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Let's Plan Your Next Event
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Ready to create something extraordinary? Contact us today and
              let's discuss how we can bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-gray-300">+91 9717279705 </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">
                      diyaanshevents@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Address</div>
                    <div className="text-gray-300">Shalimar Bagh,New Delhi</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Business Hours
                    </div>
                    <div className="text-gray-300">24X7 available</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-red-900/30 hover:border-red-500/50 transition-all duration-300">
              <CardHeader className="p-6">
                <CardTitle className="text-white text-xl">
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-400">
                  We would love to hear from you! Fill out the form below and
                  our team will get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                      Full Name
                    </label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white h-10"
                      placeholder="John"
                    />
                  </div>
                  {/* <div>
                    <label className="text-sm text-gray-300 mb-2 block font-medium">
                      Last Name
                    </label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white h-10"
                      placeholder="Doe"
                    />
                  </div> */}
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block font-medium">
                    Email
                  </label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white h-10"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block font-medium">
                    Phone Number
                  </label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white h-10"
                    placeholder="+91 9717279705"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block font-medium">
                    Event Type
                  </label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white h-10"
                    placeholder="Wedding, Corporate, etc."
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block font-medium">
                    Message
                  </label>
                  <Textarea
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Tell us about your event..."
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300 rounded-lg">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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

            <div>
              <h4 className="text-white font-semibold mb-4">Book Now</h4>
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

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-red-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#portfolio"
                    className="hover:text-red-500 transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-red-500 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="hover:text-red-500 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 text-sm p-2"
                >
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 text-sm p-2"
                >
                  Instagram
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 text-sm p-2"
                >
                  Twitter
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-red-900/30 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Diyaansh Events. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
