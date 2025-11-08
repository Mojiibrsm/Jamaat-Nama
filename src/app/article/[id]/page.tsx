
'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles, Article } from '@/lib/data';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { ArticleSummary } from '@/components/article-summary';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

async function getArticle(id: string): Promise<Article | undefined> {
  return articles.find(article => article.id === id);
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    getArticle(params.id).then(fetchedArticle => {
      setArticle(fetchedArticle);
      if (fetchedArticle) {
        setFormattedDate(format(new Date(fetchedArticle.publicationDate), 'MMMM d, yyyy'));
      }
    });
  }, [params.id]);

  if (article === undefined) {
    // Loading state
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 py-8">
                <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="mb-6 space-y-4">
                        <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                        <div className="h-12 md:h-14 bg-muted rounded animate-pulse w-full"></div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg bg-muted animate-pulse"></div>
                    <div className="h-10 w-48 bg-muted rounded animate-pulse mb-8"></div>
                    <Separator className="my-8" />
                    <div className="space-y-6">
                        <div className="h-4 bg-muted rounded-full w-full animate-pulse"></div>
                        <div className="h-4 bg-muted rounded-full w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded-full w-full animate-pulse"></div>
                        <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse"></div>
                    </div>
                </article>
            </main>
        </div>
    )
  }

  if (article === null) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 py-8">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-6 space-y-4">
            <Badge variant="secondary" className="w-fit">{article.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>

          </div>
          
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              data-ai-hint={article.imageHint}
              priority
            />
          </div>

          <ArticleSummary content={article.content} />
          
          <Separator className="my-8" />

          <div className="text-lg text-foreground/90 space-y-6 leading-relaxed">
            {article.content.split('\\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}

// Keeping generateStaticParams, but metadata generation needs to be handled differently
// for a fully client-rendered approach. For now, we will make it a dynamic page.
// We can re-add static rendering if needed.
/*
export async function generateStaticParams() {
    return articles.map((article) => ({
      id: article.id,
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id);
    if (!article) {
        return {
            title: 'Article Not Found'
        }
    }
    return {
        title: `${article.title} | Jamaat Nama`,
        description: article.content.substring(0, 150)
    }
}
*/
