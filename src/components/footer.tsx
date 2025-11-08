import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="mb-2 inline-block">
               <Image 
                src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
                alt="Jamaat Nama Logo"
                width={180}
                height={48}
                className="object-contain"
              />
            </Link>
            <p className="text-muted-foreground">সত্য জানার প্ল্যাটফর্ম।</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg text-foreground mb-3">আমাদের লক্ষ্য</h3>
            <p className="text-muted-foreground leading-relaxed">
            আমরা বিশ্বাস করি, তথ্যই স্বাধীনতার ভিত্তি। এখানে প্রকাশিত প্রতিটি তথ্য যাচাই-বাছাই করে উপস্থাপন করা হয়, যাতে মানুষ ইতিহাসের প্রকৃত চিত্র জানতে পারে। এটি জামাত ও তাদের সহযোগীদের কার্যকলাপের একটি প্রমাণভিত্তিক সংকলন। আমরা তথ্য দিয়ে কথা বলি — সত্যের পথে নির্ভীক। আমাদের প্রতিজ্ঞা, বাংলাদেশের ইতিহাসের অন্ধকার অধ্যায়গুলোকে আলোর মুখ দেখানো এবং অপকর্ম তুলে ধরা, ঢেকে রাখা নয়।
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Jamaat Nama. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
