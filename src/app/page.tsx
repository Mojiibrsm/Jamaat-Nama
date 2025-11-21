
'use client';
import { useState, useMemo } from 'react';
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrimeCategoryGrid } from "@/components/crime-category-grid";
import { NewsFeed } from "@/components/news-feed";
import { useRouter } from 'next/navigation';
import { useArticles } from '@/hooks/use-articles';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [selectedLocation, setSelectedLocation] = useState('সব');
  const [selectedOffender, setSelectedOffender] = useState('সব');

  const { articles, loading } = useArticles();

  const categories = useMemo(() => ['সব', ...new Set(articles.map(a => a.category).filter(Boolean))], [articles]);
  const locations = useMemo(() => ['সব', ...new Set(articles.map(a => a.location).filter(Boolean))], [articles]);
  const offenders = useMemo(() => ['সব', ...new Set(articles.map(a => a.offender).filter(Boolean))], [articles]);


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
          loading={loading}
          searchTerm={""} // Initial feed is unfiltered
          categoryFilter={"সব"}
          locationFilter={"সব"}
          offenderFilter={"সব"}
        />
      </main>
    </div>
  );
}
