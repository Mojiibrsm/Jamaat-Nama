
import { PlaceHolderImages } from './placeholder-images';

export type Article = {
  id: string;
  title: string;
  publicationDate: string;
  category: 'খুন' | 'ধর্ষণ' | 'চাঁদাবাজি' | 'হামলা / সংঘর্ষ' | 'লুটপাট' | 'দখল' | 'ইসলামবিদ্বেষ' | 'মাদক' | 'রাজনীতি' | 'প্রযুক্তি' | 'বিশ্ব' | 'খেলা' | 'ব্যবসা' | 'সন্ত্রাস' | 'দুর্নীতি' | 'সাইবার অপরাধ';
  content: string;
  imageUrl: string;
  imageHint: string;
  location: string;
  offender: string;
  victim: string;
  newsSource: string;
  newsLink: string;
};

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // Fallback or default image
        return {
            imageUrl: 'https://picsum.photos/seed/default/600/400',
            imageHint: 'news image'
        };
    }
    return {
        imageUrl: image.imageUrl,
        imageHint: image.imageHint
    };
};

export const articles: Article[] = [
  {
    id: '1',
    title: 'ঢাকায় প্রকাশ্য দিবালোকে হামলা, আহত ২',
    publicationDate: '2024-07-21T10:00:00Z',
    category: 'হামলা / সংঘর্ষ',
    content: `রাজধানীর মিরপুরে দুই গ্রুপের সংঘর্ষে কমপক্ষে দুইজন আহত হয়েছেন। আধিপত্য বিস্তারকে কেন্দ্র করে এই ঘটনা ঘটেছে বলে ধারণা করা হচ্ছে। পুলিশ ঘটনাস্থলে পৌঁছে পরিস্থিতি নিয়ন্ত্রণে আনে। আহতদের স্থানীয় হাসপাতালে ভর্তি করা হয়েছে।`,
    ...getImage('politics-1'),
    location: 'ঢাকা',
    offender: 'শিবির',
    victim: 'সাধারণ মানুষ',
    newsSource: 'প্রথম আলো',
    newsLink: '#'
  },
  {
    id: '2',
    title: 'চট্টগ্রামে সরকারি জমি দখলের চেষ্টা, উত্তেজনা',
    publicationDate: '2024-07-20T14:30:00Z',
    category: 'দখল',
    content: `চট্টগ্রামের আকবর শাহ এলাকায় সরকারি খাসজমি দখলের চেষ্টাকে কেন্দ্র করে উত্তেজনা বিরাজ করছে। স্থানীয় একটি প্রভাবশালী চক্র এই জমি দখলের চেষ্টা করছে বলে অভিযোগ উঠেছে। এলাকাবাসী দখলের বিরুদ্ধে প্রতিরোধ গড়ে তুলেছে।`,
    ...getImage('tech-1'),
    location: 'চট্টগ্রাম',
    offender: 'জামায়াত',
    victim: 'সরকার',
    newsSource: 'বিডিনিউজ টোয়েন্টিফোর',
    newsLink: '#'
  },
  {
    id: '3',
    title: 'রাজশাহীতে ব্যবসায়ীর কাছে চাঁদা দাবি',
    publicationDate: '2024-07-22T08:00:00Z',
    category: 'চাঁদাবাজি',
    content: `রাজশাহী নগরীর এক prominent ব্যবসায়ীর কাছে ৫ লক্ষ টাকা চাঁদা দাবি করেছে দুর্বৃত্তরা। চাঁদা না দিলে তাকে প্রাণে মেরে ফেলার হুমকি দেওয়া হয়। ব্যবসায়ী নিরাপত্তা চেয়ে থানায় সাধারণ ডায়েরি করেছেন।`,
    ...getImage('world-1'),
    location: 'রাজশাহী',
    offender: 'শিবির',
    victim: 'ব্যবসায়ী',
    newsSource: 'যুগান্তর',
    newsLink: '#'
  },
  {
    id: '4',
    title: 'সিলেটে கல்லூரி ছাত্র খুন, অভিযুক্ত পলাতক',
    publicationDate: '2024-07-21T21:00:00Z',
    category: 'খুন',
    content: `সিলেট এমসি কলেজে এক ছাত্রকে ছুরিকাঘাতে হত্যা করা হয়েছে। ব্যক্তিগত শত্রুতার জেরে এই হত্যাকাণ্ড ঘটেছে বলে প্রাথমিকভাবে ধারণা করছে পুলিশ। অভিযুক্তরা ঘটনার পর থেকে পলাতক রয়েছে।`,
    ...getImage('sports-1'),
    location: 'সিলেট',
    offender: 'অন্যান্য',
    victim: 'ছাত্র',
    newsSource: 'ডেইলি স্টার',
    newsLink: '#'
  },
  {
    id: '5',
    title: 'খুলনায় সংখ্যালঘু পরিবারের উপর হামলা',
    publicationDate: '2024-07-22T11:00:00Z',
    category: 'ইসলামবিদ্বেষ',
    content: `খুলনার দাকোপ উপজেলায় একটি সংখ্যালঘু পরিবারের উপর হামলা চালিয়েছে দুর্বৃত্তরা। এতে পরিবারের সদস্যরা আহত হয়েছেন এবং তাদের বাড়িঘরে ভাঙচুর করা হয়েছে। পুলিশ मामले की जांच कर रही है।`,
    ...getImage('business-1'),
    location: 'খুলনা',
    offender: 'জামায়াত',
    victim: 'সংখ্যালঘু পরিবার',
    newsSource: 'সমকাল',
    newsLink: '#'
  },
  {
    id: '6',
    title: 'বরিশালে মাদকের বিরুদ্ধে অভিযান, আটক ৩',
    publicationDate: '2024-07-19T16:00:00Z',
    category: 'মাদক',
    content: `বরিশাল শহরে মাদকের বিরুদ্ধে অভিযান চালিয়ে তিন মাদক ব্যবসায়ীকে আটক করেছে র‍্যাব। তাদের কাছ থেকে বিপুল পরিমাণ ইয়াবা ও গাঁজা উদ্ধার করা হয়েছে। তাদের বিরুদ্ধে মাদকদ্রব্য নিয়ন্ত্রণ আইনে মামলা দায়ের করা হয়েছে।`,
    ...getImage('tech-2'),
    location: 'বরিশাল',
    offender: 'অন্যান্য',
    victim: 'সমাজ',
    newsSource: 'ইত্তেফাক',
    newsLink: '#'
  }
];
