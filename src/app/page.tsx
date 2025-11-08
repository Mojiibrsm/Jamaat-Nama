
'use client';
import { useState, useMemo } from 'react';
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrimeCategoryGrid } from "@/components/crime-category-grid";
import { NewsFeed } from "@/components/news-feed";
import { articles } from "@/lib/data";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [selectedLocation, setSelectedLocation] = useState('সব');
  const [selectedOffender, setSelectedOffender] = useState('সব');

  const categories = useMemo(() => ['সব', 'খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন'], []);
  const locations = useMemo(() => ['সব', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ', 'গাজীপুর', 'নারায়ণগঞ্জ', 'কুমিল্লা', 'যশোর', 'দিনাজপুর', 'বগুড়া'], []);
  const offenders = ['সব', 'জামায়াত', 'শিবির', 'বিএনপি', 'আওয়ামী লীগ', 'অন্যান্য'];

  const handleSearch = (searchState: { term: string; category: string; location: string; offender: string }) => {
    const { term, category, location, offender } = searchState;
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
        <Hero />
        <CrimeCategoryGrid 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          locations={locations}
          selectedOffender={selectedOffender}
          setSelectedOffender={setSelectedOffender}
          offenders={offenders}
          onSearch={handleSearch}
        />
        <NewsFeed 
          articles={articles} 
          searchTerm={""} // Initial feed is unfiltered
          categoryFilter={"সব"}
          locationFilter={"সব"}
          offenderFilter={"সব"}
        />
      </main>
    </div>
  );
}
