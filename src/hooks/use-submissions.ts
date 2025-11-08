
'use client';
import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase/provider';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Submission {
    id: string;
    title: string;
    newsLink: string;
    details: string;
    name: string;
    email: string;
    category: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    submittedAt: Timestamp;
}


export function useSubmissions() {
    const firestore = useFirestore();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!firestore) return;

        const q = query(collection(firestore, "submissions"), orderBy("submittedAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const subs: Submission[] = [];
            querySnapshot.forEach((doc) => {
                subs.push({ id: doc.id, ...doc.data() } as Submission);
            });
            setSubmissions(subs);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching submissions: ", err);
            setError("জমা করা খবর লোড করতে সমস্যা হয়েছে।");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [firestore]);

    return { submissions, loading, error };
}
