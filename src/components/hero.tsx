import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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
      <div className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://storage.googleapis.com/stabl-agent-testing/jamaat-e-islami-600w.png')"}}>
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
      <div className="w-full py-8 bg-animated-gradient animate-fade-in-up animation-delay-900">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-center items-center gap-8">
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
