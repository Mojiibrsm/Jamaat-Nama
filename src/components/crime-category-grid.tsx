import { Card } from '@/components/ui/card';
import { VenetianMask, LandPlot, Handshake, Landmark, Dna, PackageSearch, Ban, Skull } from 'lucide-react';

const categories = [
  { name: 'খুন', count: '175+', Icon: Skull },
  { name: 'ধর্ষণ', count: '70+', Icon: Ban },
  { name: 'চাঁদাবাজি', count: '215+', Icon: VenetianMask },
  { name: 'হামলা / সংঘর্ষ', count: '81+', Icon: Handshake },
  { name: 'লুটপাট', count: '53+', Icon: PackageSearch },
  { name: 'দখল', count: '38+', Icon: LandPlot },
  { name: 'ইসলামবিদ্বেষ', count: '9+', Icon: Landmark },
  { name: 'মাদক', count: '46+', Icon: Dna },
];

const CategoryCard = ({ name, count, Icon }: { name: string; count: string; Icon: React.ElementType }) => (
  <Card className="flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 transition-colors text-center">
    <Icon className="w-12 h-12 text-primary mb-3" />
    <p className="text-3xl font-bold text-foreground">{count}</p>
    <p className="text-md font-medium text-muted-foreground mt-1">{name}</p>
  </Card>
);

export function CrimeCategoryGrid() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-10">
          অপরাধ ক্যাটাগরি
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
