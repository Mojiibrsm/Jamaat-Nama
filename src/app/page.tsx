'use client';
import { useState, useMemo } from 'react';
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrimeCategoryGrid } from "@/components/crime-category-grid";
import { NewsFeed } from "@/components/news-feed";
import { articles } from "@/lib/data";
import { SearchSection } from "@/components/search-section";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [selectedLocation, setSelectedLocation] = useState('সব');
  const [selectedOffender, setSelectedOffender] = useState('সব');

  const categories = useMemo(() => ['সব', ...new Set(articles.map(a => a.category))], []);
  const locations = useMemo(() => ['সব', ...new Set(articles.map(a => a.location))], []);
  // A more robust way would be to have a predefined list of offenders
  const offenders = ['সব', 'জামায়াত', 'শিবির', 'বিএনপি', 'আওয়ামী লীগ', 'অন্যান্য'];


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <SearchSection 
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
        />
        <CrimeCategoryGrid />
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
