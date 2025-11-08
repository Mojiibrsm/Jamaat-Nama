'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ArticleForm } from '@/components/admin/article-form';
import { scrapeArticleContent } from '@/ai/flows/article-scraper';
import type { Article } from '@/lib/data';

export default function NewArticlePage() {
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [initialData, setInitialData] = useState<Partial<Article> | null>(null);
  const { toast } = useToast();

  const handleScrape = async () => {
    if (!url) {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "অনুগ্রহ করে একটি বৈধ নিউজ লিংক দিন।",
      });
      return;
    }
    setIsScraping(true);
    setInitialData(null);
    try {
      const result = await scrapeArticleContent({ articleUrl: url });
      setInitialData({
        title: result.title,
        content: result.content,
        publicationDate: result.publicationDate,
        category: result.category,
        location: result.location,
        newsSource: result.newsSource,
        newsLink: url,
      });
      toast({
        title: "সাফল্য",
        description: "নিবন্ধ থেকে তথ্য সফলভাবে সংগ্রহ করা হয়েছে।",
      });
    } catch (error) {
      console.error('Failed to scrape article:', error);
      toast({
        variant: "destructive",
        title: "সংগ্রহ ব্যর্থ হয়েছে",
        description: "নিবন্ধ থেকে তথ্য সংগ্রহ করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে ফর্মটি ম্যানুয়ালি পূরণ করুন।",
      });
       // Provide a basic form even if scraping fails
      setInitialData({ newsLink: url });
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <CardTitle>নতুন সংবাদ যোগ করুন</CardTitle>
          <CardDescription>
            একটি নতুন সংবাদ যোগ করতে নিচের ফর্মটি পূরণ করুন অথবা একটি লিংক থেকে তথ্য সংগ্রহ করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="url-scrape">লিংক থেকে তথ্য সংগ্রহ করুন</Label>
                <div className="flex gap-2">
                    <Input 
                        id="url-scrape"
                        placeholder="এখানে নিউজ লিংক পেস্ট করুন"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isScraping}
                    />
                    <Button onClick={handleScrape} disabled={isScraping}>
                        {isScraping ? <Loader2 className="animate-spin" /> : <LinkIcon />}
                        <span className="ml-2 hidden sm:inline">তথ্য সংগ্রহ করুন</span>
                    </Button>
                </div>
            </div>
            
            {isScraping && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">তথ্য সংগ্রহ করা হচ্ছে...</p>
                </div>
            )}
            
            {(initialData || !url) && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      অথবা ম্যানুয়ালি পূরণ করুন
                    </span>
                  </div>
                </div>
                <ArticleForm initialData={initialData} />
              </>
            )}

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
