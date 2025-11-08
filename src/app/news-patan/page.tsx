
'use client';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase/provider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { districts } from '@/lib/districts';

export default function NewsPatanPage() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOffender, setSelectedOffender] = useState('');

  const categories = ['খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন', 'অন্যান্য'];
  const offenders = ['জামায়াত', 'শিবির', 'অন্যান্য'];
  const firestore = useFirestore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const submissionData: {[key: string]: any} = {
        title: formData.get('title'),
        newsLink: formData.get('newsLink'),
        details: formData.get('details'),
        name: formData.get('name') || 'নাম প্রকাশে অনিচ্ছুক',
        email: formData.get('email'),
        category: selectedCategory === 'অন্যান্য' ? formData.get('new-category') : selectedCategory,
        location: selectedLocation,
        offender: selectedOffender,
        status: 'Pending',
        submittedAt: serverTimestamp()
    };
    
    // We are not handling file uploads yet.
    // const evidenceFile = formData.get('evidence');

    try {
        await addDoc(collection(firestore, 'submissions'), submissionData);
        toast({
          title: "আপনার তথ্য গৃহীত হয়েছে",
          description: "আপনার পাঠানো তথ্য যাচাই করে প্রকাশ করা হবে। ধন্যবাদ।",
        });
        (e.target as HTMLFormElement).reset();
        setSelectedCategory('');
        setSelectedLocation('');
        setSelectedOffender('');
    } catch (error) {
        console.error("Error adding document: ", error);
        toast({
            variant: 'destructive',
            title: "একটি ত্রুটি ঘটেছে",
            description: "আপনার তথ্য জমা দেওয়ার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-primary">খবর পাঠান</CardTitle>
              <CardDescription>
                আপনার কাছে থাকা যেকোনো তথ্য, ছবি, বা ডকুমেন্ট পাঠিয়ে আমাদের সহযোগিতা করুন।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">আপনার সহযোগিতা আমাদের প্রয়োজন</AlertTitle>
                <AlertDescription className="leading-relaxed">
                  এই ওয়েবসাইটের উদ্দেশ্য কোনো পক্ষকে অপমান করা নয়, বরং তথ্য ও প্রমাণভিত্তিক বাস্তবতা প্রকাশ করা — যাতে সাধারণ মানুষ জানতে পারে আসলে কী ঘটেছে, কারা দায়ী, এবং ইতিহাসের কোন দিকটি লুকিয়ে রাখা হয়েছে।
                  <br /><br />
                  👉 তাই আমি চাই, সবাই যাঁরা এই কাজের সঙ্গে সহমত পোষণ করেন, তাঁরা যেন তথ্য, ছবি, ডকুমেন্ট বা যেকোনো প্রমাণাদি পাঠিয়ে সহযোগিতা করেন। সব তথ্য যাচাই করে প্রকাশ করা হবে — যেন আমরা সবাই মিলে একটি নির্ভরযোগ্য তথ্যভাণ্ডার তৈরি করতে পারি।
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">শিরোনাম</Label>
                  <Input name="title" id="title" placeholder="আপনার খবরের শিরোনাম লিখুন" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsLink">মূল খবরের লিংক</Label>
                  <Input name="newsLink" id="newsLink" type="url" placeholder="খবরের মূল লিংক দিন" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">ক্যাটাগরি</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedCategory === 'অন্যান্য' && (
                    <div className="space-y-2">
                      <Label htmlFor="new-category">নতুন ক্যাটাগরি যোগ করুন</Label>
                      <Input name="new-category" id="new-category" placeholder="নতুন ক্যাটাগরি লিখুন" />
                    </div>
                  )}
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">স্থান</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation} required>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="জেলা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map(dis => <SelectItem key={dis} value={dis}>{dis}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offender">অভিযুক্ত</Label>
                      <Select value={selectedOffender} onValueChange={setSelectedOffender} required>
                        <SelectTrigger id="offender">
                          <SelectValue placeholder="অভিযুক্ত নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {offenders.map(off => <SelectItem key={off} value={off}>{off}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">বিস্তারিত (ঐচ্ছিক)</Label>
                  <Textarea name="details" id="details" placeholder="আপনার খবরটি বিস্তারিত লিখুন" rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidence">প্রমাণ (ছবি/ডকুমেন্ট) (ঐচ্ছিক)</Label>
                  <Input name="evidence" id="evidence" type="file" />
                  <p className="text-sm text-muted-foreground">আপনি ছবি, ভিডিও অথবা পিডিএফ ফাইল আপলোড করতে পারেন।</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম (ঐচ্ছিক)</Label>
                  <Input name="name" id="name" placeholder="আপনার নাম" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">আপনার ইমেইল (ঐচ্ছিক)</Label>
                  <Input name="email" id="email" type="email" placeholder="আপনার ইমেইল" />
                </div>
                <Button type="submit" size="lg">জমা দিন</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
