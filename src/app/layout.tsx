import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { FirebaseProvider } from "@/firebase/provider";

export const metadata: Metadata = {
  title: "Jamaat Nama",
  description: "AI-চালিত সংবাদ সংক্ষিপ্তকরণ এবং বিশ্লেষণ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <FirebaseProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster />
        </FirebaseProvider>
      </body>
    </html>
  );
}
