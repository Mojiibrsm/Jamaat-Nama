
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFirestore } from "@/firebase/provider";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Submission {
    id: string;
    title: string;
    category: string;
    name: string;
    submittedAt: Timestamp;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export default function SubmissionsPage() {
    const firestore = useFirestore();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

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
        }, (error) => {
            console.error("Error fetching submissions: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [firestore]);


  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <CardTitle>জমা পড়া খবর</CardTitle>
          <CardDescription>
            ব্যবহারকারীদের পাঠানো খবর এখানে অনুমোদন বা বাতিল করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>শিরোনাম</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>জমাদানকারী</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead>অবস্থা</TableHead>
                <TableHead>কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="space-x-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-20" />
                        </TableCell>
                    </TableRow>
                ))
              ) : submissions.length > 0 ? (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{submission.category}</Badge>
                    </TableCell>
                    <TableCell>{submission.name}</TableCell>
                    <TableCell>{submission.submittedAt ? new Date(submission.submittedAt.toDate()).toLocaleDateString('bn-BD') : 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={submission.status === 'Pending' ? 'destructive' : 'default'}>{submission.status}</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">দেখুন</Button>
                      <Button variant="default" size="sm">অনুমোদন</Button>
                      <Button variant="destructive" size="sm">বাতিল</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">কোনো জমা পড়া খবর পাওয়া যায়নি।</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
