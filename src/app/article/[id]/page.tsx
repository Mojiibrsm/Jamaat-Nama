
'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, User, Newspaper, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ArticleSummary } from '@/components/article-summary';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase/provider';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

async function getArticle(firestore: any, id: string): Promise<Article | null> {
  const docRef = doc(firestore, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Article;
  }
  return null;
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!firestore || !params.id) return;
      setLoading(true);
      const articleData = await getArticle(firestore, params.id);
      if (articleData) {
        setArticle(articleData);
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchArticle();
  }, [firestore, params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 py-8">
          <article className="container mx-auto px-4 md:px-6 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-8">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
            </div>
            <Skeleton className="relative h-64 md:h-96 w-full mb-8 rounded-lg" />
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }
  
  const formattedDate = article.publicationDate ? format(new Date(article.publicationDate), 'MMMM d, yyyy') : '';

  const metadataItems = [
    { icon: CalendarDays, label: `প্রকাশিত: ${formattedDate}` },
    { icon: Badge, label: article.category, isBadge: true },
    { icon: MapPin, label: `স্থান: ${article.location}` },
    { icon: User, label: `অভিযুক্ত: ${article.offender}` },
    { icon: Newspaper, label: `সূত্র: ${article.newsSource}` },
    { icon: LinkIcon, label: 'মূল খবর দেখুন', href: article.newsLink },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 py-8">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight mb-6">
            {article.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-8 text-sm text-foreground/80">
            {metadataItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary transition-colors">
                    {item.label}
                  </a>
                ) : item.isBadge ? (
                    <Badge variant="secondary">{item.label}</Badge>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
          
          {article.imageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={article.imageHint || 'news article'}
                priority
                />
            </div>
          )}

          <ArticleSummary content={article.content} />
          
          <Separator className="my-8" />

          <div className="text-lg text-foreground/90 space-y-6 leading-relaxed">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          {article.newsLink && (
            <div className="my-8 flex justify-center">
                <Button asChild size="lg">
                    <a href={article.newsLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        মূল সূত্র দেখুন
                    </a>
                </Button>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
