import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-primary">গোপনীয়তা নীতি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <h2 className="text-xl font-semibold text-primary">ভূমিকা</h2>
              <p>
                Jamaat Nama ("আমরা", "আমাদের") আপনার গোপনীয়তাকে সম্মান করে এবং এটি রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার, প্রকাশ এবং সুরক্ষিত করি যখন আপনি আমাদের ওয়েবসাইট পরিদর্শন করেন।
              </p>

              <h2 className="text-xl font-semibold text-primary">তথ্য সংগ্রহ</h2>
              <p>
                আপনি যখন "খবর পাঠান" ফর্মের মাধ্যমে স্বেচ্ছায় তথ্য প্রদান করেন, তখন আমরা ব্যক্তিগতভাবে শনাক্তকরণযোগ্য তথ্য সংগ্রহ করতে পারি, যেমন আপনার নাম, ইমেল ঠিকানা এবং আপনার জমা দেওয়া যেকোনো বার্তা বা ফাইল।
              </p>

              <h2 className="text-xl font-semibold text-primary">তথ্যের ব্যবহার</h2>
              <p>
                আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করা হতে পারে:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>আমাদের ওয়েবসাইটের বিষয়বস্তু সরবরাহ এবং রক্ষণাবেক্ষণ করা।</li>
                <li>আপনার জমা দেওয়া তথ্য যাচাই এবং প্রকাশ করা।</li>
                <li>আপনার সাথে যোগাযোগ করা, যদি প্রয়োজন হয়।</li>
                <li>আমাদের ওয়েবসাইটের ব্যবহার বিশ্লেষণ করে এটিকে উন্নত করা।</li>
              </ul>

              <h2 className="text-xl font-semibold text-primary">তথ্যের সুরক্ষা</h2>
              <p>
                আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে বিভিন্ন নিরাপত্তা ব্যবস্থা ব্যবহার করি। তবে, মনে রাখবেন যে ইন্টারনেটের মাধ্যমে কোনো তথ্য প্রেরণ বা ইলেকট্রনিক স্টোরেজ পদ্ধতি ১০০% নিরাপদ নয়।
              </p>

              <h2 className="text-xl font-semibold text-primary">নীতিমালার পরিবর্তন</h2>
              <p>
                আমরা সময়ে সময়ে আমাদের গোপনীয়তা নীতি আপডেট করতে পারি। যেকোনো পরিবর্তনের জন্য আমরা এই পৃষ্ঠায় নতুন গোপনীয়তা নীতি পোস্ট করব। আপনাকে পর্যায়ক্রমে এই গোপনীয়তা নীতি পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।
              </p>

              <h2 className="text-xl font-semibold text-primary">যোগাযোগ</h2>
              <p>
                এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}