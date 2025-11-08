'use client';
import { useState } from 'react';
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrimeCategoryGrid } from "@/components/crime-category-grid";
import { NewsFeed } from "@/components/news-feed";
import { articles } from "@/lib/data";
import { SearchSection } from "@/components/search-section";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CrimeCategoryGrid />
        <NewsFeed articles={articles} searchTerm={searchTerm} />
      </main>
    </div>
  );
}
