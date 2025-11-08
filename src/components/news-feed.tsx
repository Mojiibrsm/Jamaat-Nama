'use client';
import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/data';

interface NewsFeedProps {
  articles: Article[];
  searchTerm: string;
  categoryFilter: string;
  locationFilter: string;
  offenderFilter: string;
}

export function NewsFeed({ articles, searchTerm, categoryFilter, locationFilter, offenderFilter }: NewsFeedProps) {
  const [selectedTab, setSelectedTab] = useState('সব');

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.location.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTabCategory = selectedTab === 'সব' || article.category === selectedTab;
      
      const matchesDropdownCategory = categoryFilter === 'সব' || article.category === categoryFilter;

      const matchesLocation = locationFilter === 'সব' || article.location === locationFilter;
      
      const matchesOffender = offenderFilter === 'সব' || article.offender.includes(offenderFilter);

      return matchesSearch && matchesTabCategory && matchesDropdownCategory && matchesLocation && matchesOffender;
    });
  }, [articles, searchTerm, selectedTab, categoryFilter, locationFilter, offenderFilter]);

  const displayCategories = useMemo(() => {
    const allCategories = ['সব', ...new Set(articles.map(a => a.category))];
     const categoryDisplayMap: { [key: string]: string } = {
      'হামলা / সংঘর্ষ': 'হামলা',
    };
    // This is a temporary fix, ideally the data should be consistent
    const uniqueCategories = [...new Set(allCategories.map(c => categoryDisplayMap[c] || c))];
    return uniqueCategories;
  }, [articles]);


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 animate-fade-in-up">
      <div className="mb-8 space-y-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full flex justify-center">
          <TabsList className="overflow-x-auto">
            {displayCategories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
            <h2 className="text-2xl font-headline font-semibold">কোনো খবর পাওয়া যায়নি</h2>
            <p className="text-muted-foreground mt-2">আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে দেখুন।</p>
        </div>
      )}
    </div>
  );
}
