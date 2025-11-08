'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { NewsFeed } from '@/components/news-feed';
import { SearchSection } from '@/components/search-section';
import { articles } from '@/lib/data';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'সব');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'সব');
  const [selectedOffender, setSelectedOffender] = useState(searchParams.get('offender') || 'সব');

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'সব');
    setSelectedLocation(searchParams.get('location') || 'সব');
    setSelectedOffender(searchParams.get('offender') || 'সব');
  }, [searchParams]);

  const categories = useMemo(() => ['সব', 'খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন'], []);
  const locations = useMemo(() => ['সব', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ', 'গাজীপুর', 'নারায়ণগঞ্জ', 'কুমিল্লা', 'যশোর', 'দিনাজপুর', 'বগুড়া'], []);
  const offenders = ['সব', 'জামায়াত', 'শিবির', 'বিএনপি', 'আওয়ামী লীগ', 'অন্যান্য'];

  const handleSearch = (newSearchState: { term: string; category: string; location: string; offender: string }) => {
    const { term, category, location, offender } = newSearchState;
    setSearchTerm(term);
    setSelectedCategory(category);
    setSelectedLocation(location);
    setSelectedOffender(offender);

    const params = new URLSearchParams();
    if (term) params.set('q', term);
    if (category && category !== 'সব') params.set('category', category);
    if (location && location !== 'সব') params.set('location', location);
    if (offender && offender !== 'সব') params.set('offender', offender);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <SearchSection 
              searchTerm={searchTerm} 
              setSearchTerm={(term) => handleSearch({ term, category: selectedCategory, location: selectedLocation, offender: selectedOffender })}
              selectedCategory={selectedCategory}
              setSelectedCategory={(category) => handleSearch({ term: searchTerm, category, location: selectedLocation, offender: selectedOffender })}
              categories={categories}
              selectedLocation={selectedLocation}
              setSelectedLocation={(location) => handleSearch({ term: searchTerm, category: selectedCategory, location, offender: selectedOffender })}
              locations={locations}
              selectedOffender={selectedOffender}
              setSelectedOffender={(offender) => handleSearch({ term: searchTerm, category: selectedCategory, location: selectedLocation, offender })}
              offenders={offenders}
              onSearch={handleSearch}
            />
          </div>
        </section>
        <NewsFeed 
          articles={articles} 
          searchTerm={searchTerm}
          categoryFilter={selectedCategory}
          locationFilter={selectedLocation}
          offenderFilter={selectedOffender}
        />
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
