
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const submissions = [
    {
        id: 'sub1',
        title: 'নতুন একটি দুর্নীতির খবর',
        category: 'দুর্নীতি',
        submittedBy: 'একজন সচেতন নাগরিক',
        date: '2024-07-25',
        status: 'Pending'
    },
    {
        id: 'sub2',
        title: 'হামলার ঘটনা',
        category: 'হামলা / সংঘর্ষ',
        submittedBy: 'নাম প্রকাশে অনিচ্ছুক',
        date: '2024-07-24',
        status: 'Pending'
    }
];

export default function SubmissionsPage() {
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
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{submission.category}</Badge>
                  </TableCell>
                  <TableCell>{submission.submittedBy}</TableCell>
                  <TableCell>{new Date(submission.date).toLocaleDateString('bn-BD')}</TableCell>
                  <TableCell>
                    <Badge variant={submission.status === 'Pending' ? 'destructive' : 'default'}>{submission.status}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm">দেখুন</Button>
                    <Button variant="default" size="sm">অনুমোদন</Button>
                    <Button variant="destructive" size="sm">বাতিল</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
