'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/data";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { districts } from "@/lib/districts";

const formSchema = z.object({
  title: z.string().min(10, { message: "শিরোনাম কমপক্ষে ১০ অক্ষরের হতে হবে।" }),
  category: z.string().min(1, { message: "ক্যাটাগরি নির্বাচন করুন।" }),
  content: z.string().min(50, { message: "বিবরণ কমপক্ষে ৫০ অক্ষরের হতে হবে।" }),
  publicationDate: z.string().optional(),
  location: z.string().min(1, { message: "স্থান উল্লেখ করুন।" }),
  offender: z.string().min(1, { message: "অভিযুক্তের নাম উল্লেখ করুন।" }),
  newsSource: z.string().min(3, { message: "সংবাদের উৎস উল্লেখ করুন।" }),
  newsLink: z.string().url({ message: "অনুগ্রহ করে একটি বৈধ লিংক দিন।" }),
  imageUrl: z.string().url({ message: "অনুগ্রহ করে একটি বৈধ ছবির লিংক দিন।" }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof formSchema>;

const categories = ['খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন', 'অন্যান্য'];
const offenders = ['জামায়াত', 'শিবির', 'অন্যান্য'];

interface ArticleFormProps {
  initialData?: Partial<Article> | null;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
      title: initialData?.title || "",
      category: initialData?.category || "",
      content: initialData?.content || "",
      publicationDate: initialData?.publicationDate || new Date().toISOString(),
      location: initialData?.location || "",
      offender: initialData?.offender || "",
      newsSource: initialData?.newsSource || "",
      newsLink: initialData?.newsLink || "",
      imageUrl: initialData?.imageUrl || "",
      imageHint: initialData?.imageHint || "",
  }

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        publicationDate: initialData.publicationDate || new Date().toISOString(),
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: ArticleFormValues) => {
    if (!firestore) return;
    setIsSubmitting(true);
    try {
      const docRef = initialData?.id ? doc(firestore, 'articles', initialData.id) : doc(collection(firestore, "articles"));
      await setDoc(docRef, { ...data, id: docRef.id }, { merge: true });

      toast({
        title: "সাফল্য!",
        description: `সংবাদটি সফলভাবে ${initialData?.id ? 'হালনাগাদ' : 'তৈরি'} করা হয়েছে।`,
      });
      router.push('/admin/articles');
      router.refresh();
    } catch (e) {
      console.error("Error adding/updating document: ", e);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "সংবাদটি সংরক্ষণ করার সময় একটি সমস্যা হয়েছে।",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>শিরোনাম</FormLabel>
              <FormControl>
                <Input placeholder="সংবাদের শিরোনাম" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ক্যাটাগরি</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="একটি ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>প্রকাশের তারিখ</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>একটি তারিখ বাছাই করুন</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিস্তারিত বিবরণ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="সংবাদের বিস্তারিত লিখুন"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>স্থান</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="একটি জেলা নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map(dis => <SelectItem key={dis} value={dis}>{dis}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>অভিযুক্ত</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="অভিযুক্ত নির্বাচন করুন" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {offenders.map(off => <SelectItem key={off} value={off}>{off}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <FormField
              control={form.control}
              name="newsSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সংবাদের উৎস</FormLabel>
                  <FormControl>
                    <Input placeholder="যেমন: প্রথম আলো, BBC বাংলা" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>মূল সংবাদের লিংক</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ছবির লিংক (ঐচ্ছিক)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ছবির ইঙ্গিত (ঐচ্ছিক)</FormLabel>
                  <FormControl>
                    <Input placeholder="যেমন: protest rally" {...field} />
                  </FormControl>
                  <FormDescription>
                    AI দ্বারা সম্পর্কিত ছবি খুঁজতে সাহায্য করার জন্য ১-২টি ইংরেজি শব্দ লিখুন।
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {initialData?.id ? 'সংবাদ হালনাগাদ করুন' : 'সংবাদ তৈরি করুন'}
        </Button>
      </form>
    </Form>
  );
}
