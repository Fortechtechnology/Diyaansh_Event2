import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Diyaansh Events- Your Premier Event Organizer",
  description:
    "Creating unforgettable experiences through exceptional event planning and execution.",
  generator: "Ayush Srivastava",
  applicationName: "Event Organizer",
  keywords: [
    "event organizer",
    "event planning",
    "event management",
    "corporate events",
    "wedding planning",
  ],
  authors: [
    { name: "Ayush Srivastava", url: "https://github.com/Ayush2811002" },
  ],
  icons: {
    icon: "/images/logo.png", // or use /logo.png
  },
  // TODO: Add Open Graph metadata for better SEO & social sharing
  // openGraph: {
  //   title: "Diyaansh Events",
  //   description: "Creating unforgettable experiences...",
  //   url: "https://yourdomain.com",
  //   siteName: "Diyaansh Events",
  //   images: [
  //     {
  //       url: "/images/seo-banner.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Diyaansh Events banner",
  //     },
  //   ],
  //   type: "website",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
