
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Image from 'next/image';

const navLinks = [
    { href: '/', label: 'সব খবর' },
    { href: '/archive', label: 'আর্কাইভ' },
    { href: '/about-us', label: 'আমাদের সম্পর্কে' },
    { href: '/news-patan', label: 'খবর পাঠান' },
    { href: '/privacy-policy', label: 'গোপনীয়তা নীতি' },
];

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-40 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium w-1/3">
            {navLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                    {link.label}
                </Link>
            ))}
        </nav>
        <div className="flex-1 md:flex-none flex justify-center md:w-1/3">
            <Link href="/">
              <Image 
                src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
                alt="Jamaat Nama Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>
        </div>
        <nav className="hidden md:flex items-center justify-end gap-6 text-sm font-medium w-1/3">
            {navLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                    {link.label}
                </Link>
            ))}
        </nav>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/80">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-primary text-primary-foreground">
                    <div className="flex flex-col gap-6 p-6">
                         <Link href="/">
                            <Image 
                                src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
                                alt="Jamaat Nama Logo"
                                width={150}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-lg font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
