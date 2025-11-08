
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Card } from './ui/card';

const categories = [
  { value: 'khun', label: 'খুন' },
  { value: 'dhorshon', label: 'ধর্ষণ' },
  { value: 'chadabaji', label: 'চাঁদাবাজি' },
  { value: 'hamla', label: 'হামলা / সংঘর্ষ' },
  { value: 'lutpat', label: 'লুটপাট' },
  { value: 'dokhol', label: 'দখল' },
  { value: 'islambiddesh', label: 'ইসলামবিদ্বেষ' },
  { value: 'madok', label: 'মাদক' },
];

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center text-white">
      <div className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://ik.imagekit.io/uekohag7w/20251108_144957_0000.png')"}}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg animate-fade-in-up animation-delay-300">
            সত্যের সন্ধানে: জামায়াত-শিবিরের অপরাধনামা
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-white/90 drop-shadow-md animate-fade-in-up animation-delay-500">
            ঐতিহাসিক তথ্যের ভিত্তিতে জামায়াত, শিবির এবং তাদের সহযোগীদের সকল অপরাধমূলক কর্মকাণ্ডের একটি উন্মুক্ত আর্কাইভ।
          </p>
        </div>
      </div>
      <div className="w-full bg-secondary -mt-16 relative z-20 animate-fade-in-up animation-delay-900">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <Card className="bg-card/80 backdrop-blur-sm p-6 text-center shadow-lg border-primary/20 transform transition-all duration-300 hover:-translate-y-2">
                    <p className="text-4xl md:text-5xl font-bold text-primary">175+</p>
                    <p className="text-sm md:text-base text-foreground/80 mt-2 font-medium">মোট সংবাদ</p>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm p-6 text-center shadow-lg border-primary/20 transform transition-all duration-300 hover:-translate-y-2">
                    <p className="text-4xl md:text-5xl font-bold text-primary">70+</p>
                    <p className="text-sm md:text-base text-foreground/80 mt-2 font-medium">মোট অপরাধ</p>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm p-6 text-center shadow-lg border-primary/20 transform transition-all duration-300 hover:-translate-y-2">
                    <p className="text-4xl md:text-5xl font-bold text-primary">88+</p>
                    <p className="text-sm md:text-base text-foreground/80 mt-2 font-medium">মোট দুর্নীতি</p>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}

