
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, User, Newspaper, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { useFirestore } from '@/firebase/provider';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ShareCard } from '@/components/share-card';
import { toPng } from 'html-to-image';


async function getArticle(firestore: any, id: string): Promise<Article | null> {
  const docRef = doc(firestore, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Article;
  }
  return null;
}

export default function PrintArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const firestore = useFirestore();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!firestore || !id) return;
      setLoading(true);
      const articleData = await getArticle(firestore, id);
      if (articleData) {
        setArticle(articleData);
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchArticle();
  }, [firestore, id]);

   useEffect(() => {
    if (!loading && article) {
      setTimeout(() => window.print(), 1000);
    }
  }, [loading, article]);

  const handleDownloadImage = async () => {
    if (shareCardRef.current === null) {
      return;
    }
    try {
      const dataUrl = await toPng(shareCardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${article?.title.replace(/ /g, '_') || 'share-card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
         <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  if (!article) {
    return notFound();
  }
  
  const formattedDate = article.publicationDate ? format(new Date(article.publicationDate), 'MMMM d, yyyy') : '';

  const metadataItems = [
    { icon: CalendarDays, label: `প্রকাশিত: ${formattedDate}` },
    { icon: MapPin, label: `স্থান: ${article.location}` },
    { icon: User, label: `অভিযুক্ত: ${article.offender}` },
    { icon: Newspaper, label: `সূত্র: ${article.newsSource}` },
  ];

  return (
      <main className="py-8 bg-white text-black">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl mb-8">
            <header className="flex justify-between items-center mb-8 pb-4 border-b">
                <div className="text-3xl font-headline font-bold text-primary">
                    <Image 
                      src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
                      alt="Jamaat Nama Logo"
                      width={180}
                      height={48}
                      className="object-contain"
                    />
                </div>
                <div className="no-print space-x-2">
                    <Button onClick={handleDownloadImage} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        শেয়ার কার্ড ডাউনলোড করুন
                    </Button>
                    <Button onClick={() => window.print()}>প্রিন্ট করুন</Button>
                </div>
            </header>
            <article>
              <Badge variant="secondary" className="mb-4">{article.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight mb-4">
                {article.title}
              </h1>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8 text-sm text-gray-700">
                {metadataItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              
              {article.imageUrl && (
                <div className="relative h-64 md:h-96 w-full mb-8">
                    <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    />
                </div>
              )}

              <div className="prose prose-lg max-w-none text-black space-y-6 leading-relaxed">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </article>
        </div>
        <div className="absolute -z-10 -left-[9999px] top-0">
             <ShareCard article={article} ref={shareCardRef} />
        </div>
      </main>
  );
}
