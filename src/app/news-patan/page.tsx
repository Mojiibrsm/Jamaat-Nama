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

export default function NewsPatanPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "আপনার তথ্য গৃহীত হয়েছে",
      description: "আপনার পাঠানো তথ্য যাচাই করে প্রকাশ করা হবে। ধন্যবাদ।",
    });
    (e.target as HTMLFormElement).reset();
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
                  <Input id="title" placeholder="আপনার খবরের শিরোনাম লিখুন" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="newsLink">মূল খবরের লিংক</Label>
                  <Input id="newsLink" type="url" placeholder="খবরের মূল লিংক দিন" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">বিস্তারিত (ঐচ্ছিক)</Label>
                  <Textarea id="details" placeholder="আপনার খবরটি বিস্তারিত লিখুন" rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidence">প্রমাণ (ছবি/ডকুমেন্ট) (ঐচ্ছিক)</Label>
                  <Input id="evidence" type="file" />
                  <p className="text-sm text-muted-foreground">আপনি ছবি, ভিডিও অথবা পিডিএফ ফাইল আপলোড করতে পারেন।</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম (ঐচ্ছিক)</Label>
                  <Input id="name" placeholder="আপনার নাম" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">আপনার ইমেইল (ঐচ্ছিক)</Label>
                  <Input id="email" type="email" placeholder="আপনার ইমেইল" />
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
