'use client';
import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/data';

const categories = ['সব', 'খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক'];

interface NewsFeedProps {
  articles: Article[];
  searchTerm: string;
}

export function NewsFeed({ articles, searchTerm }: NewsFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState('সব');

  const filteredArticles = useMemo(() => {
    // A temp solution to map categories for filtering
    const tempCategoryMap: { [key: string]: string } = {
      'হামলা': 'হামলা / সংঘর্ষ',
    };
    
    return articles.filter(article => {
      const articleCategory = article.category;
      const selected = tempCategoryMap[selectedCategory] || selectedCategory;

      const matchesCategory = selected === 'সব' || articleCategory === selected;
      const matchesSearch = searchTerm === '' || article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchTerm]);

  // A temp solution to map categories for display
  const displayCategories = useMemo(() => {
    const allCategories = ['সব', ...new Set(articles.map(a => a.category))];
     const categoryDisplayMap: { [key: string]: string } = {
      'হামলা / সংঘর্ষ': 'হামলা',
    };
    return allCategories.map(c => categoryDisplayMap[c] || c);
  }, [articles]);


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 animate-fade-in-up">
      <div className="mb-8 space-y-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full flex justify-center">
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
