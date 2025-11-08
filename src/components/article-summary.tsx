'use client';

import { useState } from 'react';
import { summarizeArticle } from '@/ai/flows/article-summarization';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function ArticleSummary({ content }: { content: string }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeArticle({ articleContent: content });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to summarize article:', error);
      toast({
        variant: "destructive",
        title: "সংক্ষিপ্তকরণ ব্যর্থ হয়েছে",
        description: "সারাংশ তৈরি করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleSummarize} disabled={isLoading} variant="outline">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
        )}
        AI দিয়ে সংক্ষেপ করুন
      </Button>
      {isLoading && (
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg font-headline">
                    <Sparkles className="mr-2 h-5 w-5 text-primary"/>
                    সারাংশ তৈরি করা হচ্ছে...
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="h-4 bg-muted rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded-full w-5/6 animate-pulse"></div>
                <div className="h-4 bg-muted rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse"></div>
            </CardContent>
         </Card>
      )}
      {summary && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-headline text-primary">
                <Sparkles className="mr-2 h-5 w-5"/>
                AI সারাংশ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
