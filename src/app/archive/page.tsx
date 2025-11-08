import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/data';
import Link from 'next/link';

export default function ArchivePage() {
  const years = [...new Set(articles.map(a => new Date(a.publicationDate).getFullYear()))].sort((a, b) => b - a);
  
  const articlesByYear: { [key: number]: typeof articles } = {};
  years.forEach(year => {
    articlesByYear[year] = articles.filter(a => new Date(a.publicationDate).getFullYear() === year);
  });

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
              {years.map(year => (
                <div key={year}>
                  <h2 className="text-2xl font-bold mb-4 text-primary/80">{year}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {articlesByYear[year].map(article => (
                      <Link key={article.id} href={`/article/${article.id}`} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold text-foreground/90">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{new Date(article.publicationDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
