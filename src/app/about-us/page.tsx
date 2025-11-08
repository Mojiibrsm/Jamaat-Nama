import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-primary">আমাদের সম্পর্কে</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-foreground/90 leading-relaxed">
              <p>
                "Jamaat Nama" একটি তথ্যভিত্তিক আর্কাইভ যা বিএনপি ও এর অঙ্গসংগঠনের কার্যক্রমের উপর ভিত্তি করে তৈরি। আমাদের লক্ষ্য হলো ঐতিহাসিক ঘটনা এবং তথ্যের একটি নির্ভুল এবং প্রমাণভিত্তিক সংগ্রহশালা তৈরি করা।
              </p>
              <p>
                এই ওয়েবসাইটের উদ্দেশ্য কোনো পক্ষকে অপমান করা নয়, বরং তথ্য ও প্রমাণভিত্তিক বাস্তবতা প্রকাশ করা — যাতে সাধারণ মানুষ জানতে পারে আসলে কী ঘটেছে, কারা দায়ী, এবং ইতিহাসের কোন দিকটি লুকিয়ে রাখা হয়েছে।
              </p>
              <p>
                আমরা বিশ্বাস করি, সত্যনিষ্ঠ তথ্য জনগণের কাছে পৌঁছে দেওয়ার মাধ্যমে একটি স্বচ্ছ এবং জবাবদিহিমূলক সমাজ ব্যবস্থা গড়ে তোলা সম্ভব। আমরা একটি উন্মুক্ত প্ল্যাটফর্ম যেখানে সবাই তথ্য, ছবি, এবং ডকুমেন্ট পাঠিয়ে আমাদের এই উদ্যোগে সাহায্য করতে পারেন।
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}