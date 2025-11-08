'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchSection({ searchTerm, setSearchTerm }: SearchSectionProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 animate-fade-in-up">
       <div className="mb-8 space-y-6">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-10">
            অনুসন্ধান করুন
        </h2>
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="আপনার পছন্দের খবর খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 h-14 rounded-full bg-background/80 backdrop-blur-sm border-2 border-border focus:border-primary shadow-lg"
            aria-label="Search articles"
          />
        </div>
      </div>
    </div>
  );
}
