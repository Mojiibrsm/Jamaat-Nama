
export type Article = {
  id: string;
  slug: string;
  title: string;
  publicationDate: string;
  category: 'খুন' | 'ধর্ষণ' | 'চাঁদাবাজি' | 'হামলা / সংঘর্ষ' | 'লুটপাট' | 'দখল' | 'ইসলামবিদ্বেষ' | 'মাদক' | 'রাজনীতি' | 'প্রযুক্তি' | 'বিশ্ব' | 'খেলা' | 'ব্যবসা' | 'সন্ত্রাস' | 'দুর্নীতি' | 'সাইবার অপরাধ' | 'নারী নির্যাতন' | 'অন্যান্য';
  content: string;
  imageUrl?: string;
  imageHint?: string;
  location: string;
  offender: string;
  victim?: string;
  newsSource: string;
  newsLink: string;
};
