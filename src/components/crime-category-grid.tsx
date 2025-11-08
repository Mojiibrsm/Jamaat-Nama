
'use client';
import { Card } from '@/components/ui/card';
import { VenetianMask, LandPlot, Handshake, Landmark, Dna, PackageSearch, Ban, Skull, ShieldOff, Fingerprint, ScanEye, PersonStanding } from 'lucide-react';
import { SearchSection } from './search-section';
import type { SearchSectionProps } from './search-section';

const crimeCategories = [
  { name: 'খুন', count: '175+', Icon: Skull },
  { name: 'ধর্ষণ', count: '70+', Icon: Ban },
  { name: 'চাঁদাবাজি', count: '215+', Icon: VenetianMask },
  { name: 'হামলা / সংঘর্ষ', count: '81+', Icon: Handshake },
  { name: 'লুটপাট', count: '53+', Icon: PackageSearch },
  { name: 'দখল', count: '38+', Icon: LandPlot },
  { name: 'ইসলামবিদ্বেষ', count: '9+', Icon: Landmark },
  { name: 'মাদক', count: '46+', Icon: Dna },
  { name: 'সন্ত্রাস', count: '102+', Icon: ShieldOff },
  { name: 'দুর্নীতি', count: '88+', Icon: Fingerprint },
  { name: 'সাইবার অপরাধ', count: '25+', Icon: ScanEye },
  { name: 'নারী নির্যাতন', count: '63+', Icon: PersonStanding },
];

const CategoryCard = ({ name, count, Icon, onClick }: { name: string; count: string; Icon: React.ElementType, onClick: () => void }) => (
  <Card 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 transition-all duration-300 transform hover:-translate-y-2 motion-safe:hover:scale-105 text-center shadow-md border-border/80 hover:border-primary/50 cursor-pointer"
  >
    <Icon className="w-12 h-12 text-primary mb-3" />
    <p className="text-3xl font-bold text-foreground">{count}</p>
    <p className="text-md font-medium text-muted-foreground mt-1">{name}</p>
  </Card>
);

export function CrimeCategoryGrid(props: SearchSectionProps) {
  const handleCategoryClick = (categoryName: string) => {
    props.onSearch({
      term: '',
      category: categoryName,
      location: 'সব',
      offender: 'সব',
    });
  };
  
  return (
    <section className="py-12 md:py-20 animate-fade-in-up">
      <div className="container mx-auto px-4 md:px-6">
        
        <SearchSection {...props} />

        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-10 mt-16">
          অপরাধ ক্যাটাগরি
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {crimeCategories.map((category) => (
            <CategoryCard 
              key={category.name} 
              {...category} 
              onClick={() => handleCategoryClick(category.name)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
