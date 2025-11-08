import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
    { href: '/about-us', label: 'আমাদের সম্পর্কে' },
    { href: '/news-patan', label: 'খবর পাঠান' },
    { href: '/privacy-policy', label: 'গোপনীয়তা নীতি' },
];

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-headline font-bold text-primary">
          Jamaat Nama
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-foreground/70 transition-colors hover:text-foreground">
                    {link.label}
                </Link>
            ))}
        </nav>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-6 p-6">
                        <Link href="/" className="text-2xl font-headline font-bold text-primary">
                            Jamaat Nama
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/70 transition-colors hover:text-foreground">
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