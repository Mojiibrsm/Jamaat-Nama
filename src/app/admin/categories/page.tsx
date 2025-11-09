
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Loader2, Edit, Trash } from "lucide-react";
import { useCategories, type Category } from "@/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useFirestore } from "@/firebase/provider";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AdminCategoriesPage() {
  const { categories, loading, error } = useCategories();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");


  const handleOpenDialog = (category: Category | null = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : "");
    setIsDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!categoryName.trim()) {
        toast({
            variant: "destructive",
            title: "ত্রুটি",
            description: "ক্যাটাগরির নাম খালি হতে পারে না।",
        });
        return;
    }
    
    if (!firestore) return;
    setIsSubmitting(true);

    try {
        if (currentCategory) {
            // Update existing category
            const categoryRef = doc(firestore, 'categories', currentCategory.id);
            await updateDoc(categoryRef, { name: categoryName });
            toast({
                title: "সাফল্য",
                description: "ক্যাটাগরিটি সফলভাবে আপডেট করা হয়েছে।",
            });
        } else {
            // Add new category
            await addDoc(collection(firestore, 'categories'), { name: categoryName });
            toast({
                title: "সাফল্য",
                description: "নতুন ক্যাটাগরিটি সফলভাবে যোগ করা হয়েছে।",
            });
        }
        setIsDialogOpen(false);
    } catch (e) {
        console.error("Error saving category:", e);
        toast({
            variant: "destructive",
            title: "ত্রুটি",
            description: "ক্যাটাগরি সংরক্ষণ করার সময় একটি সমস্যা হয়েছে।",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এই ক্যাটাগরিটি মুছে ফেলতে চান? এটি সম্পর্কিত সমস্ত সংবাদ থেকেও মুছে যেতে পারে।')) return;
    try {
      await deleteDoc(doc(firestore, "categories", id));
      toast({
        title: "সাফল্য",
        description: "ক্যাটাগরিটি সফলভাবে মুছে ফেলা হয়েছে।",
      });
    } catch (e) {
      console.error("Error deleting category: ", e);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "ক্যাটাগরিটি মোছার সময় একটি সমস্যা হয়েছে।",
      });
    }
  };

  return (
    <div className="flex-1 p-4 sm:px-6 sm:py-0">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>ক্যাটাগরি পরিচালনা</CardTitle>
              <CardDescription>
                এখানে আপনি সমস্ত ক্যাটাগরি যোগ, সম্পাদনা ও পরিচালনা করতে পারবেন।
              </CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()} size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                নতুন ক্যাটাগরি
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ক্যাটাগরির নাম</TableHead>
                <TableHead className="w-[100px]">কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                 ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center h-24 text-destructive">{error}</TableCell>
                </TableRow>
              ) : categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {category.name}
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
                        <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
                           <Edit className="mr-2 h-4 w-4" /> সম্পাদনা
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(category.id)} className="text-destructive">
                           <Trash className="mr-2 h-4 w-4" /> মুছে ফেলুন
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{currentCategory ? 'ক্যাটাগরি সম্পাদনা করুন' : 'নতুন ক্যাটাগরি যোগ করুন'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">নাম</Label>
                      <Input 
                          id="name" 
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          className="col-span-3"
                      />
                  </div>
              </div>
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">বাতিল</Button>
                  </DialogClose>
                  <Button onClick={handleSaveChanges} disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {currentCategory ? 'সংরক্ষণ' : 'যোগ করুন'}
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
