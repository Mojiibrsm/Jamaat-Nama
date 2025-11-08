import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles, Article } from '@/lib/data';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { ArticleSummary } from '@/components/article-summary';
import { Separator } from '@/components/ui/separator';

async function getArticle(id: string): Promise<Article | undefined> {
  return articles.find(article => article.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id);
    if (!article) {
        return {
            title: 'Article Not Found'
        }
    }
    return {
        title: `${article.title} | Sangbad Mimangsha`,
        description: article.content.substring(0, 150)
    }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
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
              <span>{format(new Date(article.publicationDate), 'MMMM d, yyyy')}</span>
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

export async function generateStaticParams() {
    return articles.map((article) => ({
      id: article.id,
    }));
}
