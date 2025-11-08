
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <CardHeader>
              <div className="mx-auto bg-destructive/10 text-destructive rounded-full p-4 w-fit">
                <TriangleAlert className="h-12 w-12" />
              </div>
              <CardTitle className="text-4xl font-headline text-destructive mt-6">
                404 - পৃষ্ঠা পাওয়া যায়নি
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">
                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি। এটি হয়তো মুছে ফেলা হয়েছে বা লিঙ্কটি ভুল হতে পারে।
              </p>
              <Button asChild size="lg">
                <Link href="/">হোম পেজে ফিরে যান</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
