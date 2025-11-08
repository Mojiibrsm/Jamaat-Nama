import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-headline font-bold text-primary">
          Sangbad Mimangsha
        </Link>
      </div>
    </header>
  );
}
