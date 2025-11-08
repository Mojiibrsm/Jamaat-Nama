
'use client';
import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase/provider';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Article } from '@/lib/data';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    setLoading(true);
    const articlesQuery = query(collection(firestore, "articles"), orderBy("publicationDate", "desc"));

    const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
      const articlesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(articlesData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching articles:", err);
      setError("খবর লোড করতে সমস্যা হয়েছে।");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  return { articles, loading, error };
}
