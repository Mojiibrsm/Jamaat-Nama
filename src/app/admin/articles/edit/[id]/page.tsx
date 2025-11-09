'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirestore } from '@/firebase/provider';
import { doc, getDoc } from 'firebase/firestore';
import type { Article } from '@/lib/data';
import { ArticleForm } from '@/components/admin/article-form';
import { Skeleton } from '@/components/ui/skeleton';

async function getArticle(firestore: any, id: string): Promise<Article | null> {
  const docRef = doc(firestore, 'articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Article;
  }
  return null;
}

export default function EditArticlePage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const firestore = useFirestore();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !id) return;
    
    getArticle(firestore, id).then(articleData => {
      if (articleData) {
        setArticle(articleData);
      } else {
        notFound();
      }
      setLoading(false);
    });
  }, [firestore, id]);

  if (loading) {
    return (
        <div className="flex-1 p-4 sm:px-6 sm:py-0">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-8">
                   <Skeleton className="h-10 w-full" />
                   <div className="grid grid-cols-2 gap-8">
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                   </div>
                   <Skeleton className="h-40 w-full" />
                   <Skeleton className="h-10 w-32" />
                </CardContent>
            </Card>
        </div>
    )
  }
  
  if (!article) return null;


  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <CardTitle>সংবাদ সম্পাদনা করুন</CardTitle>
          <CardDescription>
            নিচের ফর্মটি ব্যবহার করে সংবাদটি সম্পাদনা করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArticleForm initialData={article} />
        </CardContent>
      </Card>
    </div>
  );
}
