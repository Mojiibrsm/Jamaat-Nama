'use client';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Info, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { districts } from '@/lib/districts';
import ReCAPTCHA from "react-google-recaptcha";
import { submitNews } from '@/ai/flows/submit-news-flow';

export default function NewsPatanPage() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOffender, setSelectedOffender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = ['খুন', 'ধর্ষণ', 'চাঁদাবাজি', 'হামলা / সংঘর্ষ', 'লুটপাট', 'দখল', 'ইসলামবিদ্বেষ', 'মাদক', 'সন্ত্রাস', 'দুর্নীতি', 'সাইবার অপরাধ', 'নারী নির্যাতন', 'অন্যান্য'];
  const offenders = ['জামায়াত', 'শিবির', 'অন্যান্য'];
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recaptchaToken = await recaptchaRef.current?.executeAsync();
    
    if (!recaptchaToken) {
      toast({
        variant: 'destructive',
        title: "reCAPTCHA যাচাইকরণ ব্যর্থ হয়েছে",
        description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Reset reCAPTCHA after getting token.
    recaptchaRef.current?.reset();

    const formData = new FormData(e.target as HTMLFormElement);
    const submissionData = {
        title: formData.get('title') as string,
        newsLink: formData.get('newsLink') as string,
        details: formData.get('details') as string,
        name: (formData.get('name') as string) || 'নাম প্রকাশে অনিচ্ছুক',
        email: formData.get('email') as string,
        category: selectedCategory === 'অন্যান্য' ? formData.get('new-category') as string : selectedCategory,
        location: selectedLocation,
        offender: selectedOffender === 'অন্যান্য' ? formData.get('new-offender') as string : selectedOffender,
    };

    try {
        await submitNews({ ...submissionData, recaptchaToken });
        toast({
          title: "আপনার তথ্য গৃহীত হয়েছে",
          description: "আপনার পাঠানো তথ্য যাচাই করে প্রকাশ করা হবে। ধন্যবাদ।",
        });
        (e.target as HTMLFormElement).reset();
        setSelectedCategory('');
        setSelectedLocation('');
        setSelectedOffender('');
    } catch (error) {
        console.error("Submission Error: ", error);
        toast({
            variant: 'destructive',
            title: "একটি ত্রুটি ঘটেছে",
            description: error instanceof Error ? error.message : "আপনার তথ্য জমা দেওয়ার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        });
    } finally {
        setIsSubmitting(false);
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
                 {isClient && (
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    />
                 )}
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
                      <Input name="new-category" id="new-category" placeholder="নতুন ক্যাটাগরি লিখুন" required/>
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
                 {selectedOffender === 'অন্যান্য' && (
                    <div className="space-y-2">
                        <Label htmlFor="new-offender">অন্যান্য অভিযুক্তের নাম</Label>
                        <Input name="new-offender" id="new-offender" placeholder="অভিযুক্তের নাম লিখুন" required />
                    </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="details">বিস্তারিত (ঐচ্ছিক)</Label>
                  <Textarea name="details" id="details" placeholder="আপনার খবরটি বিস্তারিত লিখুন" rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evidence">প্রমাণ (ছবি/ডকুমেন্ট) (ঐচ্ছিক)</Label>
                  <Input name="evidence" id="evidence" type="file" disabled />
                  <p className="text-sm text-muted-foreground">এই ফিচারটি শীঘ্রই আসছে।</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম (ঐচ্ছিক)</Label>
                  <Input name="name" id="name" placeholder="আপনার নাম" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">আপনার ইমেইল (ঐচ্ছিক)</Label>
                  <Input name="email" id="email" type="email" placeholder="আপনার ইমেইল" />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                   {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'জমা দিন'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
