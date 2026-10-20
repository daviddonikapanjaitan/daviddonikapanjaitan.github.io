import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { profile } from "@/data/profile";
import { siteDescription, siteTitle } from "@/lib/seo";
import { asset, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = siteDescription();
const ogImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${profile.name}, Senior Backend & Full-Stack Developer`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description,
  authors: [{ name: profile.name, url: profile.linkedinUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Senior Backend Developer",
    "Full-Stack Developer",
    "Java",
    "Spring Boot",
    "Node.js",
    "Kafka",
    "React",
    "Jakarta",
    "Indonesia",
  ],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/`,
    siteName: profile.name,
    title: siteTitle,
    description,
    locale: "en_US",
    firstName: "David Donika",
    lastName: "Panjaitan",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Lets CSS hide not-yet-revealed sections only when JS is running. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <SkipLink />
          <Navbar
            name={profile.name}
            resumeHref={asset(profile.resumePath)}
            resumeFileName={profile.resumeFileName}
          />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer name={profile.name} />
          <RevealObserver />
        </ThemeProvider>
      </body>
    </html>
  );
}
