
'use client';
import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase/provider';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export interface Category {
    id: string;
    name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    setLoading(true);
    const categoriesQuery = query(collection(firestore, "categories"), orderBy("name", "asc"));

    const unsubscribe = onSnapshot(categoriesQuery, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(categoriesData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching categories:", err);
      setError("ক্যাটাগরি লোড করতে সমস্যা হয়েছে।");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  return { categories, loading, error };
}
