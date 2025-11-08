
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useArticles } from "@/hooks/use-articles";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";

export default function AdminArticlesPage() {
  const { articles, loading, error } = useArticles();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এই সংবাদটি মুছে ফেলতে চান?')) return;
    try {
      await deleteDoc(doc(firestore, "articles", id));
      toast({
        title: "সাফল্য",
        description: "সংবাদটি সফলভাবে মুছে ফেলা হয়েছে।",
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "সংবাদটি মোছার সময় একটি সমস্যা হয়েছে।",
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/articles/edit/${id}`);
  }


  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>সংবাদ পরিচালনা</CardTitle>
              <CardDescription>
                এখানে আপনি সমস্ত সংবাদ সম্পাদনা ও পরিচালনা করতে পারবেন।
              </CardDescription>
            </div>
            <Button asChild size="sm" className="gap-1">
              <Link href="/admin/articles/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  নতুন সংবাদ যোগ করুন
                </span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>শিরোনাম</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead className="hidden md:table-cell">
                  প্রকাশের তারিখ
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                 ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-destructive">{error}</TableCell>
                </TableRow>
              ) : articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="hidden sm:table-cell">
                    {article.imageUrl ? (
                        <img
                        alt={article.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={article.imageUrl}
                        width="64"
                        />
                    ) : (
                        <div className="aspect-square rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {article.publicationDate ? new Date(article.publicationDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/${slugify(article.category)}/${article.slug}`} target="_blank">দেখুন</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(article.id)}>সম্পাদনা করুন</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(article.id)}>মুছে ফেলুন</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
