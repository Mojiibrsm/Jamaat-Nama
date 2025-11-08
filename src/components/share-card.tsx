
'use client';

import React from 'react';
import Image from 'next/image';
import { Article } from '@/lib/data';

interface ShareCardProps {
  article: Article;
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(({ article }, ref) => {
  return (
    <div ref={ref} className="bg-background" style={{ width: 1200, height: 630 }}>
      <div className="w-full h-full flex flex-col p-16 bg-card text-card-foreground">
        <div className="flex-grow flex items-center">
            {article.imageUrl && (
              <div className="w-1/3 h-full relative mr-12 rounded-lg overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={article.imageUrl ? "w-2/3" : "w-full"}>
                <h1 className="text-5xl font-headline font-bold text-primary leading-tight mb-6">
                    {article.title}
                </h1>
                <p className="text-2xl text-foreground/80 leading-relaxed line-clamp-4">
                    {article.content.split('\n')[0]}
                </p>
            </div>
        </div>
        <footer className="mt-auto flex justify-between items-center pt-8 border-t border-border">
          <div className="text-4xl font-headline font-bold text-primary">
            Jamaat Nama
          </div>
          <p className="text-xl text-muted-foreground">jamaatnama.com</p>
        </footer>
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
