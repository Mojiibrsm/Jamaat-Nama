import { PlaceHolderImages } from './placeholder-images';

export type Article = {
  id: string;
  title: string;
  publicationDate: string;
  category: 'Politics' | 'Technology' | 'World' | 'Sports' | 'Business';
  content: string;
  imageUrl: string;
  imageHint: string;
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
    title: 'Global Leaders Summit Addresses Climate Change',
    publicationDate: '2024-07-21T10:00:00Z',
    category: 'Politics',
    content: `World leaders convened today for the annual Global Climate Summit, facing mounting pressure to take decisive action against rising global temperatures. The summit's opening was marked by a stirring speech from the UN Secretary-General, who warned that humanity is at a "code red" and that the window for action is rapidly closing.
    
Key agenda items include finalizing the rules for carbon markets, increasing financial aid to developing nations for climate adaptation, and securing more ambitious emissions reduction targets from major economies. Protests outside the venue highlighted the public's demand for more than just promises, with activists calling for immediate and binding commitments. The outcomes of this summit could shape global climate policy for the next decade.`,
    ...getImage('politics-1')
  },
  {
    id: '2',
    title: 'Quantum Computing Breakthrough Promises New Era of Technology',
    publicationDate: '2024-07-20T14:30:00Z',
    category: 'Technology',
    content: `Researchers at a leading tech institute have announced a major breakthrough in quantum computing, achieving a stable 1,000-qubit processor. This development could accelerate advancements in fields from medicine to materials science, solving complex problems that are currently intractable for even the most powerful supercomputers.
    
The new processor, named 'Sycamore X', is said to be exponentially more powerful than its predecessors. While commercial applications are still years away, this milestone is a significant step towards the quantum era. Experts believe it will revolutionize drug discovery, financial modeling, and artificial intelligence. However, it also raises new security concerns, as quantum computers could potentially break current encryption standards.`,
    ...getImage('tech-1')
  },
  {
    id: '3',
    title: 'New Humanitarian Corridors Opened in Conflict Zone',
    publicationDate: '2024-07-22T08:00:00Z',
    category: 'World',
    content: `A fragile truce has allowed for the opening of new humanitarian corridors, providing much-needed aid to civilians trapped in the war-torn region of Aethel. Convoys carrying food, water, and medical supplies have begun to reach besieged cities for the first time in months.
    
International aid organizations have welcomed the development but remain cautious, citing the volatility of the situation. The corridors are a lifeline for hundreds of thousands of people facing starvation and disease. Diplomats are working to extend the ceasefire and translate this temporary relief into a more permanent peace agreement.`,
    ...getImage('world-1')
  },
  {
    id: '4',
    title: 'Underdogs Clinch Championship in Stunning Upset',
    publicationDate: '2024-07-21T21:00:00Z',
    category: 'Sports',
    content: `In a finale for the ages, the Northwood Foxes defeated the reigning champions, the Downtown Dynamos, in a stunning 3-2 victory. The match, which went into extra time, was decided by a last-minute goal from rookie striker Amelia Chen.
    
The Foxes, who were considered long shots at the beginning of the season, completed a fairytale run to the championship. The victory marks their first title in the club's 50-year history and has sparked jubilant celebrations across their home city. The coach praised the team's "unbreakable spirit and relentless hard work."`,
    ...getImage('sports-1')
  },
  {
    id: '5',
    title: 'Central Bank Hikes Interest Rates to Combat Inflation',
    publicationDate: '2024-07-22T11:00:00Z',
    category: 'Business',
    content: `The National Central Bank announced a 50-basis-point interest rate hike today, its third this year, as it intensifies its fight against persistent inflation. The move, which was widely anticipated by economists, aims to cool down an overheating economy and stabilize prices.
    
Markets reacted with mixed results, with the stock market dipping slightly while the national currency strengthened. The bank's governor stated that they are committed to bringing inflation back to the 2% target, even if it means a period of slower economic growth. Consumers are likely to see higher costs for mortgages and loans as a result of the decision.`,
    ...getImage('business-1')
  },
  {
    id: '6',
    title: 'AI Ethics Board Established to Guide Development',
    publicationDate: '2024-07-19T16:00:00Z',
    category: 'Technology',
    content: `A consortium of leading technology companies and academic institutions has announced the formation of an independent AI Ethics and Safety Board. The board's mission is to create and promote best practices for the responsible development and deployment of artificial intelligence.
    
This initiative comes amid growing public and governmental concern over the potential misuse of AI, including issues of bias, privacy, and autonomous decision-making. The board will publish research, provide policy recommendations, and offer a framework for auditing AI systems. Critics argue that for the board to be effective, its recommendations must be enforceable rather than merely advisory.`,
    ...getImage('tech-2')
  }
];
