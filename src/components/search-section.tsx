
'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: string[];
  selectedOffender: string;
  setSelectedOffender: (offender: string) => void;
  offenders: string[];
}

export function SearchSection({ 
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory, categories,
  selectedLocation, setSelectedLocation, locations,
  selectedOffender, setSelectedOffender, offenders,
}: SearchSectionProps) {
  return (
    <div className="bg-muted/50 rounded-xl p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="শিরোনাম, বিবরণ বা স্থান দিয়ে খবর খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 h-14 rounded-full bg-background border-2 border-border focus:border-primary shadow-lg"
              aria-label="Search articles"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 rounded-full bg-background shadow-lg border-2">
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-12 rounded-full bg-background shadow-lg border-2">
                <SelectValue placeholder="স্থান" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedOffender} onValueChange={setSelectedOffender}>
              <SelectTrigger className="h-12 rounded-full bg-background shadow-lg border-2">
                <SelectValue placeholder="অভিযুক্ত" />
              </SelectTrigger>
              <SelectContent>
                {offenders.map(off => <SelectItem key={off} value={off}>{off}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
      </div>
    </div>
  );
}
