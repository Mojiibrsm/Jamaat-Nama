'use server';
/**
 * @fileOverview Scrapes and extracts content from a news article URL.
 *
 * - scrapeArticleContent - Scrapes the URL and returns structured data.
 * - ScrapeArticleInput - Input schema for the scraper.
 * - ScrapeArticleOutput - Output schema for the scraper.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScrapeArticleInputSchema = z.object({
  articleUrl: z.string().url().describe('The URL of the news article to scrape.'),
});
export type ScrapeArticleInput = z.infer<typeof ScrapeArticleInputSchema>;

const ScrapeArticleOutputSchema = z.object({
  title: z.string().describe('The main title of the article.'),
  content: z.string().describe('The full body content of the article, cleaned of ads and navigation elements.'),
  publicationDate: z.string().describe('The publication date of the article in ISO 8601 format.').optional(),
  category: z.string().describe('The most relevant category for the article from the provided list: খুন, ধর্ষণ,চাঁদাবাজি, হামলা / সংঘর্ষ, লুটপাট, দখল, ইসলামবিদ্বেষ, মাদক, সন্ত্রাস, দুর্নীতি, সাইবার অপরাধ, নারী নির্যাতন, অন্যান্য').optional(),
  location: z.string().describe('The geographical location where the event in the article took place.').optional(),
  newsSource: z.string().describe('The name of the news publication or source (e.g., "প্রথম আলো").').optional(),
});
export type ScrapeArticleOutput = z.infer<typeof ScrapeArticleOutputSchema>;

export async function scrapeArticleContent(input: ScrapeArticleInput): Promise<ScrapeArticleOutput> {
  return scrapeArticleFlow(input);
}

const scrapeArticleFlow = ai.defineFlow(
  {
    name: 'scrapeArticleFlow',
    inputSchema: ScrapeArticleInputSchema,
    outputSchema: ScrapeArticleOutputSchema,
  },
  async (input) => {
    // Now, pass the fetched content to the model for extraction.
    const { output } = await ai.generate({
      prompt: `
        You are an expert news article scraper. Your task is to extract key information from the provided article URL.
        Please extract the title, the full body content (extract only the main article text, clean of ads, navigation, and other boilerplate), the publication date (in ISO format), 
        the most relevant category, the location of the event, and the name of the news source.
        
        Article URL:
        ---
        ${input.articleUrl}
        ---

        Provide only the structured data as your output.
      `,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: ScrapeArticleOutputSchema,
      },
    });

    return output!;
  }
);
