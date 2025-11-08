import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg animate-fade-in-up animation-delay-300">
          অপরাধের তথ্যভান্ডার : সত্যের মুখোমুখি বাংলাদেশ
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-white/90 drop-shadow-md animate-fade-in-up animation-delay-500">
          বিএনপি ও এর অঙ্গসংগঠনের অপরাধমূলক কর্মকাণ্ডের প্রমাণভিত্তিক আর্কাইভ
        </p>
        <div className="mt-4 w-full max-w-2xl animate-fade-in-up animation-delay-700">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="সার্চ..."
                className="pl-10 text-base h-12 bg-white/90 text-foreground"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[200px] h-12 text-base bg-white/90 text-foreground">
                <SelectValue placeholder="অপরাধ ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politics">রাজনীতি</SelectItem>
                <SelectItem value="technology">প্রযুক্তি</SelectItem>
                <SelectItem value="world">বিশ্ব</SelectItem>
                <SelectItem value="sports">খেলা</SelectItem>
                <SelectItem value="business">ব্যবসা</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="h-12 text-base">
              <Search className="mr-2 h-5 w-5" />
              অনুসন্ধান
            </Button>
          </div>
        </div>
        <div className="mt-8 flex gap-4 md:gap-8 animate-fade-in-up animation-delay-900">
            <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold">175+</p>
                <p className="text-sm md:text-base text-white/80">নিবন্ধিত মামলা</p>
            </div>
            <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold">70+</p>
                <p className="text-sm md:text-base text-white/80">দণ্ডপ্রাপ্ত অপরাধী</p>
            </div>
            <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold">797+</p>
                <p className="text-sm md:text-base text-white/80">ঘটনার বিবরণ</p>
            </div>
        </div>
      </div>
    </section>
  );
}
