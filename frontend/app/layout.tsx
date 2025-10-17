import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Poker Sports Association - Member Registration",
  description: "Official member registration for Thai Poker Sports Association. Join our community and register online in just a few minutes.",
  keywords: ["Thai Poker", "Poker Association", "Member Registration", "Thailand Poker", "สมาคมกีฬาโป๊กเกอร์ไทย"],
  authors: [{ name: "Thai Poker Sports Association" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Thai Poker Sports Association",
    description: "Official member registration for Thai Poker Sports Association",
    url: "https://www.thaipokersportsassociation.com",
    siteName: "Thai Poker Sports Association",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Thai Poker Sports Association Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thai Poker Sports Association",
    description: "Official member registration for Thai Poker Sports Association",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
