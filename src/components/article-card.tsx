import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/data';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={article.imageHint}
          />
        </div>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {article.content}
          </p>
          <div className="flex items-center text-xs text-muted-foreground mt-4">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{format(new Date(article.publicationDate), 'MMMM d, yyyy')}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
