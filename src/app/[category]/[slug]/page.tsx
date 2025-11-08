
'use client';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, User, Newspaper, Link as LinkIcon, ExternalLink, Share2, Copy, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { ArticleSummary } from '@/components/article-summary';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase/provider';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { slugify } from '@/lib/utils';


async function getArticle(firestore: any, category: string, slug: string): Promise<Article | null> {
    const articlesRef = collection(firestore, 'articles');
    const q = query(articlesRef, where("slug", "==", slug), where("category", "==", category));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        // Fallback for categories with special characters
        const allArticles = await getDocs(collection(firestore, 'articles'));
        let foundArticle: DocumentData | null = null;
        allArticles.forEach(doc => {
            if (slugify(doc.data().category) === category && doc.data().slug === slug) {
                foundArticle = doc.data();
            }
        });
        if(foundArticle) {
            return foundArticle as Article;
        }

        return null;
    }

    return querySnapshot.docs[0].data() as Article;
}

export default function ArticlePage({ params }: { params: { category: string, slug: string } }) {
  const { category, slug } = params;
  const firestore = useFirestore();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isShareSupported, setIsShareSupported] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "লিংক কপি করা হয়েছে!",
      description: "আপনি এখন এই লিংকটি শেয়ার করতে পারেন।",
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: `"${article.title}" খবরটি পড়ুন Jamaat Nama-তে`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };


  useEffect(() => {
    const fetchArticle = async () => {
      if (!firestore || !category || !slug) return;
      setLoading(true);

      const decodedCategory = decodeURIComponent(category);
      const allCategories = ['খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন', 'অন্যান্য'];
      const matchingCategory = allCategories.find(c => slugify(c) === decodedCategory) || decodedCategory;

      const articleData = await getArticle(firestore, matchingCategory, slug);
      if (articleData) {
        setArticle(articleData);
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchArticle();
  }, [firestore, category, slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 py-8">
          <article className="container mx-auto px-4 md:px-6 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-48 mb-6" />
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
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight mb-4">
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

           <div className="my-8 space-y-6">
              {article.newsLink && (
                  <div className="text-center">
                      <Button asChild size="lg">
                          <a href={article.newsLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-5 w-5" />
                              মূল সূত্র দেখুন
                          </a>
                      </Button>
                  </div>
              )}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <TooltipProvider>
                      {isShareSupported && (
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Button onClick={handleShare} variant="outline" size="icon">
                                      <Share2 className="h-5 w-5" />
                                      <span className="sr-only">শেয়ার করুন</span>
                                  </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p>শেয়ার করুন</p>
                              </TooltipContent>
                          </Tooltip>
                      )}
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button onClick={handleCopyLink} variant="outline" size="icon">
                                  <Copy className="h-5 w-5" />
                                  <span className="sr-only">লিংক কপি করুন</span>
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>লিংক কপি করুন</p>
                          </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                          <TooltipTrigger asChild>
                            <Button asChild variant="outline" size="icon">
                                <Link href={`/${slugify(article.category)}/${article.slug}/print`} target="_blank">
                                    <Printer className="h-5 w-5" />
                                    <span className="sr-only">প্রিন্ট করুন</span>
                                </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>প্রিন্ট করুন</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </div>
            </div>
        </article>
      </main>
    </div>
  );
}
