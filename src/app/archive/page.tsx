
'use client';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from '@/lib/data';
import Link from 'next/link';
import { useArticles } from '@/hooks/use-articles';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArchivePage() {
  const { articles, loading, error } = useArticles();

  const articlesByYear = articles.reduce((acc: { [key: number]: Article[] }, article) => {
    if (article.publicationDate) {
      const year = new Date(article.publicationDate).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(article);
    }
    return acc;
  }, {});

  const sortedYears = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-primary">আর্কাইভ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {loading ? (
                <div className="space-y-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-8 w-24 mb-4" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-destructive text-center">{error}</p>
              ) : sortedYears.length > 0 ? (
                sortedYears.map(year => (
                  <div key={year}>
                    <h2 className="text-2xl font-bold mb-4 text-primary/80">{year}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {articlesByYear[year]?.map(article => (
                        <Link key={article.id} href={`/article/${article.id}`} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <h3 className="font-semibold text-foreground/90">{article.title}</h3>
                          {article.publicationDate && (
                            <p className="text-sm text-muted-foreground mt-1">{new Date(article.publicationDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">কোনো আর্কাইভ পাওয়া যায়নি।</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
