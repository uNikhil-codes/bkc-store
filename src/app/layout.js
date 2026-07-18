import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstaBrowserWarning from "@/components/shared/InstaBrowserWarning";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BigKidFinds | Premium Curated Finds",
  description: "Curated aesthetic finds and impulse-worthy products.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface text-primary antialiased min-h-screen flex flex-col`}>
        <InstaBrowserWarning />
        <Navbar />

        {/* Changed max-w-md to max-w-7xl for full desktop support */}
        <main className="flex-1 w-full max-w-7xl mx-auto relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
