import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstaBrowserWarning from "@/components/shared/InstaBrowserWarning";
import SupportBubble from "@/components/shared/SupportBubble";

/* One typeface, like Apple's single SF family — hierarchy through
   weight, size, and tracking instead of switching fonts */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "BigKidFinds | Curated Finds, Clearly Delivered",
  description:
    "Thoughtfully curated products with transparent pricing, secure payments, and delivery across India.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-primary antialiased flex flex-col">
        <InstaBrowserWarning />
        <Navbar />
        <main className="relative flex-1 w-full max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
        <SupportBubble />
      </body>
    </html>
  );
}
