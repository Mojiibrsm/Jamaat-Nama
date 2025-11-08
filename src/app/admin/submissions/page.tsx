
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFirestore } from "@/firebase/provider";
import { collection, serverTimestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmissions, Submission } from "@/hooks/use-submissions";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

export default function SubmissionsPage() {
    const { submissions, loading, error } = useSubmissions();
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleApprove = async (submission: Submission) => {
        if (!firestore) return;

        const newArticle = {
            ...submission,
            id: undefined, // Let firestore generate a new ID
            publicationDate: new Date().toISOString(),
            status: 'Approved',
        };
        delete newArticle.id; // remove id field before adding to articles
        delete newArticle.submittedAt; // this field is not needed in articles

        try {
            // Add to articles collection
            const articleRef = doc(collection(firestore, "articles"));
            await setDoc(articleRef, { ...newArticle, id: articleRef.id });

            // Update submission status
            const submissionRef = doc(firestore, "submissions", submission.id);
            await updateDoc(submissionRef, { status: "Approved" });

            toast({
                title: "অনুমোদিত",
                description: "খবরটি সফলভাবে অনুমোদন করা হয়েছে এবং প্রকাশ করা হয়েছে।",
            });
        } catch (e) {
            console.error("Error approving submission: ", e);
            toast({
                variant: "destructive",
                title: "ত্রুটি",
                description: "খবরটি অনুমোদন করার সময় একটি সমস্যা হয়েছে।",
            });
        }
    };

    const handleReject = async (id: string) => {
        if (!firestore) return;
        try {
            const submissionRef = doc(firestore, "submissions", id);
            await updateDoc(submissionRef, { status: "Rejected" });
            toast({
                title: "বাতিল",
                description: "খবরটি বাতিল করা হয়েছে।",
                variant: 'destructive',
            });
        } catch (e) {
            console.error("Error rejecting submission: ", e);
             toast({
                variant: "destructive",
                title: "ত্রুটি",
                description: "খবরটি বাতিল করার সময় একটি সমস্যা হয়েছে।",
            });
        }
    };

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
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-destructive">{error}</TableCell>
                </TableRow>
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
                      <Badge 
                        variant={submission.status === 'Pending' ? 'destructive' : submission.status === 'Approved' ? 'default' : 'secondary'}
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" size="sm">দেখুন</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{submission.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p><strong>জমাদানকারী:</strong> {submission.name}</p>
                            <p><strong>ইমেইল:</strong> {submission.email || 'দেওয়া হয়নি'}</p>
                            <p><strong>ক্যাটাগরি:</strong> {submission.category}</p>
                            <p><strong>মূল খবরের লিংক:</strong> <a href={submission.newsLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{submission.newsLink}</a></p>
                            <p><strong>বিস্তারিত:</strong> {submission.details || 'দেওয়া হয়নি'}</p>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">বন্ধ করুন</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {submission.status === 'Pending' && (
                        <>
                          <Button onClick={() => handleApprove(submission)} variant="default" size="sm">অনুমোদন</Button>
                          <Button onClick={() => handleReject(submission.id)} variant="destructive" size="sm">বাতিল</Button>
                        </>
                      )}
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
